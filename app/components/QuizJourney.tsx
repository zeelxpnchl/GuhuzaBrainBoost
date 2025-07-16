"use client";

import { useTranslation } from "react-i18next";

export default function QuizJourney() {
    const { t } = useTranslation();

    return (
        <div className="mt-20 mb-4 container flex flex-col lg:flex-row lg:items-center lg:gap-6">
            <h2 className="px-4 py-1 bg-blue-400 text-5xl w-fit rounded font-bold text-gray-900">
                {t("quizlevel.title")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-base mt-2 lg:mt-0 w-96">
                {t("quizlevel.description")}
            </p>
        </div>

    );
}
