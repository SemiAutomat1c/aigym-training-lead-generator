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
  const { name, interests, additionalInfo } = leadInfo;
  
  // Use the exact template provided by the client
  let message = `Hey ${name}, I saw that you were following a couple gym accounts, keep it up in the gym btw : )  \n`;
  
  if (interests && interests.trim()) {
    // Handle interests more intelligently for better grammar
    // Split by "/" to handle multiple interests
    const interestsList = interests.split('/').map(i => i.trim());
    
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
      
      // Generate personalized message based on interest type
      // This ensures each message is uniquely handcrafted for the recipient
      if (/er$|or$|ist$|ian$|eur$|ant$|ent$|ive$/.test(interest)) {
        // Profession/role like "developer", "musician", "entrepreneur"
        const article = shouldUseAn(interest) ? "an" : "a";
        
        // Create variations for different professions to make each message unique
        if (/music|sing|guitar|piano|band|dj/i.test(interest)) {
          message += `BTW, saw that you're ${article} ${interest}, wah big respect to you bro. Your creative talent must be amazing! Keep it up! haha 👍\n\n`;
        } else if (/develop|program|code|tech|engineer|software/i.test(interest)) {
          message += `BTW, saw that you're ${article} ${interest}, wah big respect to you bro. Tech skills very impressive! Keep it up! haha 👍\n\n`;
        } else if (/teach|educat|professor|tutor|instructor/i.test(interest)) {
          message += `BTW, saw that you're ${article} ${interest}, wah big respect to you bro. Shaping future generations! Keep it up! haha 👍\n\n`;
        } else {
          message += `BTW, saw that you're ${article} ${interest}, wah big respect to you bro. Keep it up! haha 👍\n\n`;
        }
      } else if (/ing$/.test(interest)) {
        // Activity ending in -ing like "swimming", "coding"
        
        // Create variations for different activities to make each message unique
        if (/swim|run|jog|cycle|hik/i.test(interest)) {
          message += `BTW, saw that you enjoy ${interest}, wah super cool stuff man. Great for fitness and health! Keep it up man! haha 👍\n\n`;
        } else if (/cook|bak|craft|paint|draw/i.test(interest)) {
          message += `BTW, saw that you enjoy ${interest}, wah super cool stuff man. Such a creative hobby! Keep it up man! haha 👍\n\n`;
        } else if (/lift|gym|train|workout/i.test(interest)) {
          message += `BTW, saw that you enjoy ${interest}, wah super cool stuff man. Getting those gains! Keep it up man! haha 👍\n\n`;
        } else {
          message += `BTW, saw that you enjoy ${interest}, wah super cool stuff man. Keep it up man! haha 👍\n\n`;
        }
      } else {
        // Regular interest/activity
        
        // Create variations for different interests to make each message unique
        if (/fitness|gym|workout|health|exercise/i.test(interest)) {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. Health is wealth! Keep it up man! haha 👍\n\n`;
        } else if (/food|cuisine|cooking|baking/i.test(interest)) {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. Good taste! Keep it up man! haha 👍\n\n`;
        } else if (/travel|adventure|explore/i.test(interest)) {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. Seeing the world! Keep it up man! haha 👍\n\n`;
        } else if (/tech|gadget|gaming|computer/i.test(interest)) {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. Tech savvy! Keep it up man! haha 👍\n\n`;
        } else if (/photo|camera|photography/i.test(interest)) {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. Great eye for visuals! Keep it up man! haha 👍\n\n`;
        } else if (/sport|athlete|run|marathon/i.test(interest)) {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. So athletic! Keep it up man! haha 👍\n\n`;
        } else {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. Keep it up man! haha 👍\n\n`;
        }
      }
    } else {
      // Multiple interests - create a personalized message that references multiple interests
      const primaryInterest = interestsList[0].toLowerCase();
      const secondaryInterest = interestsList[1]?.toLowerCase();
      
      if (interestsList.length === 2) {
        // Create variations based on interest combinations
        if ((/photo|camera/i.test(primaryInterest) && /travel/i.test(secondaryInterest)) || 
            (/travel/i.test(primaryInterest) && /photo|camera/i.test(secondaryInterest))) {
          message += `BTW, saw that you're into ${primaryInterest} and ${secondaryInterest}, wah super cool combination man. Must take amazing travel photos! Keep it up man! haha 👍\n\n`;
        } else if ((/sport|run|marathon/i.test(primaryInterest) && /fitness|gym/i.test(secondaryInterest)) || 
                  (/fitness|gym/i.test(primaryInterest) && /sport|run|marathon/i.test(secondaryInterest))) {
          message += `BTW, saw that you're into ${primaryInterest} and ${secondaryInterest}, wah super cool combination man. Really taking care of your fitness! Keep it up man! haha 👍\n\n`;
        } else if ((/photo|camera/i.test(primaryInterest) && /gaming/i.test(secondaryInterest)) || 
                  (/gaming/i.test(primaryInterest) && /photo|camera/i.test(secondaryInterest))) {
          message += `BTW, saw that you're into ${primaryInterest} and ${secondaryInterest}, wah super cool combination man. Creative and tech-savvy! Keep it up man! haha 👍\n\n`;
        } else {
          message += `BTW, saw that you're into ${primaryInterest} and ${secondaryInterest}, wah super cool combination man. Very unique interests! Keep it up man! haha 👍\n\n`;
        }
      } else {
        message += `BTW, saw that you're into ${interestsList.join(' and ')}, wah super cool mix of interests man. Very well-rounded! Keep it up man! haha 👍\n\n`;
      }
    }
  } else {
    message += `BTW, love your profile, keep it up! haha 👍\n\n`;
  }
  
  // Add additional info if available
  if (additionalInfo && additionalInfo.trim()) {
    // Better extraction of activities from additional info
    let personalizedNote = "";
    
    // Check for travel references
    if (/likes? to travel|loves? to travel/i.test(additionalInfo)) {
      personalizedNote = "I also noticed you enjoy traveling. That's awesome! ";
    }
    // Check for eating out references
    else if (/likes? to eat|loves? to eat|eat out/i.test(additionalInfo)) {
      personalizedNote = "I also noticed you enjoy trying different foods. That's awesome! ";
    }
    // Check for sports fan references
    else if (/fan of sports/i.test(additionalInfo)) {
      personalizedNote = "I also noticed you're a sports fan. That's awesome! ";
    }
    // Check for adventure references
    else if (/likes? an? adventure|loves? an? adventure/i.test(additionalInfo)) {
      personalizedNote = "I also noticed you're adventurous. That's awesome! ";
    }
    // Check for cycling references
    else if (/cycling|cyclist/i.test(additionalInfo)) {
      personalizedNote = "I also noticed you're into cycling. That's awesome! ";
    }
    // Check for martial arts references
    else if (/taekwondo|karate|judo|martial arts/i.test(additionalInfo)) {
      personalizedNote = "I also noticed your martial arts background. That's awesome! ";
    }
    // Check for marathon references
    else if (/marathon|likes? to (do|run) a marathon/i.test(additionalInfo)) {
      personalizedNote = "I also noticed you're into marathons. That's impressive endurance! ";
    }
    // Check for family/kids references
    else if (/kid|child|baby|family|parent/i.test(additionalInfo)) {
      if (/3rd|third|3/i.test(additionalInfo) && /kid|child|baby/i.test(additionalInfo)) {
        personalizedNote = "Congrats on your third child! Family fitness is important too. ";
      } else if (/2nd|second|2/i.test(additionalInfo) && /kid|child|baby/i.test(additionalInfo)) {
        personalizedNote = "Congrats on your second child! Family fitness is important too. ";
      } else if (/1st|first|1/i.test(additionalInfo) && /kid|child|baby/i.test(additionalInfo)) {
        personalizedNote = "Congrats on your child! Family fitness is important too. ";
      } else if (/kid|child|baby/i.test(additionalInfo)) {
        personalizedNote = "I see you have kids! Family fitness is important too. ";
      }
    }
    // Check for military/infantry references
    else if (/infantry|military|army|navy|air force|marine|SIR/i.test(additionalInfo)) {
      personalizedNote = "I noticed your military background. Respect for your service! ";
    }
    // Check for student references
    else if (/student|study|college|university|school/i.test(additionalInfo)) {
      personalizedNote = "I noticed you're a student. Great to balance studies with fitness! ";
    }
    // General catch-all for other activities
    else {
      // Try to extract activities from "likes to" or "loves to" phrases
      const likesToMatch = additionalInfo.match(/(?:likes|loves) to\s+([a-zA-Z]+)/i);
      if (likesToMatch && likesToMatch[1]) {
        const activity = likesToMatch[1].toLowerCase();
        // Add "ing" to verbs that don't already end in "ing"
        const activityWithIng = activity.endsWith('ing') ? activity : `${activity}ing`;
        personalizedNote = `I also noticed you enjoy ${activityWithIng}. That's awesome! `;
      }
      // If nothing specific was found but there's a profile pic mention
      else if (/profile pic|based on/i.test(additionalInfo) && !personalizedNote) {
        // Don't add any note if we can't extract meaningful info
      }
    }
    
    // Add the personalized note if we found something
    if (personalizedNote) {
      message += personalizedNote + "\n\n";
    }
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
  message += `Do you know anyone who may be interested? : )\n\n`;
  
  message += `PS: How's your gym progress going? 🙂`;
  
  // Adjust for Singaporean English if requested
  if (tone === 'singaporean') {
    message = message
      .replace('I saw that you were following', 'I saw you following')
      .replace('keep it up in the gym btw : )', 'keep it up in the gym ah! : )')
      .replace('wah big respect to you bro', 'wah very power lah, respect sia')
      .replace('wah super cool stuff man', 'wah very nice leh')
      .replace('Keep it up man!', 'Keep it up lah!')
      .replace('I am currently looking for', 'I currently looking for')
      .replace('who may be interested? : )', 'who might want? Can intro or not? : )')
      .replace('How\'s your gym progress going?', 'How\'s your gym progress going ah?')
      .replace('Great for fitness and health!', 'Good for health one sia!')
      .replace('Such a creative hobby!', 'So creative leh!')
      .replace('Getting those gains!', 'Getting swole ah!')
      .replace('Health is wealth!', 'Health is wealth sia!')
      .replace('Good taste!', 'Good taste lah!')
      .replace('Seeing the world!', 'See the world shiok ah!')
      .replace('Tech savvy!', 'Tech savvy leh!')
      .replace('Very unique interests!', 'Unique combo sia!')
      .replace('Very well-rounded!', 'So many interests, power lah!')
      .replace('Great eye for visuals!', 'Your photos must be shiok ah!')
      .replace('So athletic!', 'So fit one sia!')
      .replace('Must take amazing travel photos!', 'Your travel photos confirm plus chop very nice one!')
      .replace('Really taking care of your fitness!', 'You damn fit lah!')
      .replace('Creative and tech-savvy!', 'Creative and tech-savvy sia, power lah!')
      .replace('That\'s awesome!', 'That\'s damn shiok sia!')
      .replace('That\'s impressive endurance!', 'Wah your stamina power sia!')
      .replace('Family fitness is important too.', 'Family fitness also important one lah.')
      .replace('Congrats', 'Wah congrats')
      .replace('Respect for your service!', 'Respect for your service sia!')
      .replace('Great to balance studies with fitness!', 'Good to balance studies with fitness lah!');
  }
  
  return message;
};

