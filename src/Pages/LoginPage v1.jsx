import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import {
  supabase as supabaseBackend,
  supabaseKey,
  supabaseUrl,
} from "../Backend/Supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";

const validatePhoneNumber =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const supabase = createClient(supabaseUrl, supabaseKey);

const Authentication = () => (
  <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
);

function LoginPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (submitted) => {
    const { data, error } = await supabase.auth.signUp({
      email: submitted.email,
      password: submitted.password,
    });
    console.log(submitted);
  };
  return (
    <div className="relative flex justify-center items-center">
      <h1 className="font-mono absolute top-10 left-10 text-white font-bold text-7xl">
        Buckets
      </h1>
      <img
        className="h-screen object-cover w-screen"
        src="/login-bg.jpg"
        alt="login"
      />
      <div className="absolute shadow-xl bg-gray-200 w-[36rem] h-96 rounded z-10 flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 items-center"
        >
          <label className="text-sm" htmlFor="phone">
            Enter your email
          </label>
          <input
            className="h-10 w-60 pl-4 rounded-md"
            type="text"
            placeholder="email"
            name="email"
            {...register("email")}
          />
          <label className="text-sm" htmlFor="phone">
            Enter your password
          </label>
          <input
            className="h-10 w-60 pl-4 rounded-md"
            type="password"
            name="name"
            placeholder="name"
            id="name"
            {...register("password")}
          />
          <input
            className="cursor-pointer bg-green-400 w-fit px-4 py-2 rounded-md hover:bg-green-300 transition-all duration-500"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
      <Outlet />
      <div>
        <Authentication />
      </div>
    </div>
  );
}

export default LoginPage;
