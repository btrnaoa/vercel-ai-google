"use client"

import { useChat } from "ai/react"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <p>
              <span>{message.role === "user" ? "User" : "AI"}: </span>
              {message.content}
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </>
  )
}
