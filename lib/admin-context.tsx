"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext(false);

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(!!localStorage.getItem("wp_token"));
    }, []);

    return <AdminContext.Provider value={isAdmin}>{children}</AdminContext.Provider>;
}

export const useIsAdmin = () => useContext(AdminContext);
