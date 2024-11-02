import HeroSection from "./_components/header/HeroSection";
import PropertiesSection from "./_components/main/PropertiesSection";
import AboutSection from "./_components/main/AboutSection";

export default async function CataloguePage() {
    return (
        <>
            <HeroSection />
            <PropertiesSection />
            <AboutSection />
        </>
    );
}
