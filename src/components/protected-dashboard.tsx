"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function ProtectedDashboard({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            if (!user) {
                router.push("/auth");
            }
        }
    }, [router]);

    return (
        <div>{children}</div>
    );
}

export default ProtectedDashboard;
