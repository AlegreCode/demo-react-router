import React from 'react'

const NoChatSelectedPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">No hay un contacto seleccionado</h2>
        <p className="text-muted-foreground">Por favor, selecciona un contacto de la lista para comenzar una conversación</p>
      </div>
    </div>
  )
}

export default NoChatSelectedPage