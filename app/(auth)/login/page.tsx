"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button"
import Link from "next/link";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  onSignUpClick: () => void;
}

export default function Login({ onSignUpClick }: LoginFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      if (result?.ok) {
        router.push("/jobs");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full ">
      <div  className="w-full max-w-md mx-auto">

      <div className="flex items-center justify-center w-full mb-6">
            <hr className="flex-grow border-t mt-3 border-gray-200" />
            <span className="mx-4 -mt-10 text-2xl font-bold whitespace-nowrap">
              Welcome Back,
            </span>
            <hr className="flex-grow border-t border-gray-200" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4">
              <Label htmlFor="email" >Email Address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="!px-2 !py-6 !border border-gray-300 !rounded-md"
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="grid gap-4 mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="!px-2 !py-2 border border-gray-300 rounded-md"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl !bg-[#332ebc] !py-3 font-bold !text-white"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && (
              <div className="text-center text-sm text-red-500">{error}</div>
            )}
            <div className="text-left  py-4">
              {"Don't have an account? "}
              <Link
                href="#"
                className="underline !text-[#4640DE] font-bold"
                onClick={onSignUpClick}
              >
                Sign Up
              </Link>
            </div>
          </form>
      </div>
      {/* <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center pt-10">
          <div className="flex items-center justify-center w-full">
            <hr className="flex-grow border-t mt-3 border-gray-200" />
            <span className="mx-4 -mt-10 text-2xl font-bold whitespace-nowrap">
              Welcome Back,
            </span>
            <hr className="flex-grow border-t border-gray-200" />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="!px-2 py-2 border border-gray-300 rounded-md"
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="!px-2 py-2 border border-gray-300 rounded-md"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl !bg-[#332ebc] !py-3 font-bold !text-white"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && (
              <div className="text-center text-sm text-red-500">{error}</div>
            )}
            <div className="text-center text-sm">
              {"Don't have an account? "}
              <Link
                href="#"
                className="underline !text-[#4640DE] font-bold"
                onClick={onSignUpClick}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card> */}
    </div>
  );
}
