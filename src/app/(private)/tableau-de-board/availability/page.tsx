import { redirect } from "next/navigation";

const category = "Prestige";

export default async function AvailabilityPage() {
    redirect(`/tableau-de-board/availability/${category}`);
}