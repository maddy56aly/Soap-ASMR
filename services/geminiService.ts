import { GoogleGenAI } from "@google/genai";

// Convert file to base64
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Extracts the Tone Block. Allows optional user feedback to refine extraction.
export const extractToneBlock = async (
  imageFile: File,
  toneTemplate: string,
  userFeedback?: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const base64Image = await fileToGenerativePart(imageFile);

  let prompt = `
    You are an expert ASMR Content Strategist specializing in soap crushing videos.
    
    Your task is to analyze the provided screenshot of a competitor's video and extract visual details to fill out a "Tone Block".
    
    CRITICAL INSTRUCTION - IGNORE UI/UX ELEMENTS:
    The provided image is a screenshot from a social media platform (e.g., TikTok, YouTube, Instagram).
    You MUST STRICTLY IGNORE all interface overlays, including:
    - Search bars, text captions, hashtags, and subtitles.
    - Play/Pause buttons, Like/Comment/Share icons.
    - User profile pictures, handles, and watermarks.
    - Progress bars, battery/time indicators, and on-screen filters.

    FOCUS EXCLUSIVELY ON THE PHYSICAL SCENE:
    Analyze only the actual video content:
    1. The Soap (Color, Shape, Texture, Quantity).
    2. The Table/Background surface (Color, Texture).
    3. The Lighting (Warm/Cool, Shadows, Reflections).
    4. The Hands and Nails.

    If a UI element covers part of an object, infer the object's appearance based on the visible parts.
    
    Fill out the following template based ONLY on the physical scene:
    ---
    ${toneTemplate}
    ---

    Return ONLY the filled-out Tone Block text. Do not include markdown formatting or extra conversational text.
  `;

  if (userFeedback) {
    prompt += `
    
    PREVIOUS FEEDBACK:
    The user was not satisfied with the previous extraction. Please strictly follow this feedback for this attempt:
    "${userFeedback}"
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: imageFile.type,
              data: base64Image,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "text/plain", 
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response from Gemini.");
    }
    return text.trim();

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

// Intelligently rewrites the master prompt using the Tone Block
export const rewriteMasterPrompt = async (
  toneBlock: string,
  masterTemplate: string
): Promise<string> => {
   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

   const prompt = `
    You are an expert ASMR Prompt Engineer.

    INPUT 1 (VISUAL DATA):
    ${toneBlock}

    INPUT 2 (MASTER PROMPT TEMPLATE):
    ${masterTemplate}

    TASK:
    Rewrite the "MASTER PROMPT TEMPLATE" to strictly incorporate the specific visual details from the "VISUAL DATA".
    
    RULES:
    1. Update the 'Scene Setup', 'Soap Design & Material', and 'Hand & Nail Design' sections of the Master Prompt to match the colors, shapes, counts, and textures described in the VISUAL DATA (Tone Block).
       - For example: If Tone Block says "6 soaps, red color", update the Master Prompt (even if it originally said 8 soaps, green color) to say "6 soaps, red color".
    2. KEEP the specific Core Physics, Movement, Sound Design, Camera Setup, and Technical Enhancements of the Master Prompt EXACTLY as they are. These define the "Type" of video (e.g. Dust Core vs Clay Core) and must not be lost.
    3. Do NOT simply append the Tone Block. You must INTELLIGENTLY REPLACE the placeholder description in the Master Prompt with the specific details.
    4. Remove any {{TONE_BLOCK}} placeholders if present.
    
    Return ONLY the final, complete, ready-to-use prompt.
   `;

   try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [{ text: prompt }],
      },
    });

    const text = response.text;
    if (!text) throw new Error("Failed to rewrite prompt");
    return text.trim();
   } catch (error) {
     console.error("Gemini Rewrite Error", error);
     throw error;
   }
};

// Refines a specific prompt based on user instruction
export const refinePrompt = async (
  currentPrompt: string,
  instruction: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an expert ASMR Prompt Engineer.

    CURRENT PROMPT:
    ${currentPrompt}

    USER INSTRUCTION:
    ${instruction}

    TASK:
    Update the CURRENT PROMPT based on the USER INSTRUCTION. 
    Maintain the structure, tone, and technical details of the prompt unless specifically asked to change them.
    Only modify the parts relevant to the instruction.
    
    Return ONLY the updated prompt text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [{ text: prompt }],
      },
    });

    const text = response.text;
    if (!text) throw new Error("Failed to refine prompt");
    return text.trim();
  } catch (error) {
    console.error("Gemini Refine Error", error);
    throw error;
  }
};