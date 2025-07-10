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
    let personalizedBTW = getPersonalizedBTWMessage(firstTrait);
    message += `BTW, ${personalizedBTW}\n\n`;
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
    let personalizedPS = getPersonalizedPSMessage(secondTrait);
    message += `PS: ${personalizedPS}`;
  } else {
    message += `PS: How's your gym progress going? : )`;
  }
  
  // Apply Singlish based on tone level
  if (tone === 'level2') {
    // Only BTW phrase is Singlish
    message = message.replace('BTW,', 'Eh sia,')
                    .replace(/love it haha|power lah! Keep it up!|that's cool sia!/g, 'sibei nice leh')
                    .replace('👍', 'sia 👍');
  } else if (tone === 'level3') {
    // BTW and PS parts are Singlish
    message = message.replace('BTW,', 'Eh sia,')
                    .replace(/love it haha|power lah! Keep it up!|that's cool sia!/g, 'sibei nice leh')
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
                    .replace(/love it haha|power lah! Keep it up!|that's cool sia!/g, 'sibei nice leh')
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

// Helper function to generate personalized BTW message based on first trait
const getPersonalizedBTWMessage = (trait: string): string => {
  trait = trait.toLowerCase();
  
  // Work-related traits
  if (trait.includes('work') || trait.includes('job') || trait.includes('career') || trait.includes('at ')) {
    return `saw that you ${trait}, that's awesome! Keep up the great work! 👍`;
  }
  
  // Profession-related traits
  if (trait.includes('teacher') || trait.includes('professor')) {
    return `noticed you're a ${trait}, must be rewarding shaping young minds! 👍`;
  }
  
  if (trait.includes('engineer')) {
    return `saw you're an ${trait}, that's impressive! 👍`;
  }
  
  if (trait.includes('designer') || trait.includes('design')) {
    return `noticed you're into ${trait}, your creative eye must be useful in other areas too! 👍`;
  }
  
  if (trait.includes('agent') || trait.includes('estate')) {
    return `saw you're a ${trait}, must be exciting helping people find their dream homes! 👍`;
  }
  
  if (trait.includes('health') || trait.includes('doctor') || trait.includes('nurse')) {
    return `noticed you work in ${trait}, respect for the important work you do! 👍`;
  }
  
  // Education-related traits
  if (trait.includes('stud') || trait.includes('law') || trait.includes('smu') || trait.includes('university')) {
    return `saw that you ${trait}, that's impressive! Keep crushing those studies! 👍`;
  }
  
  // Fitness-related traits
  if (trait.includes('fitness') || trait.includes('gym') || trait.includes('workout')) {
    return `noticed you're into ${trait}, love seeing the dedication! 👍`;
  }
  
  if (trait.includes('swimming') || trait.includes('athlete')) {
    return `saw you're into ${trait}, that's awesome! Great for overall fitness! 👍`;
  }
  
  // Style-related traits
  if (trait.includes('jacket') || trait.includes('shirt') || trait.includes('tshirt') || trait.includes('beanie') || trait.includes('cap') || trait.includes('coat')) {
    return `noticed your ${trait}, looking good! 👍`;
  }
  
  if (trait.includes('stylish') || trait.includes('style') || trait.includes('fashion')) {
    return `saw your ${trait}, great taste! 👍`;
  }
  
  if (trait.includes('hair') || trait.includes('unique')) {
    return `noticed your ${trait}, looks great! 👍`;
  }
  
  // Hobby-related traits
  if (trait.includes('photography') || trait.includes('photo')) {
    return `saw you're into ${trait}, you must have a great eye for detail! 👍`;
  }
  
  if (trait.includes('travel')) {
    return `noticed you're into ${trait}, always great to explore new places! 👍`;
  }
  
  if (trait.includes('adventure')) {
    return `saw you love ${trait}, that adventurous spirit is awesome! 👍`;
  }
  
  if (trait.includes('food') || trait.includes('foodie')) {
    return `noticed you're a ${trait}, good food is one of life's best pleasures! 👍`;
  }
  
  if (trait.includes('magic') || trait.includes('magician')) {
    return `saw you're ${trait.includes('a') ? '' : 'a '}${trait}, that's so cool! 👍`;
  }
  
  if (trait.includes('muay thai') || trait.includes('martial art')) {
    return `noticed you do ${trait}, that's awesome! Great for fitness and discipline! 👍`;
  }
  
  if (trait.includes('fire') || trait.includes('rescue')) {
    return `saw you work in ${trait}, much respect for what you do! 👍`;
  }
  
  if (trait.includes('car') || trait.includes('vehicle')) {
    return `noticed your awesome ${trait}, that's a sweet ride! 👍`;
  }
  
  // Default response if no specific pattern matches
  return `${trait} love it haha 👍`;
};

// Helper function to generate personalized PS message based on second trait
const getPersonalizedPSMessage = (trait: string): string => {
  trait = trait.toLowerCase();
  
  // Travel-related traits
  if (trait.includes('travel')) {
    if (trait.includes('fam')) {
      return `How was the travel with family? : )`;
    }
    return `How were your travels recently? : )`;
  }
  
  // Fitness-related traits
  if (trait.includes('fitness') || trait.includes('gym') || trait.includes('workout')) {
    return `How's your fitness journey going? : )`;
  }
  
  // Photography-related traits
  if (trait.includes('photography') || trait.includes('photo')) {
    return `Captured any great shots recently? : )`;
  }
  
  // Style-related traits
  if (trait.includes('jacket') || trait.includes('shirt') || trait.includes('tshirt') || trait.includes('beanie') || trait.includes('cap') || trait.includes('coat')) {
    return `Where did you get that awesome ${trait}? : )`;
  }
  
  // Adventure-related traits
  if (trait.includes('adventure')) {
    if (trait.includes('wife') || trait.includes('spouse') || trait.includes('partner')) {
      return `How are the adventures with your ${trait.includes('wife') ? 'wife' : 'partner'} going? : )`;
    }
    return `What's your next adventure? : )`;
  }
  
  // Work-related traits
  if (trait.includes('work') || trait.includes('job') || trait.includes('career') || trait.includes('at ')) {
    return `How's work going? : )`;
  }
  
  // Default response if no specific pattern matches
  return `How's your gym progress going? : )`;
};

const getFollowUpMessage = (leadInfo: LeadInfo, tone: string): string => {
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
    let personalizedPS = getPersonalizedPSMessage(secondTrait);
    message += `P.S. ${personalizedPS}`;
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