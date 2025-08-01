"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function EmailVerification() {
  const router = useRouter();


  const [email, setEmail] = useState<string | null>(null);
  const storedPassword  = localStorage.getItem("pendingPassword")
  useEffect(() => {
    const storedEmail = localStorage.getItem("pendingEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);
  console.log(email)
  const [code, setCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleResendCode = () => {
    setTimeLeft(300);
    setCode(["", "", "", ""]);
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setError(null);
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const res = await fetch(`${url}verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          otp: code.join(""),
        }),
      });

      await signIn("credentials", {
        redirect: false,
        email,
        storedPassword,
      });
      
      router.push("/jobs")
     
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-4 border-blue-500 rounded-lg p-8">
        <div className="text-center space-y-6">
          <p className="text-3xl font-bold text-gray-900 !mb-10">
            Verify Email
          </p>

          <p className="text-gray-600 text-sm leading-relaxed text-left mt-4">
            {
              "We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here."
            }
          </p>

          <div className="flex space-x-2 mt-6 justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-12 h-12 text-center text-lg font-medium !border-2 !border-purple-200 rounded-lg !focus:border-purple-400 !focus:ring-purple-400 "
                maxLength={1}
              />
            ))}
          </div>

          <div className="text-sm text-gray-600">
            You can request to{" "}
            <button
              onClick={handleResendCode}
              disabled={timeLeft > 0}
              className="!text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Resend code
            </button>
            <div className="text-center mt-1">
              <span className="font-medium text-blue-600 hover:text-blue-800">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <Button
            className="!w-full !bg-purple-400 !hover:bg-purple-500 !text-white !py-6 rounded-full text-lg font-medium"
            disabled={code.some((digit) => !digit) || loading}
            onClick={handleVerifyCode}
          >
            {loading ? "Verifying..." : "Continue"}
          </Button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
}
