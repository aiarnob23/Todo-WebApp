import { z } from 'zod';

const newTodoValidation = z.object({
    body: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        user: z.string(),
        status: z.enum(["incomplete", "complete"]).optional(),
        isDeleted:z.boolean().optional(),
    })
})

export const todoValidations = {
    newTodoValidation,
}