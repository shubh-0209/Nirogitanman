import { ActivitySquare, Bot, Calendar, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full bg-slate-50 font-sans">
      {/* Left side - Branding and Graphic (hidden on small screens) */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-gradient-to-br from-teal-50 via-teal-100/50 to-white border-r border-teal-100/50 relative overflow-hidden p-12">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
          <div className="absolute top-1/3 -right-24 w-80 h-80 bg-teal-300/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
          <div className="absolute -bottom-24 left-1/4 w-[500px] h-[500px] bg-teal-100/60 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 w-fit hover:opacity-90 transition-opacity">
            <div className="h-10 w-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-teal-500/20">
              <ActivitySquare className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">Nirogitanman</span>
          </Link>

          {/* Hero text and Illustration area */}
          <div className="flex-1 flex flex-col justify-center mt-12 mb-8 max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Your Complete Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Ecosystem</span>
            </h1>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              Experience the future of healthcare management. Secure, intelligent, and designed around you.
            </p>

            {/* Product Highlights */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-teal-50 border border-teal-100 p-2.5 rounded-lg text-teal-600 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">Secure Medical Records</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                    Access your prescriptions, test reports, and medical history anytime, safely encrypted.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-teal-50 border border-teal-100 p-2.5 rounded-lg text-teal-600 shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">Smart Appointment Management</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                    Book, reschedule, or cancel consultations effortlessly with real-time availability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-teal-50 border border-teal-100 p-2.5 rounded-lg text-teal-600 shadow-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">AI Health Assistant</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                    Get instant insights, check symptoms, and track your daily wellness metrics intelligently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative">
        {/* Mobile Header / Logo */}
        <div className="absolute top-8 left-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
              <ActivitySquare className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Nirogitanman</span>
          </Link>
        </div>

        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out mt-12 lg:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
