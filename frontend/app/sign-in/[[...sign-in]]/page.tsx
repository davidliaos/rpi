import { SignIn } from "@clerk/nextjs";
import Dark from '@/components/Dark'
 
export default function Page() {
  return (
  <div className="flex flex-col justify-center items-center h-[100%]">
    <div className=" self-end">
        <Dark />
    </div>
  <SignIn />
    </div>
    )
}