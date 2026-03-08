import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useResources, useCreateResource } from "@/hooks/use-resources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Plus, ExternalLink, Code2, BrainCircuit, FileText } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
  "DSA": Code2,
  "Aptitude": BrainCircuit,
  "Interview": FileText,
  "Other": BookOpen
};

export default function Resources() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { data: resources, isLoading } = useResources();
  const createMutation = useCreateResource();
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "", type: "DSA", link: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => {
        setIsOpen(false);
        setFormData({ title: "", type: "DSA", link: "" });
      }
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground tracking-tight">Preparation Resources</h1>
          <p className="text-muted-foreground mt-1">Curated materials to help you ace your tests.</p>
        </div>
        
        {isAdmin && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-4 w-4" /> Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DSA">Data Structures & Algorithms</SelectItem>
                      <SelectItem value="Aptitude">Aptitude & Reasoning</SelectItem>
                      <SelectItem value="Interview">Interview Prep</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Link (URL)</Label>
                  <Input type="url" required placeholder="https://..." value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="rounded-xl" />
                </div>
                <Button type="submit" className="w-full rounded-xl mt-4" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Adding..." : "Add Resource"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources?.map((res, i) => {
          const Icon = iconMap[res.type] || BookOpen;
          return (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <a href={res.link} target="_blank" rel="noopener noreferrer" className="block group">
                <Card className="rounded-2xl border-border/50 shadow-sm card-hover bg-card">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">{res.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-semibold px-2 py-1 bg-secondary rounded-md uppercase tracking-wider text-muted-foreground">
                          {res.type}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0" />
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          );
        })}
        {!resources?.length && !isLoading && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-semibold text-foreground">No resources available</h3>
            <p className="text-muted-foreground">Admins will upload materials soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
