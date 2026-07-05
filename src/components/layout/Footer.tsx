import { Container } from "./Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <Container className="pt-20 pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-teal-50 rounded-xl flex items-center justify-center text-primary">
                <Activity className="h-6 w-6" />
              </div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">Nirogitanman</span>
            </Link>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-sm">
              Your holistic, AI-powered healthcare ecosystem. Merging modern medical technology with preventive wellness guidance.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <h3 className="font-bold mb-6 text-slate-900">Platform</h3>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/ai-health" className="hover:text-primary transition-colors">AI Health</Link></li>
              <li><Link href="/diet-planner" className="hover:text-primary transition-colors">Diet Planner</Link></li>
              <li><Link href="/doctors" className="hover:text-primary transition-colors">Find Doctors</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-1">
            <h3 className="font-bold mb-6 text-slate-900">Company</h3>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="font-bold mb-6 text-slate-900">Stay Updated</h3>
            <p className="text-slate-500 font-medium mb-4 leading-relaxed">
              Subscribe to our newsletter for clinical health tips and platform updates.
            </p>
            <form className="flex space-x-2 mt-6">
              <Input type="email" placeholder="Email address" className="max-w-[240px] bg-slate-50 border-slate-200 focus-visible:ring-primary h-12" />
              <Button type="submit" className="h-12 px-6">Subscribe</Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-400">
          <p>&copy; {new Date().getFullYear()} Nirogitanman Inc. All rights reserved.</p>
          <div className="flex space-x-8">
            <Link href="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-slate-900 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
