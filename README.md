# WhatsApp Voice Bot Setup with @open-wa, n8n, Whisper, and Ollama

This repository contains the setup and configuration instructions for a self-hosted WhatsApp Voice Bot designed to automate transcription and processing of doctor-patient voice conversations into structured medical records.

## Overview

The WhatsApp Voice Bot uses the following components:
- **@open-wa**: WhatsApp Web API for sending and receiving messages.
- **n8n**: Workflow automation tool to orchestrate bot workflows.
- **Whisper**: OpenAI’s automatic speech recognition system for transcribing voice messages.
- **Ollama**: Language model for processing and structuring medical conversation data.
- **Gemma3**: Converts unstructured medical conversations into structured JSON format, extracting symptoms, diagnosis, and medication information.

## Features

- Receives doctor-patient voice discussions on WhatsApp.
- Automatically transcribes voice messages into text using Whisper.
- Processes transcribed text through Ollama and Gemma3 to generate structured medical notes.
- Stores and manages medical records in JSON format.

## Prerequisites

- Node.js and npm installed.
- A WhatsApp account set up with @open-wa.
- n8n instance configured for workflow automation.
- Access to Whisper for speech-to-text.
- Setup of Ollama for NLP processing.
- Gemma3 for medical data structuring.

## Installation and Setup

1. Clone this repository.
2. Install dependencies for each module (`@open-wa`, n8n workflows, Whisper, Ollama, and Gemma3).
3. npm install @open-wa/wa-automate @open-wa/wa-decrypt mime-types axios dotenv.
4. npm install n8n.
5. download ffmpeg-release-essentials.zip from https://www.gyan.dev/ffmpeg/builds/.
6. Configure environment variables for ffmpeg.
7. download ollama from https://ollama.com/download.
8. install gemma3 model.
9. n8n to start n8n.
10. import wa_automation.json workflow into n8n.
11. Deploy n8n workflows to automate the bot’s voice message handling.
12. Start the WhatsApp bot using node index.js.
13. Authenticate your whatsapp by scanning qr.
14. run the dotnet api.
15. Test the bot by sending voice messages through WhatsApp.

## Usage

- Send voice messages through WhatsApp to the bot.
- The bot transcribes and processes these messages automatically.
- Retrieve structured medical records in JSON format.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## Contact

For questions or support, contact:

- Email: erchandanshahu@gmail.com
- GitHub: https://github.com/stezan1

---
*This setup enables efficient, automated documentation of medical voice conversations using open-source tools and AI models.*
