import { User } from './User';
import { Location } from './Location';

export type Property = {
    id: number;
    name: string;
    owner: User; 
    location: Location;
  };