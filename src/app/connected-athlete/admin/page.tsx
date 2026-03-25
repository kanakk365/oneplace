"use client";

import { useState } from "react";
import DashboardLayout from "@/components/main/DashboardLayout";
import { RivalisAdmin } from "@/components/rivalis/admin/RivalisAdmin";
import { RivalisOrganizer } from "@/components/rivalis/organizer/RivalisOrganizer";

export default function RivalisAdminPage() {
  const [view, setView] = useState<"organizer" | "admin">("organizer");

  return (
    <DashboardLayout pageLabel="Rivalis">
      {view === "organizer" ? (
        <RivalisOrganizer onSwitchToAdmin={() => setView("admin")} />
      ) : (
        <RivalisAdmin onSwitchToOrganizer={() => setView("organizer")} />
      )}
    </DashboardLayout>
  );
}

