export interface Admin {
  id: string | number;
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export const admin: Admin[] = [
  {
    id: 1,
    name: "Raymond Bamidele",
    email: "bamidele@chaskaindustries.com",
    avatar: "/c44.jpg",
    role: "Administrator",
  },
];
