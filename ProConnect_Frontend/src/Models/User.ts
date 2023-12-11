import { Name } from './Name'
import { Profession } from './Profession'
import { Role } from './Role'
import { Review } from './Review'

export type User = {
    id: number;
  name: Name; // Assuming Name is another type/interface
  email: string;
  phoneNumber?: string; // Optional property
  dateOfBirth?: Date; // Optional property

  reviewsGiven?: Review[]; // Assuming Review is another type/interface
  reviewsReceived?: Review[]; // Assuming Review is another type/interface
  professions?: Profession[]; // Assuming Profession is another type/interface
  roles?: Role[];
}