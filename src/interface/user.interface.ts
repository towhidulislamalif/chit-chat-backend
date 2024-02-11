export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  profile_picture: string;
}
