import { useAuth } from "@/hooks/use-auth";
import { useCompanies } from "@/hooks/use-companies";
import { useResources } from "@/hooks/use-resources";
import { Building2, BookOpen, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: companies } = useCompanies();
  const { data: resources } = useResources();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display text-foreground tracking-tight">
          Hello, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-2">Ready to prepare for your dream company?</p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Link href="/companies">
          <StatsCard 
            title="Upcoming Companies"
            value={companies?.length || 0}
            icon={Building2}
            color="text-indigo-500"
            bg="bg-indigo-500/10"
            delay={0.1}
          />
        </Link>
        <Link href="/resources">
          <StatsCard 
            title="Prep Resources"
            value={resources?.length || 0}
            icon={BookOpen}
            color="text-emerald-500"
            bg="bg-emerald-500/10"
            delay={0.2}
          />
        </Link>
        <Link href="/resume-builder">
          <StatsCard 
            title="Resume Builder"
            value="Ready"
            icon={FileText}
            color="text-purple-500"
            bg="bg-purple-500/10"
            delay={0.3}
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-2xl border-border/50 shadow-sm overflow-hidden flex flex-col">
          <CardHeader className="bg-primary/5 border-b border-border/50">
            <CardTitle>Top Resources</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <div className="divide-y divide-border/50">
              {resources?.slice(0, 4).map(res => (
                <a key={res.id} href={res.link} target="_blank" rel="noopener noreferrer" className="p-4 flex items-center justify-between hover:bg-secondary/40 transition-colors block">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{res.title}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-secondary rounded-md uppercase tracking-wider text-muted-foreground">
                    {res.type}
                  </span>
                </a>
              ))}
              {!resources?.length && <div className="p-8 text-center text-muted-foreground">No resources available.</div>}
            </div>
          </CardContent>
          <div className="p-4 border-t border-border/50 bg-secondary/20">
            <Link href="/resources">
              <Button variant="outline" className="w-full">View All Resources</Button>
            </Link>
          </div>
        </Card>

        <Card className="rounded-2xl border-border/50 shadow-sm overflow-hidden flex flex-col">
          <CardHeader className="bg-primary/5 border-b border-border/50 flex flex-row items-center justify-between py-4">
            <CardTitle>Build Your Resume</CardTitle>
          </CardHeader>
          <CardContent className="p-8 flex flex-col items-center justify-center flex-1 text-center bg-gradient-to-b from-background to-secondary/30">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Stand out from the crowd</h3>
            <p className="text-muted-foreground mb-6">Use our built-in resume builder to create a clean, ATS-friendly professional resume in minutes.</p>
            <Link href="/resume-builder">
              <Button className="rounded-xl shadow-lg shadow-primary/20">Create My Resume</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color, bg, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="cursor-pointer group"
    >
      <Card className="rounded-2xl border-border/50 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-6 flex items-center gap-4">
          <div className={`p-4 rounded-2xl ${bg} group-hover:scale-110 transition-transform duration-300`}>
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
