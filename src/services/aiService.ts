import { generateTemplateMessage, parseInputForTemplate } from './messageTemplates';

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

/**
 * Helper function to add appropriate emoji to PS line based on content
 */
const addAppropriateEmoji = (psLine: string): string => {
  let emoji = '';
  
  // Add appropriate emoji based on content
  if (psLine.includes('sunglasses') || psLine.includes('shades')) {
    emoji = ' 😎';
  } else if (psLine.includes('jacket') || psLine.includes('fire')) {
    emoji = ' 🔥';
  } else if (psLine.includes('beanie') || psLine.includes('sweater') || psLine.includes('cozy')) {
    emoji = ' 🧣';
  } else if (psLine.includes('watch')) {
    emoji = ' ⌚';
  } else if (psLine.includes('cap')) {
    emoji = ' 🧢';
  } else if (psLine.includes('glasses') && !psLine.includes('sun')) {
    emoji = ' 👓';
  } else if (psLine.includes('beard') || psLine.includes('haircut') || psLine.includes('barber')) {
    emoji = ' ✂️';
  } else if (psLine.includes('puffer')) {
    emoji = ' 🧥';
  } else if (psLine.includes('magic')) {
    emoji = ' ✨';
  }
  
  return psLine + emoji;
};

export const generateMessage = async (request: MessageRequest): Promise<string> => {
  const { leadInfo, tone, template } = request;
      let message = '';
      
  // Match template to the appropriate function
  if (template === 'company' || template === 'max') {
    message = getCompanyMessage(leadInfo, tone, 'Max', '@max_apolloss');
  } else if (template === 'followup' || template === 'bob') {
    message = getFollowUpMessage(leadInfo, tone, 'Bob', 'Max', '@max_apolloss');
  } else if (template === 'matthew') {
    message = getFollowUpMessage(leadInfo, tone, 'Matthew', 'Max', '@max_apolloss');
  }

  return message;
};

const getCompanyMessage = (leadInfo: LeadInfo, tone: string, sender: string = 'Max', senderHandle: string = '@max_apolloss'): string => {
  const { name, interests } = leadInfo;
  
  // Pass the raw input to the template parser to preserve parentheses content
  const parsedInput = `${name}\n${interests || ''}`;
  const { name: parsedName, traits } = parseInputForTemplate(parsedInput);
  
  return generateTemplateMessage(parsedName, traits, tone, sender, senderHandle);
};

const getFollowUpMessage = (leadInfo: LeadInfo, tone: string, sender: string = 'Bob', referrer: string = 'Max', referrerHandle: string = '@max_apolloss'): string => {
  const { name, interests } = leadInfo;
  
  // Parse interests for personalization in follow-up message
  // Preserve parentheses content for proper parsing
  const parsedInput = `${name}\n${interests || ''}`;
  const { traits } = parseInputForTemplate(parsedInput);
  
  // Base message template
  let message = `Hey ${name}, ${sender} here, i'm not too sure if my friend ${referrer} has reached out to you yet, ${referrerHandle}\n`;
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
  
  // Generate personalized PS based on interests if available
  let psMessage = "How's your gym progress going";
  if (interests && interests.trim()) {
    // Use the second trait for PS personalization if available
    if (traits.secondTrait && traits.secondTrait.trim()) {
      const { generateSecondTraitMessage, applyToneModifiers } = require('./messageTemplates');
      let personalizedPs = generateSecondTraitMessage(traits.secondTrait);
      
      // Add appropriate emoji based on content
      personalizedPs = addAppropriateEmoji(personalizedPs);
      
      // Apply tone modifiers to PS section
      if (tone === 'level3' || tone === 'level4') {
        personalizedPs = applyToneModifiers(personalizedPs, 'ps', tone);
      }
      
      // Format PS with italics
      psMessage = `*${personalizedPs}?*`;
    }
  } else {
    // Default PS with italics
    psMessage = `*How's your gym progress going?*`;
  }
  
  message += `PS: ${psMessage} : )`;

  // Apply Singlish based on tone level
  if (tone === 'level2') {
    // Only BTW phrase is Singlish (no BTW in follow-up template)
    // No changes needed
  } else if (tone === 'level3') {
    // PS part is Singlish (already handled above)
    message = message.replace('Would you be opposed to taking a slot for yourself?', 'Want to take one slot or not?');
  } else if (tone === 'level4') {
    // Full Singlish except services offered
    message = message.replace(`${sender} here,`, `${sender} here lah,`)
                    .replace("i'm not too sure if", 'not sure if')
                    .replace('but we are hosting', 'but we got')
                    .replace('can join us', 'can join with us')
                    .replace('To push them in the right direction this year', 'Help them level up this year')
                    .replace('Would you be opposed to taking a slot for yourself?', 'Want to take one slot or not?');
  }

  return message;
}; 