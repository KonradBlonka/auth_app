import { Roboto } from "next/font/google";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Roboto({
  subsets: ["latin"],
  weight: ["700"]
})

export default function Home() {
  return (
  
    <main className="flex h-full flex-col items-center justify-center bg-black">
      <div className="space y-5 text-center">
        <h1 className={cn(
        "text-6xl text-white drop-shadow-sm", font.className,)}>
          Authentication
        </h1>
        <p className="text-white text-lg">
          Auth service
        </p>
        <div>
          {/* if I want go to login page when i klick sign Up without coming back to Start page delete mode="modal" */}
          <LoginButton asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
