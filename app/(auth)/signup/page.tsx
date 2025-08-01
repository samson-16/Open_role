"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react";
// Remove this import, and instead:
import { useRouter } from "next/navigation";

export default function SignUpCard() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${url}signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
          role: "user"
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Signup successful! You can now log in.");
        
        localStorage.setItem("pendingEmail", form.email);
        localStorage.setItem("pendingPassword", form.password);
        router.push("/verifyemail");
        setForm({ fullName: "", email: "", password: "", confirmPassword: "" });
        console.log(data);
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-4">
        <p className="text-4xl font-bold text-center !mb-6">Sign Up Today!</p>

        {/* Google Button */}
        <button
          type="button"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
              prompt: "select_account",
              redirect: true,
            })
          }
          className="w-full !border border-gray-300 !py-2 flex items-center justify-center gap-2 text-gray-700 font-semibold mb-6"
        >
          <FcGoogle size={20} />
          <span className="font-medium">Sign Up with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-3">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">
            Or Sign Up with Email
          </span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <form className="space-y-2.5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="!border border-gray-300 rounded-lg !px-4 !py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="!border border-gray-300 rounded-lg !px-4 !py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="!border border-gray-300 rounded-lg !px-4 !py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Enter password"
              className="!border border-gray-300 rounded-lg !px-4 !py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              required
            />
          </div>

          {/* Error/Success Message */}
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full !bg-[#4640DE] !text-white text-center !py-3 rounded-full font-medium"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Continue"}
          </button>
        </form>

        {/* Footer */}
        <p className="!mt-6 text-left text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="!text-[#4640DE] font-medium hover:underline"
          >
            Login
          </Link>
        </p>

        <p className="!mt-2.5 text-sm text-gray-400 text-left ">
          By clicking ‘Continue’, you acknowledge that you have read and
          accepted our{" "}
          <Link href="#" className="underline !text-[#4640DE]">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline !text-[#4640DE]">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
