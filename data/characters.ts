/**
 * Ajjo Khediye — Full Character Bible v2.0 (19 characters)
 * Source: characters-AK_v3.pdf
 *
 * LOCKED IDENTITIES:
 * - Uda Singh UUID: 3aaad48b-2c6f-4e52-a15e-9ed281820e92
 * - Edi Kaur UUID: 6aece52f-a0d8-40b5-9541-7fccbe0fa7d3
 * - Uda Singh's Punjabi address term: ਉੜੇ ਪੁੱਤ (never ਉਦੇ/ਉਰੇ)
 * - Papa Ji: deep navy blue dastar, never olive green
 *
 * Gurmukhi name fields use .font-gurmukhi-locked and are NEVER animated.
 */

export type CharacterChapter = "family" | "friends" | "animals";
export type CastWeight = "HIGH" | "MEDIUM" | "LOW";

export interface Character {
  slug: string;
  castNumber: number; // 01–19 from the bible
  chapter: CharacterChapter;
  name: string;
  nameGurmukhi: string;
  uuid?: string;
  role: string; // short tagline / "Story Role" headline
  tagline: string; // one-line description from the bible
  ageGender: string; // e.g. "Age 3–4, toddler · Male · Sikh"
  setting: string;

  visualDescription: string;
  personality: {
    traits: string[]; // e.g. ["Curious", "Hungry", "Brave-but-wobbly"]
    strength: string;
    flaw: string;
    culture: string;
  };
  voice: {
    description: string;
    signature: string[]; // signature phrases
    addressing?: string; // how they address others
  };
  storyRole: {
    drives: string;
    role: string;
    pairsWith: string[]; // slugs
    never: string;
  };
  culturalAnchor: {
    represents: string;
    props: string;
    peak: string;
  };
  colorPalette: string[]; // hex values from the bible
  /**
   * Plush toy reference — present only for characters with a locked
   * physical plush product (currently Paalo). Paalo exists in plush
   * form ONLY — no other render style should be used for products.
   */
  plush?: {
    sizeCm: number;
    palette: { name: string; hex: string }[];
    poses: string[];
    expressions: string[];
    variants: string[]; // e.g. "Paalo Pink", "Paalo Brown" — collectible siblings
  };
  agentFlags: {
    castWeight: CastWeight;
    episodeTypes: string[];
    voTone: string;
    neverPairWith?: string[]; // slugs
  };
  freepikStyleAnchor: string;

  /** Accent color used for this character's pages — derived from palette. */
  accentColor: string;
  /**
   * Optional path to a locked portrait image (cropped from a reference
   * sheet). When present, shown in CharacterHero alongside the name.
   */
  portraitImage?: string;
}

