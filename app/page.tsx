'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { CharacterSidebar } from '../components/ui/charactersidebar';
import aiService from '../lib/aiService';

const characters = [
  { id: 0, name: 'Default', imageUrl: '/images/default.png', description: "" },
  { id: 1, name: 'Gordon Ramsay', imageUrl: '/Gordon%20Ramsay.webp', description: "The most famous chef in the world has descended from his culinary haven to help make your day just that much better. All while not calling you an idiot sandwich." },
  { id: 2, name: 'Eminem', imageUrl: '/Eminem.png', description: "Making your day, stay out of the gray, for zero pay. Once you talk to me, I’ll make you feel like a G, and again, it's for free." },
  { id: 3, name: 'Costco Guys', imageUrl: '/Costco%20Guys.png', description: "We bring the BOOM to your life, which will make you smile as much as we smile when we see the DOUBLE CHUNK CHOCOLATE COOKIE!" },
  { id: 4, name: 'Bowser', imageUrl: '/Bowser.webp', description: "RAWRRR! Your bad vibes just got stomped." },
  { id: 5, name: 'Morgan Freeman', imageUrl: '/morgan-freeman.webp', description: "He narrates your life so smoothly, even your problems sound inspiring." },
  { id: 6, name: 'Mike Tyson', imageUrl: '/mike.png', description: "Knocks out negativity like it's a title fight—and you’re winning, champ!" },
];

export default function AIPromptChat() {
  const { input, handleInputChange } = useChat();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>('Default');

  const currentCharacter = characters.find(
    (character) => character.name === selectedCharacter
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCharacter) {
      let input_context = ""
      aiService(input_context, input)
    } else {
      let input_context = ""
      aiService(input_context, input);
    }
  };

  return (
    <div className="font-mono h-screen flex flex-col">
      {/* Title Section */}
      <header className=" text-blue-500 text-center py-4">
        <h1 className="text-3xl font-bold">PosiLog</h1>
      </header>
  
      {/* Main Layout */}
      <div className="flex flex-grow">
        {/* Left Section: Always Render */}
        <div className="w-1/6 bg-white flex flex-col items-center justify-center">
          {selectedCharacter !== 'Default' && currentCharacter?.imageUrl && (
            <>
              <img
                src={currentCharacter.imageUrl}
                alt={currentCharacter.name}
                className="w-24 h-auto object-contain rounded-md"
              />
              <p className="mt-2 text-sm font-bold text-center">{currentCharacter.name}</p>
              <p className="text-xs text-center text-gray-600">{currentCharacter.description}</p>
            </>
          )}
        </div>
  
        {/* Center Chat Form */}
        <main className="flex-grow flex items-center justify-center p-4 -ml-10">
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
  
        {/* Right Sidebar */}
        <CharacterSidebar
          onSelectCharacter={setSelectedCharacter}
          selectedCharacter={selectedCharacter}
        />
      </div>
    </div>
  );
}