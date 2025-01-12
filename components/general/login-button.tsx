import { SignedOut, SignInButton } from "@clerk/nextjs"
import { Button } from "../ui/button"

export const LoginButton = () => {
    return (
        <SignedOut>
            <SignInButton>
                <Button
                    type="button"
                    className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none focus:ring-0 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                >
                    Login
                </Button>
            </SignInButton>
        </SignedOut>

    )
}
