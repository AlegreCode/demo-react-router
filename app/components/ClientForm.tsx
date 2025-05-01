import { Form } from 'react-router'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { Send } from 'lucide-react'

interface ClientFormProps {
  input: string
  setInput: (value: string) => void
}

export default function ClientForm({ input, setInput }: ClientFormProps) {
  return (
    <Form method='POST' className="p-4 border-t">
      <div className="flex items-center gap-2">
        <Textarea
          placeholder="Type a message as a customer"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[44px] h-[44px] resize-none py-3"
          name='message'
        />
        <Button type='submit' className="h-[44px] px-4 flex items-center gap-2 hover:cursor-pointer">
          <Send className="h-4 w-4" />
          <span>Send</span>
        </Button>
      </div>
    </Form>
  )
} 