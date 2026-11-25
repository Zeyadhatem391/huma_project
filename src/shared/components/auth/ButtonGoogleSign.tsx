import { Button } from "@/components/ui/button";
import { SiGoogle } from "@icons-pack/react-simple-icons";

export default function ButtonGoogleSign() {
  return (
    <>
      <Button
        variant="outline"
        className="h-11 w-full gap-3 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
      >
        <SiGoogle size={18} />
        <span>Sign in with Google</span>
      </Button>

      <div className="flex items-center gap-4">
        <span className="h-0.5 flex-1 bg-gray-200" />
        <span className="text-xs font-medium text-gray-400">OR</span>
        <span className="h-0.5 flex-1 bg-gray-200" />
      </div>
    </>
  );
}
