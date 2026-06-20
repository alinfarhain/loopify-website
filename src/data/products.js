export const products = [
  {
    id: "mystery-single",
    slug: "loopify-mystery-blind-box",
    name: "Loopify Mystery Blind Box",
    shortName: "Single Blind Box",
    price: 7,
    boxCount: 1,
    category: "single",
    badge: "Current Drop",
    theme: "mixed",
    featured: true,
    inStock: true,
    description:
      "One randomly selected Y2K phone charm packed inside Loopify mystery packaging.",
    longDescription:
      "Experience the excitement of Loopify with one randomly selected phone charm. Your mystery box may contain a design from HyperBloomz, CosmicGlitz, AquaSurfz, or the ultra-rare HaloWhimpz secret collection.",
    collectionPossibilities: [
      "HyperBloomz.exe",
      "CosmicGlitz.exe",
      "AquaSurfz.exe",
      "HaloWhimpz.exe",
    ],
    features: [
      "One randomly selected phone charm",
      "Custom Loopify mystery packaging",
      "Quality-checked loop and attachment",
      "Chance to receive the secret HaloWhimpz charm",
      "Suitable for campus pickup",
    ],
  },
  {
    id: "lucky-duo",
    slug: "loopify-lucky-duo",
    name: "Loopify Lucky Duo",
    shortName: "Lucky Duo",
    price: 14,
    boxCount: 2,
    category: "bundle",
    badge: "Double the Mystery",
    theme: "pink",
    featured: false,
    inStock: true,
    description:
      "Two separate mystery blind boxes for twice the unboxing excitement.",
    longDescription:
      "The Lucky Duo contains two independently packed Loopify mystery charms. It is suitable for customers who want to increase their collection or share an unboxing experience with a friend.",
    collectionPossibilities: [
      "HyperBloomz.exe",
      "CosmicGlitz.exe",
      "AquaSurfz.exe",
      "HaloWhimpz.exe",
    ],
    features: [
      "Two separate mystery blind boxes",
      "Two randomly selected phone charms",
      "Suitable for sharing with a friend",
      "Chance to obtain the secret charm",
      "Custom Loopify packaging",
    ],
  },
  {
    id: "collector-trio",
    slug: "loopify-collector-trio",
    name: "Loopify Collector Trio",
    shortName: "Collector Trio",
    price: 21,
    boxCount: 3,
    category: "bundle",
    badge: "Collector Pick",
    theme: "aqua",
    featured: false,
    inStock: true,
    description:
      "Three mystery blind boxes for collectors who want to grow their Loopify collection.",
    longDescription:
      "The Collector Trio includes three separately packed mystery phone charms. Every box is selected randomly, so duplicate designs remain possible as part of the blind-box experience.",
    collectionPossibilities: [
      "HyperBloomz.exe",
      "CosmicGlitz.exe",
      "AquaSurfz.exe",
      "HaloWhimpz.exe",
    ],
    features: [
      "Three separate mystery blind boxes",
      "Three randomly selected phone charms",
      "Designed for collectors",
      "Useful for trading with friends",
      "Chance to obtain HaloWhimpz.exe",
    ],
  },
];

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}