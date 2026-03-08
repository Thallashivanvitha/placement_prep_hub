import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  users, type User, type InsertUser,
  companies, type Company, type InsertCompany,
  placedStudents, type PlacedStudent, type InsertPlacedStudent,
  interviewExperiences, type InterviewExperience, type InsertInterviewExperience,
  resources, type Resource, type InsertResource
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Companies
  getCompanies(): Promise<Company[]>;
  getCompany(id: number): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: number, company: Partial<InsertCompany>): Promise<Company | undefined>;
  deleteCompany(id: number): Promise<void>;

  // Placed Students
  getPlacedStudents(): Promise<PlacedStudent[]>;
  createPlacedStudent(student: InsertPlacedStudent): Promise<PlacedStudent>;

  // Interview Experiences
  getInterviewExperiences(): Promise<InterviewExperience[]>;
  createInterviewExperience(experience: InsertInterviewExperience): Promise<InterviewExperience>;
  approveInterviewExperience(id: number): Promise<InterviewExperience | undefined>;

  // Resources
  getResources(): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Companies
  async getCompanies(): Promise<Company[]> {
    return await db.select().from(companies);
  }
  async getCompany(id: number): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company;
  }
  async createCompany(company: InsertCompany): Promise<Company> {
    const [newCompany] = await db.insert(companies).values(company).returning();
    return newCompany;
  }
  async updateCompany(id: number, update: Partial<InsertCompany>): Promise<Company | undefined> {
    const [updatedCompany] = await db.update(companies).set(update).where(eq(companies.id, id)).returning();
    return updatedCompany;
  }
  async deleteCompany(id: number): Promise<void> {
    await db.delete(companies).where(eq(companies.id, id));
  }

  // Placed Students
  async getPlacedStudents(): Promise<PlacedStudent[]> {
    return await db.select().from(placedStudents);
  }
  async createPlacedStudent(student: InsertPlacedStudent): Promise<PlacedStudent> {
    const [newStudent] = await db.insert(placedStudents).values(student).returning();
    return newStudent;
  }

  // Interview Experiences
  async getInterviewExperiences(): Promise<InterviewExperience[]> {
    return await db.select().from(interviewExperiences);
  }
  async createInterviewExperience(experience: InsertInterviewExperience): Promise<InterviewExperience> {
    const [newExp] = await db.insert(interviewExperiences).values(experience).returning();
    return newExp;
  }
  async approveInterviewExperience(id: number): Promise<InterviewExperience | undefined> {
    const [approvedExp] = await db.update(interviewExperiences).set({ approved: true }).where(eq(interviewExperiences.id, id)).returning();
    return approvedExp;
  }

  // Resources
  async getResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }
  async createResource(resource: InsertResource): Promise<Resource> {
    const [newResource] = await db.insert(resources).values(resource).returning();
    return newResource;
  }
}

export const storage = new DatabaseStorage();