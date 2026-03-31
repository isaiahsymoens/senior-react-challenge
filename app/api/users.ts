export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: "male" | "female";
  email: string;
  phone: string;
  username: string;
  image?: string;
  company?: {
    name: string;
    department: string;
    title: string;
  };
  address?: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

const DUMMYJSON_BASE_URL = "https://dummyjson.com";

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json() as Promise<T>;
}

export const fetchUsers = async({limit, skip, q}: {limit: number, skip: number, q: string}): Promise<UsersResponse> => {
  const endpoint = q
    ? `/users/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
    : `/users?limit=${limit}&skip=${skip}`;

  return fetchJson<UsersResponse>(`${DUMMYJSON_BASE_URL}${endpoint}`);
}