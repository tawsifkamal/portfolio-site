const { VertexAI } = require("@google-cloud/vertexai");

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = "adept-bison-407117";
const location = "us-central1";
const image = "gs://generativeai-downloads/images/scones.jpg"; // Google Cloud Storage image
const mimeType = "image/jpeg";

// Initialize Vertex with your Cloud project and location
const vertexAI = new VertexAI({ project: projectId, location: location });

const testAI = async () => {
  const generativeVisionModel = vertexAI.preview.getGenerativeModel({
    model: model,
  });

  // For images, the SDK supports both Google Cloud Storage URI and base64 strings
  const filePart = {
    fileData: {
      fileUri: image,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: "what is shown in this image?",
  };

  const request = {
    contents: [{ role: "user", parts: [filePart, textPart] }],
  };

  console.log("Prompt Text:");
  console.log(request.contents[0].parts[0].text);

  console.log("Non-Streaming Response Text:");
  // Create the response stream
  const responseStream = await generativeVisionModel.generateContentStream(
    request
  );

  // Wait for the response stream to complete
  const aggregatedResponse = await responseStream.response;

  // Select the text from the response
  const fullTextResponse =
    aggregatedResponse.candidates[0].content.parts[0].text;

  console.log(fullTextResponse);
};
// Instantiate the model

testAI()
