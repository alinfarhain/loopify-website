export const products = [
  {
    id: "mystery-single",
    slug: "loopify-mystery-blind-box",
    name: "Loopify Mystery Blind Box",
    shortName: "Mystery Blind Box",
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
      "Maximum of three boxes per order",
      "Suitable for campus pickup",
    ],
  },
];

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(productId) {
  return products.find((product) => product.id === productId);
}