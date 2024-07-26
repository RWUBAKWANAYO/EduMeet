export interface IUser {
  _id: string;
  full_name: string;
  email?: string;
  photo?: string;
  pmi?: number;
  active?: boolean;
}
