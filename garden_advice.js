/* Garden Advice App with improvements as suggested in starter file TODOs.
- Issue #1: Replace hardcoded values with user input and validation.
- Should work in browser using prompts and Node.js using readline. */

// Set allowed values for basic validation
const VALID_SEASONS = ["spring", "summer", "autumn", "winter"];
const VALID_PLANT_TYPES = ["flower", "vegetable"];

// Set defaults used if user input is empty or invalid
const DEFAULT_SEASON = "summer";
const DEFAULT_PLANT_TYPE = "flower";

function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

async function getInput(question, defaultValue) {
  // For browser environments
  if (typeof prompt === "function") {
    const answer = prompt(question);
    return normalize(answer || defaultValue);
  }

  // For Node.js environments
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

function validateOrDefault(value, validList, fallback, label) {
  if (validList.includes(value)) return value;
  console.log(`Invalid ${label} "${value}". Using default "${fallback}".`);
  return fallback;
}

async function main() {
  // Replace hardcoded values with prompts as suggested in the TODO in the starter file.
  let season = await getInput(
    `Enter season (${VALID_SEASONS.join(", ")}): `,
    DEFAULT_SEASON
  );
  let plantType = await getInput(
    `Enter plant type (${VALID_PLANT_TYPES.join(", ")}): `,
    DEFAULT_PLANT_TYPE
  );

  season = validateOrDefault(season, VALID_SEASONS, DEFAULT_SEASON, "season");
  plantType = validateOrDefault(
    plantType,
    VALID_PLANT_TYPES,
    DEFAULT_PLANT_TYPE,
    "plant type"
  );

  // Variable to hold gardening advice based on inputs
  let advice = "";

  // Determine advice based on the season
  if (season === "summer") {
    advice += "Water your plants regularly and provide some shade.\n";
  } else if (season === "winter") {
    advice += "Protect your plants from frost with covers.\n";
  } else {
    advice += "No advice for this season.\n";
  }

  // Determine advice based on the plant type
  if (plantType === "flower") {
    advice += "Use fertiliser to encourage blooms.";
  } else if (plantType === "vegetable") {
    advice += "Keep an eye out for pests!";
  } else {
    advice += "No advice for this type of plant.";
  }

  console.log("\n--- Garden Advice ---");
  console.log(advice);
}

main().catch((err) => console.error(err));
