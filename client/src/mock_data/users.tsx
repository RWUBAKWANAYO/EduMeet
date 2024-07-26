import { IUser } from "../types/users.interface";

export const users: IUser[] = [
  {
    _id: "user1",
    full_name: "John Doe",
    email: "john@example.com",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    pmi: 1234567890,
    active: true,
  },
  {
    _id: "user2",
    full_name: "Jane Smith",
    email: "smith@example.com",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    pmi: 9876543210,
    active: true,
  },
  {
    _id: "user3",
    full_name: "Alice Johnson",
    email: "alice@example.com",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    pmi: 5551234567,
    active: true,
  },
  {
    _id: "user4",
    full_name: "Bob Brown",
    email: "bob@example.com",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    pmi: 4445556666,
    active: true,
  },
  {
    _id: "user5",
    full_name: "Charlie Davis",
    email: "charlie@example.com",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    pmi: 7778889999,
    active: true,
  },
];
