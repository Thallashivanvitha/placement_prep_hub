import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex justify-center mb-8 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2 text-primary">
            <GraduationCap className="h-10 w-10" />
            <span className="font-display font-extrabold text-3xl tracking-tight text-foreground">PrepPortal</span>
          </div>
        </Link>

        <Card className="border-border/50 shadow-2xl shadow-black/5 rounded-3xl overflow-hidden glass">
          <CardHeader className="space-y-2 text-center pt-8 pb-6">
            <CardTitle className="text-2xl font-display font-bold">Welcome back</CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="student@college.edu" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl bg-background/50 focus:bg-background transition-colors"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl bg-background/50 focus:bg-background transition-colors"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl text-base font-semibold mt-4 shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                disabled={login.isPending}
              >
                {login.isPending ? "Signing in..." : "Sign In"}
                {!login.isPending && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Create one now
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
