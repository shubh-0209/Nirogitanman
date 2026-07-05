import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experienceYears: number;
  rating: number;
  location: string;
  avatarUrl?: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <Avatar className="h-16 w-16 border-2 border-primary/20">
          <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
            {doctor.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{doctor.name}</h3>
          <p className="text-primary font-medium text-sm">{doctor.specialization}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-foreground">{doctor.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{doctor.location}</span>
        </div>
        <div className="text-sm font-medium pt-2">
          {doctor.experienceYears}+ years experience
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={ROUTES.LOGIN} className={cn(buttonVariants(), "w-full")}>Book Appointment</Link>
      </CardFooter>
    </Card>
  );
}
