"use client";

import Links from "@/components/links";
import ProtectedDashboard from "@/components/protected-dashboard";

function Dashboard() {
  return (
    <ProtectedDashboard>
      <main className="p-5">
        <Links />
      </main>
    </ProtectedDashboard>
  );
}

export default Dashboard;
