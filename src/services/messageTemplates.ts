interface TraitPersonalization {
  firstTrait: string;
  secondTrait: string;
}

/**
 * Cleans and normalizes input traits
 */
const normalizeTraitText = (trait: string): string => {
  let normalized = trait.toLowerCase().trim();
  
  // Fix common typos found in real data
  normalized = normalized
    .replace(/travelig/g, 'traveling')
    .replace(/promotoes/g, 'promotes')
    .replace(/stuided/g, 'studied')
    .replace(/ncie/g, 'nice')
    .replace(/ahs/g, 'has')
    .replace(/nie/g, 'nice')
    .replace(/playig/g, 'playing')
    .replace(/flexing back muscle/g, 'flexing his back muscles');
  
  return normalized;
};

/**
 * Extracts the handle or website from parentheses for message personalization
 */
const extractHandleOrWebsite = (trait: string): string | null => {
  // Match patterns like (ig/mindmusclesg), (tt/@gibsaw), etc.
  const igMatch = trait.match(/\(ig\/([^)]+)\)/i);
  const igColonMatch = trait.match(/\(ig:\s*([^)]+)\)/i);
  const igAtMatch = trait.match(/\(ig\s*@([^)]+)\)/i);
  const ttMatch = trait.match(/\(tt\/\s*@?([^)]+)\)/i);
  const atMatch = trait.match(/\(@([^)]+)\)/i);
  const instagramMatch = trait.match(/\(instagram:\s*([^)]+)\)/i);
  const websiteMatch = trait.match(/\(([^@/]+\.[^)]+)\)/i);
  
  if (igMatch) return igMatch[1].trim();
  if (igColonMatch) return igColonMatch[1].trim();
  if (igAtMatch) return igAtMatch[1].trim();
  if (ttMatch) return ttMatch[1].trim();
  if (atMatch) return atMatch[1].trim();
  if (instagramMatch) return instagramMatch[1].trim();
  if (websiteMatch) return websiteMatch[1].trim();
  
  return null;
};

/**
 * Generates a personalized message for the first trait (BTW section)
 */
