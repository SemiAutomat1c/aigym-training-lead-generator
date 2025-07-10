interface TraitPersonalization {
  firstTrait: string;
  secondTrait: string;
}

/**
 * Cleans and normalizes input traits
 */
const normalizeTraitText = (trait: string): string => {
  let normalized = trait.toLowerCase().trim();
  
  // Handle Instagram handle format: works at (ig/xyz)
  if (normalized.includes('(ig/')) {
    normalized = normalized.replace(/\(ig\/([^)]+)\)/g, '$1');
  }
  
  // Fix common typos
  normalized = normalized
    .replace(/travelig/g, 'traveling')
    .replace(/promotoes/g, 'promotes')
    .replace(/stuided/g, 'studied');
  
  return normalized;
};

/**
 * Generates a personalized message for the first trait (BTW section)
 */
export const generateFirstTraitMessage = (trait: string): string => {
  const lowerTrait = normalizeTraitText(trait);
  
  // Work/Professional patterns
  if (lowerTrait.includes('work') && lowerTrait.includes('at')) {
    const workplace = lowerTrait.split('at')[1]?.trim() || 'your company';
    return `saw that you work at ${workplace}, that's awesome`;
  }
  if (lowerTrait.includes('health worker')) {
    return `saw that you're a health worker, respect man`;
  }
  if (lowerTrait.includes('real estate') || lowerTrait.includes('property')) {
    return `saw that you're in real estate, hustling hard`;
  }
  if (lowerTrait.includes('teach')) {
    return `saw that you're a teacher, noble profession`;
  }
  if (lowerTrait.includes('doctor')) {
    return `saw that you're a doctor, saving lives`;
  }
  if (lowerTrait.includes('nurse')) {
    return `saw that you're a nurse, healthcare hero`;
  }
  if (lowerTrait.includes('engineer')) {
    return `saw that you're an engineer, smart cookie`;
  }
  if (lowerTrait.includes('lawyer')) {
    return `saw that you're a lawyer, justice warrior`;
  }
  if (lowerTrait.includes('chef')) {
    return `saw that you're a chef, culinary master`;
  }
  
  // Education patterns
  if (lowerTrait.includes('stud') && lowerTrait.includes('smu') && lowerTrait.includes('law')) {
    return `saw that you studied SMU law, smart`;
  }
  if (lowerTrait.includes('stud') && lowerTrait.includes('nus')) {
    return `saw that you studied NUS, impressive`;
  }
  if (lowerTrait.includes('stud') && lowerTrait.includes('ntu')) {
    return `saw that you studied NTU, engineering pro`;
  }
  if (lowerTrait.includes('mba')) {
    return `saw your MBA, business leader`;
  }
  if (lowerTrait.includes('phd')) {
    return `saw your PhD, academic superstar`;
  }
  
  // Fitness/Sports patterns
  if (lowerTrait.includes('fitness') || lowerTrait.includes('gym')) {
    return `saw that you're into fitness, power`;
  }
  if (lowerTrait.includes('bodybuilding')) {
    return `saw your bodybuilding progress, beast mode`;
  }
  if (lowerTrait.includes('crossfit')) {
    return `saw your crossfit training, warrior spirit`;
  }
  if (lowerTrait.includes('run')) {
    return `saw that you're a runner, cardio king`;
  }
  if (lowerTrait.includes('swim')) {
    return `saw that you're into swimming, aquatic ace`;
  }
  
  // Style/Fashion patterns
  if (lowerTrait.includes('jacket')) {
    return `saw your stylish jacket, looking good`;
  }
  if (lowerTrait.includes('coat')) {
    return `saw your awesome coat, winter ready`;
  }
  if (lowerTrait.includes('tshirt') || lowerTrait.includes('t-shirt') || (lowerTrait.includes('shirt') && !lowerTrait.includes('polo'))) {
    return `saw that nice tshirt, good taste`;
  }
  if (lowerTrait.includes('polo')) {
    return `saw that cool polo, fresh style`;
  }
  if (lowerTrait.includes('beanie')) {
    return `saw that cute beanie, cozy vibes`;
  }
  
  // Other common patterns
  if (lowerTrait.includes('travel') || lowerTrait.includes('trip')) {
    return `saw your travel posts, wanderlust strong`;
  }
  if (lowerTrait.includes('food') || lowerTrait.includes('eat')) {
    return `saw that you're a foodie, good taste`;
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
  if (lowerTrait.includes('car')) {
    return `saw your awesome car, shiok ride`;
  }
  if (lowerTrait.includes('fire') || lowerTrait.includes('rescue')) {
    return `saw that you're in fire rescue, hero`;
  }
  
  // Default response for unmatched traits
  return `saw that you're into ${lowerTrait}, love it haha`;
};

/**
 * Generates a personalized message for the second trait (PS section)
 */
export const generateSecondTraitMessage = (trait: string): string => {
  const lowerTrait = normalizeTraitText(trait);
  
  // Travel patterns
  if (lowerTrait.includes('travel') && lowerTrait.includes('fam')) {
    return `How was traveling with the family`;
  }
  if (lowerTrait.includes('travel') && lowerTrait.includes('solo')) {
    return `How was your solo travel experience`;
  }
  if (lowerTrait.includes('backpack')) {
    return `How's the backpacking adventure going`;
  }
  if (lowerTrait.includes('vacation')) {
    return `How was your vacation`;
  }
  if (lowerTrait.includes('holiday')) {
    return `How was your holiday break`;
  }
  if (lowerTrait.includes('travel')) {
    return `How was your recent travels`;
  }
  
  // Work/Career patterns
  if (lowerTrait.includes('promot') && lowerTrait.includes('work')) {
    return `How's work promotion going`;
  }
  if (lowerTrait.includes('side hustle')) {
    return `How's your side hustle going`;
  }
  if (lowerTrait.includes('business')) {
    return `How's business going`;
  }
  if (lowerTrait.includes('new job')) {
    return `How's the new job treating you`;
  }
  if (lowerTrait.includes('freelanc')) {
    return `How's freelancing working out`;
  }
  
  // Hobbies/Skills patterns
  if (lowerTrait.includes('photo')) {
    return `How's the photography going`;
  }
  if (lowerTrait.includes('music')) {
    return `How's your music coming along`;
  }
  if (lowerTrait.includes('art')) {
    return `How's your art progressing`;
  }
  if (lowerTrait.includes('cook')) {
    return `How's your cooking skills developing`;
  }
  if (lowerTrait.includes('gaming') || lowerTrait.includes('game')) {
    return `How's your gaming setup treating you`;
  }
  
  // Style/Fashion patterns
  if (lowerTrait.includes('coat')) {
    return `Where did you get that awesome coat`;
  }
  if (lowerTrait.includes('jacket')) {
    return `Where did you get that stylish jacket`;
  }
  if (lowerTrait.includes('tshirt') || lowerTrait.includes('t-shirt') || (lowerTrait.includes('shirt') && !lowerTrait.includes('polo'))) {
    return `Where did you get that nice tshirt`;
  }
  if (lowerTrait.includes('polo')) {
    return `Where did you get that cool polo`;
  }
  if (lowerTrait.includes('beanie')) {
    return `Where did you get that cute beanie`;
  }
  if (lowerTrait.includes('cap') || lowerTrait.includes('hat')) {
    return `Where did you get that nice cap`;
  }
  
  // Fitness/Sports patterns
  if (lowerTrait.includes('fitness') || lowerTrait.includes('gym')) {
    return `How's your fitness journey going`;
  }
  if (lowerTrait.includes('athlet')) {
    return `How's your athletic training going`;
  }
  if (lowerTrait.includes('muay thai') || lowerTrait.includes('boxing')) {
    return `How's your muay thai training going`;
  }
  if (lowerTrait.includes('run') || lowerTrait.includes('marathon')) {
    return `How's your running training going`;
  }
  if (lowerTrait.includes('cycling') || lowerTrait.includes('bike')) {
    return `How's your cycling going`;
  }
  if (lowerTrait.includes('swim')) {
    return `How's your swimming training going`;
  }
  if (lowerTrait.includes('magic')) {
    return `How's your magic skills progressing`;
  }
  
  // Food patterns
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
      modifiedMessage = addSinglishModifiers(message, 'btw');
    }
    return modifiedMessage;
  }
  
  // Level 3: BTW and PS sections use Singlish
  if (toneLevel === 'level3') {
    if (section === 'btw') {
      modifiedMessage = addSinglishModifiers(message, 'btw');
    } else if (section === 'ps') {
      modifiedMessage = addSinglishModifiers(message, 'ps');
    }
    return modifiedMessage;
  }
  
  // Level 4: Everything except services uses Singlish
  if (toneLevel === 'level4') {
    if (section !== 'body') { // Body contains the services which stay in standard English
      modifiedMessage = addSinglishModifiers(message, section);
    }
    return modifiedMessage;
  }
  
  return message;
};

