"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, MapPin, Globe, Award, Calendar } from "lucide-react";
import { useState } from "react";
import { BookAppointmentDialog } from "./BookAppointmentDialog";

interface DoctorProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: any;
}

export function DoctorProfileDialog({ open, onOpenChange, doctor }: DoctorProfileDialogProps) {
  const [bookOpen, setBookOpen] = useState(false);

  if (!doctor) return null;

  const initials = doctor.full_name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Doctor Profile</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="flex flex-col items-center text-center space-y-4 md:w-1/3">
              <Avatar className="h-32 w-32 border-4 border-muted">
                <AvatarImage src={doctor.profile_photo || ""} alt={doctor.full_name} />
                <AvatarFallback className="text-4xl">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold flex items-center justify-center gap-2">
                  Dr. {doctor.full_name}
                  {doctor.is_verified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Verified</Badge>
                  )}
                </h2>
                <p className="text-muted-foreground">{doctor.specialization}</p>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-semibold">{doctor.rating?.toFixed(1) || "New"}</span>
                <span className="text-muted-foreground text-sm">({doctor.total_reviews || 0} reviews)</span>
              </div>
              <Button 
                className="w-full" 
                onClick={() => {
                  onOpenChange(false);
                  setBookOpen(true);
                }}
              >
                Book Appointment
              </Button>
            </div>
            
            <div className="md:w-2/3 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {doctor.about || "No biography available."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Award className="h-4 w-4" /> Qualification
                  </div>
                  <p className="text-sm font-medium">{doctor.qualification}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4" /> Experience
                  </div>
                  <p className="text-sm font-medium">{doctor.experience_years} Years</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Globe className="h-4 w-4" /> Languages
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(doctor.languages || []).map((lang: string) => (
                      <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4" /> Clinic
                  </div>
                  <p className="text-sm font-medium">{doctor.clinic_name}, {doctor.city}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5" /> Available Timings
                </h3>
                <div className="space-y-2">
                  {doctor.doctor_availability && doctor.doctor_availability.length > 0 ? (
                    doctor.doctor_availability.map((avail: any) => (
                      <div key={avail.id} className="flex justify-between text-sm border-b pb-2 last:border-0">
                        <span className="font-medium">{avail.day_of_week}</span>
                        <span className="text-muted-foreground">
                          {avail.start_time.substring(0,5)} - {avail.end_time.substring(0,5)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Timings not provided.</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Patient Reviews</h3>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-sm text-muted-foreground italic">Reviews will be visible after integration is complete.</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BookAppointmentDialog 
        open={bookOpen} 
        onOpenChange={setBookOpen} 
        doctor={doctor} 
      />
    </>
  );
}
