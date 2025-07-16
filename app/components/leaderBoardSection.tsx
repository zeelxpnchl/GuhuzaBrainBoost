import React from "react";
import { auth } from "@/auth";
import fetchPlayers from "@/utils/fPlayers";
import fetchUser from "@/utils/fUser";
import fetchRank from "@/utils/fRanking";
import dynamic from "next/dynamic";

const LeaderBoardClient = dynamic(() => import("./leaderBoardClient"), {
    ssr: false,
});

type MilestoneType = {
    Milestone_Id: number;
    Milestone_Title: string;
    Milestone_description: string;
    UnlockingLevel: number;
    UploadRequired: boolean;
};

type PlayerType = {
    Player_ID: number;
    Player_name: string;
    Playerpoint: number;
    streak: number;
    lastLogin: Date;
    Level_Id?: number;
    Milestone_Id?: number;
    milestone: MilestoneType;
};

export default async function LeaderBoardSection() {
    const session = await auth();
    const Players: PlayerType[] = await fetchPlayers();
    const user = session?.user;

    let player: PlayerType | null = null;
    let actualRank = Players.length + 1;

    if (user?.memberId && user?.email) {
        const fullName = user.firstName
            ? `${user.firstName} ${user.lastName}`
            : "Anonymous";

        player = await fetchUser(Number(user.memberId), fullName, user.email);

        if (player?.Playerpoint !== undefined) {
            actualRank = await fetchRank(player.Playerpoint);
        }
    }

    return (
        <LeaderBoardClient
            Players={Players}
            player={player}
            actualRank={actualRank}
        />
    );
}
