import type { Express } from "express";
import type { Server } from "http";
import { setupAuth, hashPassword } from "./auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seed() {
  const existingUsers = await storage.getUserByUsername("demo");
  if (!existingUsers) {
    const password = await hashPassword("password");
    const user = await storage.createUser({
      username: "demo",
      password,
    });

    await storage.createProduct({
      title: "MacBook Pro 2021",
      description: "M1 Pro, 16GB RAM, 512GB SSD. Great condition.",
      price: 15000,
      image: "https://placehold.co/600x400/007AFF/ffffff?text=MacBook",
      whatsapp: "27123456789",
      sellerId: user.id,
    });

    await storage.createProduct({
      title: "Leather Sofa",
      description: "3-seater black leather sofa. Pick up only.",
      price: 3500,
      image: "https://placehold.co/600x400/007AFF/ffffff?text=Sofa",
      whatsapp: "27123456789",
      sellerId: user.id,
    });

    await storage.createJob({
      title: "Gardener Needed",
      description: "Need someone to clean my garden once a week.",
      salary: "R300/day",
      whatsapp: "27987654321",
      employerId: user.id,
    });

    await storage.createJob({
      title: "React Developer",
      description: "Looking for a freelance React developer for a small project.",
      salary: "R500/hr",
      whatsapp: "27987654321",
      employerId: user.id,
    });

    await storage.createRequest({
      title: "Plumber Needed",
      description: "Leaking tap in kitchen. Urgent.",
      budget: "R500",
      requesterId: user.id,
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);
  seed();

  // Products
  app.get(api.products.list.path, async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post(api.products.create.path, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Authentication required" });
      
      const product = await storage.createProduct({
        ...req.body,
        sellerId: req.user.id,
      });
      res.status(201).json(product);
    } catch (error: any) {
      console.error("Error creating product:", error);
      res.status(400).json({ message: error.message || "Failed to create product" });
    }
  });

  app.delete(api.products.delete.path, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Authentication required" });
      await storage.deleteProduct(parseInt(req.params.id));
      res.sendStatus(200);
    } catch (error: any) {
      console.error("Error deleting product:", error);
      res.status(400).json({ message: error.message || "Failed to delete product" });
    }
  });

  // Jobs
  app.get(api.jobs.list.path, async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.post(api.jobs.create.path, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Authentication required" });
      
      const job = await storage.createJob({
        ...req.body,
        employerId: req.user.id,
      });
      res.status(201).json(job);
    } catch (error: any) {
      console.error("Error creating job:", error);
      res.status(400).json({ message: error.message || "Failed to create job" });
    }
  });

  app.delete(api.jobs.delete.path, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Authentication required" });
      await storage.deleteJob(parseInt(req.params.id));
      res.sendStatus(200);
    } catch (error: any) {
      console.error("Error deleting job:", error);
      res.status(400).json({ message: error.message || "Failed to delete job" });
    }
  });

  // Requests
  app.get(api.requests.list.path, async (req, res) => {
    try {
      const requests = await storage.getRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      res.status(500).json({ message: "Failed to fetch requests" });
    }
  });

  app.post(api.requests.create.path, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Authentication required" });
      
      const request = await storage.createRequest({
        ...req.body,
        requesterId: req.user.id,
      });
      res.status(201).json(request);
    } catch (error: any) {
      console.error("Error creating request:", error);
      res.status(400).json({ message: error.message || "Failed to create request" });
    }
  });

  app.delete(api.requests.delete.path, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Authentication required" });
      await storage.deleteRequest(parseInt(req.params.id));
      res.sendStatus(200);
    } catch (error: any) {
      console.error("Error deleting request:", error);
      res.status(400).json({ message: error.message || "Failed to delete request" });
    }
  });

  return httpServer;
}
