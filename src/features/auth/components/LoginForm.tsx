"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "../schemas";
import { login } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export function LoginForm() {
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    setError(null);
    startTransition(async () => {
      const result = await login(data);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="w-full bg-white rounded-[20px] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 relative overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-600"></div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
        <p className="text-slate-500 mt-2 text-base">Sign in to your patient portal</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50 text-red-800 rounded-xl">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-medium">{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Email Input with Floating Label */}
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

        {/* Password Input with Floating Label */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Lock className={`h-5 w-5 transition-colors duration-300 ${errors.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-teal-600'}`} />
          </div>
          <Input 
            id="password" 
            type="password" 
            {...register("password")} 
            className={`peer h-14 w-full pl-11 pr-4 pt-4 pb-1 rounded-xl border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white transition-all duration-300 focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 shadow-sm ${errors.password ? "border-red-400 focus-visible:ring-red-400" : ""}`}
            placeholder=" "
          />
          <label 
            htmlFor="password" 
            className={`absolute left-11 top-2 text-xs font-medium transition-all duration-300 pointer-events-none
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:font-normal
              peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium
              ${errors.password ? 'text-red-500' : 'text-slate-500 peer-focus:text-teal-600'}
            `}
          >
            Password
          </label>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1.5 ml-1 font-medium">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Link 
            href="/forgot-password" 
            className="text-sm text-teal-600 hover:text-teal-700 font-semibold transition-colors focus:outline-none focus:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group" 
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <span className="flex items-center justify-center w-full">
              Sign In
              <ArrowRight className="ml-2 h-5 w-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </span>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-600">
          New to Nirogitanman?{" "}
          <Link 
            href={ROUTES.REGISTER} 
            className="text-teal-600 hover:text-teal-700 font-semibold transition-colors focus:outline-none focus:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
