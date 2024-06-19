"use server";
import { signInWithPassword } from "@/http/sign-in-with-password";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({ message: "please enter a valid email address" }),
  password: z.string().min(1, { message: "please, provide a valid password" }),
});

type SignInFormInput = z.infer<typeof signInSchema>;

export async function signInWithEmailAndPassword(
  _: unknown,
  data: SignInFormInput
) {
  const result = signInSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid form data",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    });

    cookies().set("token", token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();

      return {
        success: false,
        message,
        errors: null,
      };
    }

    return {
      success: false,
      message: "unexpected error",
      errors: null,
    };
  }

  redirect("/");
}
