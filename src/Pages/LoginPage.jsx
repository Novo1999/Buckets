import { Outlet } from "react-router-dom";
import {
  supabase as supabaseBackend,
  supabaseKey,
  supabaseUrl,
} from "../Backend/Supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(supabaseUrl, supabaseKey);

const Authentication = () => (
  <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
);

function LoginPage() {
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
      <div className="absolute bg-white p-10 w-96 rounded-lg">
        <Authentication />
      </div>
      <Outlet />
    </div>
  );
}

export default LoginPage;
