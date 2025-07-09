import axios from 'axios';

interface LeadInfo {
  name: string;
  company: string;
  industry: string;
  position: string;
  painPoints: string;
  additionalInfo: string;
  interests?: string; // Added for gym template
  location?: string; // Added for location targeting
}

interface MessageRequest {
  leadInfo: LeadInfo;
  messageType: string;
  tone: string;
  template: string;
}

// This is a mock implementation for demo purposes
// In a real application, you would make an API call to your backend or directly to an AI service
export const generateMessage = async (request: MessageRequest): Promise<string> => {
  // For demo purposes, we'll simulate an API call with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      const { leadInfo, messageType, tone, template } = request;
      
      // Generate a personalized message based on the input
      let message = '';
      
      // Special case for gym training templates
      if (template === 'Gym Training Offer') {
        message = getGymTrainingMessage(leadInfo, tone);
        resolve(message);
        return;
      } else if (template === 'TikTok Gym Training Offer') {
        message = getTikTokGymTrainingMessage(leadInfo, tone);
        resolve(message);
        return;
      }
      
      // Add appropriate greeting based on message type
      if (messageType === 'email') {
        message += `Subject: ${getSubjectLine(leadInfo, template)}\n\n`;
        message += `Dear ${leadInfo.name},\n\n`;
      } else if (messageType === 'linkedin') {
        message += `Hi ${leadInfo.name},\n\n`;
      } else if (messageType === 'instagram') {
        message += `Hey ${leadInfo.name}, `;
      } else if (messageType === 'tiktok') {
        message += `@${leadInfo.name} `;
      }
      
      // Add personalized content based on template
      message += getTemplateContent(leadInfo, tone, template);
      
      // Add appropriate closing
      message += '\n\n';
      if (tone === 'formal') {
        message += 'Sincerely,\n[Your Name]\n[Your Position]\n[Your Company]';
      } else if (tone === 'professional') {
        message += 'Best regards,\n[Your Name]\n[Your Position]\n[Your Company]';
      } else {
        message += 'Thanks,\n[Your Name]\n[Your Company]';
      }
      
      resolve(message);
    }, 1500); // Simulate API delay
  });
};

// Special function for gym training template
const getGymTrainingMessage = (leadInfo: LeadInfo, tone: string): string => {
  const { name, interests } = leadInfo;
  
  // Use the exact template provided by the client
  let message = `Hey ${name}, saw that you were following a couple gym accounts, keep it up in the gym! 🙂\n`;
  
  if (interests && interests.trim()) {
    // Handle interests more intelligently for better grammar
    const interestsList = interests.split(',').map(i => i.trim());
    
    if (interestsList.length === 1) {
      // Single interest
      const interest = interestsList[0].toLowerCase();
      
      // Function to determine if a word should use "an" instead of "a"
      const shouldUseAn = (word: string): boolean => {
        // Words starting with vowel sounds use "an"
        return /^[aeiou]/i.test(word) || 
               // Special cases like "hour" that start with silent 'h'
               /^hour/i.test(word) || 
               /^honest/i.test(word);
      };
      
      // Check if it's a profession/role or an activity
      if (/er$|or$|ist$|ian$|eur$|ant$|ent$|ive$/.test(interest)) {
        // Profession/role like "developer", "musician", "entrepreneur"
        const article = shouldUseAn(interest) ? "an" : "a";
        message += `BTW, saw that you're ${article} ${interest}, wah big respect to you bro. Keep it up! haha 👍\n\n`;
      } else if (/ing$/.test(interest)) {
        // Activity ending in -ing like "swimming", "coding"
        message += `BTW, saw that you enjoy ${interest}, wah big respect to you bro. Keep it up! haha 👍\n\n`;
      } else {
        // Regular interest/activity
        message += `BTW, saw that you're into ${interest}, wah big respect to you bro. Keep it up! haha 👍\n\n`;
      }
    } else {
      // Multiple interests
      message += `BTW, saw that you're into ${interestsList.join(' and ')}, wah big respect to you bro. Keep it up! haha 👍\n\n`;
    }
  } else {
    message += `BTW, love your profile, keep it up! haha 👍\n\n`;
  }
  
  message += `I am currently looking for 5 people can join my free training project trial!\n\n`;
  
  message += `They get:\n`;
  message += `✅ a Personalised Diet Plan\n`;
  message += `✅ a Personalised Training Plan\n`;
  message += `✅ Telegram Chat Support\n`;
  message += `✅ Physical Form Correction\n`;
  message += `✅ To improve Mind Muscle Connection\n`;
  message += `✅ To make more progress with Less Time and Effort\n\n`;
  
  message += `To push them in the right direction this year 💪🏻\n`;
  message += `Do you know anyone who may be interested? 🙂\n\n`;
  
  message += `PS: How's your gym progress going? 🙂`;
  
  // Adjust for Singaporean English if requested
  if (tone === 'singaporean') {
    message = message
      .replace('saw that you were following', 'saw you following')
      .replace('keep it up in the gym!', 'keep it up in the gym ah!')
      .replace('wah big respect to you bro', 'wah very power lah, respect')
      .replace('I am currently looking for', 'I currently looking for')
      .replace('who may be interested?', 'who might want? Can intro or not?')
      .replace('How\'s your gym progress going?', 'How\'s your gym progress? Going well or not?');
  }
  
  return message;
};

