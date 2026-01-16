import { db } from "./db";
import {
  contacts,
  type Contact,
  type InsertContact
} from "@shared/schema";
import { eq, ilike, or } from "drizzle-orm";

export interface IStorage {
  getContacts(search?: string): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: number, contact: Partial<InsertContact>): Promise<Contact | undefined>;
  deleteContact(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getContacts(search?: string): Promise<Contact[]> {
    if (search) {
      const searchLower = `%${search}%`;
      return await db.select().from(contacts).where(
        or(
          ilike(contacts.name, searchLower),
          ilike(contacts.company, searchLower),
          ilike(contacts.title, searchLower),
          ilike(contacts.phone, searchLower)
        )
      );
    }
    return await db.select().from(contacts);
  }

  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  async updateContact(id: number, update: Partial<InsertContact>): Promise<Contact | undefined> {
    const [contact] = await db.update(contacts)
      .set(update)
      .where(eq(contacts.id, id))
      .returning();
    return contact;
  }

  async deleteContact(id: number): Promise<void> {
    await db.delete(contacts).where(eq(contacts.id, id));
  }
}

export const storage = new DatabaseStorage();
