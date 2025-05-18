const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Pet statuses according to the Swagger Petstore schema
const PET_STATUSES = ["available", "pending", "sold"];

/**
 * Generate a random pet based on the Swagger Petstore schema
 */
function generateRandomPet() {
  return {
    id: Math.floor(Math.random() * 10000) + 1,
    name: `Pet-${uuidv4().substring(0, 8)}`,
    category: {
      id: Math.floor(Math.random() * 5) + 1,
      name: ["Dogs", "Cats", "Birds", "Reptiles", "Fish"][Math.floor(Math.random() * 5)]
    },
    photoUrls: [
      `https://example.com/pet/photos/${Math.floor(Math.random() * 9000) + 1000}.jpg`,
      `https://example.com/pet/photos/${Math.floor(Math.random() * 9000) + 1000}.jpg`
    ],
    tags: [
      {
        id: Math.floor(Math.random() * 10) + 1,
        name: ["friendly", "trained", "vaccinated", "young", "senior"][Math.floor(Math.random() * 5)]
      },
      {
        id: Math.floor(Math.random() * 10) + 11,
        name: ["playful", "cuddly", "energetic", "calm", "social"][Math.floor(Math.random() * 5)]
      }
    ],
    status: PET_STATUSES[Math.floor(Math.random() * PET_STATUSES.length)]
  };
}

// Return a randomly generated pet
router.get('/pets/random', (req, res) => {
  res.json(generateRandomPet());
});

// Return multiple randomly generated pets
router.get('/pets/random/batch/:count', (req, res) => {
  let count = parseInt(req.params.count, 10);
  
  // Limit to 50 pets maximum
  if (count > 50) {
    count = 50;
  }
  
  const pets = Array.from({ length: count }, () => generateRandomPet());
  res.json(pets);
});

// Route debugging endpoint
router.get('/debug/routes', (req, res) => {
  const routes = [];
  
  router.stack.forEach((middleware) => {
    if (middleware.route) {
      // routes registered directly on the app
      const methods = Object.keys(middleware.route.methods).filter(method => middleware.route.methods[method]);
      routes.push({
        path: middleware.route.path,
        methods: methods
      });
    }
  });
  
  res.json(routes);
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
        path: "/api/pets/random/batch/:count",
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