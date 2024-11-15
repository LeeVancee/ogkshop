import { Loader } from 'lucide-react';

export default function HomeLoader() {
  return (
    <div className="grid place-items-center min-h-screen">
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  );
}
