# AI Gym Training Lead Generator

A React TypeScript application that generates personalized messages for gym training leads using AI technology. This tool helps fitness professionals save time and increase conversion rates with tailored communication.

## Features

- **Personalized Message Generation**: Create customized messages based on lead information
- **Multiple Platforms**: Support for Instagram, TikTok, Email, and LinkedIn messages
- **Tone Selection**: Choose from various tones including friendly, professional, casual, formal, persuasive, and Singaporean English
- **Batch Processing**: Generate messages for multiple leads at once (up to 100+)
- **Export Options**: Copy individual messages or export all messages to a file

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SemiAutomat1c/aigym-training-lead-generator.git
cd aigym-training-lead-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Usage

#### Single Message Generation

1. Navigate to the "Generate Messages" page
2. Enter lead information (name, interests, location)
3. Select message platform and tone
4. Choose a template
5. Click "Generate Message"
6. Copy the generated message to use in your outreach

#### Batch Message Generation

1. Navigate to the "Batch Generator" page
2. Enter multiple leads in one of the following formats:
   - Format 1: `1. Name - interests, location`
   - Format 2: Name, interests, and location each on separate lines
3. Select message platform and tone
4. Click "Generate Batch Messages"
5. Copy individual messages or export all messages at once

## Technologies Used

- React
- TypeScript
- React Bootstrap
- React Router

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Designed for fitness professionals in Singapore
- Built with modern UI/UX principles 