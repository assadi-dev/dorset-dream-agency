import { redirect } from "next/navigation";

const category = "maison ouverte";

export default async function AvailabilityPage() {
    redirect(`/tableau-de-board/availability/${category}`);
}