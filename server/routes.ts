import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.contacts.list.path, async (req, res) => {
    const search = req.query.search as string | undefined;
    const contacts = await storage.getContacts(search);
    res.json(contacts);
  });

  app.get(api.contacts.get.path, async (req, res) => {
    const contact = await storage.getContact(Number(req.params.id));
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  });

  app.post(api.contacts.create.path, async (req, res) => {
    try {
      const input = api.contacts.create.input.parse(req.body);
      const contact = await storage.createContact(input);
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.contacts.update.path, async (req, res) => {
     try {
      const id = Number(req.params.id);
      const input = api.contacts.update.input.parse(req.body);
      const contact = await storage.updateContact(id, input);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.contacts.delete.path, async (req, res) => {
    const id = Number(req.params.id);
    const existing = await storage.getContact(id);
    if (!existing) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await storage.deleteContact(id);
    res.status(204).send();
  });

  // Seed data
  const existingContacts = await storage.getContacts();
  if (existingContacts.length === 0) {
    await storage.createContact({
      name: "João Silva",
      phone: "(11) 98765-4321",
      title: "Desenvolvedor Full Stack",
      company: "Tech Solutions"
    });
    await storage.createContact({
      name: "Maria Santos",
      phone: "(21) 91234-5678",
      title: "Gerente de Projetos",
      company: "Inova Corp"
    });
    await storage.createContact({
      name: "Carlos Oliveira",
      phone: "(31) 99887-7665",
      title: "Designer UI/UX",
      company: "Creative Studio"
    });
  }

  return httpServer;
}
