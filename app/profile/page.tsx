// app/profile/page.tsx
import React from "react";
import QuizLevelSections from "../components/quizLevelSections";
import LeaderBoard from "../components/leaderBoard";
import ProfileHerosection from "../components/profileHerosection";
import LoginButton from "../components/buttons/loginBtn";
import fetchUser from "@/utils/fUser";
import fetchRank from "@/utils/fRanking";
import { auth } from "@/auth";
import { getI18n } from "@/lib/i18n/server";
import { cookies } from "next/headers";

export default async function ProfilePage() {
    const lang = (cookies().get("NEXT_LOCALE")?.value || "en") as "en" | "fr" | "es" | "de";
    const t = await getI18n(lang);
    const session = await auth();

    if (!session?.user) {
        return (
            <div className="flex h-full">
                <div className="px-8 my-32 rounded py-8 border-2 mx-auto w-fit bg-white dark:bg-neutral-900 text-black dark:text-white transition-colors duration-300">
                    <h1 className="text-3xl font-bold mb-5 w-fit px-4 py-1 bg-blue-400 dark:bg-blue-600 rounded text-center">
                        {t("profile.login_required")}
                    </h1>
                    <p>{t("profile.login_message")}</p>
                    <div className="mt-5 w-full">
                        <LoginButton />
                    </div>
                </div>
            </div>
        );
    }

    const user = session.user;
    const name = user?.firstName || "Anonymous";
    const player = await fetchUser(Number(user.memberId), name, user.email || "");
    const playerPoint: number = player ? player.Playerpoint : 0;
    const playerRank = player ? await fetchRank(Number(playerPoint)) : 100;
    const playerLevel = player?.Level_Id ?? 1;

    return (
        <div className="p-6 min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
            <ProfileHerosection player={player} playerRank={playerRank} />

            <div className="mt-12">
                <QuizLevelSections playerLevel={playerLevel} />
            </div>

            <div className="mt-12 container">
                <LeaderBoard />
            </div>
        </div>
    );
}