export const characters: Character[] = [
  // ============================================================
  // CHAPTER 01 — THE FAMILY (ਪਰਿਵਾਰ)
  // ============================================================
  {
    slug: "uda-singh",
    castNumber: 1,
    chapter: "family",
    name: "Uda Singh",
    nameGurmukhi: "ਉੜਾ ਸਿੰਘ",
    uuid: "3aaad48b-2c6f-4e52-a15e-9ed281820e92",
    role: "Protagonist / audience proxy",
    tagline:
      "A curious Sikh toddler from a Punjabi village who stumbles into every cultural adventure with wide eyes and an even wider appetite.",
    ageGender: "Age 3–4, toddler · Male · Sikh · Village setting",
    setting: "Village setting",
    visualDescription:
      "Warm wheatish skin, large round brown eyes, chubby toddler build. Olive-green patka never without it. White cotton kurta pajama, brown chappals. Pixar soft render, golden-hour lighting.",
    personality: {
      traits: ["Curious", "Hungry", "Brave-but-wobbly"],
      strength: "Asks what adults forget to ask.",
      flaw: "Distracted by food at worst moments.",
      culture: "Eager learner — everything is magical.",
    },
    voice: {
      description: "Simple Punjabi, toddler vocab. Short sentences.",
      signature: ["Bhukha haan!", "Eda ki hunda?"],
      addressing: "Addresses others: Tu",
    },
    storyRole: {
      drives: "food, festival, curiosity",
      role: "Protagonist / audience proxy",
      pairsWith: ["edi-kaur", "paalo"],
      never: "mean, sarcastic, dismissive of elders",
    },
    culturalAnchor: {
      represents: "Sikh childhood + village life",
      props: "Patka, mitti da bartan, charpai",
      peak: "Vaisakhi, Gurpurab",
    },
    colorPalette: ["#E8DFC8", "#6B8C42", "#F5F0E8", "#C4956A", "#D4A867"],
    agentFlags: {
      castWeight: "HIGH",
      episodeTypes: ["food", "festival", "language", "adventure"],
      voTone: "Soft, playful, toddler wonder",
    },
    freepikStyleAnchor:
      "Pixar 3D render, Sikh toddler boy, olive green patka, white kurta pajama, warm wheatish skin, golden-hour village background, soft lighting",
    accentColor: "#6B8C42",
  },
  {
    slug: "mummy-ji",
    castNumber: 2,
    chapter: "family",
    name: "Mummy Ji",
    nameGurmukhi: "ਮੰਮੀ ਜੀ",
    role: "Emotional + practical guide",
    tagline:
      "Warm, smart, and always multitasking — the emotional intelligence of the household, wrapped in a beautiful peach salwar suit.",
    ageGender: "Young mother · Adult Female · Punjabi · Home setting",
    setting: "Home setting",
    visualDescription:
      "Warm medium skin, soft expressive brown eyes, rosy cheeks, gentle smile. Dark hair under a peach dupatta draped over head. Peach salwar suit with floral embroidery at hem. Flat peach shoes. Pixar soft render.",
    personality: {
      traits: ["Caring", "Smart", "Balanced"],
      strength: "Emotional intelligence, multitasking.",
      flaw: "Slightly strict sometimes.",
      culture: "Home manager — holds the household together.",
    },
    voice: {
      description: "Warm Punjabi, clear and calm. Balanced vocabulary.",
      signature: ["Dhyaan naal…"],
      addressing: "Addresses Uda: Tu (loving) · Elders: Tusi",
    },
    storyRole: {
      drives: "nurturing, teaching, home",
      role: "Emotional + practical guide",
      pairsWith: ["uda-singh", "papa-ji"],
      never: "helpless or absent-minded",
    },
    culturalAnchor: {
      represents: "Household harmony",
      props: "Food, kitchen, dupatta",
      peak: "Cooking/food episodes, Teej",
    },
    colorPalette: ["#F4C5CE", "#E8A0AD", "#FFF0F3", "#C2355A", "#8B5E3C"],
    agentFlags: {
      castWeight: "HIGH",
      episodeTypes: ["food", "nurturing", "teaching", "festival"],
      voTone: "Warm, calm, caring",
    },
    freepikStyleAnchor:
      "Pixar 3D render, young Punjabi mother, peach salwar suit with floral embroidery, peach dupatta draped over head, warm medium skin, soft brown eyes, gentle smile, home interior background",
    accentColor: "#C2355A",
  },
  {
    slug: "papa-ji",
    castNumber: 3,
    chapter: "family",
    name: "Papa Ji",
    nameGurmukhi: "ਪਾਪਾ ਜੀ",
    role: "Protector / role model",
    tagline:
      "Calm, upright, and dependable — the steady hand that guides with a warm laugh and a quiet word of wisdom.",
    ageGender: "Young father · Adult Male · Sikh · Village / home setting",
    setting: "Village / home setting",
    visualDescription:
      "Warm skin, expressive amber-brown eyes, neat trimmed black beard. Navy blue dastar (full turban) — never olive green. Light blue kurta pajama, dark chappals. Tall, upright posture. Pixar soft render, clean neutral background.",
    personality: {
      traits: ["Responsible", "Supportive", "Calm"],
      strength: "Guidance, stability, quiet strength.",
      flaw: "Sometimes too serious.",
      culture: "Provider energy — Punjabi man of the house.",
    },
    voice: {
      description: "Balanced Punjabi, measured tone.",
      signature: ["Theek tarah karo…"],
      addressing: "Addresses Uda: Tu · Elders: Tusi",
    },
    storyRole: {
      drives: "guidance, farm, discipline",
      role: "Protector / role model",
      pairsWith: ["mummy-ji", "daada-ji"],
      never: "angry, dismissive of Uda's curiosity",
    },
    culturalAnchor: {
      represents: "Sikh manhood + discipline + care",
      props: "Tools, farm, work elements",
      peak: "Vaisakhi, harvest episodes",
    },
    colorPalette: ["#2D3A8C", "#8AAAD4", "#EEF2FF", "#C4956A", "#3D2010"],
    agentFlags: {
      castWeight: "MEDIUM",
      episodeTypes: ["guidance", "farm", "festival", "adventure"],
      voTone: "Calm, steady, warm authority",
    },
    freepikStyleAnchor:
      "Pixar 3D render, young Sikh Punjabi father, navy blue dastar, light blue kurta pajama, trimmed black beard, warm skin, amber eyes, upright posture, neutral or village background",
    accentColor: "#2D3A8C",
  },
  {
    slug: "daada-ji",
    castNumber: 4,
    chapter: "family",
    name: "Daada Ji",
    nameGurmukhi: "ਦਾਦਾ ਜੀ",
    role: "Wisdom giver, moral anchor",
    tagline:
      "The keeper of a thousand stories — slow to speak, but every word lands like a seed that grows into wisdom.",
    ageGender: "Elder · Grandfather · Male · Sikh · Village / charpai setting",
    setting: "Village / charpai setting",
    visualDescription:
      "Warm wheatish skin, kind wrinkled face, white beard and moustache, soft gentle eyes. Light grey dastar, beige-cream kurta pajama, flat chappals. Always holding a wooden walking stick. Pixar soft render.",
    personality: {
      traits: ["Wise", "Calm", "Grounded"],
      strength: "Deep life wisdom, storytelling.",
      flaw: "Slightly slow, old-school thinking.",
      culture: "Tradition keeper — living archive of Punjabi heritage.",
    },
    voice: {
      description: "Soft, slow Punjabi. Storytelling tone. Rich vocabulary.",
      signature: ["Pehla vi eh hunda si…"],
      addressing: "Addresses all: Tusi (respectful)",
    },
    storyRole: {
      drives: "heritage, moral lessons, folk tales",
      role: "Wisdom giver, moral anchor",
      pairsWith: ["uda-singh", "daadi-ji"],
      never: "dismissive of modern curiosity",
    },
    culturalAnchor: {
      represents: "Punjabi heritage + elders",
      props: "Walking stick, charpai",
      peak: "Storytelling, Gurpurab, history episodes",
    },
    colorPalette: ["#D8D4C0", "#E8E4D0", "#F5F4EE", "#8B7A5C", "#C4956A"],
    agentFlags: {
      castWeight: "MEDIUM",
      episodeTypes: ["storytelling", "heritage", "moral", "festival"],
      voTone: "Slow, warm, storytelling grandfather",
    },
    freepikStyleAnchor:
      "Pixar 3D render, elderly Sikh grandfather, light grey dastar, white beard and moustache, beige kurta pajama, wooden walking stick, kind wrinkled face, village or charpai setting",
    accentColor: "#8B7A5C",
  },
  {
    slug: "daadi-ji",
    castNumber: 5,
    chapter: "family",
    name: "Daadi Ji",
    nameGurmukhi: "ਦਾਦੀ ਜੀ",
    role: "Emotional heart of family",
    tagline:
      "The softest force in the universe — her Aaja puttar can fix any problem, mend any heart, and always comes with something warm from the kitchen.",
    ageGender: "Elder · Grandmother · Female · Punjabi · Home / kitchen setting",
    setting: "Home / kitchen setting",
    visualDescription:
      "Soft round face, warm smile, silver-grey hair covered with white dupatta. Round glasses with silver frames. Lavender salwar suit with small floral embroidery. Lavender flat shoes. Always holding a ball of knitting yarn. Pixar soft render.",
    personality: {
      traits: ["Loving", "Nurturing", "Gentle"],
      strength: "Emotional warmth, unconditional care.",
      flaw: "Slightly overprotective.",
      culture: "Maa-like comfort — the warmth of home personified.",
    },
    voice: {
      description: "Soft, caring Punjabi. Slow and sweet.",
      signature: ["Aaja puttar…"],
      addressing: "Addresses all children: Puttar (affectionate)",
    },
    storyRole: {
      drives: "comfort, home, emotional resolution",
      role: "Emotional heart of family",
      pairsWith: ["uda-singh", "daada-ji"],
      never: "harsh, distant, or critical",
    },
    culturalAnchor: {
      represents: "Care + home warmth",
      props: "Knitting, food, dupatta, dholki",
      peak: "Comfort scenes, Lohri, Teej",
    },
    colorPalette: ["#C8A8E0", "#E8D4F8", "#F8F0FF", "#F0F0F0", "#7B4FA0"],
    agentFlags: {
      castWeight: "MEDIUM",
      episodeTypes: ["comfort", "food", "emotional", "festival"],
      voTone: "Soft, slow, sweet grandmother warmth",
    },
    freepikStyleAnchor:
      "Pixar 3D render, elderly Punjabi grandmother, lavender salwar suit with floral embroidery, white dupatta, silver round glasses, grey hair, warm smile, knitting yarn in hand, home setting",
    accentColor: "#7B4FA0",
  },
  {
    slug: "gabru",
    castNumber: 6,
    chapter: "family",
    name: "Gabru",
    nameGurmukhi: "ਗੱਬਰੂ",
    role: "Comic relief + cuteness anchor",
    tagline:
      "The family cat who acts like the real head of the household — sleepy 90% of the time, adorable 100% of the time.",
    ageGender: "Cat · Ageless · Non-verbal / cute sounds · Home / indoor setting",
    setting: "Home / indoor setting",
    visualDescription:
      "Fluffy white cat, perfectly round face, large golden eyes. Pink nose, pink paw pads. Beige collar with silver bell and Gabru name tag. Chubby sitting posture. Pixar soft render, pink or warm home background.",
    personality: {
      traits: ["Curious", "Lazy", "Funny"],
      strength: "Adorable charm that defuses any tension.",
      flaw: "Falls asleep at the most dramatic moments.",
      culture: "Mischievous house pet — ghar da pyaar.",
    },
    voice: {
      description:
        "Non-verbal. Communicates via expressive meows, yawns, slow blinks, sudden sprints.",
      signature: ["Meow~"],
    },
    storyRole: {
      drives: "light humor, cuteness, chaos",
      role: "Comic relief + cuteness anchor",
      pairsWith: [],
      never: "aggressive or scary",
    },
    culturalAnchor: {
      represents: "Ghar da pyaar (home love)",
      props: "Cushion, ball of yarn, sunny spot",
      peak: "Home scenes, lazy afternoon episodes",
    },
    colorPalette: ["#F8F0F0", "#D4A0A0", "#D4B870", "#A07878", "#FFFFFF"],
    agentFlags: {
      castWeight: "LOW",
      episodeTypes: ["humor", "home", "light adventure"],
      voTone: "Non-verbal — narrator describes reactions",
    },
    freepikStyleAnchor:
      "Pixar 3D render, fluffy white cat, round face, large golden eyes, beige collar with silver bell and Gabru name tag, pink paws, chubby sitting pose, warm pink or home background",
    accentColor: "#D4A0A0",
  },

  // ============================================================
  // CHAPTER 02 — THE FRIENDS (ਯਾਰ-ਦੋਸਤ)
  // ============================================================
  {
    slug: "edi-kaur",
    castNumber: 7,
    chapter: "friends",
    name: "Edi Kaur",
    nameGurmukhi: "ਏੜੀ ਕੌਰ",
    uuid: "6aece52f-a0d8-40b5-9541-7fccbe0fa7d3",
    role: "Explainer / culture keeper",
    tagline:
      "Sharp, cheerful, knows everything Uda Singh doesn't — and loves teaching it with dramatic flair.",
    ageGender: "Age 4–5 · Female · Punjabi",
    setting: "Village setting",
    visualDescription:
      "Warm brown skin, amber eyes, rosy cheeks. Two long dark braids with yellow bows. Yellow peter-pan collar dress with Gurmukhi ੲ embroidery detail on the chest. Pixar soft render.",
    personality: {
      traits: ["Confident", "Expressive", "Slightly bossy"],
      strength: "Natural teacher, explains with joy.",
      flaw: "Overestimates what others already know.",
      culture: "Keeper — proud of traditions.",
    },
    voice: {
      description: "Simple Punjabi, wider vocab than Uda.",
      signature: ["Enna vi nahi pata?!"],
      addressing: "Uda: Tu · Elders: Tusi",
    },
    storyRole: {
      drives: "language, craft, tradition",
      role: "Explainer / culture keeper",
      pairsWith: ["uda-singh"],
      never: "timid or without an opinion",
    },
    culturalAnchor: {
      represents: "Gurmukhi literacy + crafts",
      props: "Phulkari, slate + chalk",
      peak: "Language episodes, Lohri",
    },
    colorPalette: ["#F5C842", "#E8B830", "#FFFBE6", "#3D2010", "#8A6B00"],
    agentFlags: {
      castWeight: "HIGH",
      episodeTypes: ["language", "craft", "festival", "emotional"],
      voTone: "Bright, confident, slightly sing-song",
    },
    freepikStyleAnchor:
      "Pixar 3D render, Punjabi girl age 4-5, two long dark braids with yellow bows, yellow peter-pan collar dress, Gurmukhi ੲ embroidered on chest, warm brown skin, rosy cheeks, soft lighting",
    accentColor: "#E8B830",
  },
  {
    slug: "fateh-singh",
    castNumber: 8,
    chapter: "friends",
    name: "Fateh Singh",
    nameGurmukhi: "ਫਤਿਹ ਸਿੰਘ",
    role: "Main kid / alternate audience POV",
    tagline:
      "Brave, curious, and determined — the friend who never gives up, even when he probably should.",
    ageGender: "Age 6–7 · Male · Sikh",
    setting: "Village / outdoor setting",
    visualDescription:
      "Warm skin, expressive brown eyes, wide smile. Orange patka (small round turban). Blue kurta with gold border embroidery, yellow pajama, flat shoes. Slightly taller than Uda Singh. Pixar soft render.",
    personality: {
      traits: ["Brave", "Curious", "Determined"],
      strength: "Never gives up, keeps trying.",
      flaw: "Gets distracted by shiny things.",
      culture: "Sikh childhood — courage and resilience.",
    },
    voice: {
      description: "Childlike Punjabi, enthusiastic tone.",
      signature: ["Phir try karde haan!"],
      addressing: "Addresses peers: Tu",
    },
    storyRole: {
      drives: "adventure, challenge, discovery",
      role: "Main kid / alternate audience POV",
      pairsWith: ["uda-singh", "mehar"],
      never: "cowardly or mean-spirited",
    },
    culturalAnchor: {
      represents: "Sikh childhood + bravery",
      props: "Patka, toys, small kirpan symbol",
      peak: "Adventure, Gurpurab episodes",
    },
    colorPalette: ["#E8832A", "#7AAAD8", "#F5C842", "#D4A040", "#C4956A"],
    agentFlags: {
      castWeight: "MEDIUM",
      episodeTypes: ["adventure", "language", "festival", "challenge"],
      voTone: "Enthusiastic, brave, kid energy",
    },
    freepikStyleAnchor:
      "Pixar 3D render, Sikh boy age 6-7, bright orange patka, blue kurta with gold border embroidery, yellow pajama, warm skin, expressive wide smile, village or outdoor background",
    accentColor: "#E8832A",
  },
  {
    slug: "mehar",
    castNumber: 9,
    chapter: "friends",
    name: "Mehar",
    nameGurmukhi: "ਮਿਹਰ",
    role: "Guide / helper",
    tagline:
      "Smart, caring, and always two steps ahead — the friend who makes everything look easy, but actually worked hard for it.",
    ageGender: "Age 6–7 · Female · Punjabi",
    setting: "Village setting",
    visualDescription:
      "Warm brown skin, amber eyes, bright smile with rosy cheeks. Dark hair in two braids with colorful ribbon bows. Red Punjabi suit with floral embroidery, yellow dupatta, purple salwar, red juttis. Expressive hand gestures. Pixar soft render.",
    personality: {
      traits: ["Smart", "Caring", "Confident"],
      strength: "Helps others, natural guide.",
      flaw: "Slight perfectionist.",
      culture: "Learning + care — nurtures those around her.",
    },
    voice: {
      description: "Clear Punjabi, confident and kind.",
      signature: ["Easy si!"],
      addressing: "Addresses peers: Tu · Elders: Tusi",
    },
    storyRole: {
      drives: "teaching, challenge resolution",
      role: "Guide / helper",
      pairsWith: ["fateh-singh", "uda-singh"],
      never: "dismissive or show-off about being smart",
    },
    culturalAnchor: {
      represents: "Learning + Punjabi girlhood",
      props: "Books, dupatta, slate",
      peak: "Language, teaching episodes",
    },
    colorPalette: ["#D43040", "#F5C842", "#6030A0", "#E8A040", "#C4956A"],
    agentFlags: {
      castWeight: "MEDIUM",
      episodeTypes: ["teaching", "language", "emotional", "festival"],
      voTone: "Clear, confident, warm helper",
    },
    freepikStyleAnchor:
      "Pixar 3D render, Punjabi girl age 6-7, red Punjabi suit with floral embroidery, yellow dupatta, purple salwar, red juttis, two dark braids with colorful ribbons, warm brown skin, rosy cheeks, expressive hands",
    accentColor: "#D43040",
  },

  // ============================================================
  // CHAPTER 03 — THE ANIMALS (ਜਾਨਵਰ)
  // ============================================================
  {
    slug: "paalo",
    castNumber: 10,
    chapter: "animals",
    name: "Paalo",
    nameGurmukhi: "ਪਾਲੋ",
    role: "Comic relief + emotional anchor",
    tagline:
      "The farm's beloved cow — round, cheerful, more feelings than a whole village. Beloved by everyone, dramatic about everything.",
    ageGender: "Adult equivalent · Female · Cow · Farm setting",
    setting: "Farm setting",
    visualDescription:
      "LOCKED — Paalo exists in plush form only. Soft, huggable plush cow: white plush body with black irregular patches, pink snout, small beige horns, brown leather collar with a gold bell. Round chibi proportions, approx. 30cm. Stitched black eyes, minimal seams, soft plush fabric throughout. Never rendered as a realistic or Pixar 3D farm-cow style — plush only.",
    personality: {
      traits: ["Gentle", "Dramatic", "Emotionally expressive"],
      strength: "Reactions make small moments epic.",
      flaw: "Over-dramatic, slow to move.",
      culture: "Living symbol — farm, seva, village values.",
    },
    voice: {
      description: "Expressive moos + body language. Uda/Edi interpret her. Tone: warmly bovine, unhurried.",
      signature: [],
    },
    storyRole: {
      drives: "farm, food origin, seva",
      role: "Comic relief + emotional anchor",
      pairsWith: [],
      never: "aggressive or unhappy",
    },
    culturalAnchor: {
      represents: "Farm life + langar spirit",
      props: "Gold bell, degh, green grass",
      peak: "Vaisakhi, harvest",
    },
    colorPalette: ["#FFFFFF", "#2E2A26", "#F4B8C0", "#E8D2A8", "#8B5E3C", "#F0B429"],
    plush: {
      sizeCm: 30,
      palette: [
        { name: "White Plush", hex: "#FFFFFF" },
        { name: "Black Patch", hex: "#2E2A26" },
        { name: "Pink Snout", hex: "#F4B8C0" },
        { name: "Beige Horns", hex: "#E8D2A8" },
        { name: "Brown Collar", hex: "#8B5E3C" },
        { name: "Gold Bell", hex: "#F0B429" },
      ],
      poses: ["Sitting", "Leaning", "Waving", "Sleeping", "Hugging Alphabet"],
      expressions: ["Happy", "Excited", "Curious", "Sleepy", "Playful"],
      variants: ["Paalo", "Paalo Pink", "Paalo Brown"],
    },
    agentFlags: {
      castWeight: "MEDIUM",
      episodeTypes: ["farm", "food", "emotional", "adventure"],
      voTone: "Narrator describes reactions",
    },
    freepikStyleAnchor:
      "Plush toy product photography, soft huggable plush cow, white body with black irregular patches, pink snout, beige horns, brown leather collar with gold bell, round chibi proportions, approx 30cm, minimal seams, soft studio lighting — plush only, never Pixar 3D render",
    accentColor: "#8B5E3C",
    portraitImage: "/assets/characters/paalo/paalo-portrait.png",
  },
  {
    slug: "gittu",
    castNumber: 11,
    chapter: "animals",
    name: "Gittu",
    nameGurmukhi: "ਗਿੱਟੂ",
    role: "Chaos creator + energy driver",
    tagline:
      "The baby goat who has never walked when he could leap — always mid-air, mid-trouble, mid-adventure.",
    ageGender: "Baby goat · Male · Village",
    setting: "Village setting",
    visualDescription:
      "Light brown baby goat with white patches on face and belly. Small curved grey horns, big floppy ears with pink inner, tiny pink nose. Blue Phulkari bandana/scarf around neck. Always mid-leap or mid-run posture. Pixar soft render.",
    personality: {
      traits: ["Hyper", "Naughty", "Playful"],
      strength: "Fearless energy, pulls others into adventure.",
      flaw: "Impatient, creates unintentional chaos.",
      culture: "Playful village kid energy.",
    },
    voice: {
      description: "Fast Punjabi, excited tone. Short bursts.",
      signature: ["Chal jaldi!"],
    },
    storyRole: {
      drives: "action, fun, chaos",
      role: "Chaos creator + energy driver",
      pairsWith: ["tappu", "pompom"],
      never: "deliberately mean",
    },
    culturalAnchor: {
      represents: "Village kid playfulness",
      props: "Sling bag, open fields",
      peak: "Action/fun episodes",
    },
    colorPalette: ["#C8A870", "#F5F0E8", "#7AAAD8", "#80C060", "#8B7060"],
    agentFlags: {
      castWeight: "MEDIUM",
      episodeTypes: ["action", "farm", "fun", "adventure"],
      voTone: "Fast, excited, high-energy kid",
    },
    freepikStyleAnchor:
      "Pixar 3D render, cute baby goat, light brown with white patches, small grey horns, pink inner ears, blue phulkari bandana around neck, mid-leap action pose, village field background, golden light",
    accentColor: "#80C060",
  },
  {
    slug: "bholi",
    castNumber: 12,
    chapter: "animals",
    name: "Bholi",
    nameGurmukhi: "ਭੋਲੀ",
    role: "Emotional connector",
    tagline:
      "The fluffy white sheep who feels everything deeply and needs a little reassurance — but when she trusts, she gives everything.",
    ageGender: "Baby sheep · Female · Village / farm",
    setting: "Village / farm setting",
    visualDescription:
      "Fluffy white curly wool, round soft body, big innocent brown eyes with long lashes. Soft pink ears. Colourful phulkari-pattern scarf/bow around neck. Small hooves. Always gentle posture — never aggressive. Pixar soft render, farm or meadow background.",
    personality: {
      traits: ["Gentle", "Shy", "Kind"],
      strength: "Emotional warmth, deep empathy.",
      flaw: "Hesitant, needs reassurance before acting.",
      culture: "Innocence + care.",
    },
    voice: {
      description: "Soft, shy Punjabi. Quiet voice.",
      signature: ["Phir ton daso na…"],
    },
    storyRole: {
      drives: "emotional moments, kindness",
      role: "Emotional connector",
      pairsWith: ["daadi-ji", "edi-kaur"],
      never: "brave without encouragement first",
    },
    culturalAnchor: {
      represents: "Innocence + phulkari crafts",
      props: "Phulkari dupatta",
      peak: "Soft emotional episodes, Lohri",
    },
    colorPalette: ["#F8F0FF", "#F0E0FF", "#E8C8F8", "#F4A0B0", "#7040A0"],
    agentFlags: {
      castWeight: "LOW",
      episodeTypes: ["emotional", "soft", "craft", "festival"],
      voTone: "Soft, shy, gentle",
      neverPairWith: ["gittu"],
    },
    freepikStyleAnchor:
      "Pixar 3D render, fluffy white baby sheep, round curly wool body, big innocent brown eyes with long lashes, pink ears, colorful phulkari bow scarf around neck, gentle posture, meadow background",
    accentColor: "#7040A0",
  },
  {
    slug: "kukdi-rani",
    castNumber: 13,
    chapter: "animals",
    name: "Kukdi Rani",
    nameGurmukhi: "ਕੁੱਕੜੀ ਰਾਣੀ",
    role: "Comic drama generator",
    tagline:
      "Golden-brown hen with the energy of a village auntie — everything is an announcement, every moment is a performance.",
    ageGender: "Hen · Adult equivalent · Female · Farm/barn",
    setting: "Farm / barn setting",
    visualDescription:
      "Golden-amber brown hen, full round body, bright red comb and wattle. Expressive wide brown eyes with eyebrow-like feathers. Animated wings — always gesturing. Colourful beaded neck cloth. Orange feet. Dramatic pose always. Pixar soft render, barn setting.",
    personality: {
      traits: ["Dramatic", "Talkative", "Confident"],
      strength: "Expressiveness — makes every scene memorable.",
      flaw: "Overreacts to everything equally.",
      culture: "Loud village auntie energy 😄",
    },
    voice: {
      description: "Fast, loud Punjabi. Never pauses.",
      signature: ["Sunno meri gal!"],
    },
    storyRole: {
      drives: "comedy, announcements, chaos",
      role: "Comic drama generator",
      pairsWith: ["paalo", "lallu"],
      never: "quiet or calm",
    },
    culturalAnchor: {
      represents: "Village auntie / farm life",
      props: "Beads, barn, eggs basket",
      peak: "Morning / farm episodes",
    },
    colorPalette: ["#D4780A", "#E8A030", "#D03020", "#F8C870", "#8B3010"],
    agentFlags: {
      castWeight: "MEDIUM",
      episodeTypes: ["humor", "farm", "morning", "food"],
      voTone: "Loud, fast, dramatic announcement style",
    },
    freepikStyleAnchor:
      "Pixar 3D render, golden-brown hen, bright red comb and wattle, expressive eyes with raised feather brows, colorful beaded neck cloth, animated wing gesture pose, barn hay background, warm lighting",
    accentColor: "#D4780A",
  },
  {
    slug: "hoot-singh",
    castNumber: 14,
    chapter: "animals",
    name: "Hoot Singh",
    nameGurmukhi: "ਹੂਟ ਸਿੰਘ",
    role: "Curiosity driver",
    tagline:
      'The little owl who asks "but why?" about everything — curious, goofy, and somehow always right in the end.',
    ageGender: "Baby owl · Male · Forest / tree setting",
    setting: "Forest / tree setting",
    visualDescription:
      "Small round owl, warm brown and cream spotted feathers, oversized bright golden yellow eyes. Tiny beak, tiny wings, playful posture. Always looks slightly confused but delighted. Pixar soft render, forest/tree branch setting, dappled light.",
    personality: {
      traits: ["Curious", "Goofy", "Observant"],
      strength: "Asks the right question at the right time.",
      flaw: "Gets confused and circles back.",
      culture: "Learning mindset — pure curiosity.",
    },
    voice: {
      description: "Curious, slightly breathless tone. Punjabi mixed with random hoots.",
      signature: ["Eh kyu hunda hai?"],
    },
    storyRole: {
      drives: "discovery, learning, wonder",
      role: "Curiosity driver",
      pairsWith: ["uda-singh", "buzzy"],
      never: "cynical or disinterested",
    },
    culturalAnchor: {
      represents: "Learning mindset",
      props: "Tiny notebook, tree branch",
      peak: "Discovery, nature, language episodes",
    },
    colorPalette: ["#C89040", "#E8C880", "#F8F0D8", "#8B6030", "#D4A020"],
    agentFlags: {
      castWeight: "MEDIUM",
      episodeTypes: ["discovery", "language", "nature", "learning"],
      voTone: "Curious, slightly breathless wonder",
    },
    freepikStyleAnchor:
      "Pixar 3D render, small round baby owl, warm brown and cream spotted feathers, large golden-yellow eyes, tiny beak, playful confused-but-delighted expression, forest tree branch setting, soft dappled light",
    accentColor: "#D4A020",
  },
  {
    slug: "pompom",
    castNumber: 15,
    chapter: "animals",
    name: "PomPom",
    nameGurmukhi: "ਪੌਮਪੌਮ",
    role: "Hype generator",
    tagline:
      "A tiny fluffy orange Pomeranian made entirely of pure joy — who treats every single moment like the best moment of his life.",
    ageGender: "Pomeranian dog · Male · Home / indoor",
    setting: "Home / indoor setting",
    visualDescription:
      "Tiny round fluffy orange Pomeranian, cloud-like fur, huge sparkling brown eyes, tiny black button nose. Permanently mid-bounce or mid-run. Poofy curled tail. Tongue often out. Pure happiness in physical form. Pixar soft render, indoor/outdoor bright setting.",
    personality: {
      traits: ["Excited", "Loyal", "Energetic"],
      strength: "Boosts everyone's mood instantly.",
      flaw: "Overexcited, sometimes overwhelms.",
      culture: "Pure joy — no agenda, just love.",
    },
    voice: {
      description: "High-energy Punjabi barks + yips. Non-verbal mostly.",
      signature: ['"Yayyy!" (interpreted by others)'],
    },
    storyRole: {
      drives: "celebration, energy, hype",
      role: "Hype generator",
      pairsWith: ["uda-singh"],
      never: "sad for more than 3 seconds",
    },
    culturalAnchor: {
      represents: "Pure joy + ghar da pyaar",
      props: "Ball, colourful scarf",
      peak: "Celebration, festival episodes",
    },
    colorPalette: ["#E89030", "#F8C060", "#FFF4D8", "#3D2010", "#D07020"],
    agentFlags: {
      castWeight: "LOW",
      episodeTypes: ["celebration", "fun", "adventure", "festival"],
      voTone: "Non-verbal — narrator describes joy",
    },
    freepikStyleAnchor:
      "Pixar 3D render, tiny fluffy orange Pomeranian, cloud-like fur, large sparkling brown eyes, mid-bounce pose, poofy curled tail, tongue out, pure joyful expression, bright indoor or outdoor background",
    accentColor: "#E89030",
  },
  {
    slug: "buzzy",
    castNumber: 16,
    chapter: "animals",
    name: "Buzzy",
    nameGurmukhi: "ਬਜ਼ੀ",
    role: "Task driver",
    tagline:
      "The little bee who cannot stand wasted time — focused, hardworking, and will absolutely tell you to focus too.",
    ageGender: "Bee · Gender neutral · Outdoors / flower fields",
    setting: "Outdoors / flower fields",
    visualDescription:
      "Small round bee, fluffy yellow and black striped body, tiny transparent wings always moving. Blue sparkling eyes, curly orange antennae, chubby rosy cheeks. Chibi proportions, upright walking pose. Always looks purposeful. Pixar soft render, flower field or sunny setting.",
    personality: {
      traits: ["Focused", "Busy", "Quick"],
      strength: "Gets things done, keeps group on task.",
      flaw: "Overthinks, can be intense.",
      culture: "Discipline — sewa through hard work.",
    },
    voice: {
      description: "Fast, sharp Punjabi. Efficient sentences.",
      signature: ["Focus karo!"],
    },
    storyRole: {
      drives: "learning tasks, discipline, focus",
      role: "Task driver",
      pairsWith: ["hoot-singh", "uda-singh"],
      never: "lazy or distracted",
    },
    culturalAnchor: {
      represents: "Discipline + sewa mindset",
      props: "Tiny tools, honey pot",
      peak: "Learning, task-based episodes",
    },
    colorPalette: ["#F8D800", "#1A1208", "#5098D0", "#F0A820", "#FFFCE0"],
    agentFlags: {
      castWeight: "LOW",
      episodeTypes: ["learning", "language", "task", "nature"],
      voTone: "Fast, sharp, purposeful",
    },
    freepikStyleAnchor:
      "Pixar 3D render, small round chibi bee, fluffy yellow and black striped body, tiny transparent wings, blue sparkling eyes, curly orange antennae, rosy cheeks, upright purposeful pose, sunny flower field background",
    accentColor: "#F8D800",
  },
  {
    slug: "tappu",
    castNumber: 17,
    chapter: "animals",
    name: "Tappu",
    nameGurmukhi: "ਟੱਪੂ",
    role: "Energy + transition character",
    tagline:
      "The bright green frog who is always mid-jump — free, bouncy, and honestly not sure where he's going, but going fast.",
    ageGender: "Frog · Male · Outdoors / pond / field",
    setting: "Outdoors / pond / field",
    visualDescription:
      "Bright vibrant green frog, shiny smooth skin, large warm amber-orange eyes, big smile showing teeth. Two tiny raised eyebrow bumps that make him look permanently delighted. Always mid-jump pose, legs extended. Pixar soft render, outdoor forest or field setting.",
    personality: {
      traits: ["Bouncy", "Funny", "Free"],
      strength: "Energy shifts — livens up any scene.",
      flaw: "Restless, can't sit still.",
      culture: "Pure playfulness.",
    },
    voice: {
      description: "Playful, bouncy Punjabi. Short exclamations.",
      signature: ["Chhaal maar!"],
    },
    storyRole: {
      drives: "movement, fun, transitions",
      role: "Energy + transition character",
      pairsWith: ["gittu", "pompom"],
      never: "still or bored",
    },
    culturalAnchor: {
      represents: "Outdoor playfulness + nature",
      props: "Leaf umbrella, pond, rain",
      peak: "Rain, nature, action episodes",
    },
    colorPalette: ["#40C860", "#80E090", "#E8A020", "#208040", "#F0FFF0"],
    agentFlags: {
      castWeight: "LOW",
      episodeTypes: ["action", "nature", "fun", "transitions"],
      voTone: "Bouncy, playful, short bursts",
    },
    freepikStyleAnchor:
      "Pixar 3D render, bright green frog, shiny smooth skin, large amber-orange eyes, wide smile, always mid-jump legs extended pose, outdoor forest or field background, natural light",
    accentColor: "#40C860",
  },
  {
    slug: "lallu",
    castNumber: 18,
    chapter: "animals",
    name: "Lallu",
    nameGurmukhi: "ਲੱਲੂ",
    role: "Scene stealer / comic relief",
    tagline:
      "The llama who genuinely believes he is the star of every story — and honestly? His confidence is kind of contagious.",
    ageGender: "Llama · Male · Village / outdoors",
    setting: "Village / outdoors",
    visualDescription:
      "Fluffy beige llama, long elegant neck, expressive wide brown eyes with dramatic lashes, small perked ears. Colorful Phulkari-pattern scarf (red, green, gold) draped around neck — always perfectly positioned. Confident stance, slight head tilt. Pixar soft render.",
    personality: {
      traits: ["Dramatic", "Funny", "Show-off"],
      strength: "Entertaining — turns anything into a performance.",
      flaw: "Attention-seeking, steals scenes.",
      culture: "Performance energy — Punjabi showmanship.",
    },
    voice: {
      description: "Stylish, slightly exaggerated Punjabi. Long pauses for effect.",
      signature: ["Main star aa!"],
    },
    storyRole: {
      drives: "comedy, performance, flair",
      role: "Scene stealer / comic relief",
      pairsWith: ["kukdi-rani", "paalo"],
      never: "genuinely mean or cruel",
    },
    culturalAnchor: {
      represents: "Punjabi performance + showmanship",
      props: "Phulkari scarf, dramatic poses",
      peak: "Festival, cultural performance episodes",
    },
    colorPalette: ["#E8D090", "#C8A860", "#D03828", "#408030", "#D4A020"],
    agentFlags: {
      castWeight: "LOW",
      episodeTypes: ["comedy", "festival", "performance", "farm"],
      voTone: "Dramatic, stylish, exaggerated pauses",
    },
    freepikStyleAnchor:
      "Pixar 3D render, fluffy beige llama, long neck, large expressive brown eyes with dramatic lashes, colorful Phulkari pattern scarf in red green gold around neck, confident head-tilt pose, village outdoor background",
    accentColor: "#D03828",
  },
  {
    slug: "dholu",
    castNumber: 19,
    chapter: "animals",
    name: "Dholu",
    nameGurmukhi: "ਢੋਲੂ",
    role: "Memory keeper, emotional anchor",
    tagline:
      "The baby elephant who remembers everything, moves slowly, and somehow always ends up being the wisest one in the room.",
    ageGender: "Baby elephant · Male · Forest / village edge",
    setting: "Forest / village edge",
    visualDescription:
      "Soft grey baby elephant, chubby round body, big expressive warm brown eyes, big floppy pink-inner ears, small curved trunk tilted up. Colorful beaded bracelet on one front leg — always present. Smooth skin, Pixar soft render, forest path or dappled light setting.",
    personality: {
      traits: ["Calm", "Thoughtful", "Gentle"],
      strength: "Remembers everything, steady presence.",
      flaw: "Slow to react, takes time to decide.",
      culture: "Patience + wisdom — the grounded one.",
    },
    voice: {
      description: "Simple Punjabi, slow and deliberate tone. Thoughtful pauses.",
      signature: ["Main dheere haan… par theek haan."],
    },
    storyRole: {
      drives: "reflection, memory, learning",
      role: "Memory keeper, emotional anchor",
      pairsWith: ["hoot-singh", "bholi"],
      never: "rushed or panicked",
    },
    culturalAnchor: {
      represents: "Stability + grounded thinking",
      props: "Colorful bead bracelet, leaves",
      peak: "Reflection, problem-solving episodes",
    },
    colorPalette: ["#B0B8C8", "#D0D8E8", "#F0C8C0", "#80A0C8", "#F0F4F8"],
    agentFlags: {
      castWeight: "LOW",
      episodeTypes: ["reflection", "learning", "memory", "emotional"],
      voTone: "Slow, calm, wise and gentle",
    },
    freepikStyleAnchor:
      "Pixar 3D render, soft grey baby elephant, chubby round body, large floppy pink-inner ears, small curved trunk, large warm brown eyes, colorful beaded bracelet on front leg, forest dappled light background",
    accentColor: "#80A0C8",
  },
];

export function getCharacterBySlug(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug);
}

export function getCharactersByChapter(chapter: CharacterChapter): Character[] {
  return characters
    .filter((c) => c.chapter === chapter)
    .sort((a, b) => a.castNumber - b.castNumber);
}

export const chapterMeta: Record<
  CharacterChapter,
  { title: string; titleGurmukhi: string }
> = {
  family: { title: "The Family", titleGurmukhi: "ਪਰਿਵਾਰ" },
  friends: { title: "The Friends", titleGurmukhi: "ਯਾਰ-ਦੋਸਤ" },
  animals: { title: "The Animals", titleGurmukhi: "ਜਾਨਵਰ" },
};
