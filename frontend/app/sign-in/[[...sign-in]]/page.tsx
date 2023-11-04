import { SignIn } from "@clerk/nextjs";
import Dark from '@/components/Dark'
 
export default function Page() {
  return (
  <div>
    <div className=" self-end">
        <Dark />
    </div>
  <SignIn />
    </div>
    )
}