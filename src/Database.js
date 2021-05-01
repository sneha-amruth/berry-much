import faker from "faker";

faker.seed(123);
const productImages = [
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/Klairs_MD_Mask_2_1800x1800.png?v=1582085179",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/KlairsTonerMini_1800x1800.jpg?v=1606465841",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/SNPPrepToneUpCreamApplication_1800x1800.jpg?v=1607950279",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/Salicylicacidcleanserwithfoam_1800x1800.jpg?v=1596490101",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/HoneyOvernightMask_1800x1800.jpg?v=1596490125",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/Snailessencemucinbottle_1800x1800.jpg?v=1596489593",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/Klairs_Scrub_2_1800x1800.png?v=1580145050",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/Klairs_Vit_C_2_1800x1800.png?v=1580144923",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/Klairs_Midnight_Calming_Cream_2_1800x1800.png?v=1580145140",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/Alloverlotion_9c718a5d-b1ce-4542-ac9e-ca474009dfcd_1800x1800.jpg?v=1603070660",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/GalactomycesEssenceBottle_1800x1800.jpg?v=1596489871",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/Dr.OracleStay21A-theraCreamTexture_1800x1800.jpg?v=1607949942",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/NacificFreshHerbOriginCreamTexture_1800x1800.jpg?v=1608472344",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/MP_Cream_2_1800x1800.png?v=1580147904",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/ACSpotCreamCoverImage_1800x1800.jpg?v=1596487541",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/Dr.OracleStay21A-theraEmulsionTexture_1800x1800.jpg?v=1607949851",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/twoinoneporelesstextureandbottle_1800x1800.jpg?v=1596490109",
  "https://cdn.shopify.com/s/files/1/0253/5155/3114/products/HoneyOvernightMask_1800x1800.jpg?v=1596490125"
];
const productNames = [
  "COSRX Honey Overnight Mask",
  "Klairs Supple Preparation All Over Lotion",
  "Dr. Oracle 21 Stay A-Thera Emulsion",
  "COSRX Snail Mucin",
  "Klairs Midnight blue mask",
  "Klairs Vitamin C serum",
  "Krave Beauty Barier Repair",
  "Klairs Supple Preparation Toner",
  "Vaunt Barrier Repair Formula"
];
const brandNames = [
  "COSRX",
  "Klairs",
  "Dr. Oracle",
  "Vaunt",
  "Innisfree",
  "Krave"
];
const productDetails = [
  "The Klairs Freshly Juiced Vitamin Drop is the ideal product to breathe life back into your skin. It contains 5% Vitamin C, which helps tackle acne, scarring, hyper-pigmentation and brightens dulls skin. Its key ingredients are combined to form a non-irritating formula, suitable for sensitive skin too. It ultimately nourishes, transforms and revitalizes the skin.",
  "The Advanced Snail 96 Mucin Power Essence is a lightweight, non-greasy essence that nourishes the skin and keeps it healthy",
  "The Klairs Supple Preparation Toner is made of a skin-soothing blend of plant based extracts, along with deeply hydrating hyaluronic acid, and the soothing Centella Asiatica.",
  "If your skin is acne prone or easily irritated by pollution, temperature and other internal and external factors, the Klairs Midnight Blue Calming Sheet Mask is built for you.",
  "A sleeping mask enriched with more than 68% Rice Extract and Niacinamide, brightens skin tone and deeply moisturises the skin.",
]
export const data = [...Array(50)].map((item) => ({
  id: faker.random.uuid(),
  name: faker.random.arrayElement(productNames),
  brand: faker.random.arrayElement(brandNames),
  image: faker.random.arrayElement(productImages),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  productDetails: faker.random.arrayElement(productDetails),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale"
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional"
  ]),
  color: faker.commerce.color()
}));
