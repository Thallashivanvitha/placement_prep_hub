import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth } from "./auth";
import passport from "passport";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  app.post(api.auth.register.path, async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByEmail(req.body.email);
      if (existingUser) {
        return res.status(400).send({ message: "Email already exists" });
      }
      const input = api.auth.register.input.parse(req.body);
      const user = await storage.createUser(input);
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        next(err);
      }
    }
  });

  app.post(api.auth.login.path, (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      req.login(user, (err: any) => {
        if (err) return next(err);
        res.status(200).json(user);
      });
    })(req, res, next);
  });

  app.post(api.auth.logout.path, (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Logged out" });
    });
  });

  app.get(api.auth.me.path, (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.status(200).json(req.user);
  });

  // Companies
  app.get(api.companies.list.path, async (req, res) => {
    const items = await storage.getCompanies();
    res.json(items);
  });
  
  app.post(api.companies.create.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") return res.status(401).json({ message: "Unauthorized" });
    try {
      const input = api.companies.create.input.parse(req.body);
      const item = await storage.createCompany(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      throw err;
    }
  });

  app.put(api.companies.update.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") return res.status(401).json({ message: "Unauthorized" });
    try {
      const input = api.companies.update.input.parse(req.body);
      const item = await storage.updateCompany(Number(req.params.id), input);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.status(200).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      throw err;
    }
  });

  app.delete(api.companies.delete.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") return res.status(401).json({ message: "Unauthorized" });
    await storage.deleteCompany(Number(req.params.id));
    res.status(204).end();
  });

  // Placed Students
  app.get(api.placedStudents.list.path, async (req, res) => {
    const items = await storage.getPlacedStudents();
    res.json(items);
  });

  app.post(api.placedStudents.create.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") return res.status(401).json({ message: "Unauthorized" });
    try {
      const input = api.placedStudents.create.input.parse(req.body);
      const item = await storage.createPlacedStudent(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      throw err;
    }
  });

  // Interview Experiences
  app.get(api.interviewExperiences.list.path, async (req, res) => {
    const items = await storage.getInterviewExperiences();
    res.json(items);
  });

  app.post(api.interviewExperiences.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    try {
      const input = api.interviewExperiences.create.input.parse(req.body);
      const item = await storage.createInterviewExperience(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      throw err;
    }
  });

  app.patch(api.interviewExperiences.approve.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") return res.status(401).json({ message: "Unauthorized" });
    const item = await storage.approveInterviewExperience(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Not found" });
    res.status(200).json(item);
  });

  // Resources
  app.get(api.resources.list.path, async (req, res) => {
    const items = await storage.getResources();
    res.json(items);
  });

  app.post(api.resources.create.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") return res.status(401).json({ message: "Unauthorized" });
    try {
      const input = api.resources.create.input.parse(req.body);
      const item = await storage.createResource(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      throw err;
    }
  });

  // Call seed database function
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const admin = await storage.getUserByEmail("admin@example.com");
  if (!admin) {
    await storage.createUser({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin",
      role: "admin",
    });
    await storage.createUser({
      name: "Student One",
      email: "student@example.com",
      password: "student",
      role: "student",
      branch: "Computer Science",
      year: 2024,
    });
    await storage.createCompany({
      companyName: "Tech Corp",
      package: "15 LPA",
      eligibility: "7.0 CGPA",
      recruitmentProcess: "Aptitude -> Coding -> Technical Interview -> HR",
    });
    await storage.createCompany({
      companyName: "Innovate Ltd",
      package: "20 LPA",
      eligibility: "8.0 CGPA",
      recruitmentProcess: "Coding -> Technical Interview -> Managerial",
    });
    await storage.createPlacedStudent({
      name: "Alice Smith",
      branch: "Computer Science",
      company: "Innovate Ltd",
      package: "20 LPA",
      year: 2023,
      preparationTips: "Focus on DSA and CS Fundamentals.",
    });
    await storage.createResource({
      title: "Top 100 Array Questions",
      type: "DSA",
      link: "https://example.com/dsa-arrays",
    });
    await storage.createInterviewExperience({
      studentName: "Bob Jones",
      company: "Tech Corp",
      experience: "The coding round was medium difficulty. The interview focused on my resume projects.",
      questions: "1. Reverse a Linked List. 2. Explain CAP theorem.",
    });
    const exps = await storage.getInterviewExperiences();
    if (exps.length > 0) {
      await storage.approveInterviewExperience(exps[0].id);
    }
  }
}