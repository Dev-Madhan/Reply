
import {SidebarProvider} from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import {AuthGaurd} from "../../../auth/ui/components/auth-gaurd";
import {OrganizationGuard} from "../../../auth/ui/components/organization-guard";
import {DashboardSidebar} from "../components/dashboard-sidebar";



export const DashboardLayout = async ({children}: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    return (
        <AuthGaurd>
            <OrganizationGuard>
                <SidebarProvider defaultOpen={defaultOpen}>
                    <DashboardSidebar />
                    <main className="flex flex-1 flex-col">
                        {children}
                    </main>
                </SidebarProvider>
            </OrganizationGuard>
        </AuthGaurd>
    );
}