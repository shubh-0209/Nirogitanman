export function DoctorIllustration({ className }: { className?: string }) {
  // Placeholder SVG for Healthcare Illustration
  return (
    <svg className={className} width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="16" fill="hsl(171, 100%, 29%, 0.1)" />
      <circle cx="100" cy="80" r="30" fill="hsl(171, 100%, 29%)" />
      <path d="M50 170C50 142.386 72.3858 120 100 120C127.614 120 150 142.386 150 170V180H50V170Z" fill="hsl(171, 100%, 29%)" />
      <path d="M95 100H105V110H95V100Z" fill="white" />
    </svg>
  );
}

export function HealthReportIllustration({ className }: { className?: string }) {
  // Placeholder SVG for Medical Reports
  return (
    <svg className={className} width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="30" width="100" height="140" rx="8" fill="white" stroke="hsl(214, 32%, 91%)" strokeWidth="4" />
      <rect x="70" y="60" width="60" height="8" rx="4" fill="hsl(171, 100%, 29%, 0.5)" />
      <rect x="70" y="90" width="40" height="8" rx="4" fill="hsl(210, 40%, 96%)" />
      <rect x="70" y="120" width="50" height="8" rx="4" fill="hsl(210, 40%, 96%)" />
    </svg>
  );
}
