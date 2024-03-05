import { Roboto } from "next/font/google";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";

const font = Roboto({
  subsets: ["latin"],
  weight: ["700"]
})

export default function Home() {
  return (
  
    <main className="flex h-full flex-col items-center justify-center bg-black">
      <div className="text-center">
        <div className="space-x-4">
          <LoginButton asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
          <RegisterButton asChild>
            <Button variant="default" size="lg">
              Register
            </Button>
          </RegisterButton>
        </div>
      </div>
    </main>
  );
}
