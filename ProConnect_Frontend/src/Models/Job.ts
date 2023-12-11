import { User } from './User';
import { Property } from './Property';

export type Job = {
    id: number;
    budget: number;
    owner: User; 
    property: Property; 
    datePosted: string;
    jobStatus: JobStatus;
    title: string;
    description: string;
}   

export enum JobStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    IN_PROGRESS = 'IN_PROGRESS',
    CANCELLED = 'CANCELLED',
    UNDER_REVIEW = 'UNDER_REVIEW',
    REQUIRES_ADJUSTMENTS = 'REQUIRES_ADJUSTMENTS',
    FINISHED = 'FINISHED',
  }