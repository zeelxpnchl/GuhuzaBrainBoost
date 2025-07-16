import { auth } from "@/auth";
import fetchPlayers from "@/utils/fPlayers";
import fetchRank from "@/utils/fRanking";
import fetchUser from "@/utils/fUser";
import dynamic from "next/dynamic";

const LeaderBoardClient = dynamic(() => import("./leaderBoardClient"), { ssr: false });

export default async function LeaderBoard() {
    const session = await auth();
    const user = session?.user;
    const Players = (await fetchPlayers()) || [];

    let player = null;
    let actualRank = Players.length + 1;

    if (user?.memberId && user?.email) {
        player = await fetchUser(
            Number(user.memberId),
            `${user.firstName ?? "Anonymous"} ${user.lastName ?? ""}`,
            user.email
        );

        if (player?.Playerpoint !== undefined) {
            actualRank = await fetchRank(player.Playerpoint);
        }
    }

    return (
        <LeaderBoardClient Players={Players} player={player} actualRank={actualRank} />
    );
}
