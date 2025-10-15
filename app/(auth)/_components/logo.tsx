import { Poppins } from "next/font/google";
import Image from "next/image";


const font = Poppins({
  subsets:["latin"],
  weight:['200','300','400','500','600','700','800']
})

export const Logo = ()=>{
  return <div className=" flex flex-col items-center gap-y-4">
    <div className="rounded-full p-1 flex justify-center gap-y-2 items-center flex-col">
      <Image src='/game-svgrepo-com.svg' alt="Logo" width={80} height={80}></Image>
      <div className=" text-3xl font-semibold ">EDUNAX GAMEHUB</div>
    </div>
  </div>
}
