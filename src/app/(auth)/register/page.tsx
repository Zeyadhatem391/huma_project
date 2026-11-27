import RegisterForm from "@/features/auth/register/components/RegisterForm";
import ButtonGoogleSign from "@/shared/components/auth/ButtonGoogleSign";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl  tracking-tight text-gray-900 font-bold">
          Sign Up
        </h1>
        <p className="text-sm text-gray-500">Connect with every application!</p>
      </div>

      <ButtonGoogleSign />

      <RegisterForm />

      <Link
        href="/login"
        className="block text-gray-500 text-center cursor-pointer"
      >
        Already have an account?
        <span className="text-blue-700 text-sm font-bold"> Sign In</span>
      </Link>
    </div>
  );
}
