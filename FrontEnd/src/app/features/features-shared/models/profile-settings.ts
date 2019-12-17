export interface ProfileSettings {
  id: any;
  uid: string;
  fullName?: string;
  username?: string;
  email?: string;
  photoURL?: string;
  password?: any;
  bio?: string;
  darkThemeMode: boolean;
  socialLinks?: SocialLinks;
}

interface SocialLinks {
  github?: string;
  linkedin?: string;
  facebook?: string;
  website?: string;
}
