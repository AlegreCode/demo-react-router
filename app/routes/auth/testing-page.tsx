import { Form, Link, useActionData, useNavigation} from "react-router";
import type { Route } from "./+types/testing-page"
import { buttonVariants } from "~/components/ui/button"
import { Loader2 } from "lucide-react";
import { sleep } from "~/lib/sleep";
import { useEffect, useState } from "react";

export async function action({ request }: Route.ActionArgs) {
  await sleep(2000)
  const data = await request.formData()
  const allData = await Object.fromEntries(data)

  return { ok: true, allData };
}

export async function loader() {
  await sleep(1500)
  return { message: "Hola Mundo, desde el server.!" };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  // call the server loader
  const serverData = await serverLoader();
  // And/or fetch data on the client
  // const data = getDataFromClient();
  // Return the data to expose through useLoaderData()
  return { message: "Hola Mundo, desde el cliente.!", serverData };
}

interface FormData {
  nombre: string;
  edad: string;
}

clientLoader.hydrate = true


export default function MyRouteComponent({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {

  const navigation = useNavigation()
  const isPosting = navigation.state === "submitting"

  const [formData, setFormData] = useState<FormData>({ nombre: "", edad: ""})

  const actionResult = useActionData()

  useEffect(() => {
    if (actionResult && actionResult.ok) {
      setFormData({ nombre: "", edad: ""})
    }
  }, [actionResult])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Testing Page</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>
      <Link to={"/auth/testing-args/ABC-123"} className={buttonVariants({variant: "destructive"})}>
          Testing args page
      </Link>
      <Form className="mt-8 flex items-center gap-4" method="POST">
        <div className="flex flex-col">
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre</label>
          <input 
            type="text"
            id="nombre"
            name="nombre"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            onChange={handleChange}
            value={formData.nombre}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="edad" className="text-sm font-medium text-gray-700">Edad</label>
          <input
            type="number"
            id="edad" 
            name="edad"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            onChange={handleChange}
            value={formData.edad}
          />
        </div>
        <button
          type="submit"
          className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:cursor-pointer hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:bg-stone-500"
          disabled={isPosting}
        >
          { isPosting ? <Loader2 className="animate-spin" /> : "Enviar" }
        </button>
      </Form>
    </div>
  );
}
