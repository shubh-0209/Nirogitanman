"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordInput } from "../schemas";
import { resetPasswordForEmail } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2, CheckCircle2, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export function ForgotPasswordForm() {
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const result = await resetPasswordForEmail(data);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(true);
      }
    });
  };

  return (
    <div className="w-full bg-white rounded-[20px] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 relative overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-600"></div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Reset password</h2>
        <p className="text-slate-500 mt-2 text-base">Enter your email and we&apos;ll send a reset link</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50 text-red-800 rounded-xl">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-medium">{error}</AlertDescription>
        </Alert>
      )}

      {success ? (
        <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-teal-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-teal-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Check your email</h3>
            <p className="text-slate-600 text-sm">
              We have sent a password reset link to your email.
            </p>
          </div>
          <Link href={ROUTES.LOGIN} className="block mt-4">
            <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail className={`h-5 w-5 transition-colors duration-300 ${errors.email ? 'text-red-400' : 'text-slate-400 group-focus-within:text-teal-600'}`} />
            </div>
            <Input 
              id="email" 
              type="email" 
              {...register("email")} 
              className={`peer h-14 w-full pl-11 pr-4 pt-4 pb-1 rounded-xl border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white transition-all duration-300 focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 shadow-sm ${errors.email ? "border-red-400 focus-visible:ring-red-400" : ""}`}
              placeholder=" "
            />
            <label 
              htmlFor="email" 
              className={`absolute left-11 top-2 text-xs font-medium transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:font-normal
                peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium
                ${errors.email ? 'text-red-500' : 'text-slate-500 peer-focus:text-teal-600'}
              `}
            >
              Email address
            </label>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1.5 ml-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group mt-2" 
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending link...
              </>
            ) : (
              <span className="flex items-center justify-center w-full">
                Send reset link
                <ArrowRight className="ml-2 h-5 w-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </span>
            )}
          </Button>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link 
              href={ROUTES.LOGIN} 
              className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors focus:outline-none focus:underline"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
