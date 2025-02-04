import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const characters = [
  { id: 0, name: 'Default', imageUrl: '/images/default.png' },
  { id: 1, name: 'Gordon Ramsay', imageUrl: '/Gordan.png' },
  { id: 2, name: 'Eminem', imageUrl: '/Eminem.png' },
  { id: 3, name: 'Costco Guys', imageUrl: '/Costco Guys.png' },
  { id: 4, name: 'Bowser', imageUrl: '/Bowser.webp' },
  { id: 5, name: 'Morgan Freeman', imageUrl: '/morganfreeman.png' },
  { id: 6, name: 'Mike Tyson', imageUrl: '/miketyson.png' },
  { id: 7, name: 'Yoda', imageUrl: '/yoda.png' },
  { id: 8, name: 'Tony Stark', imageUrl: '/Tony Stark.png' },
  { id: 9, name: 'Wonder Woman', imageUrl: '/Wonder Woman.png' },
  { id: 10, name: 'Hermione Granger', imageUrl: '/Hermione Grange.png' },
];

export function CharacterSidebar({
  onSelectCharacter,
  selectedCharacter,
}: {
  onSelectCharacter: (character: string) => void;
  selectedCharacter: string | null;
}) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!selectedCharacter) {
      onSelectCharacter('Default');
    }
  }, [selectedCharacter, onSelectCharacter]);

  return (
    <div
      className={`fixed right-0 top-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isOpen ? 'w-48' : 'w-10'
      }`}
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-2 left-2 p-1 bg-gray-700 hover:bg-gray-600"
        variant="ghost"
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </Button>
      <div className={`p-4 mt-12 ${isOpen ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-bold mb-4 font-mono">Characters</h2>
        {characters.map((character) => (
          <Button
            key={character.id}
            onClick={() => onSelectCharacter(character.name)}
            className={`w-full mb-2 justify-start font-mono text-sm ${
              selectedCharacter === character.name
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-transparent hover:bg-gray-700'
            }`}
            variant="ghost"
          >
            {character.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
