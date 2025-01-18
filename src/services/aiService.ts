import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getRecipeRecommendations(ingredients: string[]): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Suggest a recipe using some or all of these ingredients: ${ingredients.join(', ')}. 
                   Keep it simple and healthy. Format the response with ingredients list and steps.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting recipe recommendations:', error);
    return 'Unable to generate recipe recommendations at this time.';
  }
}