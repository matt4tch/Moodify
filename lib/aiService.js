import OpenAI from "openai";
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; 

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true 
});


export default async function aiService(input_context, input_prompt, model) {
    try {
        const completion = await openai.chat.completions.create({
            model: model,
            messages: [
                { role: "system", content: input_context },
                { role: "user", content: input_prompt },
            ],
        });
        return completion.choices[0]?.message?.content || null;
    } catch (error) {
        console.error("Error in aiService:", error);
        return null;
    }
}