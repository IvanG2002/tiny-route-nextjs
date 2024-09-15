// stores/useAuth.ts
import { create } from 'zustand';

export interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    checkAuth: () => void;
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (user: User) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
    checkAuth: () => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        const isAuthenticated = !!user;
        set({ user, isAuthenticated });
    }
}));

