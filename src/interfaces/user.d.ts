import { Role } from "@/types/role";

declare global {
  export interface IJwtUser {
    id: number;
    name?: string;
    role: Role;
  }

    export interface IUserAuth {
    email: string;
    password: string;
  }


  export interface AuthResponse {
  user: IUserAuth;
  accessToken: string;
}

}

export {};