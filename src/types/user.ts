import { User as FirebaseUserType } from 'firebase/auth';

export type User = FirebaseUserType & {
  accessToken?: string;
};
