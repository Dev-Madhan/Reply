"use client";

import {useAtomValue, useSetAtom} from "jotai";
import {
    contactSessionIdAtomFamily,
    errorMessagesAtom,
    loadingMessagesAtom,
    organizationIdAtom,
    screenAtom
} from "@/modules/widget/atoms/widget-atoms";
import {WidgetHeader} from "@/modules/widget/ui/components/widget-header";
import {LoaderIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {useAction, useMutation} from "convex/react";
import {api} from "@workspace/backend/_generated/api";

type InitStep = "org" | "session" | "settings" | "done" | "vapi";

export const WidgetLoadingScreen = ({organizationId}: { organizationId: string | null }) => {
    const [step, setStep] = useState<InitStep>("org");
    const [sessionValid, setSessionValid] = useState<boolean>(false);

    const setScreen = useSetAtom(screenAtom);
    const loadingMessage = useAtomValue(loadingMessagesAtom);
    const setOrganizationId = useSetAtom(organizationIdAtom);
    const setErrorMessage = useSetAtom(errorMessagesAtom);
    const setLoadingMessage = useSetAtom(loadingMessagesAtom);
    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""));

    // Step 1 Validate organization
    const validateOrganization = useAction(api.public.organizations.validate);
    useEffect(() => {
        if (step !== "org") {
            return;
        }

        setLoadingMessage("Finding Organization ID...");

        const verifyOrg = async () => {
            if (!organizationId) {
                setErrorMessage("Organization ID is required.");
                setScreen("error");
                return;
            }

            setLoadingMessage("Verifying organization...");

            try {
                const result = await validateOrganization({organizationId});

                if (result.valid) {
                    setOrganizationId(organizationId);
                    setStep("session");
                } else {
                    setErrorMessage(result.reason || "Invalid configuration");
                    setScreen("error");
                }
            } catch (error) {
                setErrorMessage("Unable to verify organization.");
                setScreen("error");
            }
        };

        verifyOrg();
    }, [step, organizationId, setScreen, setErrorMessage, setLoadingMessage, validateOrganization, setOrganizationId]);

    // Step 2: Validate session (if exists)
    const validateContactSession = useMutation(api.public.contactSessions.validate);

    useEffect(() => {
        if (step !== "session") {
            return;
        }

        setLoadingMessage("Finding contact session ID...");

        if (!contactSessionId) {
            setSessionValid(false);
            setStep("done");
            return;
        }

        setLoadingMessage("Verifying session...");

        validateContactSession({ contactSessionId })
            .then((result) => {
                setSessionValid(result.valid);
                setStep("done");
            })
            .catch(() => {
                setSessionValid(false);
                setStep("done");
            }); // ✅ semicolon added
    }, [step, contactSessionId, setSessionValid, setStep, validateContactSession, setLoadingMessage, setErrorMessage, setScreen, setOrganizationId]);

    useEffect(() => {
        if(step !== "done"){
            return;
        }

        const hasValidSession = contactSessionId && sessionValid;
        setScreen(hasValidSession ? "selection" : "auth");
    }, [step, contactSessionId, sessionValid, setScreen]);

    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
                    <p className="text-3xl">Hey, there! 👋🏻</p>
                    <p className="text-lg">Let&apos;s get you started</p>
                </div>
            </WidgetHeader>

            <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-y-4 p-4">
                <LoaderIcon className="animate-spin"/>
                <p className="text-sm">
                    {loadingMessage || "Loading..."}
                </p>
            </div>
        </>
    );
};
