import { z } from 'zod';

const usernameSchema = z.string()
  .min(4, { message: "Username must be at least 4 characters long" })
  .max(20, { message: "Username must be at most 20 characters long" })
  .regex(/^\S*$/, { message: "Username cannot contain spaces" });

const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(100, { message: "Password must be at most 100 characters long" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" });



const emailSchema = z.string()
  .email({ message: "Invalid email address" });

  export const validateUsername = (username: string): { valid: boolean, errors?: string[] } => {
    try {
      usernameSchema.parse(username);
      return { valid: true };
    } catch (e) {
      if (e instanceof z.ZodError) {
        return { valid: false, errors: e.errors.map(error => error.message) };
      }
      return { valid: false, errors: ["Unknown error"] };
    }
  };

  export const validatePassword = (password: string): { valid: boolean, errors?: string[] } => {
    try {
      passwordSchema.parse(password);
      return { valid: true };
    } catch (e) {
      if (e instanceof z.ZodError) {
        return { valid: false, errors: e.errors.map(error => error.message) };
      }
      return { valid: false, errors: ["Unknown error"] };
    }
  };
  
  export const validateEmail = (email: string): { valid: boolean, errors?: string[] } => {
    try {
      emailSchema.parse(email);
      return { valid: true };
    } catch (e) {
      if (e instanceof z.ZodError) {
        return { valid: false, errors: e.errors.map(error => error.message) };
      }
      return { valid: false, errors: ["Unknown error"] };
    }
  };

