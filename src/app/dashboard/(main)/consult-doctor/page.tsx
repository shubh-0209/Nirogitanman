import { ConsultDoctorClient } from "@/features/patient/consult-doctor/components/ConsultDoctorClient";

export const metadata = {
  title: "Consult Doctor - Nirogitanman",
  description: "Find trusted doctors and book appointments.",
};

export default function ConsultDoctorPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <ConsultDoctorClient />
    </div>
  );
}
