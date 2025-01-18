'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { CharacterSidebar } from '../components/ui/charactersidebar'

export default function AIPromptChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedCharacter) {
      handleSubmit(e, { options: { body: { character: selectedCharacter } } })
    } else {
      handleSubmit(e)
    }
  }

  return (
    <div className="flex h-screen font-mono">
      <main className="flex-grow flex items-center justify-center p-4">
        <form onSubmit={onSubmit} className="w-[calc(100vh-32px)] max-w-[800px] aspect-square flex flex-col">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Enter your prompt here..."
            className="w-full flex-grow p-4 bg-gray-100 border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 font-mono text-lg"
          />
          <Button type="submit" className="w-full py-6 text-lg mt-4 bg-blue-500 hover:bg-blue-600 text-white font-mono">
            {selectedCharacter ? `Submit to ${selectedCharacter}` : 'Submit'}
          </Button>
        </form>
      </main>
      <CharacterSidebar onSelectCharacter={setSelectedCharacter} selectedCharacter={selectedCharacter} />
    </div>
  )
}

