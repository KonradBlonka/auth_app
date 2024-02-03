import { Roboto } from "next/font/google";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";

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
      </div>
    </main>
  );
}
