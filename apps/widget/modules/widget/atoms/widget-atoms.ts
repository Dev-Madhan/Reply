import {atom} from "jotai";
import {WidgetScreen} from "@/modules/widget/types";
import {atomFamily, atomWithStorage} from "jotai/utils";
import {CONTACT_SESSION_KEY} from "@/modules/widget/constants";
import {Id} from "@workspace/backend/_generated/dataModel";

export const screenAtom = atom<WidgetScreen>("loading")
export const organizationIdAtom = atom<string | null>(null);
export const errorMessagesAtom = atom<string | null>(null);
export const loadingMessagesAtom = atom<string | null>(null);
export const contactSessionIdAtomFamily = atomFamily((organizationId: string) => {
    return atomWithStorage<Id<"contactSessions"> | null>(`${CONTACT_SESSION_KEY}_${organizationId}`, null)
});
export const conversationIdAtom = atom<Id<"conversations"> | null>(null);