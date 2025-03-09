import { setTitlePage } from "@/lib/utils";
import React from "react";
import backgroundImage from "@assets/images/background.png";
import LoginForm from "./LoginForm";

export const metadata = setTitlePage("Connexion");
const Connexion = async () => {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        backgroundRepeat: "no-repeat",
    };

    return (
        <React.Suspense>
            <main style={backgroundStyle} className="lg:grid lg:grid-cols-[1fr,0.5fr]">
                <section></section>
                <section
                    className=" md:grid md:place-items-center text-secondary "
                    style={{
                        background: "rgba(3, 51, 23, 0.85)",
                        backdropFilter: "blur(8px)",
                        borderLeft: "1px solid rgba(255,255,255,0.3)",
                    }}
                >
                    <LoginForm />
                </section>
            </main>
        </React.Suspense>
    );
};

export default Connexion;
