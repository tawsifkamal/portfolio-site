const { Storage } = require("@google-cloud/storage");

async function authenticateImplicitWithAdc() {
  const storage = new Storage({
    projectId: "adept-bison-407117",
  });
  const [buckets] = await storage.getBuckets();
  console.log("Buckets:");

  for (const bucket of buckets) {
    console.log(`- ${bucket.name}`);
  }

  console.log("Listed all storage buckets.");
}

authenticateImplicitWithAdc();
