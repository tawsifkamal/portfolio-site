const { VertexAI } = require("@google-cloud/vertexai");

const projectId = "adept-bison-407117";
const location = "us-central1";
const image = "gs://generativeai-downloads/images/scones.jpg"; // Google Cloud Storage image
const mimeType = "image/jpeg";

const vertexAI = new VertexAI({ project: projectId, location: location });

const testAI = async () => {
  const generativeVisionModel = vertexAI.preview.getGenerativeModel({
    model: model,
  });

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
  const responseStream = await generativeVisionModel.generateContentStream(
    request
  );

  const aggregatedResponse = await responseStream.response;

  const fullTextResponse =
    aggregatedResponse.candidates[0].content.parts[0].text;

  console.log(fullTextResponse);
};

testAI()
