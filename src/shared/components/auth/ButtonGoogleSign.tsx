
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import googleRedirect from "@/features/auth/api/googleRedirect";

export default function ButtonGoogleSign() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSign = async () => {
    try {
      setIsLoading(true);

      const response = await googleRedirect();

      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error("Google Sign In Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSign}
        disabled={isLoading}
        className="h-11 w-full gap-3 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
      >
        <SiGoogle size={18} />
        <span>
          {isLoading ? "Redirecting..." : "Sign in with Google"}
        </span>
      </Button>

      <div className="flex items-center gap-4">
        <span className="h-0.5 flex-1 bg-gray-200" />
        <span className="text-xs font-medium text-gray-400">OR</span>
        <span className="h-0.5 flex-1 bg-gray-200" />
      </div>
    </>
  );
}
