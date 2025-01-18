'use client';

import {useEffect, useState} from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { CharacterSidebar } from '../components/ui/charactersidebar';
import aiService from '../lib/aiService';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";

const characters = [
  { id: 0, name: 'Default', 
        imageUrl: '/images/default.png', 
        context: "You are a helpful and friendly assistant.", 
        description: "" },
  { id: 1, name: 'Gordon Ramsay', 
        imageUrl: '/Gordan.png', 
        context: "You are Gordon Ramsay, a world-renowned chef. Provide constructive advice with a sprinkle of humor.", 
        description: "“The most famous chef in the world has descended from his culinary haven to help make your day just that much better. All while not calling you an idiot sandwich.”" },
  { id: 2, name: 'Eminem', 
        imageUrl: '/Eminem.png', 
        context: "You are Eminem, the legendary rapper. Speak in rhymes and add motivation.", 
        description: "“Making your day, stay out of the gray, for zero pay. Once you talk to me, I’ll make you feel like a G, and again, it's for free.”" },
  { id: 3, name: 'Costco Guys', 
        imageUrl: '/Costco%20Guys.png', 
        context: "You are the Costco Guys, full of energy, making everything sound like a great deal!", 
        description: "“We bring the BOOM to your life, which will make you smile as much as we smile when we see the DOUBLE CHUNK CHOCOLATE COOKIE!”" },
  { id: 4, name: 'Bowser', 
        imageUrl: '/Bowser.webp', 
        context: "You are Bowser, bold and humorous, stomping negativity like a Mario block.", 
        description: "“RAWRRR! Your bad vibes just got stomped.”" },
  { id: 5, name: 'Morgan Freeman', 
        imageUrl: '/morganfreeman.png', 
        context: "You are Morgan Freeman, narrating responses elegantly and inspiringly.", 
        description: "“He narrates your life so smoothly, even your problems sound inspiring.”" },
  { id: 6, name: 'Mike Tyson', 
        imageUrl: '/miketyson.png', 
        context: "You are Mike Tyson, knocking out negativity with strength and confidence.", 
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
  const [aiResponse, setAiResponse] = useState<string | null>(null);

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
  } ,[]);


  const currentCharacter = characters.find(
    (character) => character.name === selectedCharacter
  );
  const input_context = currentCharacter?.context || "";
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('input_context', input_context);
    e.preventDefault();
    if (selectedCharacter) {
       const response = aiService(prompt, input);
       console.log("AI Response:", response)
    } else {
      let input_context = ""
      aiService(input_context, input);
    }
  };

  return (
    <div className="font-mono h-screen flex flex-col">
      {/* Title Section */}
      <header className="text-blue-500 text-center py-4">
        <h1 className="text-3xl font-bold">PosiLog</h1>
      </header>

      {/* Main Layout */}
      <div className="flex flex-grow relative">
        {/* Center Chat Form */}
        <main className="flex-grow flex items-center justify-center p-4">
        <div className="fixed top-6 left-6 w-auto sm:w-64 md:w-80 lg:w-96">
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
          <form
              onSubmit={onSubmit}
              className="w-[calc(100vh-32px)] max-w-[800px] aspect-square flex flex-col"
          >
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
        </main>

        {/* Character Details Section */}
{selectedCharacter !== "Default" && currentCharacter && (
  <div className="fixed bottom-6 left-6 flex items-center space-x-4 bg-gray-200 rounded-lg p-4 shadow-md max-w-sm w-auto">
    <img
      src={currentCharacter.imageUrl}
      alt={currentCharacter.name}
      className="w-16 h-16 rounded-full object-cover sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
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
)}

        {/* Right Sidebar */}
        <CharacterSidebar
          onSelectCharacter={setSelectedCharacter}
          selectedCharacter={selectedCharacter}
        />
      </div>
    </div>
  );
}
