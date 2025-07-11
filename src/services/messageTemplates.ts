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
    return `saw that you're into fitness, love the dedication`;
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
  if (lowerTrait.includes('health worker')) {
    return `saw that you're a health worker, respect for the service`;
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
  if (lowerTrait.includes('photography')) {
    return `saw your photography work, artistic eye`;
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
  if (lowerTrait.includes('designer')) {
    return `saw that you're a designer, creative talent`;
  }
  if (lowerTrait.includes('real estate agent')) {
    return `saw that you're a real estate agent, property pro`;
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
  
  // Default response for unmatched traits - don't use "into" for professions
  if (lowerTrait.includes('worker') || lowerTrait.includes('agent') || 
      lowerTrait.includes('manager') || lowerTrait.includes('director') || 
      lowerTrait.includes('specialist') || lowerTrait.includes('consultant') || 
      lowerTrait.includes('analyst') || lowerTrait.includes('professional') ||
      lowerTrait.includes('designer') || lowerTrait.includes('developer') ||
      lowerTrait.includes('engineer') || lowerTrait.includes('doctor') ||
      lowerTrait.includes('lawyer') || lowerTrait.includes('accountant')) {
    return `saw that you're a ${lowerTrait}, impressive`;
  }
  
  // For hobbies and interests, use "into"
  return `saw that you're into ${lowerTrait}, love it haha`;
};

/**
 * Generates a personalized message for the second trait (PS section)
 * Using trait interpretation rather than direct text copying
 */
export const generateSecondTraitMessage = (trait: string): string => {
  const lowerTrait = normalizeTraitText(trait);
  
  // Work/Business Traits
  if (lowerTrait.includes('promot') && (lowerTrait.includes('work') || lowerTrait.includes('business'))) {
    const options = [
      "How's the business promotion going? Always hustling",
      "Love seeing you push your work out there — what's your main focus right now",
      "Your marketing game is solid bro — what platforms work best for you"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('business owner') || lowerTrait.includes('entrepreneur')) {
    const options = [
      "How's the business treating you these days",
      "Entrepreneurship life keeping you busy? Love the hustle",
      "What's the latest with your business ventures"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('content creator')) {
    const options = [
      "How's the content creation going? Always creating something cool",
      "Your content game is strong — what's your favorite platform to create on",
      "Love seeing your creative work — what projects you working on now"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Work at specific place
  if (lowerTrait.includes('work') && lowerTrait.includes('at')) {
    const workplace = extractHandleOrWebsite(lowerTrait) || lowerTrait.split('at')[1]?.trim() || 'your workplace';
    const options = [
      `How's everything going with ${workplace}? Love seeing the content`,
      `What's new with your work at ${workplace}`,
      `How's the journey with ${workplace} going`
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Personal Life Traits
  if (lowerTrait.includes('got married') || lowerTrait.includes('married')) {
    const options = [
      "How's married life treating you? Hope you're both doing amazing",
      "Congrats on the marriage bro — how are you guys settling in",
      "Marriage life looks good on you! How's everything going"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('got engaged') || lowerTrait.includes('engaged')) {
    const options = [
      "How's the engagement going? Must be exciting planning everything",
      "Congrats on the engagement bro — when's the big day",
      "Engagement life treating you well? So happy for you both"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('cat') && (lowerTrait.includes('has') || lowerTrait.includes('pet') || lowerTrait.includes('love'))) {
    const options = [
      "How's your cat doing? Always love seeing pet owners",
      "Your cat looks adorable in your pics — what's their name",
      "Cat parent life treating you well? They're such great companions"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('dog') && (lowerTrait.includes('has') || lowerTrait.includes('pet') || lowerTrait.includes('love'))) {
    const options = [
      "How's your dog doing? Always love fellow dog owners",
      "Your dog looks awesome in your pics — what breed is it",
      "Dog parent life treating you well? Best companions ever"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('babies') || lowerTrait.includes('kids') || lowerTrait.includes('children')) {
    const options = [
      "How are the little ones doing? Parent life keeping you busy",
      "Kids must keep you on your toes! How's dad life",
      "Family life looks good on you bro — how are the kids"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Hobby/Interest Traits
  if (lowerTrait.includes('noodles') || lowerTrait.includes('foodie') || lowerTrait.includes('food')) {
    const options = [
      "Still exploring new food spots? Always love meeting fellow foodies",
      "What's your latest food discovery? Always looking for recommendations",
      "Your food game is on point — any favorite restaurants lately"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('cocktail') || lowerTrait.includes('beer') || lowerTrait.includes('drinks')) {
    const options = [
      "Still enjoying the cocktail scene? Any favorite spots",
      "What's your go-to drink these days? Always curious about recommendations",
      "Your taste in drinks is solid — any favorite bars"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Photography
  if (lowerTrait.includes('photography')) {
    const options = [
      "Been capturing any interesting shots lately? Your photography skills are great",
      "What's your favorite subject to photograph? Your shots look amazing",
      "Your photography work is impressive — what camera do you use"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Travel
  if (lowerTrait.includes('travel')) {
    const options = [
      "How's traveling with the family going? Any favorite destinations",
      "Any exciting travel plans coming up? Love seeing your adventures",
      "Where's your favorite place you've traveled to so far"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Education
  if (lowerTrait.includes('stud') && lowerTrait.includes('law')) {
    const options = [
      "How's the legal career going since your studies",
      "Law is such a challenging field — what area are you focusing on",
      "Your legal background is impressive — what kind of law interests you most"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Clothing Items - Shirts/Tops
  if (lowerTrait.includes('polo') && (lowerTrait.includes('stylish') || lowerTrait.includes('nice') || lowerTrait.includes('cool'))) {
    const options = [
      "Where'd you get your polo from bro? Looks really sharp",
      "That polo fits you perfectly man — what brand is it",
      "Your polo game is on point! Where do you shop for them"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('tshirt') || lowerTrait.includes('t-shirt') || lowerTrait.includes('t shirt')) {
    if (lowerTrait.includes('nice') || lowerTrait.includes('cool') || lowerTrait.includes('awesome')) {
      const options = [
        "That tshirt looks great on you — where'd you pick it up",
        "Cool tshirt choice man! What's your go-to brand",
        "Your tshirt game is solid — any favorite stores"
      ];
      return options[Math.floor(Math.random() * options.length)];
    }
  }
  
  if (lowerTrait.includes('jacket') && (lowerTrait.includes('stylish') || lowerTrait.includes('cool') || lowerTrait.includes('awesome'))) {
    const options = [
      "That jacket is fire bro — where'd you get it from",
      "Your jacket game is next level! What brand is that",
      "Love the jacket choice — any favorite places to shop"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('sweater') && (lowerTrait.includes('nice') || lowerTrait.includes('stylish') || lowerTrait.includes('cool'))) {
    const options = [
      "That sweater looks cozy and stylish — where'd you find it",
      "Your sweater game is on point! What's your favorite brand",
      "Love the sweater choice — perfect for the weather right"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('puffer') && lowerTrait.includes('jacket')) {
    const options = [
      "That puffer jacket looks sick — keeping you warm and stylish",
      "Your puffer game is strong! What brand do you recommend",
      "Love the puffer choice — perfect for the season right"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Coat - special handling for "awesome coat"
  if (lowerTrait.includes('coat')) {
    const options = [
      "That coat looks great on you — where'd you get it from",
      "Your coat style is on point! What brand is it",
      "Love the coat choice — perfect for your style"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Bottoms
  if (lowerTrait.includes('jeans') && (lowerTrait.includes('nice') || lowerTrait.includes('cool') || lowerTrait.includes('awesome'))) {
    const options = [
      "Those jeans in your pic look great — what brand are those",
      "Your jeans fit perfectly bro — where do you shop for them",
      "Love the jeans choice — any favorite denim brands"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Accessories
  if (lowerTrait.includes('sunglasses') || lowerTrait.includes('shades')) {
    const options = [
      "Those sunglasses are clean bro — what brand are they",
      "Your sunglasses game is on point! Where'd you get them",
      "Love the sunglasses choice — perfect for the sunny weather"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if ((lowerTrait.includes('eyeglasses') || lowerTrait.includes('glasses')) && !lowerTrait.includes('sun')) {
    const options = [
      "Your glasses look really good on you — what brand are they",
      "Those glasses suit you perfectly! Where'd you get them",
      "Love the glasses choice — great style bro"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('cap') && (lowerTrait.includes('nice') || lowerTrait.includes('cool') || lowerTrait.includes('awesome'))) {
    const options = [
      "That cap looks sick on you — where'd you pick it up",
      "Your cap game is solid! What's your favorite brand",
      "Love the cap choice — perfect fit bro"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('beanie') && (lowerTrait.includes('cute') || lowerTrait.includes('nice') || lowerTrait.includes('cool'))) {
    const options = [
      "That beanie looks cozy and stylish — where'd you get it",
      "Your beanie game is on point! Perfect for the weather right",
      "Love the beanie choice — keeps you warm and looking good"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if (lowerTrait.includes('watch') && (lowerTrait.includes('awesome') || lowerTrait.includes('nice') || lowerTrait.includes('cool'))) {
    const options = [
      "That watch is clean bro — what brand is it",
      "Your watch game is solid! Where'd you get it from",
      "Love the watch choice — perfect accessory game"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Appearance/Style
  if (lowerTrait.includes('beard') && (lowerTrait.includes('cool') || lowerTrait.includes('nice') || lowerTrait.includes('awesome'))) {
    const options = [
      "By the way, solid beard game man — what's your grooming routine",
      "That beard looks great on you — any grooming tips",
      "Your beard game is on point! How long you been growing it"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  if ((lowerTrait.includes('hairstyle') || lowerTrait.includes('haircut')) && 
      (lowerTrait.includes('unique') || lowerTrait.includes('cool') || lowerTrait.includes('awesome'))) {
    const options = [
      "Your haircut looks fresh bro — where do you get it done",
      "That hairstyle suits you perfectly! Who's your barber",
      "Love the haircut choice — any favorite barbershops"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Generic appearance traits - avoid awkward phrasing like "How long have you been into awesome coat?"
  if ((lowerTrait.includes('awesome') || lowerTrait.includes('nice') || lowerTrait.includes('cool') || 
       lowerTrait.includes('stylish') || lowerTrait.includes('great')) && 
      (lowerTrait.includes('look') || lowerTrait.includes('style') || lowerTrait.includes('outfit') || 
       lowerTrait.includes('fashion') || lowerTrait.includes('dressed'))) {
    const options = [
      "Your style is always on point — where do you shop usually",
      "Love your fashion sense — any style inspirations",
      "Your outfit choices are solid — what's your go-to look"
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Default PS message based on trait category
  if (isAppearanceTrait(lowerTrait)) {
    return "Your style is always on point — any fashion recommendations";
  }
  
  if (isProfessionTrait(lowerTrait)) {
    return "How's work been treating you lately";
  }
  
  if (isHobbyTrait(lowerTrait)) {
    return "Been enjoying your interests lately? Always good to make time for what you love";
  }
  
  // Truly generic fallback
  return "How's everything been going with you lately";
};

// Helper functions to categorize traits
function isAppearanceTrait(trait: string): boolean {
  const appearanceKeywords = ['jacket', 'coat', 'shirt', 'tshirt', 't-shirt', 'hoodie', 'sweater', 
                             'jeans', 'pants', 'shoes', 'sneakers', 'watch', 'glasses', 'sunglasses',
                             'cap', 'hat', 'beanie', 'style', 'outfit', 'fashion', 'dressed', 'look'];
  return appearanceKeywords.some(keyword => trait.includes(keyword));
}

function isProfessionTrait(trait: string): boolean {
  const professionKeywords = ['work', 'job', 'career', 'business', 'profession', 'company',
                             'doctor', 'lawyer', 'engineer', 'teacher', 'designer', 'developer',
                             'manager', 'director', 'consultant', 'analyst', 'specialist'];
  return professionKeywords.some(keyword => trait.includes(keyword));
}

function isHobbyTrait(trait: string): boolean {
  const hobbyKeywords = ['hobby', 'interest', 'passion', 'sport', 'fitness', 'gym', 'workout',
                        'run', 'swim', 'bike', 'hike', 'climb', 'photography', 'music', 'art',
                        'reading', 'gaming', 'travel', 'food', 'cooking', 'baking'];
  return hobbyKeywords.some(keyword => trait.includes(keyword));
}

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

/**
 * Generates the complete message based on the template, traits, and tone level
 */
export const generateTemplateMessage = (
  name: string, 
  traits: TraitPersonalization,
  toneLevel: string,
  template: string = 'company'
): string => {
  // Parse traits
  const firstTrait = traits.firstTrait;
  const secondTrait = traits.secondTrait || firstTrait; // Use first trait as fallback
  
  // Generate personalized trait messages
  const firstTraitMessage = generateFirstTraitMessage(firstTrait);
  let secondTraitMessage = generateSecondTraitMessage(secondTrait);
  
  // Ensure PS line is relevant to the person's traits
  // If the default generic message was returned, try using the first trait instead
  if (secondTraitMessage === "How's everything been going with you lately" && firstTrait !== secondTrait) {
    const alternateMessage = generateSecondTraitMessage(firstTrait);
    if (alternateMessage !== "How's everything been going with you lately") {
      secondTraitMessage = alternateMessage;
    }
  }
  
  // Add appropriate emoji to PS section
  secondTraitMessage = addAppropriateEmoji(secondTraitMessage);
  
  // Different templates based on sender and message type
  let message = '';
  
  if (template === 'max-company') {
    // MAX - Company Account Template
    // Apply tone modifiers based on level
    const introWithTone = applyToneModifiers(`Max here btw, I saw that you were following a couple gym accounts, keep it up in the gym btw`, 'intro', toneLevel);
    const btwWithTone = applyToneModifiers(firstTraitMessage, 'btw', toneLevel);
    const psWithTone = applyToneModifiers(secondTraitMessage, 'ps', toneLevel);
    
    // Format PS with italics
    const formattedPs = `*${psWithTone}?*`;
    
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
    
    message = `Hey ${name}, ${introWithTone} : )  

BTW, ${btwWithTone} 👍 

${bodyIntro}  

${servicesSection} 

${bodyOutro}  

PS: ${formattedPs} : )`;
  } 
  else if (template === 'bob-followup') {
    // BOB FOLLOW UP Template
    // Apply tone modifiers based on level
    const psWithTone = applyToneModifiers(secondTraitMessage, 'ps', toneLevel);
    
    // Format PS with italics
    const formattedPs = `*${psWithTone}?*`;
    
    // Standard services section (always in standard English)
    const servicesSection = `They get: 
✅ a Personalised Diet Plan 
✅ a Personalised Training Plan 
✅ Telegram Chat Support 
✅ Physical Form Correction 
✅ To improve Mind Muscle Connection 
✅ To make more progress with Less Time and Effort`;

    let intro = `Bob here, i'm not too sure if my friend Max has reached out to you yet, @max_apolloss`;
    let bodyIntro = `but we are hosting a free training project trial, and 5 people can join us for free : )`;
    let bodyOutro = `To push them in the right direction this year 💪🏻
Would you be opposed to taking a slot for yourself?`;

    if (toneLevel === 'level3' || toneLevel === 'level4') {
      bodyOutro = bodyOutro.replace('Would you be opposed to taking a slot for yourself?', 'Want to take one slot or not?');
    }

    if (toneLevel === 'level4') {
      intro = intro.replace('Bob here,', 'Bob here lah,')
                  .replace("i'm not too sure if", 'not sure if');
      bodyIntro = bodyIntro.replace('but we are hosting', 'but we got')
                          .replace('can join us', 'can join with us');
      bodyOutro = bodyOutro.replace('To push them in the right direction this year', 'Help them level up this year');
    }
    
    message = `Hey ${name}, ${intro}
${bodyIntro}

${servicesSection}

${bodyOutro}

PS: ${formattedPs} : )`;
  }
  else if (template === 'matthew-followup') {
    // MATTHEW FOLLOW UP Template
    // Apply tone modifiers based on level
    const psWithTone = applyToneModifiers(secondTraitMessage, 'ps', toneLevel);
    
    // Format PS with italics
    const formattedPs = `*${psWithTone}?*`;
    
    // Standard services section (always in standard English)
    const servicesSection = `They get: 
✅ a Personalised Diet Plan 
✅ a Personalised Training Plan 
✅ Telegram Chat Support 
✅ Physical Form Correction 
✅ To improve Mind Muscle Connection 
✅ To make more progress with Less Time and Effort`;

    let intro = `Matthew here, i'm not too sure if my friend Max has reached out to you yet, @max_apolloss`;
    let bodyIntro = `but we are hosting a free training project trial, and 5 people can join us for free : )`;
    let bodyOutro = `To push them in the right direction this year 💪🏻
Would you be opposed to taking a slot for yourself?`;

    if (toneLevel === 'level3' || toneLevel === 'level4') {
      bodyOutro = bodyOutro.replace('Would you be opposed to taking a slot for yourself?', 'Want to take one slot or not?');
    }

    if (toneLevel === 'level4') {
      intro = intro.replace('Matthew here,', 'Matthew here lah,')
                  .replace("i'm not too sure if", 'not sure if');
      bodyIntro = bodyIntro.replace('but we are hosting', 'but we got')
                          .replace('can join us', 'can join with us');
      bodyOutro = bodyOutro.replace('To push them in the right direction this year', 'Help them level up this year');
    }
    
    message = `Hey ${name}, ${intro}
${bodyIntro}

${servicesSection}

${bodyOutro}

PS: ${formattedPs} : )`;
  }
  else {
    // Original Company Account Template (Jet)
    // Apply tone modifiers based on level
    const introWithTone = applyToneModifiers(`Jet here btw, I saw that you were following a couple gym accounts, keep it up in the gym btw`, 'intro', toneLevel);
    const btwWithTone = applyToneModifiers(firstTraitMessage, 'btw', toneLevel);
    const psWithTone = applyToneModifiers(secondTraitMessage, 'ps', toneLevel);
    
    // Format PS with italics
    const formattedPs = `*${psWithTone}?*`;
    
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
    
    message = `Hey ${name}, ${introWithTone} : )  

BTW, ${btwWithTone} 👍 

${bodyIntro}  

${servicesSection} 

${bodyOutro}  

PS: ${formattedPs} : )`;
  }

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
  
  // Handle social media handles and compound traits properly
  // Look for patterns like (ig/handle) and treat them as a single trait
  const processedTraitsLine = traitsLine.replace(/\(\s*ig\/[^)]+\)/g, match => match.replace(/ \/ /g, '_SLASH_'));
  
  // Split traits by ' / ' (space-slash-space)
  const traitParts = processedTraitsLine.split(' / ').map(t => t.trim().replace(/_SLASH_/g, ' / '));
  
  return {
    name,
    traits: {
      firstTrait: traitParts[0] || '',
      secondTrait: traitParts.length > 1 ? traitParts[1] : ''
    }
  };
}; 