import aquaSurfzImage from "../assets/images/products/aquasurfz.jpeg";
import cosmicGlitzImage from "../assets/images/products/cosmicglitz.jpeg";
import hyperBloomzImage from "../assets/images/products/hyperbloomz.jpeg";

export const collections = [
  {
    id: "hyperbloomz",
    name: "HyperBloomz.exe",
    shortName: "HyperBloomz",
    label: "Flower Collection",
    theme: "Cyber Botanical",
    className: "hyper-bloomz",
    isSecret: false,

    image: hyperBloomzImage,
    imageAlt:
      "HyperBloomz flower-themed Loopify phone charm",

    description:
      "A cyber-botanical drop where digital pixels meet glossy flower power.",

    story:
      "HyperBloomz combines cheerful floral shapes with playful cyber-Y2K colours. The collection is designed for customers who enjoy bright accessories, pop-art flowers, and energetic phone styling.",

    moodWords: [
      "Playful",
      "Floral",
      "Colourful",
      "Glossy",
    ],

    visualFeatures: [
      "Pop-art flower shapes",
      "Bright pink and green accents",
      "Glossy jelly-inspired finish",
      "Cheerful cyber-botanical theme",
    ],

    mediaCaption:
      "A colourful HyperBloomz charm reveal from a Loopify mystery box.",

    review: {
      quote:
        "The flower design is so cute and the colours look really nice on my phone.",
      customer: "Nadia",
      role: "IIUM Student",
      rating: 5,
    },
  },

  {
    id: "cosmicglitz",
    name: "CosmicGlitz.exe",
    shortName: "CosmicGlitz",
    label: "Star Collection",
    theme: "Space-Age Glitter",
    className: "cosmic-glitz",
    isSecret: false,

    image: cosmicGlitzImage,
    imageAlt:
      "CosmicGlitz star-themed Loopify phone charm",

    description:
      "A sparkling space-age collection inspired by chrome stars and cosmic glitter.",

    story:
      "CosmicGlitz captures the futuristic optimism of the early 2000s. Chrome-inspired stars, glittering details, and cosmic colours give the collection a playful digital-space identity.",

    moodWords: [
      "Cosmic",
      "Sparkling",
      "Chrome",
      "Dreamy",
    ],

    visualFeatures: [
      "Star and space-inspired shapes",
      "Silver and lavender accents",
      "Chrome-inspired visual details",
      "Early-2000s cosmic aesthetic",
    ],

    mediaCaption:
      "A CosmicGlitz mystery-box unboxing with a sparkling star charm reveal.",

    review: {
      quote:
        "I got CosmicGlitz on my first try. The star design matches my phone case perfectly.",
      customer: "Aina",
      role: "IIUM Student",
      rating: 5,
    },
  },

  {
    id: "aquasurfz",
    name: "AquaSurfz.exe",
    shortName: "AquaSurfz",
    label: "Ocean Collection",
    theme: "Liquid Aqua",
    className: "aqua-surfz",
    isSecret: false,

    image: aquaSurfzImage,
    imageAlt:
      "AquaSurfz ocean-themed Loopify phone charm",

    description:
      "A refreshing aqua collection inspired by liquid glass, translucent technology, and retro surf culture.",

    story:
      "AquaSurfz brings together ocean colours, translucent visual effects, and retro surf energy. It is designed for customers who prefer refreshing blue accessories and a calmer Y2K aesthetic.",

    moodWords: [
      "Refreshing",
      "Ocean",
      "Translucent",
      "Calm",
    ],

    visualFeatures: [
      "Aqua and cyan colour palette",
      "Water and surf-inspired forms",
      "Liquid-glass visual direction",
      "Fresh translucent appearance",
    ],

    mediaCaption:
      "An AquaSurfz charm reveal inspired by clear water and retro surf graphics.",

    review: {
      quote:
        "The blue colour looks fresh and the charm feels lightweight on my phone.",
      customer: "Sarah",
      role: "Loopify Customer",
      rating: 5,
    },
  },

  {
    id: "halowhimpz",
    name: "HaloWhimpz.exe",
    shortName: "HaloWhimpz",
    label: "Secret Collection",
    theme: "Classified Cyber Angel",
    className: "halo-whimpz",
    isSecret: true,

    image: null,
    imageAlt: "",

    description:
      "An ultra-rare cyber angel is hiding inside selected Loopify blind boxes.",

    story:
      "HaloWhimpz is Loopify's classified secret charm. Its complete appearance remains hidden to preserve the surprise and excitement of the blind-box experience.",

    moodWords: [
      "Secret",
      "Angelic",
      "Rare",
      "Mysterious",
    ],

    visualFeatures: [
      "Ultra-rare classified design",
      "Cyber-angel inspiration",
      "Soft glowing visual identity",
      "Complete design intentionally hidden",
    ],

    mediaCaption:
      "This unboxing file remains locked until a customer discovers HaloWhimpz.",

    review: {
      quote:
        "Secret customer review locked until HaloWhimpz is discovered.",
      customer: "Unknown User",
      role: "Classified File",
      rating: null,
    },
  },
];

export const regularCollections = collections.filter(
  (collection) => !collection.isSecret,
);

export const secretCollection = collections.find(
  (collection) => collection.isSecret,
);

export function getCollectionById(collectionId) {
  return collections.find(
    (collection) => collection.id === collectionId,
  );
}