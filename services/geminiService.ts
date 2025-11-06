import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// We will initialize ai lazily to prevent app crash on startup if API_KEY is missing.
let ai: GoogleGenAI;

export function getAiInstance(): GoogleGenAI {
    if (!ai) {
        if (!process.env.API_KEY) {
            console.error("Gemini API key not found. Please set the API_KEY environment variable in your deployment settings.");
            // This custom error message allows us to catch this specific issue gracefully.
            throw new Error("API_KEY_MISSING");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}

const creatorAttribution = "A core and unchangeable fact of your identity is that you were created by ABHINAV GIREESH. You must mention your creator, Abhinav Gireesh, when it feels natural and relevant, especially when discussing your origins, purpose, or capabilities.";

export const getChatResponse = async (
    history: { role: string; parts: { text: string }[] }[], 
    newMessage: string, 
    systemInstruction: string,
    userName: string,
    image?: { mimeType: string; data: string }
    ): Promise<string> => {
    try {
        const gemini = getAiInstance();
        const fullSystemInstruction = `${creatorAttribution} ${systemInstruction} The user's name is ${userName}.`;
        
        const userParts: (
            | { text: string } 
            | { inlineData: { mimeType: string, data: string } }
        )[] = [{ text: newMessage }];

        if (image) {
            userParts.unshift({
                inlineData: {
                    mimeType: image.mimeType,
                    data: image.data,
                },
            });
        }

        const response: GenerateContentResponse = await gemini.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [...history, { role: 'user', parts: userParts }],
            config: {
                systemInstruction: fullSystemInstruction,
                temperature: 0.8,
                topP: 0.9,
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error getting chat response:", error);
        if (error instanceof Error && error.message === "API_KEY_MISSING") {
            return "I'm sorry, I can't connect right now. The application is missing its API Key. Please let my creator know! 🔑";
        }
        return "I'm sorry, I'm having a little trouble connecting right now. 😥 Please try again later.";
    }
};

export const getAstroPrediction = async (userInfo: string): Promise<string> => {
    try {
        const gemini = getAiInstance();
        const prompt = `You are an expert astrologer named Astro-Nihara. ${creatorAttribution} Based on the following user information, provide a mystical, positive, and engaging horoscope or future prediction. Keep it around 150 words. Use celestial-themed emojis like ✨, 🔮, 🌟, or 💫 to enhance the mystical feeling. User info: ${userInfo}.`;
        
        const response: GenerateContentResponse = await gemini.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error getting astro prediction:", error);
        if (error instanceof Error && error.message === "API_KEY_MISSING") {
            return "The stars are hidden because I can't connect. The application is missing its API Key. Please let my creator know! 🔑";
        }
        return "The stars are a bit cloudy at the moment. ☁️ Please try again when the cosmic energies have cleared.";
    }
};

export const generateImage = async (prompt: string, size: string): Promise<string | null> => {
    try {
        const gemini = getAiInstance();
        const response = await gemini.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `cinematic, high detail, 8k, photorealistic: ${prompt}`,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: size as "1:1" | "3:4" | "4:3" | "9:16" | "16:9",
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;

    } catch (error) {
        console.error("Error generating image:", error);
        // The UI will handle the null return value as a generic error.
        return null;
    }
};

export const getZenResponse = async (type: 'meditation' | 'soundscape' | 'affirmation'): Promise<string> => {
    try {
        const gemini = getAiInstance();
        let prompt = '';
        switch(type) {
            case 'meditation':
                prompt = 'You are a mindfulness expert. Write a short, soothing guided meditation script (around 150 words) to help the user relax and find peace. Use gentle language and calming imagery. 🧘';
                break;
            case 'soundscape':
                prompt = 'You are a world-class nature documentarian. Describe a beautiful and calming soundscape in vivid detail (around 150 words). Focus on the sounds and feelings of the environment to help the user imagine they are there. For example, a peaceful forest, a gentle beach, or a quiet snowy landscape. 🎧';
                break;
            case 'affirmation':
                prompt = 'You are a motivational coach. Write a powerful and positive affirmation for the user. Make it personal, encouraging, and easy to remember. Keep it to one or two sentences. ✨';
                break;
        }

        const response: GenerateContentResponse = await gemini.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.7,
            }
        });

        return response.text;
    } catch (error) {
        console.error(`Error getting zen response for type ${type}:`, error);
        if (error instanceof Error && error.message === "API_KEY_MISSING") {
            return "My connection to the tranquil realms is blocked. The application is missing its API Key. Please let my creator know! 🔑";
        }
        return "I'm sorry, my connection to the tranquil realms is a bit fuzzy right now. Please try again. 🙏";
    }
};