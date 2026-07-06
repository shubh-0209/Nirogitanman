import { ROUTES } from './routes';
import { 
  LayoutDashboard, 
  User, 
  Bot, 
  Stethoscope, 
  ActivitySquare,
  Utensils, 
  Calendar, 
  Pill, 
  FileText, 
  Bell, 
  Settings
} from "lucide-react";

export const NAVIGATION = {
  PATIENT_SIDEBAR: [
    { title: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { title: "My Profile", href: `${ROUTES.DASHBOARD}/profile`, icon: User },
    { title: "AI Assistant", href: `${ROUTES.DASHBOARD}/ai-assistant`, icon: Bot, isPlaceholder: true },
    { title: "Symptom Checker", href: `${ROUTES.DASHBOARD}/symptom-checker`, icon: Stethoscope, isPlaceholder: true },
    { title: "Dosha Assessment", href: `${ROUTES.DASHBOARD}/dosha-assessment`, icon: ActivitySquare, isPlaceholder: true },
    { title: "Diet Planner", href: `${ROUTES.DASHBOARD}/diet-planner`, icon: Utensils, isPlaceholder: true },
    { title: "Appointments", href: `${ROUTES.DASHBOARD}/appointments`, icon: Calendar, isPlaceholder: true },
    { title: "Medicine Reminder", href: `${ROUTES.DASHBOARD}/medicine-reminder`, icon: Pill, isPlaceholder: true },
    { title: "Medical Records", href: `${ROUTES.DASHBOARD}/medical-records`, icon: FileText },
    { title: "Notifications", href: `${ROUTES.DASHBOARD}/notifications`, icon: Bell, isPlaceholder: true },
    { title: "Settings", href: `${ROUTES.DASHBOARD}/settings`, icon: Settings },
  ],
};
