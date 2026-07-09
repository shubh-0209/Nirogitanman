"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DoctorCard } from "./DoctorCard";
import { fetchDoctors } from "../actions";
import { Skeleton } from "@/components/ui/skeleton";

export function ConsultDoctorClient() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [specialization, setSpecialization] = useState("All");

  const specializations = [
    "All",
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedist",
    "Neurologist",
    "Psychiatrist"
  ];

  const loadDoctors = async () => {
    setLoading(true);
    const data = await fetchDoctors(searchQuery, specialization);
    setDoctors(data);
    setLoading(false);
  };

  useEffect(() => {
    // Initial load
    loadDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadDoctors();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Stethoscope className="h-8 w-8 text-primary" />
          Consult Doctor
        </h1>
        <p className="text-muted-foreground mt-2">
          Find trusted doctors and book appointments for clinic visits or online consultations.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card p-4 rounded-xl border shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by doctor name, hospital, or specialization..." 
              className="pl-9 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={specialization} onValueChange={(val) => {
              setSpecialization(val || "All");
              // We could trigger search automatically here, but we'll wait for button click to be safe
            }}>
              <SelectTrigger className="w-[180px] bg-background">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>

      {/* Results Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Doctors {doctors.length > 0 && `(${doctors.length})`}</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 border rounded-xl bg-card/50 border-dashed">
            <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-1">No Doctors Found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              We couldn't find any doctors matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => {
                setSearchQuery("");
                setSpecialization("All");
                // Immediately call fetch without state waiting
                fetchDoctors("", "All").then(data => {
                  setDoctors(data);
                });
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
