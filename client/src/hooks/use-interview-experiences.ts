import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InterviewExperience, type InsertInterviewExperience } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useInterviewExperiences() {
  return useQuery<InterviewExperience[]>({
    queryKey: [api.interviewExperiences.list.path],
    queryFn: async () => {
      const res = await fetch(api.interviewExperiences.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch experiences");
      return res.json();
    },
  });
}

export function useCreateInterviewExperience() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertInterviewExperience) => {
      const res = await fetch(api.interviewExperiences.create.path, {
        method: api.interviewExperiences.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to submit experience");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.interviewExperiences.list.path] });
      toast({ title: "Experience submitted", description: "It will be visible once approved by an admin." });
    },
    onError: (err: Error) => {
      toast({ variant: "destructive", title: "Error", description: err.message });
    },
  });
}

export function useApproveInterviewExperience() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(buildUrl(api.interviewExperiences.approve.path, { id }), {
        method: api.interviewExperiences.approve.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to approve experience");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.interviewExperiences.list.path] });
      toast({ title: "Approved", description: "The interview experience is now public." });
    },
    onError: (err: Error) => {
      toast({ variant: "destructive", title: "Error", description: err.message });
    },
  });
}
