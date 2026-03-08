import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("student"),
  branch: text("branch"),
  year: integer("year"),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  package: text("package").notNull(),
  eligibility: text("eligibility").notNull(),
  recruitmentProcess: text("recruitment_process").notNull(),
});

export const placedStudents = pgTable("placed_students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  branch: text("branch").notNull(),
  company: text("company").notNull(),
  package: text("package").notNull(),
  year: integer("year").notNull(),
  preparationTips: text("preparation_tips"),
});

export const interviewExperiences = pgTable("interview_experiences", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  company: text("company").notNull(),
  experience: text("experience").notNull(),
  questions: text("questions").notNull(),
  approved: boolean("approved").default(false),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  link: text("link").notNull(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertCompanySchema = createInsertSchema(companies).omit({ id: true });
export const insertPlacedStudentSchema = createInsertSchema(placedStudents).omit({ id: true });
export const insertInterviewExperienceSchema = createInsertSchema(interviewExperiences).omit({ id: true, approved: true });
export const insertResourceSchema = createInsertSchema(resources).omit({ id: true });

// Specific schemas
export const loginSchema = z.object({ email: z.string(), password: z.string() });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type PlacedStudent = typeof placedStudents.$inferSelect;
export type InsertPlacedStudent = z.infer<typeof insertPlacedStudentSchema>;
export type InterviewExperience = typeof interviewExperiences.$inferSelect;
export type InsertInterviewExperience = z.infer<typeof insertInterviewExperienceSchema>;
export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
