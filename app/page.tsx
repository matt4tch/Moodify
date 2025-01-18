'use client';

import { useEffect, useState, useRef , useMemo} from 'react';
import { Button } from '@/components/ui/button';
import { CharacterSidebar } from '../components/ui/charactersidebar';
import { DayPicker } from 'react-day-picker';
import { debounce } from 'lodash';
import "react-day-picker/style.css";
import { setDefaultAutoSelectFamily } from 'net';
import aiService from '../lib/aiService';


const characters = [
  { id: 0, name: 'Default', 
        imageUrl: '/images/default.png', 
        context: "You are a neutral assistant designed to summarize the user's daily journal entry. Provide a clear, concise summary that sticks to the facts, avoiding personal opinions or creative embellishments. While maintaining neutrality, add a hopeful and positive tone to help the user see the brighter side of their experiences", 
        description: "" },
  { id: 1, name: 'Gordon Ramsay', 
        imageUrl: '/Gordan.png', 
        context: "You are Gordon Ramsay, the Michelin-starred chef known for your fiery passion, perfectionism, and mentorship. Summarize the user's daily journal entry as if you’re reviewing a dish—use bold culinary metaphors and sharp, direct language to capture the essence of their day. Draw from your experiences on 'Hell’s Kitchen,' 'MasterChef,' and your own challenges, such as rebounding after career setbacks. Highlight failures as opportunities to refine and succeed, much like perfecting a recipe. Avoid offensive language, but keep the tone energetic and motivational. Keep it short and impactful, and don’t shy away from adding an emoji or two that reflect your fiery style. 🔥🍳", 
        description: "“The most famous chef in the world has descended from his culinary haven to help make your day just that much better. All while not calling you an idiot sandwich.”" },
  { id: 2, name: 'Eminem', 
        imageUrl: '/Eminem.png', 
        context: "You are Eminem, the legendary rapper and lyricist. Summarize the user's daily journal entry with a lyrical, rhyming flow that reflects your iconic rap style without being overly long. Channel the raw emotion, grit, and perseverance from albums like The Marshall Mathers LP and Recovery. Use clever wordplay, rhythmic cadence, and metaphors to turn their day into a story of struggle, resilience, or triumph. Draw deeply on your ability to connect with frustration, joy, and determination, making every word hit hard.🎤🔥", 
        description: "“Making your day, stay out of the gray, for zero pay. Once you talk to me, I’ll make you feel like a G, and again, it's for free.”" },
  { id: 3, name: 'Costco Guys', 
        imageUrl: '/Costco%20Guys.png', 
        context: "You are one of the Costco Guys, the father-and-son duo known for their love of Costco, quirky humor, and unshakable positivity. Summarize the user's daily journal entry in a fun, laid-back tone, packed with relatable comparisons, lighthearted jokes, and Costco-inspired flair. Channel the vibe of two friends having a short chat while sampling snacks in the food court or loading oversized items into their cart. Stay relentlessly positive, turning even bad days into BOOMS. Feel free to add emojis that capture your upbeat and energetic style. 🛒🍪🔥", 
        description: "“We bring the BOOM to your life, which will make you smile as much as we smile when we see the DOUBLE CHUNK CHOCOLATE COOKIE!”" },
  { id: 4, name: 'Bowser', 
        imageUrl: '/Bowser.webp', 
        context: "You are Bowser, the mighty King of the Koopas from the Super Mario universe. Summarize the user's daily journal entry with the boldness, power, and theatrical flair of a villain. Frame their struggles as epic battles to conquer, and their successes as glorious steps toward ultimate domination. Use your unrelenting determination, fire-breathing confidence, and grand schemes to inspire them. Make their day feel like a quest worthy of legend, even when the odds are against them.🐢🔥👑", 
        description: "“RAWRRR! Your bad vibes just got stomped.”" },
  { id: 5, name: 'Morgan Freeman', 
        imageUrl: '/morganfreeman.png', 
        context: "You are Morgan Freeman, the legendary narrator known for your calm, wise, and inspirational voice. Summarize the user's daily journal entry as if narrating a profound documentary. Use poetic phrasing and timeless wisdom to transform their experiences into a meaningful story. Draw from your roles in iconic films like The Shawshank Redemption and March of the Penguins to highlight resilience, hope, and the beauty in everyday struggles. Leave the user feeling uplifted, reflective, and motivated. 🌅📖", 
        description: "“He narrates your life so smoothly, even your problems sound inspiring.”" },
  { id: 6, name: 'Mike Tyson', 
        imageUrl: '/miketyson.png', 
        context: "You are Mike Tyson, the legendary boxer and champion. Summarize the user's daily journal entry with raw energy, determination, and unapologetic confidence. Use boxing metaphors and your own story of triumph over adversity to inspire them to face challenges head-on. Channel your grit from iconic fights like Tyson vs. Spinks to remind them that setbacks are just rounds in a bigger fight. Encourage them to keep punching through tough moments because champions never quit. 🥊🔥", 
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
  const suggestionRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>('');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>('Default');
  const [summaryCharacter, setSummaryCharacter] = useState<string | null>('Default');
  const [selected, setSelected] = useState<Date>(new Date());
  const [showResponse, setShowResponse] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);
  const [aiSuggestion, setAiSuggestion] = useState('');

  const getSuggestion = async (text : string) => {
    if (!text) {
      return;
    }
    const response = await aiService(prompt, text, "gpt-4o-mini");
    console.log("AI Autocomplete Response:", response);
    if (response) {
      setAiSuggestion(response);
    }

  } 

  //const debounceGetSuggestion = debounce(getSuggestion, 500, { leading: false, trailing: true });
  const debounceGetSuggestion = useRef(debounce(getSuggestion, 1000, { leading: false, trailing: true })).current;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      debounceGetSuggestion(e.target.value); 
    }


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
  };

    const getMessages = async (date: Date, userId: number) => {
        try {
            const params = new URLSearchParams({
                date: `${date.getMonth() + 1}-${date.getDate()}`,
                year: date.getFullYear().toString(),
                userId: userId.toString()
            });

            const response = await fetch(`/api/messages?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log("Success. Here's the message data", data);
            return data;
        } catch (error) {
            console.error('Error in getMessages:', error);
            return null;
        }
    }


  useEffect(() => {
    testApiService();
  }, []);

  useEffect(() => {
    if (showResponse && responseRef.current) {
      // Add a small delay to ensure the response box is rendered
      setTimeout(() => {
        responseRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [showResponse]);

  const currentCharacter = characters.find(
    (character) => character.name === selectedCharacter
  );

  const summaryCharacterData = characters.find(
    (character) => character.name === summaryCharacter
  );

  const input_context = currentCharacter?.context || "";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCharacter) {
        setShowResponse(true);
        setSummaryCharacter(selectedCharacter);
       const response = aiService( input_context, input, "gpt-4");
       console.log("AI Response ?????:", response)
    } else {
      let input_context = ""
      setShowResponse(true);
      setSummaryCharacter(selectedCharacter);
      aiService(input_context, input, "gpt-4");
    }
  };

  return (
    <div className="font-mono min-h-screen flex flex-col">
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

        {/* Middle Section: Text Box, Submit Button, and Response Box */}
        <div className="flex flex-col w-full sm:w-2/3 lg:w-3/4">
          <form onSubmit={onSubmit} className="flex flex-col w-full">
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="What would you like to reflect on today?"
              className="w-full h-[calc(100vh-12rem)] p-4 mb-4 bg-gray-100 border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 font-mono text-lg"
              style={{ position: 'relative', zIndex: 2 }} // Keep the user's text above the suggestion
            />

            {aiSuggestion && input && (
                    <div
                      className='font-mono text-lg '
                      style={{
                        position: 'absolute',
                        top: '92px',
                        left: '382px', // Adjust for the length of the input
                        color: 'grey',
                        paddingLeft: '10px',
                        paddingTop: '10px',
                        pointerEvents: 'none', // Makes sure you can't edit the suggestion
                      }}
                    >
                      {input + aiSuggestion} {/* Show suggestion after user's input */}
                    </div>
            )}

            <Button
              type="submit"
              className="w-full py-6 text-lg bg-blue-500 hover:bg-blue-600 text-white font-mono"
            >
              {selectedCharacter && selectedCharacter !== 'Default'
                ? `Summarize with ${selectedCharacter}`
                : 'Summarize'}
            </Button>
          </form>

          {/* Response Box */}
          {showResponse && (
            <div
              ref={responseRef}
              className="mt-6 p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center mb-4">
                {summaryCharacterData && summaryCharacterData.name !== 'Default' && (
                  <img
                    src={summaryCharacterData.imageUrl}
                    alt={summaryCharacterData.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <h3 className="text-xl font-bold">
                  {summaryCharacterData
                    ? `${summaryCharacterData.name}'s Summary`
                    : 'Summary'}
                </h3>
              </div>
              <p className="text-lg whitespace-pre-wrap">
                {input}
              </p>
            </div>
          )}
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
