import { z } from "zod";

const email = z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email");

const password = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must not exceed 50 characters");

const name = z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must not exceed 30 characters")
    .trim();

export const LoginSchema = z.object({
    email,
    password,
});

export const RegisterSchema = z
    .object({
        name,
        email,
        password,

    })


export type LoginInput = z.infer<typeof LoginSchema>;

export type RegisterInput = z.infer<typeof RegisterSchema>;