import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export function TestimonialCard({ quote, name, role, avatarUrl }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col justify-between border-slate-200 bg-white">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-primary/20 mb-4" />
        <p className="text-muted-foreground leading-relaxed italic">
          &quot;{quote}&quot;
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-4 pb-6">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary">{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
