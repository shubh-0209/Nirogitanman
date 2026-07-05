import { ROLES } from './constants';

export const PERMISSIONS = {
  [ROLES.PATIENT]: {
    canBookAppointment: true,
    canViewOwnReports: true,
    canManageAllUsers: false,
  },
  [ROLES.DOCTOR]: {
    canBookAppointment: false,
    canViewOwnReports: false,
    canViewPatientReports: true,
    canManageAllUsers: false,
  },
  [ROLES.ADMIN]: {
    canBookAppointment: false,
    canViewOwnReports: false,
    canManageAllUsers: true,
  },
};
