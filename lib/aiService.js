import OpenAI from "openai";
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; 

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true 
});


export default async function aiService(input_context, input_prompt) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system", content: input_context,
                },
                {
                    role: "user",
                    content: "TODO: actual prompt to feed ai ex. I am feeling sad",
                }
        
            ],
        });
    
        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;

    } catch (error) {
        console.error(error);
        return null;
    }
}