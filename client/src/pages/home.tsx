import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, Building2, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="px-6 py-4 flex items-center justify-between glass sticky top-0 z-50">
        <div className="flex items-center gap-2 text-primary">
          <GraduationCap className="h-8 w-8" />
          <span className="font-display font-bold text-2xl tracking-tight text-foreground">PrepPortal</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="rounded-full font-medium hover:bg-primary/10 hover:text-primary">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-full font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-32 text-center overflow-hidden relative">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-foreground leading-[1.1]">
            Your Complete Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Campus Placements</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Access company profiles, interview experiences, preparation resources, and build your resume all in one beautiful platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg font-semibold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                Start Preparing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg font-semibold border-2 hover:bg-secondary transition-all duration-300">
                Student Login
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-32">
          <FeatureCard 
            icon={Building2}
            title="Company Profiles"
            description="Detailed insights into visiting companies, packages, and recruitment processes."
            delay={0.2}
          />
          <FeatureCard 
            icon={Users}
            title="Interview Experiences"
            description="Learn from seniors who successfully cracked the toughest interviews."
            delay={0.4}
          />
          <FeatureCard 
            icon={BookOpen}
            title="Curated Resources"
            description="Hand-picked DSA, aptitude, and core subject materials to ace your prep."
            delay={0.6}
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="p-8 rounded-3xl bg-card border border-border/50 shadow-xl shadow-black/5 text-left card-hover"
    >
      <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <h3 className="text-xl font-bold font-display text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
