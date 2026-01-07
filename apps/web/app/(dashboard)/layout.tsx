import React from 'react'
import {AuthGaurd} from "@/modules/auth/ui/components/auth-gaurd";
import {OrganizationGuard} from "@/modules/auth/ui/components/organization-guard";


const Layout = ({children}: {children : React.ReactNode;}) => {
    return (
        <AuthGaurd>
            <OrganizationGuard>
                {children}
            </OrganizationGuard>
        </AuthGaurd>
    )
}
export default Layout
