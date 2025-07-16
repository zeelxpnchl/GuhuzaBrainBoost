"use client";

import { useTranslation } from "react-i18next";
import React from "react";

interface MilestoneType {
    Milestone_Id: number;
    Milestone_Title: string;
    Milestone_description: string;
    UnlockingLevel: number;
    UploadRequired: boolean;
}

interface PlayerType {
    Player_ID: number;
    Player_name: string;
    Playerpoint: number;
    streak: number;
    lastLogin: Date;
    Level_Id?: number;
    Milestone_Id?: number;
    milestone: MilestoneType;
}

interface Props {
    Players: PlayerType[];
    player: PlayerType | null;
    actualRank: number;
}

export default function LeaderBoardClient({ Players, player, actualRank }: Props) {
    const { t } = useTranslation();
    const playerId = player?.Player_ID ?? null;
    const sorted = Array.isArray(Players) ? [...Players].sort((a, b) => b.Playerpoint - a.Playerpoint) : [];

    let topPlayers: PlayerType[] = sorted.slice(0, 20);
    if (playerId !== null && !topPlayers.some((p) => p.Player_ID === playerId)) {
        const me = Players.find((p) => p.Player_ID === playerId);
        if (me) topPlayers.push(me);
    }

    return (
        <div className="py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="inline-block bg-blue-400 text-gray-900 dark:text-white text-4xl font-bold px-4 py-1 rounded">
                    {t("leaderboard.title")}
                </h2>
                <p className="mt-6 mb-10 text-gray-600 dark:text-gray-300">
                    {t("leaderboard.description")}
                </p>
            </div>

            <div className="mx-auto max-w-4xl border bg-white dark:bg-neutral-900 rounded-lg shadow-lg transition-colors duration-300">
                <div className="max-h-[32rem] overflow-y-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="sticky top-0">
                            <tr>
                                <th className="w-1/6 bg-gradient-to-b from-gray-950 to-gray-800 text-white uppercase text-sm font-semibold px-4 py-3 text-center rounded-tl-lg">
                                    {t("leaderboard.rank")}
                                </th>
                                <th className="w-1/6 bg-gradient-to-b from-gray-950 to-gray-800 text-white uppercase text-sm font-semibold px-4 py-3 text-center">
                                    {t("leaderboard.name")}
                                </th>
                                <th className="w-1/6 bg-gradient-to-b from-gray-950 to-gray-800 text-white uppercase text-sm font-semibold px-4 py-3 text-center">
                                    {t("leaderboard.points")}
                                </th>
                                <th className="w-1/6 bg-gradient-to-b from-gray-950 to-gray-800 text-white uppercase text-sm font-semibold px-4 py-3 text-center rounded-tr-lg">
                                    {t("leaderboard.level")}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {topPlayers.map((p, idx) => {
                                const isCurrent = p.Player_ID === playerId;
                                const displayRank = isCurrent ? actualRank : idx + 1;
                                const rowClass = isCurrent
                                    ? "bg-blue-50 dark:bg-blue-800"
                                    : "bg-white dark:bg-neutral-900";

                                return (
                                    <tr key={p.Player_ID} className={`${rowClass} transition-colors duration-200`}>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 dark:text-white">
                                            {displayRank}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 dark:text-white">
                                            {p.Player_name}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 dark:text-white">
                                            {p.Playerpoint}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-center text-gray-800 dark:text-white">
                                            {p.Level_Id}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
