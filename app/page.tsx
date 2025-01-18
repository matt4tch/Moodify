'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { CharacterSidebar } from '../components/ui/charactersidebar';

const characters = [
  { id: 0, name: 'Default', imageUrl: '/images/default.png' },
  { id: 1, name: 'Gordon Ramsay', imageUrl: '/Gordon Ramsay.webp' },
  { id: 2, name: 'Eminem', imageUrl: '/Eminem.png' },
  { id: 3, name: 'Costco Guys', imageUrl: '/Costco Guys.png' },
  { id: 4, name: 'Bowser', imageUrl: '/Bowser.webp' },
  { id: 5, name: 'Morgan Freeman', imageUrl: '/morgan-freeman.webp' },
  { id: 6, name: 'Mike Tyson', imageUrl: '/mike.png' },
];

export default function AIPromptChat() {
  const { input, handleInputChange, handleSubmit } = useChat();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>('Default');

  const currentCharacter = characters.find(
    (character) => character.name === selectedCharacter
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCharacter) {
      handleSubmit(e, { options: { body: { character: selectedCharacter } } });
    } else {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex h-screen font-mono">
      {/* Left Section: Only Render if Not "Default" */}
      {selectedCharacter !== 'Default' && (
        <div className="w-1/6 bg-white-100 flex flex-col items-center justify-center">
          {currentCharacter?.imageUrl && (
            <>
              <img
                src={currentCharacter.imageUrl}
                alt={currentCharacter.name}
                className="w-24 h-auto object-contain rounded-md"
              />
              <p className="mt-2 text-sm font-bold text-center">{currentCharacter.name}</p>
            </>
          )}
        </div>
      )}

      {/* Center Chat Form */}
      <main
        className={`flex-grow flex items-center justify-center p-4 ${
          selectedCharacter !== 'Default' ? '-ml-10' : ''
        }`}
      >
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
  );
}
