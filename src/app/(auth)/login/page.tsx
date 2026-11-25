import LoginForm from "@/features/login/components/LoginForm";
import ButtonGoogleSign from "@/shared/components/auth/ButtonGoogleSign";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl  tracking-tight text-gray-900 font-bold">
          Sign In
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back, you’ve been missed!
        </p>
      </div>

      <ButtonGoogleSign />

      <LoginForm />

      <Link
        href="/register"
        className="block text-gray-500 text-center cursor-pointer"
      >
        Don’t have an account yet?
        <span className="text-blue-700 text-sm font-bold"> Sign Up</span>
      </Link>
    </div>
  );
}
