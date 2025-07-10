interface TraitPersonalization {
  firstTrait: string;
  secondTrait: string;
}

/**
 * Generates a personalized message for the first trait (BTW section)
 */
export const generateFirstTraitMessage = (trait: string): string => {
  const lowerTrait = trait.toLowerCase().trim();
  
  // Common patterns and their responses
  if (lowerTrait.includes('fitness') || lowerTrait.includes('gym')) {
    return `saw that you're into fitness, power`;
  }
  if (lowerTrait.includes('work') && lowerTrait.includes('at')) {
    const workplace = lowerTrait.split('at')[1]?.trim() || 'your company';
    return `saw that you work at ${workplace}, that's awesome`;
  }
  if (lowerTrait.includes('jacket') || lowerTrait.includes('coat')) {
    return `saw your stylish ${lowerTrait.includes('jacket') ? 'jacket' : 'coat'}, looking good`;
  }
  if (lowerTrait.includes('health') || lowerTrait.includes('doctor') || lowerTrait.includes('nurse')) {
    return `saw that you're a health worker, respect man`;
  }
  if (lowerTrait.includes('stud') && (lowerTrait.includes('law') || lowerTrait.includes('smu'))) {
    return `saw that you studied SMU law, smart`;
  }
  if (lowerTrait.includes('real estate') || lowerTrait.includes('property')) {
    return `saw that you're in real estate, hustling hard`;
  }
  if (lowerTrait.includes('swim')) {
    return `saw that you're into swimming, nice sport`;
  }
  if (lowerTrait.includes('design')) {
    return `saw your design work, creative`;
  }
  if (lowerTrait.includes('car')) {
    return `saw your awesome car, shiok ride`;
  }
  if (lowerTrait.includes('food') || lowerTrait.includes('eat')) {
    return `saw that you're a foodie, good taste`;
  }
  if (lowerTrait.includes('travel') || lowerTrait.includes('trip')) {
    return `saw your travel posts, wanderlust strong`;
  }
  if (lowerTrait.includes('teach')) {
    return `saw that you're a teacher, noble profession`;
  }
  if (lowerTrait.includes('engineer')) {
    return `saw that you're an engineer, smart cookie`;
  }
  if (lowerTrait.includes('fire') || lowerTrait.includes('rescue')) {
    return `saw that you're in fire rescue, hero`;
  }
  if (lowerTrait.includes('photography') || lowerTrait.includes('photo')) {
    return `saw your photography skills, impressive`;
  }
  if (lowerTrait.includes('art') || lowerTrait.includes('paint')) {
    return `saw your artistic talent, very creative`;
  }
  if (lowerTrait.includes('music') || lowerTrait.includes('sing') || lowerTrait.includes('play')) {
    return `saw that you're into music, good taste`;
  }
  if (lowerTrait.includes('run') || lowerTrait.includes('marathon')) {
    return `saw that you're into running, impressive endurance`;
  }
  if (lowerTrait.includes('cycling') || lowerTrait.includes('bike')) {
    return `saw that you're into cycling, great sport`;
  }
  
  // Default response for unmatched traits
  return `saw that you're into ${lowerTrait}, love it haha`;
};

/**
 * Generates a personalized message for the second trait (PS section)
 */
export const generateSecondTraitMessage = (trait: string): string => {
  const lowerTrait = trait.toLowerCase().trim();
  
  // Common patterns and their responses
  if (lowerTrait.includes('travel')) {
    return `How was your recent travels`;
  }
  if (lowerTrait.includes('photo')) {
    return `How's the photography going`;
  }
  if (lowerTrait.includes('coat') || lowerTrait.includes('jacket')) {
    return `Where did you get that awesome ${lowerTrait.includes('coat') ? 'coat' : 'jacket'}`;
  }
  if (lowerTrait.includes('promot') || lowerTrait.includes('work')) {
    return `How's work promotion going`;
  }
  if (lowerTrait.includes('shirt') || lowerTrait.includes('tshirt')) {
    return `Where did you get that nice shirt`;
  }
  if (lowerTrait.includes('athlet')) {
    return `How's your athletic training going`;
  }
  if (lowerTrait.includes('fitness') || lowerTrait.includes('gym')) {
    return `How's your fitness journey going`;
  }
  if (lowerTrait.includes('hair')) {
    return `Love the unique hairstyle, where did you get it done`;
  }
  if (lowerTrait.includes('magic')) {
    return `How's your magic skills progressing`;
  }
  if (lowerTrait.includes('polo')) {
    return `That's a cool polo, where did you get it`;
  }
  if (lowerTrait.includes('beanie')) {
    return `Love the cute beanie, where did you get it`;
  }
  if (lowerTrait.includes('cap') || lowerTrait.includes('hat')) {
    return `Nice cap, where did you get it`;
  }
  if (lowerTrait.includes('muay thai') || lowerTrait.includes('boxing')) {
    return `How's your muay thai training going`;
  }
  if (lowerTrait.includes('wife') || lowerTrait.includes('adventure')) {
    return `How was the adventure with your wife`;
  }
  if (lowerTrait.includes('run') || lowerTrait.includes('marathon')) {
    return `How's your running training going`;
  }
  if (lowerTrait.includes('cycling') || lowerTrait.includes('bike')) {
    return `How's your cycling going`;
  }
  if (lowerTrait.includes('food') || lowerTrait.includes('eat')) {
    return `Found any good food places lately`;
  }
  
  // Default response for unmatched traits
  return `How's your ${lowerTrait} going`;
};

/**
 * Applies Singlish tone modifiers based on the selected level
 */
