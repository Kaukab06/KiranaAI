'use client'

import { MessageCircle, User } from 'lucide-react'

interface ChatMessageProps {
  message: {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex gap-3 max-w-2xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? 'bg-primary/20 border border-primary'
              : 'bg-secondary border border-border'
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-primary" />
          ) : (
            <MessageCircle className="w-4 h-4 text-foreground" />
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`px-4 py-3 rounded-lg ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary border border-border text-foreground'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          <p
            className={`text-xs mt-2 ${
              isUser
                ? 'text-primary-foreground/70'
                : 'text-muted-foreground'
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
