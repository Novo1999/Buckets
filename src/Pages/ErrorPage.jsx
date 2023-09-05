import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-full">
      <div className="flex justify-center items-center flex-col gap-2 h-screen">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i className="text-rose-500 font-semibold text-xl">
            {error.statusText || error.message}
          </i>
        </p>
      </div>
    </div>
  );
}
