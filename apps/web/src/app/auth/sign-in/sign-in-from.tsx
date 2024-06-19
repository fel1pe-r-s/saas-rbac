"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Loader2 } from "lucide-react";
import gitHubIcon from "@/app/assets/github-icon.svg";
import { signInWithEmailAndPassword } from "./action";
import { signInWithGithub } from "../actions";
import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithEmailAndPassword,
    {
      success: false,
      message: null,
      errors: null,
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    formAction({ email, password });
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!state.success && state.message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed</AlertTitle>
            <AlertDescription>
              <p>{state.message}</p>
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" id="email" />
          {state.errors?.email && (
            <p className="text-xs font-medium text-red-500">
              {state.errors.email}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
          {state.errors?.password && (
            <p className="text-xs font-medium text-red-500">
              {state.errors.password}
            </p>
          )}
          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-foreground hover:underline"
          >
            Forgot your password
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Sign in with e-mail"
          )}
        </Button>
        <Button variant="link" className="w-full" asChild disabled={isPending}>
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>

        <Separator />
      </form>
      <form action={signInWithGithub}>
        <Button
          type="submit"
          variant="outline"
          className="w-full"
          disabled={isPending}
        >
          <Image src={gitHubIcon} alt="" className="mr-2 dark:invert" />
          Sign in with GitHub
        </Button>
      </form>
    </>
  );
}
