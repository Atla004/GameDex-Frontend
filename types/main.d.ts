import { GameCard } from "@/components/mainInterfaceComponents/GameCard";

export interface Game {
  id: number;
  imageUrl: string;
  title: string;
  ranking: number;
  description: string;
  criticScore: number;
  userScore: number;
}

export interface Review {
  id: string;
  publication: string;
  username?: string;
  score: number;
  content: string;
  date: string;
  isOwnReview?: boolean;
}

