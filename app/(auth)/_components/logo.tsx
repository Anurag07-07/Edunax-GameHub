import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets:["latin"],
  weight:['200','300','400','500','600','700','800']
})

export const Logo = ()=>{
  return <div className=" flex flex-col items-center">
    <div className="rounded-full p-1 flex justify-center items-center flex-col">
      <Image src='/game-svgrepo-com.svg' alt="Logo" width={80} height={80}></Image>
    </div>
    <div className=" flex flex-col items-center">
      <p className={cn("text-xl font-semibold",font.className)}>EDUNAX GAMEHUB</p>
      <p className={cn("text-sm text-muted-foreground",font.className)}>Let&apos;s play</p>
    </div>
  </div>
}