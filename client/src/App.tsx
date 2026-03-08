import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import { ProtectedLayout } from "@/components/layout/protected-layout";
import Dashboard from "@/pages/dashboard";
import Companies from "@/pages/companies";
import PlacedStudents from "@/pages/placed-students";
import InterviewExperiences from "@/pages/interview-experiences";
import Resources from "@/pages/resources";
import ResumeBuilder from "@/pages/resume-builder";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* Protected Routes Wrapper */}
      <Route path="/dashboard">
        <ProtectedLayout><Dashboard /></ProtectedLayout>
      </Route>
      <Route path="/companies">
        <ProtectedLayout><Companies /></ProtectedLayout>
      </Route>
      <Route path="/placed-students">
        <ProtectedLayout><PlacedStudents /></ProtectedLayout>
      </Route>
      <Route path="/interview-experiences">
        <ProtectedLayout><InterviewExperiences /></ProtectedLayout>
      </Route>
      <Route path="/resources">
        <ProtectedLayout><Resources /></ProtectedLayout>
      </Route>
      <Route path="/resume-builder">
        <ProtectedLayout><ResumeBuilder /></ProtectedLayout>
      </Route>

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
