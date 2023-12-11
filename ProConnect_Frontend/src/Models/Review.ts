import { User } from './User';
import { Role } from './Role';

export type Review = {
    id: number;
    score: number;
    reviewText: string;
    reviewer: User; 
    reviewedUser: User; 
    roleReviewed: Role; 
    timestamp?: string;
  };