export const applyToneModifiers = (message: string, section: 'intro' | 'btw' | 'ps' | 'body', toneLevel: string): string => {
  let modifiedMessage = message;
  
  // Level 0: No Singlish (standard English)
  if (toneLevel === 'level0') {
    return message;
  }
  
  // Level 2: Only BTW section uses Singlish
  if (toneLevel === 'level2') {
    if (section === 'btw') {
      modifiedMessage = addSinglishModifiers(message);
    }
    return modifiedMessage;
  }
  
  // Level 3: BTW and PS sections use Singlish
  if (toneLevel === 'level3') {
    if (section === 'btw' || section === 'ps') {
      modifiedMessage = addSinglishModifiers(message);
    }
    return modifiedMessage;
  }
  
  // Level 4: Everything except services uses Singlish
  if (toneLevel === 'level4') {
    if (section !== 'body') { // Body contains the services which stay in standard English
      modifiedMessage = addSinglishModifiers(message);
    }
    return modifiedMessage;
  }
  
  return message;
};

/**
 * Helper function to add Singlish modifiers to a message
 */
const addSinglishModifiers = (message: string): string => {
  // Add Singlish particles based on context
  let modifiedMessage = message;
  
  // Replace common phrases with Singlish equivalents
  modifiedMessage = modifiedMessage
    .replace(/that's awesome/gi, "that's awesome sia")
    .replace(/looking good/gi, "looking good lah")
    .replace(/respect man/gi, "respect man sia")
    .replace(/smart/gi, "smart sia")
    .replace(/hustling hard/gi, "hustling hard sia")
    .replace(/nice sport/gi, "nice sport lah")
    .replace(/creative/gi, "creative sia")
    .replace(/shiok ride/gi, "shiok ride lah")
    .replace(/good taste/gi, "good taste lah")
    .replace(/wanderlust strong/gi, "wanderlust strong sia")
    .replace(/noble profession/gi, "noble profession lah")
    .replace(/smart cookie/gi, "smart cookie sia")
    .replace(/hero/gi, "hero sia")
    .replace(/impressive/gi, "impressive sia")
    .replace(/power/gi, "power lah")
    .replace(/love it haha/gi, "sibei nice leh")
    .replace(/How was your/gi, "How was your")
    .replace(/How's your/gi, "How's your")
    .replace(/Where did you/gi, "Where did you")
    .replace(/Love the/gi, "Love the")
    .replace(/That's a/gi, "That's a")
    .replace(/Nice/gi, "Nice")
    .replace(/Found any/gi, "Found any");
  
  return modifiedMessage;
};

/**
 * Generates the complete message based on the template, traits, and tone level
 */
export const generateTemplateMessage = (
  name: string, 
  traits: TraitPersonalization,
  toneLevel: string
): string => {
  // Parse traits
  const firstTrait = traits.firstTrait;
  const secondTrait = traits.secondTrait || firstTrait; // Use first trait as fallback
  
  // Generate personalized trait messages
  const firstTraitMessage = generateFirstTraitMessage(firstTrait);
  const secondTraitMessage = generateSecondTraitMessage(secondTrait);
  
  // Apply tone modifiers based on level
  const introWithTone = applyToneModifiers(`Jet here btw, I saw that you were following a couple gym accounts, keep it up in the gym btw`, 'intro', toneLevel);
  const btwWithTone = applyToneModifiers(firstTraitMessage, 'btw', toneLevel);
  const psWithTone = applyToneModifiers(secondTraitMessage, 'ps', toneLevel);
  
  // Standard services section (always in standard English)
  const servicesSection = `They get: 
✅ a Personalised Diet Plan 
✅ a Personalised Training Plan 
✅ Telegram Chat Support 
✅ Physical Form Correction 
✅ To improve Mind Muscle Connection 
✅ To make more progress with Less Time and Effort`;

  // Body text with tone modifiers if level 4
  let bodyIntro = `I am currently looking for 5 people can join my free training project trial!`;
  let bodyOutro = `To push them in the right direction this year 💪🏻 
Do you know anyone who may be interested?`;

  if (toneLevel === 'level4') {
    bodyIntro = applyToneModifiers(bodyIntro, 'body', toneLevel)
      .replace('I am currently', 'I currently')
      .replace('can join', 'can join in');
    
    bodyOutro = applyToneModifiers(bodyOutro, 'body', toneLevel)
      .replace('To push them in the right direction this year', 'Help them level up this year')
      .replace('Do you know anyone who may be interested?', 'Got anyone interested or not?');
  }
  
  // Construct the final message
  const message = `Hey ${name}, ${introWithTone} : )  

BTW, ${btwWithTone} 👍 

${bodyIntro}  

${servicesSection} 

${bodyOutro}  

PS: ${psWithTone} : )`;

  return message;
};

/**
 * Parses input to extract name and traits
 */
export const parseInputForTemplate = (input: string): { name: string; traits: TraitPersonalization } => {
  const lines = input.trim().split('\n').filter(line => line.trim());
  
  if (lines.length < 2) {
    return {
      name: lines[0] || 'there',
      traits: {
        firstTrait: '',
        secondTrait: ''
      }
    };
  }
  
  const name = lines[0].trim();
  const traitsLine = lines[1].trim();
  
  // Split traits by '/' if available
  const traitParts = traitsLine.split('/').map(t => t.trim());
  
  return {
    name,
    traits: {
      firstTrait: traitParts[0] || '',
      secondTrait: traitParts.length > 1 ? traitParts[1] : ''
    }
  };
}; 