import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Copy, Download, ThumbsUp, ThumbsDown, Send, MessageSquareOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { getClient, getClientMessages, sendMessage } from '~/fake/fake-data'
import type { Route } from './+types/client-chat-page'
import { formatDate } from '~/lib/date-formatter'
import { commitSession, getSession } from '~/sessions.server'
import { data, Form } from 'react-router'
import Dialong from '~/components/dialog'
import ClientForm from '~/components/ClientForm'

export async function loader({ params, request }: Route.LoaderArgs) {
  const { id } = params
  const messages = await getClientMessages(id)
  const client = await getClient(id)
  const session = await getSession(request.headers.get("Cookie"))
  const username = session.get("name")

  return { messages, client, username }
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData()
  const message = formData.get("message") ?? ""
  const session = await getSession(request.headers.get("Cookie"))

  if (message === "") {
    session.flash("error", "The message field is required.")
    return data(
      { error: "The message field is required.", success: false },
      {
        headers: {
          "Set-Cookie": await commitSession(session)
        },
        status: 400,
        statusText: "Bad request"
      }
    )
  }
  const newMessage = await sendMessage({
    sender: "agent",
    clientId: params.id,
    content: message.toString(),
    createdAt: new Date()
  })

  return data(
    { success: true, message: newMessage, error: undefined },
    {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    }
  )
}

const ClientChatPage = ({ loaderData, actionData }: Route.ComponentProps) => {
  const [openAlert, setOpenAlert] = useState(false)
  const [input, setInput] = useState("")
  const { messages, client, username } = loaderData

  useEffect(() => {
    if (actionData?.error) {
      setOpenAlert(true)
    } else if (actionData?.success){
      setInput("")
    }
  }, [actionData])


  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col">
        <Dialong open={openAlert} onOpenChange={setOpenAlert} error={actionData?.error} />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <MessageSquareOff className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-muted-foreground">No hay mensajes con {client.name}</h2>
            <p className="text-muted-foreground">¡Sé el primero en iniciar una conversación! Escribe un mensaje para comenzar a chatear.</p>
          </div>
        </div>
        <ClientForm input={input} setInput={setInput} />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">

      <Dialong open={openAlert} onOpenChange={setOpenAlert} error={actionData?.error} />

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
      <ClientForm input={input} setInput={setInput} />
    </div>
  )
}

export default ClientChatPage