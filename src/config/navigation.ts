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
    { title: "Medical Records", href: `${ROUTES.DASHBOARD}/medical-records`, icon: FileText },
    { title: "Lab Reports", href: `${ROUTES.DASHBOARD}/lab-reports`, icon: FileText },
    { title: "Medicine Reminders", href: `${ROUTES.DASHBOARD}/medicine-reminders`, icon: Pill },
    { title: "Appointments", href: `${ROUTES.DASHBOARD}/appointments`, icon: Calendar },
    { title: "Symptom Checker", href: `${ROUTES.DASHBOARD}/symptom-checker`, icon: Stethoscope, isPlaceholder: true },
    { title: "Diet Planner", href: `${ROUTES.DASHBOARD}/diet-planner`, icon: Utensils, isPlaceholder: true },
    { title: "Dosha Assessment", href: `${ROUTES.DASHBOARD}/dosha-assessment`, icon: ActivitySquare, isPlaceholder: true },
    { title: "Notifications", href: `${ROUTES.DASHBOARD}/notifications`, icon: Bell },
    { title: "Settings", href: `${ROUTES.DASHBOARD}/settings`, icon: Settings },
  ],
};
