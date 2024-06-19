import { isAuthenticated } from "@/auth/auth";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }
  return (
    <>{children}</>
  );
}
