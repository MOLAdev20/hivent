export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "ATTENDEE" | "ORGANIZER" | "ADMIN";
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
