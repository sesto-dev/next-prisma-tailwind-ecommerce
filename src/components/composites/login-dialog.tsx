import { EnterIcon } from '@radix-ui/react-icons'
import { Icons, Spinner } from 'components/native/icons'
import { Button } from 'components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from 'components/ui/dialog'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { isEmailValid } from 'lib/regex'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LoginDialog() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [OTP, setOTP] = useState('')
    const [usingOTP, setUsingOTP] = useState(false)
    const [fetching, setFetching] = useState(false)

    async function tryOTP() {
        if (isEmailValid(email)) {
            setFetching(true)

            const response = await fetch('/api/auth/otp/try', {
                method: 'POST',
                body: JSON.stringify({ email }),
            })

            if (response.ok) setUsingOTP(true)
            setFetching(false)
        }
    }

    async function verifyOTP() {
        setFetching(true)

        const response = await fetch('/api/auth/otp/verify', {
            method: 'POST',
            body: JSON.stringify({ email, OTP }),
        })

        const { AccessToken, RefreshToken } = await response.json()

        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('AccessToken', AccessToken)
            window.localStorage.setItem('RefreshToken', RefreshToken)
        }

        router.reload()

        setFetching(false)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="font-thin tracking-wider">
                    <EnterIcon /> Login
                </Button>
            </DialogTrigger>
            {usingOTP ? (
                <VerifyComponents
                    OTP={OTP}
                    setOTP={setOTP}
                    verifyOTP={verifyOTP}
                    fetching={fetching}
                />
            ) : (
                <TryComponents
                    email={email}
                    setEmail={setEmail}
                    tryOTP={tryOTP}
                    fetching={fetching}
                />
            )}
        </Dialog>
    )
}

function TryComponents({ email, setEmail, tryOTP, fetching }) {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                    Enter your email below or use other methods to login.
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
                <Button variant="outline">
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    Github
                </Button>
                <Button variant="outline">
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                </Button>
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="example@example.com"
                    required
                />
            </div>
            <DialogFooter>
                <Button
                    disabled={!isEmailValid(email) || fetching}
                    onClick={tryOTP}
                    className="w-full"
                >
                    {fetching ? <Spinner /> : 'Login'}
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

function VerifyComponents({ OTP, setOTP, verifyOTP, fetching }) {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                    Enter the code we sent to your email to login.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
                <Label htmlFor="email">One-Time Password</Label>
                <Input
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    id="password"
                    type="password"
                    placeholder="12345"
                    required
                />
            </div>
            <DialogFooter>
                <Button
                    disabled={fetching}
                    onClick={verifyOTP}
                    className="w-full"
                >
                    {fetching ? <Spinner /> : 'Submit'}
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}
