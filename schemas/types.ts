import { z } from 'zod';

const UserInfoSchema = z.object({
  Biography: z.string().max(512),
  Gender: z.enum(['male', 'female', 'prefer not to say']),
  Birthdate: z.date(),
  Country: z.string(), 
  Photos: z.array(z.string().url())
});

const UserSchema = z.object({
  _id: z.string(), 
  Username: z.string().regex(/^\S+$/),
  Password: z.string(),
  Email: z.string().email(),
  Deleted: z.boolean(),
  Info: UserInfoSchema
});

const CountrySchema = z.object({
  _id: z.string(), 
  Name: z.string().max(128)
});

const ChatSchema = z.object({
  _id: z.string(), 
  Users: z.array(z.string()), 
  LastMessage: z.string() 
});

const LikeSchema = z.object({
  _id: z.string(), 
  User: z.string(), 
  Target: z.string() 
});

const MessageSchema = z.object({
  _id: z.string(), 
  Type: z.enum(['text', 'image']),
  Content: z.string().max(512),
  Chat: z.string(), 
  Author: z.string(), 
  DatetimeSent: z.date()
});

type UserInfo = z.infer<typeof UserInfoSchema>;
type User = z.infer<typeof UserSchema>;
type Country = z.infer<typeof CountrySchema>;
type Chat = z.infer<typeof ChatSchema>;
type Like = z.infer<typeof LikeSchema>;
type Message = z.infer<typeof MessageSchema>;

// Export schemas and types
export { UserSchema, CountrySchema, ChatSchema, LikeSchema, MessageSchema };
export type { User, UserInfo, Country, Chat, Like, Message };
