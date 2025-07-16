// app/quiz/page.tsx
//import QuizLevelSections from "../components/quizLevelSections";

import React, { Suspense } from "react";
import fetchLevels from "@/utils/fLevels";
import QuizList from "./quizList";
import Link from "next/link";
import { cookies } from "next/headers";
import { getI18n } from "@/lib/i18n/server"; // ✅ correct import

type levelType = {
    Level_Id: number;
    Level_Title: string;
    Level_number: number;
};

type levelsType = levelType[];

type Props = {
    playerLevel: number;
};

export default async function QuizLevelSections({ playerLevel }: Props) {
    const levels: levelsType = (await fetchLevels()) || [];

    // ✅ get lang dynamically from cookie
    const lang = (cookies().get("NEXT_LOCALE")?.value || "en") as "en" | "fr" | "es" | "de";

    // ✅ fetch server-side translations
    const t = await getI18n(lang);



    return (
        <div className="space-y-8">
            <div className="container grid lg:gap-16 gap-8">
                <Suspense fallback={<div>Loading…</div>}>
                    <QuizList cutEnding={true} allLevels={levels} playerLevel={playerLevel} />
                </Suspense>

                <Link href="/allquiz" className="font-semibold underline text-center">
                    {t("quizlevel.view_all")}
                </Link>
            </div>
        </div>
    );
}
