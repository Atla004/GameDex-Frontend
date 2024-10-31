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

export const validateUsername = (username: string) => {
  try {
    usernameSchema.parse(username);
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error("Validation errors:", e.errors);
    }
  }
};

export const validatePassword = (password: string) => {
  try {
    passwordSchema.parse(password);
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error("Validation errors:", e.errors);
    }
  }
};

export const validateEmail = (email: string) => {
  try {
    emailSchema.parse(email);
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error("Validation errors:", e.errors);
    }
  }
};


