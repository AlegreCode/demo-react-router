import { AlertCircle } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    error: string | undefined;
}

const Dialong = ({ open, onOpenChange, error }: Props) => {
  return (
    <AlertDialog defaultOpen={open} open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertCircle size={50} className="text-red-800 mx-auto"/>
            <AlertDialogTitle className="text-center text-red-500">Somethig went wrong!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-red-500">
              { error }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-full bg-red-800 hover:cursor-pointer hover:bg-red-500">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}

export default Dialong