import * as React from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface ProfileCompletionCardProps {
  completionPercentage: number;
  missingFields: string[];
  onCompleteClick?: () => void;
}

export function ProfileCompletionCard({
  completionPercentage,
  missingFields,
  onCompleteClick,
}: ProfileCompletionCardProps) {
  const isComplete = completionPercentage === 100;

  return (
    <DashboardCard className="bg-primary/5 border-primary/20">
      <div className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-primary">Profile Completion</h3>
          <span className="text-xl font-bold text-primary">{completionPercentage}%</span>
        </div>
        
        <Progress value={completionPercentage} className="h-2" />
        
        {!isComplete && (
          <div className="space-y-4 pt-2">
            <p className="text-sm text-muted-foreground">
              Complete your profile to unlock all features. Missing information:
            </p>
            <ul className="text-sm font-medium text-foreground list-disc pl-4 space-y-1">
              {missingFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
            <Button onClick={onCompleteClick} className="w-full sm:w-auto mt-2">
              Complete Profile
            </Button>
          </div>
        )}
        
        {isComplete && (
          <p className="text-sm text-success font-medium pt-2">
            Your profile is fully complete!
          </p>
        )}
      </div>
    </DashboardCard>
  );
}
