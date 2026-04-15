import { redirect } from "next/navigation";

export default async function AvailabilityPage() {
    redirect(`/tableau-de-board/availability/all`);
}