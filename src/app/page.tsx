import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ENV } from "@/config/global";
import { PAGES } from "@/config/pages";
import Link from "next/link";

export default async function Home() {
    const session = await auth();
    return (
        <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen  pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
            <nav className="bg-secondary shadow w-full p-3 min-h-10 grid grid-cols-[1fr,0.5fr]">
                <div></div>
                <div className="flex justify-end items-center">
                    {session ? (
                        <Button asChild>
                            <Link href={PAGES.DASHBOARD}>Tableau de board</Link>
                        </Button>
                    ) : (
                        <Button asChild>
                            <Link href={ENV.NEXT_AUTH_SIGN_IN_PAGE}>Connexion</Link>
                        </Button>
                    )}
                </div>
            </nav>
            <Card>
                <CardHeader>
                    <h1 className="font-bold text-3xl">Catalogue</h1>
                </CardHeader>
                <CardContent></CardContent>
            </Card>
        </div>
    );
}
