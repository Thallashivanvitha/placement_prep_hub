import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { usePlacedStudents, useCreatePlacedStudent } from "@/hooks/use-placed-students";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function PlacedStudents() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { data: students, isLoading } = usePlacedStudents();
  const createMutation = useCreatePlacedStudent();
  
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", branch: "", company: "", package: "", year: new Date().getFullYear().toString(), preparationTips: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      ...formData,
      year: parseInt(formData.year)
    }, {
      onSuccess: () => {
        setIsOpen(false);
        setFormData({ name: "", branch: "", company: "", package: "", year: new Date().getFullYear().toString(), preparationTips: "" });
      }
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground tracking-tight">Placed Students</h1>
          <p className="text-muted-foreground mt-1">Inspiring success stories from our alumni.</p>
        </div>
        
        {isAdmin && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-4 w-4" /> Add Record
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl">Add Placed Student</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Student Name</Label>
                    <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Branch</Label>
                    <Input required value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Graduation Year</Label>
                    <Input type="number" required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Package</Label>
                    <Input required value={formData.package} onChange={e => setFormData({...formData, package: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Preparation Tips (Optional)</Label>
                    <Textarea value={formData.preparationTips} onChange={e => setFormData({...formData, preparationTips: e.target.value})} className="min-h-[80px] rounded-xl" />
                  </div>
                </div>
                <Button type="submit" className="w-full rounded-xl mt-4" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Adding..." : "Add Record"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden bg-card/50 glass">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold text-foreground py-4 px-6">Student</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">Branch & Year</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">Company</TableHead>
                  <TableHead className="font-semibold text-foreground py-4">Package</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students?.map((student, i) => (
                  <TableRow key={student.id} className="hover:bg-secondary/30 transition-colors">
                    <TableCell className="py-4 px-6">
                      <div className="font-semibold text-foreground">{student.name}</div>
                      {student.preparationTips && (
                        <div className="text-xs text-muted-foreground mt-1 flex items-start gap-1 max-w-xs line-clamp-1 italic">
                          <Quote className="h-3 w-3 shrink-0" /> {student.preparationTips}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-4 text-muted-foreground">
                      {student.branch} <Badge variant="secondary" className="ml-2 font-mono">{student.year}</Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="font-semibold text-primary">{student.company}</span>
                    </TableCell>
                    <TableCell className="py-4 font-mono font-medium">{student.package}</TableCell>
                  </TableRow>
                ))}
                {!students?.length && !isLoading && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-40 text-center text-muted-foreground">
                      No records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