export const generateFirstTraitMessage = (trait: string): string => {
  const lowerTrait = normalizeTraitText(trait);
  const handle = extractHandleOrWebsite(trait);
  
  // Handle work at specific company with social handle
  if (lowerTrait.includes('work') && lowerTrait.includes('at') && handle) {
    return `saw that you work at ${handle}, that's awesome`;
  }
  
  // Handle business owner with website or handle
  if (lowerTrait.includes('business') && handle) {
    return `saw that you own ${handle}, business success`;
  }
  
  // Handle content creator with social handle
  if (lowerTrait.includes('content creator') && handle) {
    return `saw that you're a content creator at ${handle}, creative genius`;
  }
  
  // Fitness & Sports (Most Common)
  if (lowerTrait.includes('fitness')) {
    return `saw that you're into fitness, power`;
  }
  if (lowerTrait.includes('bodybuilding')) {
    return `saw your bodybuilding journey, beast mode`;
  }
  if (lowerTrait.includes('powerlift')) {
    return `saw your powerlifting skills, strength king`;
  }
  if (lowerTrait.includes('swim')) {
    return `saw that you're into swimming, aquatic ace`;
  }
  if (lowerTrait.includes('athlete')) {
    return `saw that you're an athlete, sports warrior`;
  }
  if (lowerTrait.includes('boxing')) {
    return `saw your boxing training, fighter spirit`;
  }
  if (lowerTrait.includes('cycling') || lowerTrait.includes('bike')) {
    return `saw your cycling adventures, pedal power`;
  }
  if (lowerTrait.includes('rock climbing') || lowerTrait.includes('climbing')) {
    return `saw your climbing skills, scaling heights`;
  }
  if (lowerTrait.includes('run')) {
    return `saw that you're into running, cardio king`;
  }
  if (lowerTrait.includes('taekwondo')) {
    return `saw your taekwondo skills, martial arts master`;
  }
  if (lowerTrait.includes('fencing')) {
    return `saw your fencing skills, sword master`;
  }
  if (lowerTrait.includes('rowing')) {
    return `saw your rowing training, water warrior`;
  }
  if (lowerTrait.includes('surfing')) {
    return `saw that you're into surfing, wave rider`;
  }
  if (lowerTrait.includes('muay thai')) {
    return `saw your muay thai training, fighter spirit`;
  }
  if (lowerTrait.includes('bowling')) {
    return `saw your bowling skills, strike master`;
  }
  if (lowerTrait.includes('scuba') || lowerTrait.includes('diving')) {
    return `saw your diving adventures, underwater explorer`;
  }
  
  // Professional/Work (Common)
  if (lowerTrait.includes('work') && lowerTrait.includes('at')) {
    const workplace = lowerTrait.split('at')[1]?.trim() || 'your company';
    return `saw that you work at ${workplace}, that's awesome`;
  }
  if (lowerTrait.includes('business owner')) {
    return `saw that you're a business owner, entrepreneur vibes`;
  }
  if (lowerTrait.includes('co founder') || lowerTrait.includes('cofounder')) {
    return `saw that you're a co founder, entrepreneurial spirit`;
  }
  if (lowerTrait.includes('engineer')) {
    return `saw that you're an engineer, tech genius`;
  }
  if (lowerTrait.includes('teach')) {
    return `saw that you're a teacher, noble profession`;
  }
  if (lowerTrait.includes('doctor')) {
    return `saw that you're a doctor, life saver`;
  }
  if (lowerTrait.includes('nurse')) {
    return `saw that you're a nurse, healthcare hero`;
  }
  if (lowerTrait.includes('physio')) {
    return `saw that you're a physiotherapist, healing hands`;
  }
  if (lowerTrait.includes('fire') || lowerTrait.includes('rescue')) {
    return `saw that you're in fire rescue, hero status`;
  }
  if (lowerTrait.includes('police')) {
    return `saw that you're a police officer, keeping us safe`;
  }
  if (lowerTrait.includes('chef')) {
    return `saw that you're a chef, culinary master`;
  }
  if (lowerTrait.includes('barber')) {
    return `saw that you're a barber, style creator`;
  }
  if (lowerTrait.includes('dj')) {
    return `saw that you're a DJ, music maestro`;
  }
  if (lowerTrait.includes('photographer')) {
    return `saw your photography skills, artistic eye`;
  }
  if (lowerTrait.includes('musician')) {
    return `saw your music talents, sound creator`;
  }
  if (lowerTrait.includes('content creator')) {
    return `saw that you're a content creator, creative genius`;
  }
  if (lowerTrait.includes('financial advisor')) {
    return `saw that you're a financial advisor, money guru`;
  }
  
  // Education/Military
  if (lowerTrait.includes('stud') && lowerTrait.includes('smu') && lowerTrait.includes('law')) {
    return `saw that you studied SMU law, legal eagle`;
  }
  if (lowerTrait.includes('stud') && lowerTrait.includes('nus')) {
    return `saw that you studied NUS, impressive`;
  }
  if (lowerTrait.includes('stud') && lowerTrait.includes('ntu')) {
    return `saw that you studied NTU, engineering pro`;
  }
  if (lowerTrait.includes('student')) {
    return `saw that you're a student, knowledge seeker`;
  }
  if (lowerTrait.includes('just graduated') || lowerTrait.includes('graduated')) {
    return `saw that you just graduated, fresh start`;
  }
  if (lowerTrait.includes('army') || lowerTrait.includes('military')) {
    return `saw that you're serving army, soldier strong`;
  }
  if (lowerTrait.includes('mba')) {
    return `saw your MBA, business leader`;
  }
  if (lowerTrait.includes('phd')) {
    return `saw your PhD, academic superstar`;
  }
  
  // Fashion/Style Items (Very Common)
  if (lowerTrait.includes('jacket')) {
    return `saw your stylish jacket, fashion game strong`;
  }
  if (lowerTrait.includes('polo')) {
    return `saw that cool polo, fresh style`;
  }
  if (lowerTrait.includes('tshirt') || lowerTrait.includes('t-shirt') || (lowerTrait.includes('shirt') && !lowerTrait.includes('polo'))) {
    return `saw that nice tshirt, good taste`;
  }
  if (lowerTrait.includes('coat')) {
    return `saw your awesome coat, winter ready`;
  }
  if (lowerTrait.includes('suit')) {
    return `saw your elegant suit, classy vibes`;
  }
  if (lowerTrait.includes('hoodie')) {
    return `saw that cool hoodie, streetwear king`;
  }
  if (lowerTrait.includes('beanie')) {
    return `saw that nice beanie, cozy style`;
  }
  if (lowerTrait.includes('sunglasses') || lowerTrait.includes('shades')) {
    return `saw those cool shades, cool factor`;
  }
  if (lowerTrait.includes('glasses') || lowerTrait.includes('eyeglasses')) {
    return `saw your stylish glasses, intellectual look`;
  }
  if (lowerTrait.includes('watch')) {
    return `saw that nice watch, timepiece game`;
  }
  if (lowerTrait.includes('sneakers') || lowerTrait.includes('shoes')) {
    return `saw those cool sneakers, shoe game fire`;
  }
  if (lowerTrait.includes('car')) {
    return `saw your awesome ride, wheels on point`;
  }
  
  // Lifestyle/Personal
  if (lowerTrait.includes('travel')) {
    return `saw your travel adventures, wanderlust strong`;
  }
  if (lowerTrait.includes('food') || lowerTrait.includes('eat')) {
    return `saw that you're a foodie, taste buds on point`;
  }
  if (lowerTrait.includes('adventure')) {
    return `saw your adventure posts, thrill seeker`;
  }
  if (lowerTrait.includes('photo') && !lowerTrait.includes('photographer')) {
    return `saw your photography skills, artistic vision`;
  }
  if (lowerTrait.includes('married')) {
    return `saw that you got married, congratulations`;
  }
  if (lowerTrait.includes('cafe')) {
    return `saw that you love cafes, coffee connoisseur`;
  }
  if (lowerTrait.includes('coffee')) {
    return `saw your coffee obsession, caffeine king`;
  }
  
  // Compound traits
  if (lowerTrait.includes('married') && lowerTrait.includes('bab')) {
    return `saw that you're married with babies, family man`;
  }
  if (lowerTrait.includes('powerlift') && lowerTrait.includes('athlete')) {
    return `saw that you're a powerlifting athlete, strength champion`;
  }
  if (lowerTrait.includes('bodybuilding') && lowerTrait.includes('athlete')) {
    return `saw that you're a bodybuilding athlete, muscle master`;
  }
  
  // Default response for unmatched traits
  return `saw that you're into ${lowerTrait}, love it haha`;
};

