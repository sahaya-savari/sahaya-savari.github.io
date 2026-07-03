import { BookOpen } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background"
      role="status"
      aria-label="Loading"
    >
      <BookOpen className="h-12 w-12 animate-spin text-primary" strokeWidth={2.5} />
      <p className="font-body text-sm text-primary/50">Loading...</p>
    </div>
  );
}
