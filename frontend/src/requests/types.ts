export type Role = 'user' | 'admin';

export interface User {
  id: string;
  role: Role;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Token {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}
