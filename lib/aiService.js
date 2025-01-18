import OpenAI from "openai";
const openai = new OpenAI({apiKey: "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\n", dangerouslyAllowBrowser: true});


export default async function aiService(input_context, input_prompt) {
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