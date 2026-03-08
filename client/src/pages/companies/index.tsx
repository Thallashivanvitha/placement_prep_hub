import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useCompanies, useCreateCompany, useDeleteCompany } from "@/hooks/use-companies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, Briefcase, GraduationCap, CheckCircle2, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function Companies() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { data: companies, isLoading } = useCompanies();
  const createMutation = useCreateCompany();
  const deleteMutation = useDeleteCompany();
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    package: "",
    eligibility: "",
    recruitmentProcess: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => {
        setIsOpen(false);
        setFormData({ companyName: "", package: "", eligibility: "", recruitmentProcess: "" });
      }
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground tracking-tight">Companies</h1>
          <p className="text-muted-foreground mt-1">Explore visiting companies and their recruitment details.</p>
        </div>
        
        {isAdmin && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-4 w-4" /> Add Company
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl">Add New Company</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input required value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Package Offered</Label>
                  <Input required placeholder="e.g. 15 LPA" value={formData.package} onChange={e => setFormData({...formData, package: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Eligibility Criteria</Label>
                  <Input required placeholder="e.g. >7.5 CGPA, No Active Backlogs" value={formData.eligibility} onChange={e => setFormData({...formData, eligibility: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Recruitment Process</Label>
                  <Textarea required placeholder="e.g. 1. Online Test&#10;2. Technical Interview&#10;3. HR Round" value={formData.recruitmentProcess} onChange={e => setFormData({...formData, recruitmentProcess: e.target.value})} className="min-h-[100px] rounded-xl" />
                </div>
                <Button type="submit" className="w-full rounded-xl" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Adding..." : "Add Company"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-secondary/50 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies?.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Card className="h-full flex flex-col rounded-2xl border-border/50 shadow-sm card-hover overflow-hidden relative group">
                {isAdmin && (
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-8 w-8 z-10"
                    onClick={() => {
                      if(confirm("Are you sure you want to delete this company?")) {
                        deleteMutation.mutate(company.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <div className="h-2 bg-gradient-to-r from-primary to-blue-400 w-full" />
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-display">{company.companyName}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 text-foreground font-medium bg-secondary/50 px-3 py-2 rounded-lg">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Package: {company.package}
                  </div>
                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span><strong className="text-foreground">Eligibility:</strong> {company.eligibility}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="whitespace-pre-wrap"><strong className="text-foreground">Process:</strong><br/>{company.recruitmentProcess}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {!companies?.length && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-semibold text-foreground">No companies found</h3>
              <p className="text-muted-foreground">Check back later for updates.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
