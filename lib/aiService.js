import OpenAI from "openai";
const openai = new OpenAI();


export default async function aiService() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "developer", context: "TODO: TELL AI HOW TO ACT ex. be a good listener",
                },
                {
                    role: "user",
                    context: "TODO: actual prompt to feed ai ex. I am feeling sad",
                }
        
            ],
        });
    
        console.log(completion.choices[0].message);
        return completion.choices[0].message;

    } catch (error) {
        console.error(error);
        return null;
    }
}