/**
 * Helper function to add Singlish modifiers to a message
 */
const addSinglishModifiers = (message: string, section: string): string => {
  // Add Singlish particles based on context
  let modifiedMessage = message;
  
  // Replace common phrases with Singlish equivalents based on section
  if (section === 'btw') {
    // Work/Professional patterns
    modifiedMessage = modifiedMessage
      .replace(/that's awesome$/i, "that's awesome sia")
      .replace(/respect man$/i, "respect lah")
      .replace(/hustling hard$/i, "hustling hard sia")
      .replace(/noble profession$/i, "noble profession lah")
      .replace(/saving lives$/i, "saving lives sia")
      .replace(/healthcare hero$/i, "healthcare hero lah")
      .replace(/smart cookie$/i, "smart sia")
      .replace(/justice warrior$/i, "justice warrior lah")
      .replace(/culinary master$/i, "culinary master sia")
      
      // Education patterns
      .replace(/smart$/i, "smart sia")
      .replace(/impressive$/i, "impressive lah")
      .replace(/engineering pro$/i, "engineering pro sia")
      .replace(/business leader$/i, "business leader lah")
      .replace(/academic superstar$/i, "academic superstar sia")
      
      // Fitness/Sports patterns
      .replace(/power$/i, "power lah")
      .replace(/beast mode$/i, "beast mode lah")
      .replace(/warrior spirit$/i, "warrior spirit sia")
      .replace(/cardio king$/i, "cardio king lah")
      .replace(/aquatic ace$/i, "aquatic ace sia")
      
      // Style/Fashion patterns
      .replace(/looking good$/i, "looking good lah")
      .replace(/winter ready$/i, "winter ready sia")
      .replace(/good taste$/i, "good taste lah")
      .replace(/fresh style$/i, "fresh style sia")
      .replace(/cozy vibes$/i, "cozy vibes lah")
      
      // Other patterns
      .replace(/wanderlust strong$/i, "wanderlust strong sia")
      .replace(/impressive$/i, "impressive sia")
      .replace(/very creative$/i, "very creative lah")
      .replace(/shiok ride$/i, "shiok ride lah")
      .replace(/hero$/i, "hero sia")
      .replace(/love it haha$/i, "sibei nice leh");
  } else if (section === 'ps') {
    // Add question particles for PS section
    if (modifiedMessage.startsWith("How")) {
      modifiedMessage = modifiedMessage + " ah";
    }
    if (modifiedMessage.startsWith("Where")) {
      modifiedMessage = modifiedMessage + " ah";
    }
    if (modifiedMessage.startsWith("Found")) {
      modifiedMessage = modifiedMessage + " or not";
    }
  } else if (section === 'intro') {
    modifiedMessage = modifiedMessage
      .replace(/Jet here btw,/i, "Jet here lah,")
      .replace(/keep it up in the gym btw$/i, "keep it up in the gym ah");
  }
  
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