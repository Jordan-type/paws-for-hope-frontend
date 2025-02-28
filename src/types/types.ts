// types.ts 

export interface PetPost {
    creator: string;
    amount: number;
    imgUrl: string;
    petName: string;
    description: string;
    location: string;
    contactInfo: string;
    timestamp: number;
    isOpen: boolean;
  }
  
  export interface ExtendedPetPost extends PetPost {
    id: number; // Additional property for unique identification
    creator: string;
    amount: number;
    imgUrl: string;
    petName: string;
    description: string;
    location: string;
    contactInfo: string;
    timestamp: number;
    isOpen: boolean;
  }
  