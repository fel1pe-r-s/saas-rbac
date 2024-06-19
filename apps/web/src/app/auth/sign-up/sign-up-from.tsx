"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import gitHubIcon from "@/app/assets/github-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { signUpAction } from "./action";
import { useActionState } from "react";
import { signInWithGithub } from "../actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, {
    success: false,
    message: null,
    errors: null,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!state.success && state.message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign up failed</AlertTitle>
            <AlertDescription>
              <p>{state.message}</p>
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input name="name" type="text" id="name" />
          {state.errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {state.errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" id="email" />
          {state.errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {state.errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
          {state.errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {state.errors.password}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your Password</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />
          {state.errors?.password_confirmation && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {state.errors.password_confirmation}
            </p>
          )}
        </div>

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Create account"
          )}
        </Button>

        <Button disabled={isPending} variant="link" className="w-full" asChild>
          <Link href="/auth/sign-in">Already registered? sign in</Link>
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
