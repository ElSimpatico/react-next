import Footer from "@/ui/components/footer/Footer";
import Header from "@/ui/components/header/Header";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
