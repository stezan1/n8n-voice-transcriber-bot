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
3. Configure environment variables such as WhatsApp session, OpenAI API keys, and database credentials.
4. Deploy n8n workflows to automate the bot’s voice message handling.
5. Start the WhatsApp bot using the @open-wa API.
6. Test the bot by sending voice messages through WhatsApp.

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
