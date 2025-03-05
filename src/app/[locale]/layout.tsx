import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import AuthProvider from "@/context/AuthProvider";
import { routing } from "@/i18n/routing";
import Footer from "@/ui/components/footer/Footer";
import Header from "@/ui/components/header/Header";
import ThemeProvider from "@/ui/components/theme-provider/themeProvider";

import styles from "./layout.module.scss";

import type { Metadata } from "next";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as string)) {
        notFound();
    }

    const messages = await getMessages({ locale });

    return (
        <html
            lang={locale}
            suppressHydrationWarning
            className={styles.layout__html}
        >
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${styles.layout__body}`}
            >
                <NextIntlClientProvider messages={messages}>
                    <AuthProvider>
                        <ThemeProvider>
                            <Header />
                            <main>{children}</main>
                            <Footer />
                        </ThemeProvider>
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
