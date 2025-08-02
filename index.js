const { create, decryptMedia } = require('@open-wa/wa-automate');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const axios = require('axios');
const { exec } = require('child_process');
require('dotenv').config();

const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/whatsapp';
const AUDIO_FOLDER = path.join(__dirname, 'audio_messages');
const TRANSCRIPT_OUTPUT = path.join(__dirname, 'output');

// Create required folders
if (!fs.existsSync(AUDIO_FOLDER)) fs.mkdirSync(AUDIO_FOLDER, { recursive: true });
if (!fs.existsSync(TRANSCRIPT_OUTPUT)) fs.mkdirSync(TRANSCRIPT_OUTPUT, { recursive: true });

create().then(async client => {
  console.log('✅ WhatsApp client started.');

  client.onMessage(async message => {
    console.log('📩 Message received:', {
      from: message.from,
      type: message.type,
      isMedia: !!message.mimetype,
      isVoice: message.isVoice,
      fromMe: message.fromMe
    });

    if (message.fromMe) {
      console.log('ℹ️ Ignored own message.');
      return;
    }

    const payload = {
      from: message.from,
      message: message.body || '[non-text message]',
      timestamp: message.t,
      type: message.type
    };

    // Send basic info to webhook
    try {
      await axios.post(WEBHOOK_URL, payload);
      console.log('✔️ Sent message to webhook:', payload);
    } catch (error) {
      console.error('❌ Failed to send to webhook:', error.message);
      if (error.response) {
        console.error('🔁 Response:', error.response.status, error.response.data);
      }
    }

    // Save and transcribe audio
    if (message.type === 'ptt' || message.type === 'audio') {
      console.log(`🎤 Audio message detected of type: ${message.type}`);

      try {
        const mediaData = await decryptMedia(message);
        console.log('🔓 Media decrypted.');

        const extension = mime.extension(message.mimetype) || 'ogg';
        const timestamp = Date.now();
        const filename = `${message.type}_${timestamp}.${extension}`;
        const filepath = path.join(AUDIO_FOLDER, filename);

        fs.writeFileSync(filepath, mediaData);
        console.log(`💾 Audio message saved as: ${filepath}`);

        // Transcribe using Whisper
        const whisperCommand = `whisper "${filepath}" --language English --model base --output_dir "${TRANSCRIPT_OUTPUT}"`;
        exec(whisperCommand, async (error, stdout, stderr) => {
          if (error) {
            console.error('❌ Whisper transcription error:', error.message);
            return;
          }
          if (stderr) {
            console.error('⚠️ Whisper stderr:', stderr);
          }

          console.log('📝 Whisper transcription complete.');
          console.log('📄 Whisper output:', stdout);

          // Read generated .txt transcript
          const transcriptFile = path.join(TRANSCRIPT_OUTPUT, path.basename(filepath, path.extname(filepath)) + '.txt');
          if (fs.existsSync(transcriptFile)) {
            const transcript = fs.readFileSync(transcriptFile, 'utf-8');

            // Send transcript AND transcript file path to n8n webhook
            try {
              await axios.post(WEBHOOK_URL, {
                from: message.from,
                type: 'transcription',
                transcription: transcript,
                audioFilePath: filepath,       // audio file path
                transcriptFilePath: transcriptFile  // transcript file path
              });
              console.log('📨 Sent transcription and file paths to webhook.');
            } catch (err) {
              console.error('❌ Failed to send transcription:', err.message);
            }
          } else {
            console.warn('⚠️ Transcript file not found:', transcriptFile);
          }
        });

      } catch (error) {
        console.error('❌ Error saving or processing audio message:', error);
      }

    } else {
      console.log('ℹ️ Message is not a voice/audio note. Ignored for saving.');
    }
  });

}).catch(err => {
  console.error('❌ Failed to start WhatsApp client:', err);
});
