﻿"use client";

import React, { useState } from "react";
import QuizLevelSections from "../components/quizLevelSections";
import LeaderBoardSection from "../components/leaderBoardSection";
import { useTranslation } from "react-i18next";

type Props = {
    player: any;
    playerRank: number;
    playerLevel: number;
    stars: number;
    badge: string;
};

export default function ProfileClient({
    player,
    playerRank,
    playerLevel,
    stars,
    badge,
}: Props) {
    const { t } = useTranslation();
    const [showRulesModal, setShowRulesModal] = useState(false);

    const handleStartQuiz = () => {
        setShowRulesModal(true);
    };

    const handleAcceptRules = () => {
        setShowRulesModal(false);
        window.location.href = `/quiz/${playerLevel}`;
    };

    return (
        <div className="p-6 min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
            {/* Profile Info */}
            <div className="text-center py-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t("Welcome")}, {player?.Player_name}
                </h1>
                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                    {t("Rank")}: <span className="font-semibold">{playerRank}</span>
                </p>
            </div>

            {/* Rating Section */}
            <div className="mt-8 max-w-md mx-auto bg-white dark:bg-neutral-900 text-black dark:text-white border dark:border-neutral-700 rounded-lg p-4 shadow transition-colors duration-300">
                <p className="font-semibold text-lg mb-2">
                    {t("your_rating")}
                </p>

                <div className="flex gap-1 text-yellow-400 text-xl mb-2">
                    {[...Array(6)].map((_, i) => (
                        <span key={i}>{i < stars ? "⭐" : ""}</span>
                    ))}
                </div>
                {badge && (
                    <div className="inline-block px-4 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 rounded text-sm font-semibold shadow transition-colors">
                        🏅 {t(badge, badge)}
                    </div>
                )}
            </div>

            {/* Quiz Sections */}
            <div className="mt-12">
                <QuizLevelSections playerLevel={playerLevel} onStartQuiz={handleStartQuiz} />
            </div>

            {/* Leaderboard */}
            <div className="mt-12 container">
                <LeaderBoardSection />
            </div>

            {/* Rules Modal */}
            {showRulesModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
                    <div className="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-xl w-[90%] max-w-xl text-center transition-colors duration-300">
                        <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
                            {t("quizhero.rules_title")}
                        </h2>
                        <ul className="text-left list-disc list-inside text-gray-800 dark:text-gray-300 space-y-2 mb-6">
                            {[...Array(10)].map((_, i) => (
                                <li key={i}>{t(`quizhero.rules.${i + 1}`)}</li>
                            ))}
                        </ul>
                        <button
                            onClick={handleAcceptRules}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {t("quizhero.understood")}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
