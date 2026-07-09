"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, MapPin, Stethoscope } from "lucide-react";
import { useState } from "react";
import { DoctorProfileDialog } from "./DoctorProfileDialog";
import { BookAppointmentDialog } from "./BookAppointmentDialog";

interface DoctorCardProps {
  doctor: any; // Ideally import Database generated type
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const initials = doctor.full_name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="p-4 pb-0 flex-row gap-4 items-start">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={doctor.profile_photo || ""} alt={doctor.full_name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg line-clamp-1 flex items-center gap-2">
                Dr. {doctor.full_name}
              </h3>
              {doctor.is_verified && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 whitespace-nowrap">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-primary font-medium flex items-center gap-1 line-clamp-1">
              <Stethoscope className="h-3 w-3" /> {doctor.specialization}
            </p>
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{doctor.rating?.toFixed(1) || "New"}</span>
              <span className="text-muted-foreground">({doctor.total_reviews || 0})</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-3 flex-1">
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 line-clamp-1">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{doctor.clinic_name}, {doctor.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" />
              <span>{doctor.experience_years} Years Exp.</span>
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t">
              <span className="font-medium text-foreground">Consultation Fee:</span>
              <span className="text-primary font-semibold">₹{doctor.consultation_fee}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 gap-2">
          <Button variant="outline" className="w-1/2" onClick={() => setProfileOpen(true)}>
            View Profile
          </Button>
          <Button className="w-1/2" onClick={() => setBookOpen(true)}>
            Book
          </Button>
        </CardFooter>
      </Card>

      <DoctorProfileDialog open={profileOpen} onOpenChange={setProfileOpen} doctor={doctor} />
      <BookAppointmentDialog open={bookOpen} onOpenChange={setBookOpen} doctor={doctor} />
    </>
  );
}
