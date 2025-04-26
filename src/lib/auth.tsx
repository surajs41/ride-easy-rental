
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type UserRole = 'admin' | 'user';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  role: UserRole;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  session: null, 
  role: 'user',
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole>('user');

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if user is admin
        if (session?.user?.email === 'admin123@gmail.com') {
          setRole('admin');
        } else {
          setRole('user');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check if user is admin
      if (session?.user?.email === 'admin123@gmail.com') {
        setRole('admin');
      } else {
        setRole('user');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Calculate isAdmin based on role
  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider value={{ user, session, role, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
