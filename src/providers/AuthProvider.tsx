"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { getUserRoleQuery, UserRole } from "@/api/userAPI";

const Context = createContext<{
  user: User | null;
  loading: boolean;
  role: UserRole | null;
  error: Error | null;
}>({
  user: null,
  loading: true,
  role: null,
  error: null,
});

export function AuthProvider({
  children,
  initialUser,
  initialRole,
}: {
  children: React.ReactNode;
  initialUser: User | null;
  initialRole: UserRole | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [role, setRole] = useState<UserRole | null>(initialRole);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(!initialUser);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    setUser(initialUser);
    setRole(initialRole);
    setLoading(false);
  }, [initialUser, initialRole]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        setLoading(true);

        const { data } = await getUserRoleQuery(supabase, currentUser.id);

        setRole(data);
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <Context.Provider value={{ user, loading, role, error }}>
      {children}
    </Context.Provider>
  );
}

export const useUser = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useUser must be used within an AuthProvider");
  }

  return context;
};
