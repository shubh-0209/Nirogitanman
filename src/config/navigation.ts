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
  Settings,
  Users
} from "lucide-react";

export const NAVIGATION = {
  PATIENT_SIDEBAR: [
    { title: "Dashboard", href: ROUTES.DASHBOARD.PATIENT, icon: LayoutDashboard },
    { title: "My Profile", href: `${ROUTES.DASHBOARD.PATIENT}/profile`, icon: User },
    { title: "AI Assistant", href: `${ROUTES.DASHBOARD.PATIENT}/ai-assistant`, icon: Bot, isPlaceholder: true },
    { title: "Symptom Checker", href: `${ROUTES.DASHBOARD.PATIENT}/symptom-checker`, icon: Stethoscope, isPlaceholder: true },
    { title: "Dosha Assessment", href: `${ROUTES.DASHBOARD.PATIENT}/dosha-assessment`, icon: ActivitySquare, isPlaceholder: true },
    { title: "Diet Planner", href: `${ROUTES.DASHBOARD.PATIENT}/diet-planner`, icon: Utensils, isPlaceholder: true },
    { title: "Appointments", href: `${ROUTES.DASHBOARD.PATIENT}/appointments`, icon: Calendar, isPlaceholder: true },
    { title: "Medicine Reminder", href: `${ROUTES.DASHBOARD.PATIENT}/medicine-reminder`, icon: Pill, isPlaceholder: true },
    { title: "Health Reports", href: `${ROUTES.DASHBOARD.PATIENT}/health-reports`, icon: FileText, isPlaceholder: true },
    { title: "Notifications", href: `${ROUTES.DASHBOARD.PATIENT}/notifications`, icon: Bell, isPlaceholder: true },
    { title: "Settings", href: `${ROUTES.DASHBOARD.PATIENT}/settings`, icon: Settings },
  ],
  DOCTOR_SIDEBAR: [
    { title: "Dashboard", href: ROUTES.DASHBOARD.DOCTOR, icon: LayoutDashboard },
    { title: "Schedule", href: `${ROUTES.DASHBOARD.DOCTOR}/schedule`, icon: Calendar },
    { title: "Patients", href: `${ROUTES.DASHBOARD.DOCTOR}/patients`, icon: Users },
  ],
  ADMIN_SIDEBAR: [
    { title: "Dashboard", href: ROUTES.DASHBOARD.ADMIN, icon: LayoutDashboard },
    { title: "Users", href: `${ROUTES.DASHBOARD.ADMIN}/users`, icon: Users },
  ]
};
