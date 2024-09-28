import { setTitlePage } from "@/lib/utils";
import React from "react";
import backgroundImage from "@assets/images/background.jpg";
import LoginForm from "./LoginForm";
import { Toaster } from "sonner";

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
        <main style={backgroundStyle} className="lg:grid lg:grid-cols-[1fr,0.5fr]">
            <section></section>
            <section
                className=" md:grid md:place-items-center text-secondary "
                style={{
                    background: "#0b1b47dc",
                    backdropFilter: "blur(8px)",
                    borderLeft: "1px solid rgba(255,255,255,0.3)",
                }}
            >
                <LoginForm />
            </section>
        </main>
    );
};

export default Connexion;
