"use client"

import InstagramBlue from "@/icons/InstagramBlue.svg"
import PlainBlue from "@/icons/plainBlue.svg"

type Props = {
  type: string
  keywords: {
    id: string
    word: string
    automationId: string | null
  }[]
}

const ActiveTrigger = ({ keywords, type }: Props) => {
  const isComment = type === "COMMENT"

  return (
    <div className="bg-background-80 p-3 rounded-xl w-full">
      {/* HEADER */}
      <div className="flex gap-x-2 items-center">
        {isComment ? (
          <InstagramBlue className="w-5 h-5" />
        ) : (
          <PlainBlue className="w-5 h-5" />
        )}

        <p className="text-lg text-white">
          {isComment
            ? "User comments on my post."
            : "User sends me a direct message."}
        </p>
      </div>

      {/* DESCRIPTION */}
      <p className="text-text-secondary text-sm mt-1">
        {isComment
          ? "If the user comments on a video that is set up to listen for keywords, this automation will fire."
          : "If the user sends you a message that contains a keyword, this automation will fire."}
      </p>

      {/* KEYWORDS */}
      {keywords.length > 0 && (
        <div className="flex gap-2 mt-5 flex-wrap">
          {keywords.map((word) => (
            <div
              key={word.id}
              className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70]
                         flex items-center gap-x-2 capitalize text-white
                         font-light py-1 px-4 rounded-full text-sm"
            >
              <p>{word.word}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ActiveTrigger
