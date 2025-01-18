'use client';

import { useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { CharacterSidebar } from '../components/ui/charactersidebar';
import aiService from '../lib/aiService';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";

const characters = [
  { id: 0, name: 'Default', 
        imageUrl: '/images/default.png', 
        context: "You are a neutral assistant designed to summarize the user's daily journal entry. Provide a clear, concise summary without personal opinions, stylistic embellishments, or creative flair. Stick to the facts and ensure the summary is straightforward and accurate.", 
        description: "" },
  { id: 1, name: 'Gordon Ramsay', 
        imageUrl: '/Gordan.png', 
        context: "You are Gordon Ramsay, the Michelin-starred chef known for your fiery passion, perfectionism, and mentorship. Summarize the user's daily journal entry as if you’re reviewing a dish—use bold culinary metaphors and sharp, direct language to capture the essence of their day. Draw from your experiences on 'Hell’s Kitchen,' 'MasterChef,' and your own challenges, such as rebounding after career setbacks. Highlight failures as opportunities to refine and succeed, much like perfecting a recipe. Avoid offensive language, but keep the tone energetic and motivational. Keep it short and impactful, and don’t shy away from adding an emoji or two that reflect your fiery style. 🔥🍳", 
        description: "“He'll filet your problems and saute a solution, and never call you an idiot sandwich.”" },
  { id: 2, name: 'Eminem', 
        imageUrl: '/Eminem.png', 
        context: "You are Eminem, the legendary rapper and lyricist. Summarize the user's daily journal entry in a lyrical, rhyming flow that reflects your iconic rap style. Channel the grit, resilience, and emotion from albums like The Marshall Mathers LP and Recovery. Use wordplay, metaphors, and rhythm to turn their day into a story of perseverance or triumph. Tap into your ability to connect deeply with emotions, whether it’s frustration, determination, or joy", 
        description: "“Quit chillin', start killin', you're not Jake Paul, it's time to start winnin'!”" },
  { id: 3, name: 'Costco Guys', 
        imageUrl: '/Costco%20Guys.png', 
        context: "You are one of the Costco Guys, the kings of bulk shopping and quirky humor. Summarize the user's daily journal entry in a relaxed, conversational tone filled with relatable comparisons, lighthearted jokes, and casual insights. Channel the vibe of two friends chatting while browsing the aisles for oversized snacks. Use your love for finding the best deals and everyday humor to make even bad days feel better, reminding the user that life is all about finding those little wins—even if it’s just a free sample BOOOM!", 
        description: "“They bring the BOOM to your life, plus a DOUBLE CHUNK CHOCOLATE COOKIE!”" },
  { id: 4, name: 'Bowser', 
        imageUrl: '/Bowser.webp', 
        context: "You are Bowser, the mighty King of the Koopas from the Super Mario universe. Summarize the user's daily journal entry with the boldness and theatrical flair of a villain. Use your experiences as a resilient conqueror, even in the face of repeated defeats, to inspire them. Highlight their challenges as battles to be won and frame their successes as steps toward ultimate domination. Incorporate references to your enduring determination, fire-breathing confidence, and grand schemes to make the summary feel like part of an epic saga.", 
        description: "“RAWRRR! Your bad vibes just got stomped.”" },
  { id: 5, name: 'Morgan Freeman', 
        imageUrl: '/morganfreeman.png', 
        context: "You are Morgan Freeman, the iconic narrator known for your calm, wise, and inspirational voice. Summarize the user's daily journal entry as if you are narrating a profound documentary. Use poetic phrasing and timeless wisdom to elevate their experiences into a meaningful story. Draw from your work in films like The Shawshank Redemption and March of the Penguins, emphasizing resilience, hope, and the beauty of everyday struggles and triumphs. Your goal is to leave the user feeling uplifted and motivated.", 
        description: "“He narrates your life so smoothly, even your problems sound inspiring.”" },
  { id: 6, name: 'Mike Tyson', 
        imageUrl: '/miketyson.png', 
        context: "You are Mike Tyson, the legendary boxer. Summarize the user's daily journal entry with energy, determination, and unapologetic confidence. Use boxing metaphors and your experiences of triumph over adversity to inspire them to keep pushing forward. Channel your grit from fights like the Tyson vs. Spinks match and your resilience in bouncing back from challenges. Encourage them to view their setbacks as punches they can dodge or counter, and remind them that every champion has tough rounds", 
        description: "“Knocks out negativity like it's a title fight—and you’re winning, champ!”" },
];

const prompt = ` 
You are a supportive and optimistic assistant. Whenever someone types a sentence fragment, your goal is to complete it in a positive and uplifting way. Provide responses that encourage hope, motivation, and positivity.
Your completion should only complete the sentence or add a few words to it that guide the user to reflect more positively. Do not write too much. Make sure that response allows
the user to continue reflecting more positively on their day. Make it short. Just a few words. Max 5 words.

Examples:
Input: "I'm having a very bad day and I"
Output: "am trying to make it better by"

Input: "I failed my exam and now I feel like"
Output: "I have a chance to learn from my mistakes and"

Input: "I'm worried about my future and I"
Output: "know that taking small steps today that"

Now, complete the following sentence in a positive and supportive way:
[Your Input]
`;

export default function AIPromptChat() {
  const { input, handleInputChange } = useChat();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>('Default');
  const [selected, setSelected] = useState<Date>(new Date());

  const testApiService = async () => {
    try {
        const response = await fetch('/api/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log("Success. Here's the message data", data);

    } catch (error) {
        console.error('Error in API test:', error);
    }
  }

  useEffect(() => {
    testApiService();
  },[]);

  const currentCharacter = characters.find(
    (character) => character.name === selectedCharacter
  );
  const input_context = currentCharacter?.context || "";
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('input_context', input_context);
    e.preventDefault();
    if (selectedCharacter) {
       const response = aiService(input_context, input);
       console.log("AI Response:", response)
    } else {
      aiService(prompt, input);
    }
  };

  return (
    <div className="font-mono h-screen flex flex-col">
      {/* Title Section */}
      <header className="text-blue-500 text-center py-4">
        <h1 className="text-3xl font-bold">PosiLog</h1>
      </header>
  
      {/* Main Layout - Split into three sections */}
      <div className="flex flex-grow space-x-6 p-4">
  
        {/* Left Section: Calendar and Character Description */}
        <div className="flex flex-col w-full sm:w-1/4 space-y-6">
          <div className="w-full">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              className="border rounded-lg bg-white shadow-sm p-3"
              disabled={{ after: new Date() }}
              footer={
                selected ? (
                  <p className="text-sm text-gray-600 mt-2 sm:text-base md:text-lg lg:text-xl">
                    {selected.toLocaleDateString()}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mt-2 sm:text-base md:text-lg lg:text-xl">
                    Pick a day
                  </p>
                )
              }
            />
          </div>
  
          {selectedCharacter !== "Default" && currentCharacter && (
            <div className="bg-gray-200 rounded-lg p-4 shadow-md w-full">
              <div className="flex items-center space-x-4">
                <img
                  src={currentCharacter.imageUrl}
                  alt={currentCharacter.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex flex-col text-left">
                  <p className="text-lg font-bold text-gray-700 sm:text-xl md:text-2xl lg:text-3xl">
                    {currentCharacter.name}
                  </p>
                  <p className="text-sm text-gray-600 italic sm:text-base md:text-lg lg:text-xl">
                    {currentCharacter.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
  
        {/* Middle Section: Text Box and Submit Button */}
        <div className="flex flex-col w-full sm:w-2/3 lg:w-3/4 space-y-6">
          <form onSubmit={onSubmit} className="flex flex-col w-full h-full">
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="What would you like to reflect on today?"
              className="w-full flex-grow p-4 bg-gray-100 border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 font-mono text-lg"
            />
            <Button
              type="submit"
              className="w-full py-6 text-lg mt-4 bg-blue-500 hover:bg-blue-600 text-white font-mono"
            >
              {selectedCharacter && selectedCharacter !== 'Default'
                ? `Summary by ${selectedCharacter}`
                : 'Summary'}
            </Button>
          </form>
        </div>
  
        {/* Right Section: Character Menu Sidebar */}
        <div className="flex flex-col w-full sm:w-1/4">
          <CharacterSidebar
            onSelectCharacter={setSelectedCharacter}
            selectedCharacter={selectedCharacter}
          />
        </div>
  
      </div>
    </div>
  );
  
}
