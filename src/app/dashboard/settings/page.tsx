"use client"

import ProtectedDashboard from "@/components/protected-dashboard"

function settings() {
  return (
    <ProtectedDashboard>
      <main className="p-5">
        <span>settings</span>
      </main>
    </ProtectedDashboard>
  )
}

export default settings