export interface IUser {
  id: number;
  email: string;
  username: string;
  profileImage: string;
  userMode: string;
  bio: string | null;
  isPasswordPresent: boolean;
  passwordResetToken: string | null;
  passwordResetExpires: string | null;
  refreshToken: string | null;
}
