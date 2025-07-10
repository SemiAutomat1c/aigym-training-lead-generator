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
  
  // Use the new template generator
  const parsedInput = `${name}\n${interests}`;
  const { name: parsedName, traits } = parseInputForTemplate(parsedInput);
  
  return generateTemplateMessage(parsedName, traits, tone);
};

const getFollowUpMessage = (leadInfo: LeadInfo, tone: string): string => {
  const { name } = leadInfo;
  
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
  message += `P.S. How's your gym progress going? : )`;

  // Apply Singlish based on tone level
  if (tone === 'level2') {
    // Only BTW phrase is Singlish (no BTW in follow-up template)
    // No changes needed
  } else if (tone === 'level3') {
    // PS part is Singlish
    message = message.replace("P.S. How's your gym progress going?", "P.S. How's your gym progress ah?")
                    .replace('Would you be opposed to taking a slot for yourself?', 'Want to take one slot or not?');
  } else if (tone === 'level4') {
    // Full Singlish except services offered
    message = message.replace('Bob here,', 'Bob here lah,')
                    .replace("i'm not too sure if", 'not sure if')
                    .replace('but we are hosting', 'but we got')
                    .replace('can join us', 'can join with us')
                    .replace('To push them in the right direction this year', 'Help them level up this year')
                    .replace('Would you be opposed to taking a slot for yourself?', 'Want to take one slot or not?')
                    .replace("P.S. How's your gym progress going?", "P.S. How's your gym progress ah?");
  }

  return message;
}; 