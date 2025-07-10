# AI Gym Training Lead Generator

A React application for generating personalized Instagram DM messages for gym training leads.

## Features

- Generate personalized messages based on traits and interests
- Support for different Singlish tone levels (0, 2, 3, 4)
- Company Account and Normal Follow-up templates
- Batch message generation for multiple leads
- Real-time message preview
- Copy and export functionality

## Message Personalization

The system personalizes messages based on traits extracted from the input:

### Trait Format

- Traits should be entered as: `trait1 / trait2`
- Example: `works at (ig/mindmusclesg) / traveling with fam`

### Special Formats Supported

- Instagram handles: `(ig/mindmusclesg)`, `(ig: handle)`, `(ig @handle)`
- TikTok handles: `(tt/ @handle)`
- Websites: `(website.com)`

### Singlish Tone Levels

- **Level 0**: Standard English (no Singlish)
- **Level 2**: Only BTW section uses Singlish
- **Level 3**: BTW and PS sections use Singlish
- **Level 4**: Full Singlish (except services section)

## Message Templates

### Company Account Template

```
Hey [name], Jet here btw, I saw that you were following a couple gym accounts, keep it up in the gym btw : )  

BTW, [personalized first trait message] 👍 

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

PS: [personalized second trait message] : )
```

### Normal Follow-up Template

```
Hey [name], Bob here, i'm not too sure if my friend Jet has reached out to you yet, @_muscle.baby_
but we are hosting a free training project trial, and 5 people can join us for free : )

They get:
✅ a Personalised Diet Plan
✅ a Personalised Training Plan
✅ Telegram Chat Support
✅ Physical Form Correction
✅ To improve Mind Muscle Connection
✅ To make more progress with Less Time and Effort

To push them in the right direction this year 💪🏻
Would you be opposed to taking a slot for yourself?

PS: [personalized second trait message] : )
```

## Trait Categories

The system recognizes and personalizes messages for various trait categories:

1. **Fitness & Sports**: fitness, bodybuilding, powerlifting, swimming, etc.
2. **Professional/Work**: works at (company), business owner, engineer, doctor, etc.
3. **Education/Military**: studied at SMU/NUS/NTU, student, army, etc.
4. **Fashion/Style**: stylish jacket, cool polo, nice watch, etc.
5. **Lifestyle/Personal**: traveling, foodie, adventure, photography, etc.
6. **Family/Relationships**: has gf, has wife, has kids, etc.

## Test Examples

Visit the Test Examples page to see sample messages generated with real client data.

## Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- React
- TypeScript
- Bootstrap
- React Router 