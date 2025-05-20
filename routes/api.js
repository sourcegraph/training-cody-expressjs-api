const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Pet statuses according to the Swagger Petstore schema
const PET_STATUSES = ["available", "pending", "sold"];

// Match pet names with Spring Boot implementation
const PET_NAMES = [
  "Buddy", "Max", "Charlie", "Lucy", "Cooper", "Bella", "Luna", "Daisy",
  "Rocky", "Sadie", "Milo", "Bailey", "Jack", "Oliver", "Chloe", "Pepper"
];

// Match categories with Spring Boot implementation
const CATEGORIES = [
  "Dog", "Cat", "Bird", "Fish", "Reptile", "Rodent", "Exotic"
];

// Match tag names with Spring Boot implementation
const TAG_NAMES = [
  "Friendly", "Playful", "Trained", "Young", "Adult", "Senior",
  "Vaccinated", "Neutered", "Spayed", "Rescue", "Purebred", "Hypoallergenic"
];

/**
 * Generate a random pet based on the Swagger Petstore schema
 * Updated to match Spring Boot implementation
 */
function generateRandomPet() {
  // First generate the category so we can use it for photo URLs
  const category = generateRandomCategory();
  
  // Random number of photo URLs (1-3)
  const photoCount = Math.floor(Math.random() * 3) + 1;
  
  return {
    id: Math.floor(Math.random() * 10000),
    name: getRandomElement(PET_NAMES),
    category: category,
    photoUrls: Array.from({ length: photoCount }, () => `/images/${category.name}.jpg`),
    tags: generateRandomTags(),
    status: PET_STATUSES[Math.floor(Math.random() * PET_STATUSES.length)]
  };
}

/**
 * Generate a random category
 */
function generateRandomCategory() {
  return {
    id: Math.floor(Math.random() * 100),
    name: getRandomElement(CATEGORIES)
  };
}

/**
 * Generate random tags (0-3)
 */
function generateRandomTags() {
  const count = Math.floor(Math.random() * 4); // 0-3 tags
  return Array.from({ length: count }, () => ({
    id: Math.floor(Math.random() * 100),
    name: getRandomElement(TAG_NAMES)
  }));
}

/**
 * Get a random element from an array
 */
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Return a randomly generated pet
router.get('/pets/random', (req, res) => {
  res.json(generateRandomPet());
});

router.get('/pets/:id', (req, res) => {
  let pet = generateRandomPet();
  pet.id = req.params.id;
  res.json(pet);
});

// Return multiple randomly generated pets
router.get('/pets/random/:count', (req, res) => {
  let count = parseInt(req.params.count, 10);
  
  // Limit to 50 pets maximum
  if (count > 50) {
    count = 50;
  }
  
  const pets = Array.from({ length: count }, () => generateRandomPet());
  res.json(pets);
});

// API documentation endpoint
router.get('/', (req, res) => {
  res.json({
    name: "Pet API",
    version: "1.0.0",
    description: "API for generating random pet data",
    endpoints: [
      {
        path: "/api/pets/random",
        method: "GET",
        description: "Returns a randomly generated pet"
      },
      {
        path: "/api/pets/random/:count",
        method: "GET",
        description: "Returns multiple randomly generated pets (max 50)"
      },
      {
        path: "/api/debug/routes",
        method: "GET",
        description: "Lists all registered routes in the API router"
      }
    ]
  });
});

module.exports = router;