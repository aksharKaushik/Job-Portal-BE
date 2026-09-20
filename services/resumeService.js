const { GoogleGenAI } = require("@google/genai");
const { PDFParse } = require("pdf-parse");

const resumeParser = async (file) => {
  try {
    if (!file) {
      throw new Error("FIle is not Uploaded!");
    }
    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
    const parser = new PDFParse({ data: file.buffer });

    const parsed = await parser.getText();
    await parser.destroy();
    const pdfData = parsed.text;

    const prompt = `
You are a resume skill extraction system.

Extract ONLY the technical and professional skills explicitly mentioned
in the resume below.

Rules:
- Do not invent skills.
- Do not infer skills that are not explicitly mentioned.
- Include programming languages, frameworks, libraries, databases,
  cloud platforms, DevOps tools, testing tools, and other technical skills.
- Return each skill only once.
- Return only the requested JSON structure.

Resume:
${pdfData}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            skills: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          required: ["skills"],
        },
      },
    });

    const result = JSON.parse(response.text);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { resumeParser };
