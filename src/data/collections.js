import aquaSurfzImage from "../assets/images/products/aquasurfz.jpeg";
import cosmicGlitzImage from "../assets/images/products/cosmicglitz.jpeg";
import hyperBloomzImage from "../assets/images/products/hyperbloomz.jpeg";

export const collections = [
  {
    id: "hyperbloomz",
    name: "HyperBloomz.exe",
    label: "Flower Collection",
    description:
      "A cyber-botanical drop where digital pixels meet glossy flower power.",
    image: hyperBloomzImage,
    imageAlt:
      "HyperBloomz flower-themed Loopify phone charm",
    className: "hyper-bloomz",
    isSecret: false,
  },
  {
    id: "cosmicglitz",
    name: "CosmicGlitz.exe",
    label: "Star Collection",
    description:
      "A sparkling space-age collection inspired by chrome stars and cosmic glitter.",
    image: cosmicGlitzImage,
    imageAlt:
      "CosmicGlitz star-themed Loopify phone charm",
    className: "cosmic-glitz",
    isSecret: false,
  },
  {
    id: "aquasurfz",
    name: "AquaSurfz.exe",
    label: "Beach Collection",
    description:
      "A translucent aqua collection inspired by liquid glass and retro surf culture.",
    image: aquaSurfzImage,
    imageAlt:
      "AquaSurfz beach-themed Loopify phone charm",
    className: "aqua-surfz",
    isSecret: false,
  },
  {
    id: "halowhimpz",
    name: "HaloWhimpz.exe",
    label: "Secret Collection",
    description:
      "An ultra-rare cyber angel is hiding inside selected Loopify blind boxes.",
    image: null,
    imageAlt: "",
    className: "halo-whimpz",
    isSecret: true,
  },
];

export const regularCollections = collections.filter(
  (collection) => !collection.isSecret,
);

export const secretCollection = collections.find(
  (collection) => collection.isSecret,
);