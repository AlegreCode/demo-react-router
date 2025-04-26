import { UserPlus } from 'lucide-react'

const NoContactSelected = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
        <div className="mb-4">
            <UserPlus className="h-12 w-12" />
        </div>
        <h3 className="font-medium mb-2">Ningún contacto seleccionado</h3>
        <p className="text-sm">Por favor, selecciona un contacto de la lista para ver sus detalles.</p>
    </div>
  )
}

export default NoContactSelected