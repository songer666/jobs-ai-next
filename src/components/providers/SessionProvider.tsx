"use client";

import { createContext, useContext, type ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role?: string;
}

export interface Session {
  user: User;
  session: {
    id: string;
    expiresAt: string;
  };
}

interface SessionContextType {
  session: Session | null;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
});

interface SessionProviderProps {
  children: ReactNode;
  initialSession: Session | null;
}

export function SessionProvider({
  children,
  initialSession,
}: SessionProviderProps) {
  return (
    <SessionContext.Provider value={{ session: initialSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useServerSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useServerSession must be used within a SessionProvider");
  }
  return context;
}