// Special function for TikTok gym training template
const getTikTokGymTrainingMessage = (leadInfo: LeadInfo, tone: string): string => {
  const { name, interests } = leadInfo;
  
  // Create a shorter, more engaging TikTok-style message
  let message = `@${name} Noticed you're into fitness! 💪\n\n`;
  
  if (interests && interests.trim()) {
    // Handle interests more intelligently for better grammar
    const interestsList = interests.split(',').map(i => i.trim());
    
    if (interestsList.length === 1) {
      // Single interest
      const interest = interestsList[0].toLowerCase();
      
      // Function to determine if a word should use "an" instead of "a"
      const shouldUseAn = (word: string): boolean => {
        // Words starting with vowel sounds use "an"
        return /^[aeiou]/i.test(word) || 
               // Special cases like "hour" that start with silent 'h'
               /^hour/i.test(word) || 
               /^honest/i.test(word);
      };
      
      // Check if it's a profession/role or an activity
      if (/er$|or$|ist$|ian$|eur$|ant$|ent$|ive$/.test(interest)) {
        // Profession/role like "developer", "musician", "entrepreneur"
        const article = shouldUseAn(interest) ? "an" : "a";
        message += `Love that you're ${article} ${interest}! #respect #${interest.replace(/\s+/g, '')}\n\n`;
      } else if (/ing$/.test(interest)) {
        // Activity ending in -ing like "swimming", "coding"
        message += `Love that you enjoy ${interest}! #respect #${interest.replace(/\s+/g, '')}\n\n`;
      } else {
        // Regular interest/activity
        message += `Love that you're into ${interest}! #respect #${interest.replace(/\s+/g, '')}\n\n`;
      }
    } else {
      // Multiple interests
      message += `Love your interests in ${interestsList.join(' and ')}! #respect #${interestsList[0].replace(/\s+/g, '')}\n\n`;
    }
  }
  
  message += `🔥 FREE TRAINING OFFER 🔥\n`;
  message += `Looking for 5 people to join my training program!\n\n`;
  
  message += `You'll get:\n`;
  message += `✅ Custom Diet Plan\n`;
  message += `✅ Personalized Workouts\n`;
  message += `✅ 24/7 Support\n`;
  message += `✅ Form Correction\n\n`;
  
  message += `DM me "TRAIN" to claim your spot! Limited time offer! ⏰\n\n`;
  
  message += `#fitnessjourney #personaltrainer #${leadInfo.location?.toLowerCase() || 'singapore'} #transformation`;
  
  // Adjust tone if needed
  if (tone === 'casual') {
    message = message.replace('Noticed you\'re into fitness!', 'Love your fitness content!');
    message = message.replace('Looking for 5 people', 'Need 5 motivated people');
  } else if (tone === 'singaporean') {
    message = message.replace('Noticed you\'re into fitness!', 'Wah your fitness content damn power!');
    message = message.replace('Looking for 5 people', 'Finding 5 people only');
    message = message.replace('DM me "TRAIN" to claim your spot!', 'DM me "TRAIN" to chope your spot!');
  }
  
  return message;
};

