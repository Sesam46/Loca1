import { db } from "./db";
import {
  users, products, jobs, requests,
  type User, type InsertUser,
  type Product, type InsertProduct,
  type Job, type InsertJob,
  type Request, type InsertRequest
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct & { sellerId: number }): Promise<Product>;
  deleteProduct(id: number): Promise<void>;

  // Jobs
  getJobs(): Promise<Job[]>;
  createJob(job: InsertJob & { employerId: number }): Promise<Job>;
  deleteJob(id: number): Promise<void>;

  // Requests
  getRequests(): Promise<Request[]>;
  createRequest(request: InsertRequest & { requesterId: number }): Promise<Request>;
  deleteRequest(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async createProduct(product: InsertProduct & { sellerId: number }): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Jobs
  async getJobs(): Promise<Job[]> {
    return await db.select().from(jobs);
  }

  async createJob(job: InsertJob & { employerId: number }): Promise<Job> {
    const [newJob] = await db.insert(jobs).values(job).returning();
    return newJob;
  }

  async deleteJob(id: number): Promise<void> {
    await db.delete(jobs).where(eq(jobs.id, id));
  }

  // Requests
  async getRequests(): Promise<Request[]> {
    return await db.select().from(requests);
  }

  async createRequest(request: InsertRequest & { requesterId: number }): Promise<Request> {
    const [newRequest] = await db.insert(requests).values(request).returning();
    return newRequest;
  }

  async deleteRequest(id: number): Promise<void> {
    await db.delete(requests).where(eq(requests.id, id));
  }
}

export const storage = new DatabaseStorage();
