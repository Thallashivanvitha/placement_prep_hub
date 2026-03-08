import { Loader2 } from "lucide-react";

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={`h-8 w-8 animate-spin text-primary ${className || ""}`} />;
}

export function FullPageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Spinner className="h-12 w-12" />
    </div>
  );
}
