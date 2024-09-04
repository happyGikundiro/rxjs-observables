export interface UserDetails {
    id: number;
    name: string;
    description: string;
    profile: string;
  }
  
  export interface UserPosts {
    id: number;
    title: string;
    description: string;
    image: string;
  }
  
  export interface CombinedData {
    userDetails: UserDetails[];
    userPosts: UserPosts[];
  }