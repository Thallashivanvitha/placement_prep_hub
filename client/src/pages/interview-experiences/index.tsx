import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useInterviewExperiences, useCreateInterviewExperience, useApproveInterviewExperience } from "@/hooks/use-interview-experiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Check, Clock, Building2, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function InterviewExperiences() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { data: experiences, isLoading } = useInterviewExperiences();
  const createMutation = useCreateInterviewExperience();
  const approveMutation = useApproveInterviewExperience();
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: user?.name || "",
    company: "",
    experience: "",
    questions: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => {
        setIsOpen(false);
        setFormData({ studentName: user?.name || "", company: "", experience: "", questions: "" });
      }
    });
  };

  // Filter experiences for students: only show approved ones
  const displayedExperiences = isAdmin 
    ? experiences 
    : experiences?.filter(e => e.approved);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground tracking-tight">Interview Experiences</h1>
          <p className="text-muted-foreground mt-1">Read first-hand interview experiences shared by students.</p>
        </div>
        
        {!isAdmin && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl shadow-lg shadow-primary/20 bg-primary">
                <Plus className="mr-2 h-4 w-4" /> Share Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">Share Your Interview Experience</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5 pt-4">
                <div className="space-y-2">
                  <Label>Your Name</Label>
                  <Input required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input required placeholder="Where did you interview?" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Overall Experience</Label>
                  <Textarea required placeholder="Describe the rounds, difficulty, tips..." value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="min-h-[120px] rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Questions Asked</Label>
                  <Textarea required placeholder="List technical and HR questions..." value={formData.questions} onChange={e => setFormData({...formData, questions: e.target.value})} className="min-h-[120px] rounded-xl" />
                </div>
                <Button type="submit" className="w-full rounded-xl" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Submitting..." : "Submit Experience"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayedExperiences?.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Card className={`h-full flex flex-col rounded-3xl border-border/50 shadow-sm ${!exp.approved ? 'border-amber-500/30 bg-amber-500/5' : 'bg-card'}`}>
              <CardHeader className="pb-3 border-b border-border/50 bg-secondary/20 rounded-t-3xl">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-display flex items-center gap-2 mb-2">
                      <Building2 className="h-5 w-5 text-primary" /> {exp.company}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <UserCircle className="h-4 w-4" /> {exp.studentName}
                    </div>
                  </div>
                  {isAdmin && (
                    <Badge variant={exp.approved ? "secondary" : "outline"} className={!exp.approved ? "border-amber-500 text-amber-600 bg-amber-50" : "bg-emerald-50 text-emerald-600"}>
                      {exp.approved ? <><Check className="mr-1 h-3 w-3"/> Approved</> : <><Clock className="mr-1 h-3 w-3"/> Pending</>}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 py-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-primary" /> Experience Summary
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">{exp.experience}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-2xl border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">Key Questions Asked:</h4>
                  <p className="text-foreground text-sm font-mono whitespace-pre-wrap">{exp.questions}</p>
                </div>
              </CardContent>
              {isAdmin && !exp.approved && (
                <CardFooter className="pt-0 pb-6 px-6">
                  <Button 
                    className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-white" 
                    onClick={() => approveMutation.mutate(exp.id)}
                    disabled={approveMutation.isPending}
                  >
                    <Check className="mr-2 h-4 w-4" /> Approve & Publish
                  </Button>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        ))}
        {!displayedExperiences?.length && !isLoading && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-semibold text-foreground">No experiences found</h3>
            <p className="text-muted-foreground">Be the first to share your interview journey!</p>
          </div>
        )}
      </div>
    </div>
  );
}
