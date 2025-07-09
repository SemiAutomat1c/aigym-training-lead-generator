# AI Gym Training Lead Generator

A React application that generates personalized messages for gym training leads, with support for batch processing and Singaporean English (Singlish).

## Client Requirements Fulfilled

This application fully meets all the client requirements:

1. ✅ **Batch Processing**: Can handle/craft 100+ profiles in one batch (maximum 200 for quality purposes)
2. ✅ **Message Template**: Follows the exact template specified:
   ```
   Hey NAME, I saw that you were following a couple gym accounts, keep it up in the gym btw : )  
   BTW, (INTERESTS AND TRAITS) love it haha 👍

   I am currently looking for 5 people can join my free training project trial! 

   They get:
   ✅ a Personalised Diet Plan
   ✅ a Personalised Training Plan
   ✅ Telegram Chat Support
   ✅ Physical Form Correction
   ✅ To improve Mind Muscle Connection
   ✅ To make more progress with Less Time and Effort

   To push them in the right direction this year 💪🏻
   Do you know anyone who may be interested? 

   PS: How's your gym progress going? : )
   ```
3. ✅ **Sample Standard Messages**: Matches the provided sample messages exactly
4. ✅ **Easy Data Transfer**: Data can be easily transferred to the program via copy-paste in two formats:
   - Numbered format: `1. Ryan - musician, Singapore`
   - Line by line format: Name, interests, and location on separate lines
5. ✅ **AI Crafting**: Uses AI to generate personalized messages
6. ✅ **Singlish Support**: Includes Singaporean English phrases like "sia", "wah", "leh", "lah", "lor"
7. ✅ **Personalization**: Every crafted sentence is personalized and handcrafted by AI for highest quality

## Features

- **Single Message Generator**: Create personalized messages for individual leads
- **Batch Message Generator**: Process up to 200 leads at once
- **Multiple Platforms**: Support for Instagram, TikTok, Email, and LinkedIn
- **Message Tone Options**: 
  - Singaporean English (Singlish)
  - Friendly
  - Professional
  - Casual
  - Formal
  - Persuasive
- **Personalization Engine**: Creates unique variations based on interest types
- **Easy Export**: Copy individual messages, copy all messages, or export to file

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/aigym-training-lead-generator.git
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Single Message Generator

1. Navigate to the "Generate Message" page
2. Enter the lead's name and interests
3. Select the message platform and tone
4. Click "Generate Message"
5. Copy the generated message to use in your outreach

### Batch Message Generator

1. Navigate to the "Batch Generator" page
2. Enter multiple leads using one of the supported formats:
   - Numbered format: `1. Name - interests, location`
   - Line by line format: Name, interests, and location on separate lines
3. Select message platform and tone
4. Click "Generate Batch Messages"
5. Copy individual messages or export all messages to a file

## Supported Input Formats

### Numbered Format
```
1. Ryan - musician, Singapore
2. Mei Lin - chef, Singapore
3. Rajesh - software engineer, Singapore
```

### Line by Line Format
```
John Smith
musician, fitness enthusiast
Singapore

Jane Doe
photographer, foodie
Singapore
```

## Personalization Features

The application creates highly personalized messages by:

1. Analyzing the interest type (profession, activity, general interest)
2. Using appropriate grammar (a/an) based on the interest
3. Creating unique variations for different interest categories
4. Adding Singlish phrases appropriate to the context
5. Handling multiple interests in a natural way

## License

MIT License - See LICENSE file for details 