export interface IInstructor {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  profileImage?: string;
  imageDeleteURL?: string | null;
  userMode?: string;
  bio?: string | null;
  isPasswordPresent?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  refreshToken?: string;
}
