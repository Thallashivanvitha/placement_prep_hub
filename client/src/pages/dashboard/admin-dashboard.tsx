import { useCompanies } from "@/hooks/use-companies";
import { usePlacedStudents } from "@/hooks/use-placed-students";
import { useInterviewExperiences } from "@/hooks/use-interview-experiences";
import { Building2, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { data: companies } = useCompanies();
  const { data: placed } = usePlacedStudents();
  const { data: experiences } = useInterviewExperiences();

  const pendingApprovals = experiences?.filter(e => !e.approved).length || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display text-foreground tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to the Placement Cell Control Center.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <StatsCard 
          title="Visiting Companies"
          value={companies?.length || 0}
          icon={Building2}
          color="text-blue-500"
          bg="bg-blue-500/10"
          delay={0.1}
        />
        <StatsCard 
          title="Students Placed"
          value={placed?.length || 0}
          icon={Users}
          color="text-emerald-500"
          bg="bg-emerald-500/10"
          delay={0.2}
        />
        <StatsCard 
          title="Pending Approvals"
          value={pendingApprovals}
          icon={CheckCircle}
          color="text-amber-500"
          bg="bg-amber-500/10"
          delay={0.3}
        />
      </div>

      {/* Quick Actions or summaries could go here */}
      <Card className="rounded-2xl border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="bg-secondary/50 border-b border-border/50">
          <CardTitle>Recent Placements</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {placed?.slice(0, 5).map(student => (
              <div key={student.id} className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                <div>
                  <p className="font-semibold text-foreground">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.branch} • {student.year}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{student.company}</p>
                  <p className="text-sm text-muted-foreground">{student.package}</p>
                </div>
              </div>
            ))}
            {!placed?.length && (
              <div className="p-8 text-center text-muted-foreground">No records found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color, bg, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="rounded-2xl border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex items-center gap-4">
          <div className={`p-4 rounded-2xl ${bg}`}>
            <Icon className={`h-8 w-8 ${color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h2 className="text-3xl font-bold font-display">{value}</h2>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
