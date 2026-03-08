import { useAuth } from "@/hooks/use-auth";
import AdminDashboard from "./admin-dashboard";
import StudentDashboard from "./student-dashboard";
import { FullPageSpinner } from "@/components/ui/spinner";

export default function Dashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) return <FullPageSpinner />;

  return user.role === "admin" ? <AdminDashboard /> : <StudentDashboard />;
}
