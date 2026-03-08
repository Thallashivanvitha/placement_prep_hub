import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Printer, Download, Eye } from "lucide-react";

export default function ResumeBuilder() {
  const { user } = useAuth();
  
  const [data, setData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    linkedin: "",
    github: "",
    education: "B.Tech in Computer Science\nXYZ University\nCGPA: 8.5\n2021 - 2025",
    skills: "Languages: C++, JavaScript, Python\nFrontend: React, HTML/CSS\nBackend: Node.js, SQL",
    projects: "Project 1: E-commerce Website\n- Built using React and Node\n- Integrated Stripe API\n\nProject 2: Weather App\n- Fetched data from OpenWeather API\n- Deployed on Vercel",
    experience: ""
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-8 pb-8 print:h-auto print:block">
      {/* Editor Panel (Hidden on print) */}
      <div className="w-full md:w-1/2 flex flex-col print:hidden bg-card rounded-3xl border border-border/50 shadow-lg shadow-black/5 overflow-hidden">
        <div className="p-6 border-b border-border/50 bg-secondary/20 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold">Resume Details</h2>
            <p className="text-sm text-muted-foreground">Fill in your information to generate a clean PDF.</p>
          </div>
          <Button onClick={handlePrint} className="rounded-xl shadow-md shadow-primary/20">
            <Printer className="mr-2 h-4 w-4" /> Print / PDF
          </Button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Full Name</Label>
              <Input value={data.name} onChange={e => setData({...data, name: e.target.value})} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={data.email} onChange={e => setData({...data, email: e.target.value})} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={data.phone} onChange={e => setData({...data, phone: e.target.value})} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input value={data.linkedin} onChange={e => setData({...data, linkedin: e.target.value})} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input value={data.github} onChange={e => setData({...data, github: e.target.value})} className="rounded-xl" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Education</Label>
            <Textarea value={data.education} onChange={e => setData({...data, education: e.target.value})} className="min-h-[100px] rounded-xl font-mono text-sm" />
          </div>
          
          <div className="space-y-2">
            <Label>Skills</Label>
            <Textarea value={data.skills} onChange={e => setData({...data, skills: e.target.value})} className="min-h-[100px] rounded-xl font-mono text-sm" />
          </div>

          <div className="space-y-2">
            <Label>Projects</Label>
            <Textarea value={data.projects} onChange={e => setData({...data, projects: e.target.value})} className="min-h-[150px] rounded-xl font-mono text-sm" />
          </div>

          <div className="space-y-2">
            <Label>Experience / Internships</Label>
            <Textarea value={data.experience} onChange={e => setData({...data, experience: e.target.value})} className="min-h-[100px] rounded-xl font-mono text-sm" />
          </div>
        </div>
      </div>

      {/* Preview Panel (Expands to full page on print) */}
      <div className="w-full md:w-1/2 bg-muted/30 rounded-3xl p-4 md:p-8 overflow-y-auto flex justify-center print:w-full print:p-0 print:overflow-visible print:bg-white border border-border/50 print:border-none">
        
        {/* The Resume A4 Sheet */}
        <div id="resume-preview" className="w-full max-w-[210mm] bg-white shadow-xl shadow-black/10 rounded-sm p-[12mm] text-black font-sans leading-relaxed print:shadow-none print:m-0 print:p-0">
          
          {/* Header */}
          <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
            <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900 mb-2">{data.name || "Your Name"}</h1>
            <div className="text-sm text-gray-600 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>• {data.phone}</span>}
              {data.linkedin && <span>• {data.linkedin}</span>}
              {data.github && <span>• {data.github}</span>}
            </div>
          </div>

          {/* Education */}
          {data.education && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 mb-3 pb-1">Education</h2>
              <div className="whitespace-pre-wrap text-sm text-gray-700 font-medium">
                {data.education}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 mb-3 pb-1">Skills</h2>
              <div className="whitespace-pre-wrap text-sm text-gray-700">
                {data.skills}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 mb-3 pb-1">Projects</h2>
              <div className="whitespace-pre-wrap text-sm text-gray-700">
                {data.projects}
              </div>
            </div>
          )}

          {/* Experience */}
          {data.experience && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 mb-3 pb-1">Experience</h2>
              <div className="whitespace-pre-wrap text-sm text-gray-700">
                {data.experience}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
