"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Role } from "@/types";

const Context = createContext<{
  user: User | null;
  loading: boolean;
  role: Role | null;
  error: Error | null;
}>({
  user: null,
  loading: true,
  role: null,
  error: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchUserAndRole() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        setUser(user);

        if (user) {
          const { data, error: profileError } = await supabase
            .from("profiles")
            .select("role(*)")
            .eq("id", user.id)
            .single();

          if (profileError) {
            throw profileError;
          }

          const roleData = (
            Array.isArray(data?.role) ? data.role[0] : data?.role
          ) as Role | null;

          setRole(roleData || null);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch user")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndRole();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      if (!session?.user) {
        setRole(null);
      } else {
        fetchUserAndRole();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Context.Provider value={{ user, loading, role, error }}>
      {children}
    </Context.Provider>
  );
}

export const useUser = () => {
  return useContext(Context);
};
