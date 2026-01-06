import React from 'react'
import {AuthGaurd} from "@/modules/auth/ui/components/auth-gaurd";
import {OrganizationGaurd} from "@/modules/auth/ui/components/organization-gaurd";

const Layout = ({children}: {children : React.ReactNode;}) => {
    return (
        <AuthGaurd>
            <OrganizationGaurd>
                {children}
            </OrganizationGaurd>
        </AuthGaurd>
    )
}
export default Layout
