import "dotenv/config";
import { connectToDatabase } from "../src/lib/db";
import Tutorial from "../src/lib/models/Tutorial";
import { seedTutorialsIfNeeded } from "../src/lib/tutorialSeeder";

async function run() {
  await connectToDatabase();
  await seedTutorialsIfNeeded();
  const count = await Tutorial.countDocuments();
  console.log(`Seed complete. ${count} tutorials in database.`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

