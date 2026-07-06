import * as React from "react";
import { ProfileCard } from "./ProfileCard";
import { InfoSection } from "./InfoSection";
import { EditableField } from "./EditableField";

export function MedicalInfoCard({ isEditing }: { isEditing: boolean }) {
  return (
    <ProfileCard title="Medical Information">
      <InfoSection columns={2}>
        <EditableField 
          name="bloodGroup" 
          label="Blood Group" 
          isEditing={isEditing} 
          inputType="select"
          options={[
            { label: "A+", value: "A+" },
            { label: "A-", value: "A-" },
            { label: "B+", value: "B+" },
            { label: "B-", value: "B-" },
            { label: "AB+", value: "AB+" },
            { label: "AB-", value: "AB-" },
            { label: "O+", value: "O+" },
            { label: "O-", value: "O-" },
          ]}
        />
        <EditableField name="allergies" label="Allergies" isEditing={isEditing} inputType="textarea" />
        <EditableField name="chronicConditions" label="Chronic Conditions" isEditing={isEditing} inputType="textarea" />
        <EditableField name="currentMedications" label="Current Medications" isEditing={isEditing} inputType="textarea" />
        <EditableField name="pastSurgeries" label="Past Surgeries" isEditing={isEditing} inputType="textarea" />
        <EditableField 
          name="organDonor" 
          label="Organ Donor Status" 
          isEditing={isEditing} 
          inputType="radio"
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" }
          ]}
          valueFormatter={(val) => val === true ? "Registered Donor" : "Not Registered"} 
        />
        <EditableField name="height" label="Height (cm)" isEditing={isEditing} inputType="number" />
        <EditableField name="weight" label="Weight (kg)" isEditing={isEditing} inputType="number" />
        <EditableField name="bmi" label="BMI" isEditing={false} />
      </InfoSection>
    </ProfileCard>
  );
}

export function EmergencyContactCard({ isEditing }: { isEditing: boolean }) {
  return (
    <ProfileCard title="Emergency Contact">
      <InfoSection columns={2}>
        <EditableField name="emergencyContactName" label="Contact Name" isEditing={isEditing} />
        <EditableField name="emergencyContactRelation" label="Relationship" isEditing={isEditing} />
        <EditableField name="emergencyContactNumber" label="Phone Number" isEditing={isEditing} type="tel" />
      </InfoSection>
    </ProfileCard>
  );
}

export function InsuranceCard({ isEditing }: { isEditing: boolean }) {
  return (
    <ProfileCard title="Insurance Details">
      <InfoSection columns={2}>
        <EditableField name="insuranceProvider" label="Insurance Provider" isEditing={isEditing} />
        <EditableField name="policyNumber" label="Policy Number" isEditing={isEditing} />
        <EditableField name="insuranceExpiry" label="Expiry Date" isEditing={isEditing} inputType="date" />
      </InfoSection>
    </ProfileCard>
  );
}
