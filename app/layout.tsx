import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "./components/SessionProvider";
import { auth } from "@/auth";
import Navbar from "@/app/components/navbar";
import ObserverProvider from "./components/ObserverPovider";
import Footer from "./components/footer";
import NextTopLoader from "nextjs-toploader";
import { PlayerContextProvider } from "./context/playerContext";
import { LangProvider } from "@/app/context/langContext";
import "@/lib/i18n";

import { cookies } from "next/headers"; // ✅ for detecting lang

export const metadata: Metadata = {
    title: "Guhuza’s Brain Boost",
    description: "Level Up Your Job Search with Guhuza’s Brain Boost",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const lang = cookies().get("NEXT_LOCALE")?.value || "en"; // ✅ dynamic lang

    return (
        <html lang={lang} suppressHydrationWarning>
            <body className="bg-white text-black dark:bg-black dark:text-white flex flex-col min-h-screen m-0 p-0">
                <NextTopLoader />
                <LangProvider>
                    <SessionProvider session={session}>
                        <ObserverProvider>
                            <PlayerContextProvider>
                                <Navbar />
                                <main className="flex-1">{children}</main>
                                <Footer />
                            </PlayerContextProvider>
                        </ObserverProvider>
                    </SessionProvider>
                </LangProvider>
            </body>
        </html>
    );
}
