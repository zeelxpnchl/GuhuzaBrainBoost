﻿// app/quiz/page.tsx
import React from "react";
import QuizHero from "../components/quizHero";
import WhyplaySection from "./whyplaySection";
import QuizLevelSections from "../components/quizLevelSections";
import LeaderBoard from "../components/leaderBoard";
import { auth } from "@/auth";
import fetchUser from "@/utils/fUser";
import fetchPlayers from "@/utils/fPlayers";
import LoginButton from "../components/buttons/loginBtn";
import dynamic from "next/dynamic";

const QuizJourney = dynamic(() => import("../components/QuizJourney"), {
    ssr: false,
});

export default async function QuizHomePage() {
    const players = await fetchPlayers();
    const session = await auth();

    if (!session) {
        return (
            <div className="flex h-full">
                <div className="px-8 my-32 rounded py-8 border-2 mx-auto w-fit bg-white">
                    <h1 className="title mb-5 w-32">Log in Required</h1>
                    <p>You have to log in in order to access this page.</p>
                    <div className="mt-5 w-full">
                        <LoginButton />
                    </div>
                </div>
            </div>
        );
    }

    const user = session.user!;
    const name = user.firstName ?? "Anonymous";
    const player = await fetchUser(Number(user.memberId), name, user.email || "");
    const playerLevel = player?.Level_Id ?? 1;

    return (
        <div className="mt-10">
            {/* Hero Section */}
            <QuizHero />

            {/* Why Play Section */}
            <div className="whyplay">
                <WhyplaySection />
            </div>

            {/* Your Journey Section (client-only for i18n reactivity) */}
            <div className="mt-20"> {/* ⬅️ More spacing above */}
                <QuizJourney />
            </div>

            {/* Quiz Level Section */}
            <div className="QuizSection mt-16">
                <QuizLevelSections playerLevel={playerLevel} />
            </div>

            {/* Leaderboard Section */}
            <div className="leaderboard section container">
                <LeaderBoard />
            </div>
        </div>
    );
}
