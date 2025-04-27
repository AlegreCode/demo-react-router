import { Link } from "react-router";
import type { Route } from "./+types/testing-args-page"
import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-react";
import { sleep } from "~/lib/sleep";


export function meta() {
  return [
    { title: "Support chat" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}

export async function loader() {
  await sleep(3000)
  return { message: "Hola Mundo, desde el server.!" }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  // call the server loader
  const serverData = await serverLoader();
  // And/or fetch data on the client
  // const data = getDataFromClient();
  // Return the data to expose through useLoaderData()
  return { message: "Hola Mundo, desde el cliente.!" }
}

export function HydrateFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 fixed inset-0 bg-white/80 backdrop-blur-sm">
      <Loader2 className="h-16 w-16 animate-spin text-sky-500" />
      <p className="text-2xl font-medium animate-pulse">Cargando...</p>
    </div>
  );
}

clientLoader.hydrate = true as const

export default function TestingArgsPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold">Testing Arg Page</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>

      <Button asChild variant="outline" className="bg-sky-300 hover:text-sky-500 transition-all duration-300">
        <Link to={"/auth/testing"}>
          Testing page
        </Link>
      </Button>
    </div>
  );
}
