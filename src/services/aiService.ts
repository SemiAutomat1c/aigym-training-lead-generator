import axios from 'axios';

interface LeadInfo {
  name: string;
  interests?: string;
  company?: string;
  industry?: string;
  position?: string;
  painPoints?: string;
  additionalInfo?: string;
  location?: string;
}

interface MessageRequest {
  leadInfo: LeadInfo;
  messageType: string;
  tone: string;
  template: string;
}

export const generateMessage = async (request: MessageRequest): Promise<string> => {
  const { leadInfo, tone, template } = request;
  let message = '';
      
  if (template === 'company') {
    message = getCompanyMessage(leadInfo, tone);
  } else if (template === 'followup') {
    message = getFollowUpMessage(leadInfo, tone);
  }

  return message;
};

const getCompanyMessage = (leadInfo: LeadInfo, tone: string): string => {
  const { name, interests } = leadInfo;
  
  // Parse interests to get first and second trait
  let firstTrait = '';
  let secondTrait = '';
  
  if (interests && interests.trim()) {
    const traitParts = interests.split('/').map(part => part.trim());
    firstTrait = traitParts[0] || '';
    secondTrait = traitParts[1] || '';
  }
  
  // Base message template
  let message = `Hey ${name}, Jet here btw, I saw that you were following a couple gym accounts, keep it up in the gym btw : )  \n\n`;
  
  // Add personalized message based on first trait
  if (firstTrait) {
    message += `BTW, ${getPersonalizedBTW(firstTrait)}\n\n`;
  }
  
  // Add the standard offer section
  message += `I am currently looking for 5 people can join my free training project trial!\n\n`;
  message += `They get:\n`;
  message += `✅ a Personalised Diet Plan\n`;
  message += `✅ a Personalised Training Plan\n`;
  message += `✅ Telegram Chat Support\n`;
  message += `✅ Physical Form Correction\n`;
  message += `✅ To improve Mind Muscle Connection\n`;
  message += `✅ To make more progress with Less Time and Effort\n\n`;
  message += `To push them in the right direction this year 💪🏻\n`;
  message += `Do you know anyone who may be interested?\n\n`;
  
  // Add personalized PS based on second trait
  if (secondTrait) {
    message += `PS: ${getPersonalizedPS(secondTrait)}`;
  } else {
    message += `PS: How's your gym progress going? : )`;
  }
  
  // Apply Singlish based on tone level
  if (tone === 'level2') {
    // Only BTW phrase is Singlish
    message = message.replace('BTW,', 'Eh sia,')
                    .replace('love it haha', 'sibei nice leh')
                    .replace('👍', 'sia 👍');
  } else if (tone === 'level3') {
    // BTW and PS parts are Singlish
    message = message.replace('BTW,', 'Eh sia,')
                    .replace('love it haha', 'sibei nice leh')
                    .replace('👍', 'sia 👍')
                    .replace(/PS: How's your gym progress going\?/g, "PS: How's your gym progress ah?")
                    .replace(/PS: How's (.+?) going\?/g, "PS: How's $1 going ah?")
                    .replace(/PS: (.+?)\?/g, "PS: $1 ah?")
                    .replace('Do you know anyone who may be interested?', 'Got anyone interested or not?');
  } else if (tone === 'level4') {
    // Full Singlish except services offered
    message = message.replace('Jet here btw,', 'Jet here lah,')
                    .replace('keep it up in the gym btw : )', 'keep it up in the gym ah! : )')
                    .replace('BTW,', 'Eh sia,')
                    .replace('love it haha', 'sibei nice leh')
                    .replace('👍', 'sia 👍')
                    .replace('I am currently looking for', 'I currently looking for')
                    .replace('can join', 'can join in')
                    .replace('To push them in the right direction this year', 'Help them level up this year')
                    .replace('Do you know anyone who may be interested?', 'Got anyone interested or not?')
                    .replace(/PS: How's your gym progress going\?/g, "PS: How's your gym progress ah?")
                    .replace(/PS: How's (.+?) going\?/g, "PS: How's $1 going ah?")
                    .replace(/PS: (.+?)\?/g, "PS: $1 ah?");
  }
  
  return message;
};

// Simplified personalized BTW message function
function getPersonalizedBTW(trait: string): string {
  trait = trait.toLowerCase();
  
  // Work/profession related
  if (trait.includes('work') || trait.includes('job') || trait.includes('at ')) {
    return `saw that you ${trait}, that's awesome! 👍`;
  }
  
  // Education
  if (trait.includes('stud') || trait.includes('law') || trait.includes('university') || trait.includes('smu')) {
    return `saw that you ${trait}, that's impressive! 👍`;
  }
  
  // Fitness
  if (trait.includes('fitness') || trait.includes('gym') || trait.includes('workout') || 
      trait.includes('swimming') || trait.includes('athlete')) {
    return `noticed you're into ${trait}, love seeing the dedication! 👍`;
  }
  
  // Style
  if (trait.includes('jacket') || trait.includes('shirt') || trait.includes('tshirt') || 
      trait.includes('style') || trait.includes('fashion') || trait.includes('hair') || 
      trait.includes('cap') || trait.includes('coat') || trait.includes('beanie')) {
    return `noticed your ${trait}, looking good! 👍`;
  }
  
  // Hobbies
  if (trait.includes('photography') || trait.includes('photo')) {
    return `saw you're into ${trait}, you must have a great eye! 👍`;
  }
  
  if (trait.includes('travel')) {
    return `noticed you're into ${trait}, always great to explore! 👍`;
  }
  
  if (trait.includes('adventure')) {
    return `saw you love ${trait}, that adventurous spirit is awesome! 👍`;
  }
  
  if (trait.includes('food') || trait.includes('foodie')) {
    return `noticed you're a ${trait}, good food is one of life's best pleasures! 👍`;
  }
  
  // Default
  return `${trait} love it haha 👍`;
}

// Simplified personalized PS message function
function getPersonalizedPS(trait: string): string {
  trait = trait.toLowerCase();
  
  if (trait.includes('travel')) {
    return `How were your travels recently? : )`;
  }
  
  if (trait.includes('fitness') || trait.includes('gym') || trait.includes('workout')) {
    return `How's your fitness journey going? : )`;
  }
  
  if (trait.includes('photography') || trait.includes('photo')) {
    return `Captured any great shots recently? : )`;
  }
  
  if (trait.includes('jacket') || trait.includes('shirt') || trait.includes('style')) {
    return `Where did you get that awesome style? : )`;
  }
  
  if (trait.includes('adventure')) {
    return `What's your next adventure? : )`;
  }
  
  // Default
  return `How's your gym progress going? : )`;
}

const getFollowUpMessage = (leadInfo: LeadInfo, tone: string): string => {
  const { name, interests } = leadInfo;
  
  // Parse interests to get second trait
  let secondTrait = '';
  
  if (interests && interests.trim()) {
    const traitParts = interests.split('/').map(part => part.trim());
    secondTrait = traitParts[1] || '';
  }

  // Base message template
  let message = `Hey ${name}, Bob here, i'm not too sure if my friend Jet has reached out to you yet, @_muscle.baby_\n`;
  message += `but we are hosting a free training project trial, and 5 people can join us for free : )\n\n`;
  message += `They get:\n`;
  message += `✅ a Personalised Diet Plan\n`;
  message += `✅ a Personalised Training Plan\n`;
  message += `✅ Telegram Chat Support\n`;
  message += `✅ Physical Form Correction\n`;
  message += `✅ To improve Mind Muscle Connection\n`;
  message += `✅ To make more progress with Less Time and Effort\n\n`;
  message += `To push them in the right direction this year 💪🏻\n`;
  message += `Would you be opposed to taking a slot for yourself?\n\n`;
  
  // Add personalized PS based on second trait
  if (secondTrait) {
    message += `P.S. ${getPersonalizedPS(secondTrait)}`;
  } else {
    message += `P.S. How's your gym progress going? : )`;
  }

  // Apply Singlish based on tone level
  if (tone === 'level2') {
    // Only BTW phrase is Singlish (no BTW in follow-up template)
    message = message;
  } else if (tone === 'level3') {
    // PS part is Singlish
    message = message.replace(/P.S. How's your gym progress going\?/g, "P.S. How's your gym progress ah?")
                    .replace(/P.S. How's (.+?) going\?/g, "P.S. How's $1 going ah?")
                    .replace(/P.S. (.+?)\?/g, "P.S. $1 ah?")
                    .replace('Would you be opposed to taking a slot for yourself?', 'Want to take one slot or not?');
  } else if (tone === 'level4') {
    // Full Singlish except services offered
    message = message.replace('Bob here,', 'Bob here lah,')
                    .replace("i'm not too sure if", 'not sure if')
                    .replace('but we are hosting', 'but we got')
                    .replace('can join us', 'can join with us')
                    .replace('To push them in the right direction this year', 'Help them level up this year')
                    .replace('Would you be opposed to taking a slot for yourself?', 'Want to take one slot or not?')
                    .replace(/P.S. How's your gym progress going\?/g, "P.S. How's your gym progress ah?")
                    .replace(/P.S. How's (.+?) going\?/g, "P.S. How's $1 going ah?")
                    .replace(/P.S. (.+?)\?/g, "P.S. $1 ah?");
  }

  return message;
}; 