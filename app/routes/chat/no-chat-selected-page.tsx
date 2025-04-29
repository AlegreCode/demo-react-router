import { MessageSquare } from 'lucide-react'

const NoChatSelectedPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-muted-foreground">No hay un contacto seleccionado</h2>
        <p className="text-muted-foreground">Por favor, selecciona un contacto de la lista para comenzar una conversación</p>
      </div>
    </div>
  )
}

export default NoChatSelectedPage