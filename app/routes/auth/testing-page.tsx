import { Link } from "react-router";
import type { Route } from "./+types/testing-page"
import { buttonVariants } from "~/components/ui/button";

export async function loader() {
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


export default function MyRouteComponent({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
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
    </div>
  );
}