// Helper function to generate a subject line
const getSubjectLine = (leadInfo: LeadInfo, template: string): string => {
  switch (template) {
    case 'Cold Email':
      return `Helping ${leadInfo.company} improve ${leadInfo.industry} outcomes`;
    case 'Follow-up Email':
      return `Following up on our previous conversation - ${leadInfo.company}`;
    case 'Meeting Request':
      return `Request for a quick call - ${leadInfo.company} and [Your Company]`;
    case 'Value Proposition':
      return `Specific value for ${leadInfo.company} in ${leadInfo.industry}`;
    default:
      return `Connecting with ${leadInfo.company}`;
  }
};

// Helper function to generate content based on template
const getTemplateContent = (leadInfo: LeadInfo, tone: string, template: string): string => {
  // In a real implementation, this would call an AI service like OpenAI
  // For demo purposes, we'll use template strings
  
  let content = '';
  
  switch (template) {
    case 'Cold Email':
      content = `I hope this message finds you well. I noticed that ${leadInfo.company} is making significant strides in the ${leadInfo.industry} industry.

Based on your role as ${leadInfo.position}, I thought you might be interested in how we've helped similar companies overcome challenges related to ${leadInfo.painPoints || 'efficiency and growth'}.

Our solution has specifically helped companies in the ${leadInfo.industry} industry to improve their outcomes by addressing these exact pain points.

${leadInfo.additionalInfo ? `I also noticed that ${leadInfo.additionalInfo}. This is an area where our solution could provide particular value.` : ''}

Would you be open to a brief conversation to explore how we might be able to help ${leadInfo.company} achieve similar results?`;
      break;
      
    case 'Follow-up Email':
      content = `I wanted to follow up on my previous message about how we might be able to help ${leadInfo.company} with ${leadInfo.painPoints || 'your industry challenges'}.

I understand that as ${leadInfo.position}, you're likely focused on driving results in these areas. Many of our clients in the ${leadInfo.industry} industry have faced similar challenges and have seen significant improvements after implementing our solution.

${leadInfo.additionalInfo ? `Regarding ${leadInfo.additionalInfo}, I'd be happy to share some specific insights on how our approach could address this.` : ''}

I'm available for a quick call this week if you'd like to discuss this further.`;
      break;
      
    case 'LinkedIn Connection':
      content = `I came across your profile and was impressed by your work at ${leadInfo.company} in the ${leadInfo.industry} industry.

As someone who works with ${leadInfo.position}s to help address challenges like ${leadInfo.painPoints || 'industry-specific challenges'}, I thought connecting could be mutually beneficial.

${leadInfo.additionalInfo ? `I noticed that ${leadInfo.additionalInfo}, and I have some insights that might be valuable.` : ''}

I look forward to connecting!`;
      break;
      
    case 'LinkedIn InMail':
      content = `I hope you don't mind me reaching out directly. I've been following ${leadInfo.company}'s progress in the ${leadInfo.industry} space and have been impressed with what I've seen.

In your role as ${leadInfo.position}, I imagine you might be dealing with challenges related to ${leadInfo.painPoints || 'typical industry challenges'}. Our company specializes in helping businesses like yours overcome these exact issues.

${leadInfo.additionalInfo ? `I also noticed that ${leadInfo.additionalInfo}, which is an area where we've developed specific expertise.` : ''}

Would you be open to a brief conversation to explore potential synergies?`;
      break;
      
    case 'Meeting Request':
      content = `I'd like to request a brief 15-minute call to discuss how we might be able to help ${leadInfo.company} address challenges related to ${leadInfo.painPoints || 'your industry-specific needs'}.

We've worked with several companies in the ${leadInfo.industry} industry, and I believe our insights could be valuable given your role as ${leadInfo.position}.

${leadInfo.additionalInfo ? `I'm particularly interested in discussing ${leadInfo.additionalInfo}, as this aligns with our area of expertise.` : ''}

Would any of these times work for you?
- Tuesday at 10:00 AM
- Wednesday at 2:00 PM
- Thursday at 11:30 AM`;
      break;
      
    case 'Value Proposition':
      content = `I wanted to share specifically how our solution could create value for ${leadInfo.company} in the ${leadInfo.industry} industry.

For companies with challenges similar to ${leadInfo.painPoints || 'typical industry challenges'}, we've been able to deliver:

1. 20% improvement in operational efficiency
2. 15% reduction in costs
3. 30% increase in customer satisfaction

As ${leadInfo.position}, I imagine these outcomes would align with your priorities.

${leadInfo.additionalInfo ? `Additionally, regarding ${leadInfo.additionalInfo}, we have a specialized approach that has yielded exceptional results for similar companies.` : ''}

I'd welcome the opportunity to discuss how we could achieve similar results for ${leadInfo.company}.`;
      break;
      
    default:
      content = `I'm reaching out regarding ${leadInfo.company} and your role as ${leadInfo.position} in the ${leadInfo.industry} industry.

I believe we might be able to help with challenges related to ${leadInfo.painPoints || 'your specific needs'}.

${leadInfo.additionalInfo ? `I also wanted to mention that ${leadInfo.additionalInfo}, which is something we could potentially help with.` : ''}

Would you be interested in learning more?`;
  }
  
  // Adjust tone if needed
  if (tone === 'friendly') {
    content = content.replace('I hope this message finds you well.', 'Hope you\'re having a great week!');
    content = content.replace('would you be open to', 'would you be up for');
  } else if (tone === 'formal') {
    content = content.replace('I hope this message finds you well.', 'I trust this message finds you well.');
    content = content.replace('help you', 'assist you');
  } else if (tone === 'persuasive') {
    content = content.replace('I believe we might be able to help', 'We have a proven track record of helping');
    content = content.replace('would you be interested', 'you won\'t want to miss this opportunity');
  } else if (tone === 'singaporean') {
    content = content.replace('I hope this message finds you well.', 'Hope you doing well ah!');
    content = content.replace('would you be open to', 'can or not we have');
    content = content.replace('I believe', 'I think');
    content = content.replace('Would you be interested', 'You interested or not');
  }
  
  return content;
};

// In a real implementation, you would integrate with an AI API like OpenAI
// Here's how you might implement it:
/*
export const generateMessageWithAI = async (request: MessageRequest): Promise<string> => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert in crafting personalized outreach messages for lead generation. 
                     Create a ${request.tone} ${request.messageType} message using the ${request.template} template.`
          },
          {
            role: 'user',
            content: `Generate a personalized ${request.messageType} message for a lead with the following information:
                     Name: ${request.leadInfo.name}
                     Company: ${request.leadInfo.company}
                     Industry: ${request.leadInfo.industry}
                     Position: ${request.leadInfo.position}
                     Pain Points: ${request.leadInfo.painPoints}
                     Additional Info: ${request.leadInfo.additionalInfo}
                     
                     The message should be in a ${request.tone} tone and follow the ${request.template} template.`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to generate message with AI');
  }
};
*/ 