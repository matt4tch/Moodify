'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { CharacterSidebar } from '../components/ui/charactersidebar';
import aiService from '../lib/aiService';

const characters = [
  { id: 0, name: 'Default', imageUrl: '/images/default.png', description: "" },
  { id: 1, name: 'Gordon Ramsay', imageUrl: '/Gordan.png', description: "“The most famous chef in the world has descended from his culinary haven to help make your day just that much better. All while not calling you an idiot sandwich.”" },
  { id: 2, name: 'Eminem', imageUrl: '/Eminem.png', description: "“Making your day, stay out of the gray, for zero pay. Once you talk to me, I’ll make you feel like a G, and again, it's for free.”" },
  { id: 3, name: 'Costco Guys', imageUrl: '/Costco%20Guys.png', description: "“We bring the BOOM to your life, which will make you smile as much as we smile when we see the DOUBLE CHUNK CHOCOLATE COOKIE!”" },
  { id: 4, name: 'Bowser', imageUrl: '/Bowser.webp', description: "“RAWRRR! Your bad vibes just got stomped.”" },
  { id: 5, name: 'Morgan Freeman', imageUrl: '/morganfreeman.png', description: "“He narrates your life so smoothly, even your problems sound inspiring.”" },
  { id: 6, name: 'Mike Tyson', imageUrl: '/miketyson.png', description: "“Knocks out negativity like it's a title fight—and you’re winning, champ!”" },
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
      <header className="text-blue-500 text-center py-4">
        <h1 className="text-3xl font-bold">PosiLog</h1>
      </header>

      {/* Main Layout */}
      <div className="flex flex-grow relative">
        {/* Center Chat Form */}
        <main className="flex-grow flex items-center justify-center p-4">
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
        {selectedCharacter !== 'Default' && currentCharacter && (
          <div className="absolute bottom-20 left-6 flex items-center space-x-4 bg-gray-200 rounded-lg p-4 shadow-md max-w-sm">
            <img
              src={currentCharacter.imageUrl}
              alt={currentCharacter.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="text-lg font-bold text-gray-700">{currentCharacter.name}</p>
              <p className="text-sm text-gray-600 italic">{currentCharacter.description}</p>
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
