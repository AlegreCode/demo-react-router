import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Copy, Download, ThumbsUp, ThumbsDown, Send, MessageSquareOff } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { getClient, getClientMessages } from '~/fake/fake-data'
import type { Route } from './+types/client-chat-page'
import { formatDate } from '~/lib/date-formatter'
import { getSession } from '~/sessions.server'

export async function loader({ params, request }: Route.LoaderArgs) {
  const { id } = params
  const messages = await getClientMessages(id)
  const client = await getClient(id)
  const session = await getSession(request.headers.get("Cookie"))
  const username = session.get("name")

  return { messages, client, username }
}

const ClientChatPage = ({ loaderData }: Route.ComponentProps) => {
  const [input, setInput] = useState("")
  const { messages, client, username } = loaderData
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
          <MessageSquareOff className="h-12 w-12 text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-muted-foreground">No hay mensajes con {client.name}</h2>
          <p className="text-muted-foreground">¡Sé el primero en iniciar una conversación! Escribe un mensaje para comenzar a chatear.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages?.map((message, index) => (
            <div key={index} className="w-full">
              {message.sender === "client" ? (
                // Agent message - left aligned
                <div className="flex gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{client.name}</span>
                      <span className="text-sm text-muted-foreground">{formatDate(message.createdAt)}</span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - right aligned
                <div className="flex flex-col items-end">
                  <div className="text-right mb-1">
                    <span className="text-sm font-medium mr-2">{username}</span>
                    <span className="text-sm text-muted-foreground">{formatDate(message.createdAt)}</span>
                  </div>
                  <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] h-[44px] resize-none py-3"
          />
          <Button className="h-[44px] px-4 flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ClientChatPage