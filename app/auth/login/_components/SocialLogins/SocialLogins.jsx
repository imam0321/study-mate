import { doSocialLogin } from "@/app/actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function SocialLogins() {
  return (
    <>
      <div className="text-center text-md mt-3 text-gray-500">
        or Signup with
      </div>
      <form action={doSocialLogin}>
        <div className="flex justify-center gap-2">
          <Button
            className="mt-4 py-3 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center"
            type="submit"
            name="action"
            value="google">
            <Image src="/google.png" alt="google" width={40} height={40} />
            <span>Google</span>
          </Button>
        </div>
      </form>
    </>
  )
}