// Special function for TikTok gym training template
const getTikTokGymTrainingMessage = (leadInfo: LeadInfo, tone: string): string => {
  const { name, interests } = leadInfo;
  
  // Use the exact template provided by the client but adapted for TikTok
  let message = `@${name} I saw that you were following a couple gym accounts, keep it up in the gym btw : )  \n`;
  
  if (interests && interests.trim()) {
    // Handle interests more intelligently for better grammar
    const interestsList = interests.split('/').map(i => i.trim());
    
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
      
      // Generate personalized message based on interest type
      // This ensures each message is uniquely handcrafted for the recipient
      if (/er$|or$|ist$|ian$|eur$|ant$|ent$|ive$/.test(interest)) {
        // Profession/role like "developer", "musician", "entrepreneur"
        const article = shouldUseAn(interest) ? "an" : "a";
        
        // Create variations for different professions to make each message unique
        if (/music|sing|guitar|piano|band|dj/i.test(interest)) {
          message += `BTW, saw that you're ${article} ${interest}, wah big respect to you bro. Your creative talent must be amazing! Keep it up! haha 👍\n\n`;
        } else if (/develop|program|code|tech|engineer|software/i.test(interest)) {
          message += `BTW, saw that you're ${article} ${interest}, wah big respect to you bro. Tech skills very impressive! Keep it up! haha 👍\n\n`;
        } else if (/teach|educat|professor|tutor|instructor/i.test(interest)) {
          message += `BTW, saw that you're ${article} ${interest}, wah big respect to you bro. Shaping future generations! Keep it up! haha 👍\n\n`;
        } else {
          message += `BTW, saw that you're ${article} ${interest}, wah big respect to you bro. Keep it up! haha 👍\n\n`;
        }
      } else if (/ing$/.test(interest)) {
        // Activity ending in -ing like "swimming", "coding"
        
        // Create variations for different activities to make each message unique
        if (/swim|run|jog|cycle|hik/i.test(interest)) {
          message += `BTW, saw that you enjoy ${interest}, wah super cool stuff man. Great for fitness and health! Keep it up man! haha 👍\n\n`;
        } else if (/cook|bak|craft|paint|draw/i.test(interest)) {
          message += `BTW, saw that you enjoy ${interest}, wah super cool stuff man. Such a creative hobby! Keep it up man! haha 👍\n\n`;
        } else if (/lift|gym|train|workout/i.test(interest)) {
          message += `BTW, saw that you enjoy ${interest}, wah super cool stuff man. Getting those gains! Keep it up man! haha 👍\n\n`;
        } else {
          message += `BTW, saw that you enjoy ${interest}, wah super cool stuff man. Keep it up man! haha 👍\n\n`;
        }
      } else {
        // Regular interest/activity
        
        // Create variations for different interests to make each message unique
        if (/fitness|gym|workout|health|exercise/i.test(interest)) {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. Health is wealth! Keep it up man! haha 👍\n\n`;
        } else if (/food|cuisine|cooking|baking/i.test(interest)) {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. Good taste! Keep it up man! haha 👍\n\n`;
        } else if (/travel|adventure|explore/i.test(interest)) {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. Seeing the world! Keep it up man! haha 👍\n\n`;
        } else if (/tech|gadget|gaming|computer/i.test(interest)) {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. Tech savvy! Keep it up man! haha 👍\n\n`;
        } else {
          message += `BTW, saw that you're into ${interest}, wah super cool stuff man. Keep it up man! haha 👍\n\n`;
        }
      }
    } else {
      // Multiple interests - create a personalized message that references multiple interests
      const primaryInterest = interestsList[0].toLowerCase();
      const secondaryInterest = interestsList[1]?.toLowerCase();
      
      if (interestsList.length === 2) {
        message += `BTW, saw that you're into ${primaryInterest} and ${secondaryInterest}, wah super cool combination man. Very unique interests! Keep it up man! haha 👍\n\n`;
      } else {
        message += `BTW, saw that you're into ${interestsList.join(', ')}, wah super cool mix of interests man. Very well-rounded! Keep it up man! haha 👍\n\n`;
      }
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
  message += `Do you know anyone who may be interested? : )\n\n`;
  
  message += `PS: How's your gym progress going? 🙂`;
  
  // Adjust for Singaporean English if requested
  if (tone === 'singaporean') {
    message = message
      .replace('I saw that you were following', 'I saw you following')
      .replace('keep it up in the gym btw : )', 'keep it up in the gym ah! : )')
      .replace('wah big respect to you bro', 'wah very power lah, respect sia')
      .replace('wah super cool stuff man', 'wah very nice leh')
      .replace('Keep it up man!', 'Keep it up lah!')
      .replace('I am currently looking for', 'I currently looking for')
      .replace('who may be interested? : )', 'who might want? Can intro or not? : )')
      .replace('How\'s your gym progress going?', 'How\'s your gym progress going ah?')
      .replace('Great for fitness and health!', 'Good for health one sia!')
      .replace('Such a creative hobby!', 'So creative leh!')
      .replace('Getting those gains!', 'Getting swole ah!')
      .replace('Health is wealth!', 'Health is wealth sia!')
      .replace('Good taste!', 'Good taste lah!')
      .replace('Seeing the world!', 'See the world shiok ah!')
      .replace('Tech savvy!', 'Tech savvy leh!')
      .replace('Very unique interests!', 'Unique combo sia!')
      .replace('Very well-rounded!', 'So many interests, power lah!');
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