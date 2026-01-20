"use client";

import {WidgetFooter} from "@/modules/widget/ui/components/widget-footer";
import {WidgetHeader} from "@/modules/widget/ui/components/widget-header";

interface Props {
    organizationId: string;
};

export const WidgetView = ({ organizationId }: Props) => {
    return(
        <main className="min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl border-2 bg-muted">
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
                    <p className="text-3xl">
                        Hey, there! 👋🏻
                    </p>

                    <p className="text-lg">
                        How can we help you today?
                    </p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1">
                Widget View: {organizationId}
            </div>
            <WidgetFooter />
        </main>
    )
}

// http://localhost:3001/?organizationId=123