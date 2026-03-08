import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    branch: "",
    year: new Date().getFullYear().toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register.mutate({
      ...formData,
      year: formData.role === "student" ? parseInt(formData.year) : undefined,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative py-12">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <Link href="/" className="flex justify-center mb-8 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2 text-primary">
            <GraduationCap className="h-10 w-10" />
            <span className="font-display font-extrabold text-3xl tracking-tight text-foreground">PrepPortal</span>
          </div>
        </Link>

        <Card className="border-border/50 shadow-2xl shadow-black/5 rounded-3xl overflow-hidden glass">
          <CardHeader className="space-y-2 text-center pt-8 pb-6">
            <CardTitle className="text-2xl font-display font-bold">Create an account</CardTitle>
            <CardDescription className="text-base">
              Join to access placement preparation resources
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-11 rounded-xl bg-background/50 focus:bg-background"
                  />
                </div>
                
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 rounded-xl bg-background/50 focus:bg-background"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-11 rounded-xl bg-background/50 focus:bg-background"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label>Role</Label>
                  <Select value={formData.role} onValueChange={(val) => setFormData({ ...formData, role: val })}>
                    <SelectTrigger className="h-11 rounded-xl bg-background/50">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="admin">Admin (Placement Cell)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.role === "student" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch/Major</Label>
                      <Input 
                        id="branch" 
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="h-11 rounded-xl bg-background/50"
                        placeholder="e.g. CSE"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Graduation Year</Label>
                      <Input 
                        id="year" 
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="h-11 rounded-xl bg-background/50"
                      />
                    </div>
                  </>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl text-base font-semibold mt-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                disabled={register.isPending}
              >
                {register.isPending ? "Creating account..." : "Sign Up"}
                {!register.isPending && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
