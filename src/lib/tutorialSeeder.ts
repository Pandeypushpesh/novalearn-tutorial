import Tutorial from "./models/Tutorial";
import tutorialData from "../seed/tutorialData";

export async function seedTutorialsIfNeeded() {
  const count = await Tutorial.countDocuments();
  if (count > 0) return;

  await Tutorial.insertMany(tutorialData);
}

