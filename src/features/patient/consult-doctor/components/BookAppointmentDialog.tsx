"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { bookAppointment } from "../actions";

export interface BookAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: any; // Type it better if you want, using generated types
}

export function BookAppointmentDialog({ open, onOpenChange, doctor }: BookAppointmentDialogProps) {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Generate simple timeslots for the demo
  const timeSlots = ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

  const handleBook = async () => {
    if (!date || !time || !reason) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const result = await bookAppointment({
        doctorId: doctor.id,
        department: doctor.specialization,
        appointmentDate: date,
        appointmentTime: time,
        appointmentType: "General Consultation",
        consultationMode: "Clinic Visit",
        reasonForVisit: reason,
      });

      if (result.success) {
        toast.success("Appointment booked successfully! Status: Pending");
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to book appointment.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Schedule a consultation with Dr. {doctor.full_name}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Appointment Type</Label>
            <Select defaultValue="clinic">
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clinic">Clinic Visit</SelectItem>
                <SelectItem value="online" disabled>Online Consultation (Coming Soon)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Preferred Date *</Label>
            <Input 
              id="date" 
              type="date" 
              min={new Date().toISOString().split('T')[0]} 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>

          <div className="grid gap-2">
            <Label>Preferred Time *</Label>
            <Select value={time} onValueChange={(val) => setTime(val || "")}>
              <SelectTrigger>
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reason">Reason for Visit *</Label>
            <Textarea 
              id="reason" 
              placeholder="E.g., Follow-up, Routine checkup, specific symptoms..." 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleBook} disabled={loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
