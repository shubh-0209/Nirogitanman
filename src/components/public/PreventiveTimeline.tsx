import * as React from "react";
import { Container } from "@/components/layout/Container";
import { TimelineItem } from "./TimelineItem";
import { ClipboardCheck, Activity, Target, Trophy } from "lucide-react";

export function PreventiveTimeline() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Your First Year of Preventive Care
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See how continuous monitoring and proactive adjustments lead to sustainable health outcomes over time.
          </p>
        </div>

        <div className="max-w-3xl mx-auto pl-4 md:pl-0">
          <TimelineItem 
            title="Month 1: The Baseline" 
            description="Complete comprehensive assessments, sync your wearable devices, and receive your first holistic health score."
            icon={<ClipboardCheck className="h-5 w-5" />}
          />
          <TimelineItem 
            title="Month 3: Proactive Adjustments" 
            description="The AI detects minor deviations in your sleep and nutrition patterns. Your personalized diet plan is automatically updated."
            icon={<Activity className="h-5 w-5" />}
          />
          <TimelineItem 
            title="Month 6: Clinical Validation" 
            description="A scheduled virtual consultation with your dedicated physician validates your progress and adjusts any supplements."
            icon={<Target className="h-5 w-5" />}
          />
          <TimelineItem 
            title="Year 1: Optimal Wellness" 
            description="Achieve and sustain your target health metrics. The platform transitions to maintenance and longevity tracking."
            icon={<Trophy className="h-5 w-5" />}
            isLast={true}
          />
        </div>
      </Container>
    </section>
  );
}
