import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type PlacedStudent, type InsertPlacedStudent } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function usePlacedStudents() {
  return useQuery<PlacedStudent[]>({
    queryKey: [api.placedStudents.list.path],
    queryFn: async () => {
      const res = await fetch(api.placedStudents.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch placed students");
      return res.json();
    },
  });
}

export function useCreatePlacedStudent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertPlacedStudent) => {
      const res = await fetch(api.placedStudents.create.path, {
        method: api.placedStudents.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          year: Number(data.year) // Coerce to number
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to add placed student");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.placedStudents.list.path] });
      toast({ title: "Success", description: "Student placement record added." });
    },
    onError: (err: Error) => {
      toast({ variant: "destructive", title: "Error", description: err.message });
    },
  });
}
