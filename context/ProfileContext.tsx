import { createContext, useContext, useState } from 'react';

interface Profile {
  ready: boolean;
  photo: string | null;
  bio: string | null;
  gender: string | null;
  birthDate: Date | null;
  email: string;
}

interface ProfileContextType {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

const defaultProfile: Profile = {
  ready: false,
  photo: null,
  bio: null,
  gender: null,
  birthDate: null,
  email: '',
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile(prev => {
      const newProfile = { ...prev, ...updates };
      // Update ready status based on required fields
      newProfile.ready = Boolean(
        newProfile.bio && 
        newProfile.gender && 
        newProfile.birthDate
      );
      return newProfile;
    });
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
}