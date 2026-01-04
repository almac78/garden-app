/* Garden Advice App: Refactored
 - Issue #2: Refactor into functions and data objects, and add seasonal plant suggestions.
 - Works with user prompts in browser and with Node.js readline.
 - Starter TODO suggestions included as comments. */

const VALID_SEASONS = ["summer", "autumn", "winter", "spring"];
const VALID_PLANT_TYPES = ["flower", "vegetable"];

const DEFAULT_SEASON = "summer";
const DEFAULT_PLANT_TYPE = "flower";

// Store advice by season in objects.
const ADVICE_BY_SEASON = {
  summer: "Water your plants regularly and provide some shade.",
  autumn: "Clear fallen leaves and add compost to enrich the soil.",
  winter: "Protect your plants from frost with covers.",
  spring:
    "Start planting and prune back winter growth to encourage new shoots.",
};
// Store advice by plant type in objects.
const ADVICE_BY_PLANT_TYPE = {
  flower: "Use fertiliser to encourage blooms.",
  vegetable: "Keep an eye out for pests and water consistently.",
};

// Simple “plants that thrive” suggestions by season.
const PLANTS_BY_SEASON = {
  summer: ["Basil", "Tomatoes", "Marigolds"],
  autumn: ["Garlic", "Spinach", "Pansies"],
  winter: ["Kale", "Broccoli", "Winter lettuce"],
  spring: ["Peas", "Strawberries", "Sunflowers"],
};
// Normalize input by trimming and converting to lowercase.
function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}
// Get user input via prompt() in browser or readline in Node.js.
async function getInput(question, defaultValue) {
  // Browser environment
  if (typeof prompt === "function") {
    const answer = prompt(question);
    return normalize(answer || defaultValue);
  }
  // Node.js environment
  const readline = require("node:readline/promises");
  const { stdin: input, stdout: output } = require("node:process");
  const rl = readline.createInterface({ input, output });

  try {
    const answer = await rl.question(question);
    return normalize(answer || defaultValue);
  } finally {
    rl.close();
  }
}
// Validate input against a list of valid options, return default if invalid.
function validateOrDefault(value, validList, fallback, label) {
  if (validList.includes(value)) return value;
  console.log(`Invalid ${label} "${value}". Using default "${fallback}".`);
  return fallback;
}
// Generate advice based on season and plant type.
function getAdvice(season, plantType) {
  const seasonAdvice = ADVICE_BY_SEASON[season] ?? "No advice for this season.";
  const plantAdvice =
    ADVICE_BY_PLANT_TYPE[plantType] ?? "No advice for this type of plant.";
  return `${seasonAdvice}\n${plantAdvice}`;
}
// Suggest plants that thrive in the given season.
function suggestPlants(season) {
  return PLANTS_BY_SEASON[season] ?? [];
}
// Main function to run the garden advice app.
async function main() {
  const rawSeason = await getInput(
    `Enter season (${VALID_SEASONS.join(", ")}): `,
    DEFAULT_SEASON
  );
  const rawPlantType = await getInput(
    `Enter plant type (${VALID_PLANT_TYPES.join(", ")}): `,
    DEFAULT_PLANT_TYPE
  );
  // Validate input for season
  const season = validateOrDefault(
    rawSeason,
    VALID_SEASONS,
    DEFAULT_SEASON,
    "season"
  );
  // Validate input for plant type
  const plantType = validateOrDefault(
    rawPlantType,
    VALID_PLANT_TYPES,
    DEFAULT_PLANT_TYPE,
    "plant type"
  );
  // Generate advice and suggestions
  const advice = getAdvice(season, plantType);
  const suggestions = suggestPlants(season);
  // Output the results
  console.log("\n--- Garden Advice ---");
  console.log(advice);

  console.log("\n--- Plants that often do well this season ---");
  if (suggestions.length === 0) {
    console.log("No suggestions available.");
  } else {
    console.log(suggestions.map((p) => `- ${p}`).join("\n"));
  }
}

main().catch((err) => console.error(err));
