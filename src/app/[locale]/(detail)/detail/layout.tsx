import React, { PropsWithChildren } from "react";

import Footer from "@/ui/components/footer/Footer";

export default async function DetailLayout({ children }: PropsWithChildren) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}
