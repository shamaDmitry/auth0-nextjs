"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export interface Role {
  created_at: string;
  description: string;
  id: string;
  name: string;
  slug: string;
}

interface UserWithRole {
  user: User | null;
  role: Role | null;
  isLoading: boolean;
  error: Error | null;
}

export function useUser(): UserWithRole {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
        setIsLoading(false);
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

  return { user, role, isLoading, error };
}