/**
 * Generates a personalized message for the second trait (PS section)
 */
export const generateSecondTraitMessage = (trait: string): string => {
  const lowerTrait = normalizeTraitText(trait);
  
  // Family/Relationships (Very Common)
  if (lowerTrait.includes('has gf') || lowerTrait.includes('girlfriend')) {
    return `How's things with the girlfriend`;
  }
  if (lowerTrait.includes('has wife') || (lowerTrait.includes('wife') && !lowerTrait.includes('travel'))) {
    return `How's married life treating you`;
  }
  if (lowerTrait.includes('travel') && lowerTrait.includes('wife')) {
    return `How was traveling with the wife`;
  }
  if (lowerTrait.includes('travel') && lowerTrait.includes('gf')) {
    return `How was traveling with your girlfriend`;
  }
  if (lowerTrait.includes('has baby') || lowerTrait.includes('baby')) {
    return `How's parenthood going`;
  }
  if (lowerTrait.includes('kids') || lowerTrait.includes('children')) {
    return `How are the kids doing`;
  }
  if (lowerTrait.includes('loves') && lowerTrait.includes('fam')) {
    return `How's family time`;
  }
  if (lowerTrait.includes('adventure') && lowerTrait.includes('wife')) {
    return `How was the adventure with your wife`;
  }
  if (lowerTrait.includes('got married') || lowerTrait.includes('married')) {
    return `How's married life`;
  }
  if (lowerTrait.includes('engaged') || lowerTrait.includes('engagement')) {
    return `How's the engagement going`;
  }
  if (lowerTrait.includes('travel') && lowerTrait.includes('fiancee')) {
    return `How was traveling with your fiancee`;
  }
  
  // Fitness/Sports (Common)
  if (lowerTrait.includes('fitness')) {
    return `How's your fitness journey going`;
  }
  if (lowerTrait.includes('athlete')) {
    return `How's your athletic training`;
  }
  if (lowerTrait.includes('powerlift')) {
    return `How's your powerlifting progress`;
  }
  if (lowerTrait.includes('bodybuilding')) {
    return `How's your bodybuilding journey`;
  }
  if (lowerTrait.includes('swim')) {
    return `How's your swimming training`;
  }
  if (lowerTrait.includes('cycling') || lowerTrait.includes('bike')) {
    return `How's your cycling adventures`;
  }
  if (lowerTrait.includes('rock climbing') || lowerTrait.includes('climbing')) {
    return `How's your climbing progress`;
  }
  if (lowerTrait.includes('muay thai')) {
    return `How's your muay thai training`;
  }
  if (lowerTrait.includes('boxing')) {
    return `How's your boxing training`;
  }
  if (lowerTrait.includes('run')) {
    return `How's your running training`;
  }
  
  // Travel/Adventure
  if (lowerTrait.includes('travel') && !lowerTrait.includes('wife') && !lowerTrait.includes('gf') && !lowerTrait.includes('fiancee')) {
    return `How was your recent travels`;
  }
  if (lowerTrait.includes('adventure') && !lowerTrait.includes('wife') && !lowerTrait.includes('friends')) {
    return `How was your latest adventure`;
  }
  if (lowerTrait.includes('adventure') && lowerTrait.includes('friends')) {
    return `How was the adventure with friends`;
  }
  if (lowerTrait.includes('sky diving') || lowerTrait.includes('skydiving')) {
    return `How was the sky diving experience`;
  }
  if (lowerTrait.includes('jetski')) {
    return `How was the jetski ride`;
  }
  
  // Fashion/Style Items (as second trait)
  if (lowerTrait.includes('glasses') || lowerTrait.includes('eyeglasses')) {
    return `Where did you get those cool glasses`;
  }
  if (lowerTrait.includes('watch')) {
    return `Where did you get that nice watch`;
  }
  if (lowerTrait.includes('jacket')) {
    return `Where did you get that stylish jacket`;
  }
  if (lowerTrait.includes('sunglasses') || lowerTrait.includes('shades')) {
    return `Where did you get those cool shades`;
  }
  if (lowerTrait.includes('hairstyle') || lowerTrait.includes('haircut')) {
    return `Where did you get that fresh cut`;
  }
  if (lowerTrait.includes('polo')) {
    return `Where did you get that cool polo`;
  }
  if (lowerTrait.includes('sneakers') || lowerTrait.includes('shoes')) {
    return `Where did you get those awesome sneakers`;
  }
  
  // Hobbies/Interests
  if (lowerTrait.includes('photo') && !lowerTrait.includes('photographer')) {
    return `How's the photography going`;
  }
  if (lowerTrait.includes('music')) {
    return `How's your music coming along`;
  }
  if (lowerTrait.includes('party') || lowerTrait.includes('partying')) {
    return `How was your recent party`;
  }
  if (lowerTrait.includes('coffee')) {
    return `How's your coffee exploration`;
  }
  if (lowerTrait.includes('baking')) {
    return `How's your baking skills progressing`;
  }
  if (lowerTrait.includes('anime')) {
    return `What anime are you watching lately`;
  }
  if (lowerTrait.includes('gaming') || lowerTrait.includes('game')) {
    return `How's your gaming setup`;
  }
  if (lowerTrait.includes('collecting') && lowerTrait.includes('watch')) {
    return `How's your watch collection growing`;
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
      .replace(/entrepreneur vibes$/i, "entrepreneur vibes lah")
      .replace(/entrepreneurial spirit$/i, "entrepreneurial spirit sia")
      .replace(/tech genius$/i, "tech genius lah")
      .replace(/noble profession$/i, "noble profession lah")
      .replace(/life saver$/i, "life saver sia")
      .replace(/healthcare hero$/i, "healthcare hero lah")
      .replace(/healing hands$/i, "healing hands sia")
      .replace(/hero status$/i, "hero status lah")
      .replace(/keeping us safe$/i, "keeping us safe sia")
      .replace(/culinary master$/i, "culinary master sia")
      .replace(/style creator$/i, "style creator lah")
      .replace(/music maestro$/i, "music maestro sia")
      .replace(/artistic eye$/i, "artistic eye lah")
      .replace(/sound creator$/i, "sound creator sia")
      .replace(/creative genius$/i, "creative genius lah")
      .replace(/money guru$/i, "money guru sia")
      .replace(/business success$/i, "business success lah")
      
      // Education/Military patterns
      .replace(/legal eagle$/i, "legal eagle sia")
      .replace(/impressive$/i, "impressive lah")
      .replace(/engineering pro$/i, "engineering pro sia")
      .replace(/knowledge seeker$/i, "knowledge seeker lah")
      .replace(/fresh start$/i, "fresh start sia")
      .replace(/soldier strong$/i, "soldier strong lah")
      .replace(/business leader$/i, "business leader sia")
      .replace(/academic superstar$/i, "academic superstar lah")
      
      // Fitness/Sports patterns
      .replace(/power$/i, "power lah")
      .replace(/beast mode$/i, "beast mode lah")
      .replace(/strength king$/i, "strength king sia")
      .replace(/aquatic ace$/i, "aquatic ace lah")
      .replace(/sports warrior$/i, "sports warrior sia")
      .replace(/fighter spirit$/i, "fighter spirit lah")
      .replace(/pedal power$/i, "pedal power sia")
      .replace(/scaling heights$/i, "scaling heights lah")
      .replace(/cardio king$/i, "cardio king sia")
      .replace(/martial arts master$/i, "martial arts master lah")
      .replace(/sword master$/i, "sword master sia")
      .replace(/water warrior$/i, "water warrior lah")
      .replace(/wave rider$/i, "wave rider sia")
      .replace(/strike master$/i, "strike master lah")
      .replace(/underwater explorer$/i, "underwater explorer sia")
      .replace(/strength champion$/i, "strength champion lah")
      .replace(/muscle master$/i, "muscle master sia")
      
      // Fashion/Style patterns
      .replace(/fashion game strong$/i, "fashion game strong lah")
      .replace(/fresh style$/i, "fresh style sia")
      .replace(/good taste$/i, "good taste lah")
      .replace(/winter ready$/i, "winter ready sia")
      .replace(/classy vibes$/i, "classy vibes lah")
      .replace(/streetwear king$/i, "streetwear king sia")
      .replace(/cozy style$/i, "cozy style lah")
      .replace(/cool factor$/i, "cool factor sia")
      .replace(/intellectual look$/i, "intellectual look lah")
      .replace(/timepiece game$/i, "timepiece game sia")
      .replace(/shoe game fire$/i, "shoe game fire lah")
      .replace(/wheels on point$/i, "wheels on point sia")
      
      // Lifestyle/Personal patterns
      .replace(/wanderlust strong$/i, "wanderlust strong sia")
      .replace(/taste buds on point$/i, "taste buds on point lah")
      .replace(/thrill seeker$/i, "thrill seeker sia")
      .replace(/artistic vision$/i, "artistic vision lah")
      .replace(/congratulations$/i, "congratulations lah")
      .replace(/coffee connoisseur$/i, "coffee connoisseur sia")
      .replace(/caffeine king$/i, "caffeine king lah")
      .replace(/family man$/i, "family man sia")
      
      // Default pattern
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
    if (modifiedMessage.startsWith("What")) {
      modifiedMessage = modifiedMessage + " ah";
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
  
  // Split traits by ' / ' (space-slash-space) if available, preserving parentheses content
  const traitParts = traitsLine.split(' / ').map(t => t.trim());
  
  return {
    name,
    traits: {
      firstTrait: traitParts[0] || '',
      secondTrait: traitParts.length > 1 ? traitParts[1] : ''
    }
  };
}; 