"use client"

import { useKeywords } from "@/hooks/use-automation"
import { useQueryAutomation } from "@/hooks/user-queries"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useEffect } from "react"

type Props = {
  id: string
}

const Keywords = ({ id }: Props) => {
  const {
    keyword,
    onValueChange,
    onKeyPress,
    deleteKeyword,
    isAdding,
    isDeleting,
  } = useKeywords(id)

  const { data } = useQueryAutomation(id)
  const keywords = data?.data?.keywords ?? []


  return (
    <div className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl">
      <p className="text-sm text-text-secondary">
        Add words that trigger automations
      </p>

      <Input
        value={keyword}
        onChange={onValueChange}
        onKeyDown={onKeyPress}
        placeholder="Type keyword and press Enter"
        disabled={isAdding}
        className="bg-background-80 border-dashed"
      />

      <div className="flex flex-wrap gap-2">
        {keywords.map((word) => (
          <div
            key={word.id}
            className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70]
                       flex items-center gap-x-2 capitalize text-white
                       font-light py-1 px-4 rounded-full text-sm"
          >
            <span>{word.word}</span>

            <button
              onClick={() => deleteKeyword(word.id)}
              disabled={isDeleting}
              className="ml-1 text-white/70 hover:text-white transition"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Keywords
