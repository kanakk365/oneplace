import DashboardLayout from "@/components/main/DashboardLayout";
import { RivalisOrganizer } from "@/components/rivalis/organizer/RivalisOrganizer";

export default function RivalisOrganizerPage() {
  return (
    <DashboardLayout pageLabel="Rivalis">
      <RivalisOrganizer />
    </DashboardLayout>
  );
}
