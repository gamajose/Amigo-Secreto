import { RequestHandler } from "express";
import * as events from '../services/events';
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
    const items = await events.getAll();
    if (items) return res.json({ events: items });

    res.json({ error: 'Ocorreu um erro' });
}

export const getEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const eventItem = await events.getOne(parseInt(id));
    if (eventItem) return res.json({ events: eventItem });

    res.json({ error: 'Ocorreu um erro' });
}

export const addEvent: RequestHandler = async (req, res) => {
    const addEventSchema = z.object({
        title: z.string(),
        description: z.string(),
        grouped: z.boolean(),
    });
    const body = addEventSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados Inválidos' });

    const newEvent = await events.add(body.data);
    if (newEvent) return res.status(201).json({ events: newEvent });

    res.json({ error: 'Ocorreu um erro' });
}