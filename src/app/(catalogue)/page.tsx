import HeroSection from "./_components/header/HeroSection";
import PropertiesSection from "./_components/main/PropertiesSection";
import AboutSection from "./_components/main/AboutSection";
import HeroSearchFilter from "./_components/header/HeroSearchFilter";

export default async function CataloguePage() {
    return (
        <>
            <HeroSection />
            <HeroSearchFilter />
            <PropertiesSection />
            <AboutSection />
        </>
    );
}
