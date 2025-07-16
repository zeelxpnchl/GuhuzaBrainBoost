
import prisma from "@/lib/prisma"

type milestoneType = {
    Milestone_Id: number,
    Milestone_Title: string,
    Milestone_description: string,
    UnlockingLevel: number,
    UploadRequired: boolean,
}

type playerType = {
    Player_ID: number,
    Player_name: string,
    Playerpoint: number,
    streak: number,
    lastLogin: Date,
    Level_Id?: number,
    Milestone_Id?: number,
}

type Players = playerType[]


async function fetchPlayers() {
    try {
        const players = await prisma.player.findMany(
            {
                include: {
                    milestone: true
                }
            }
        );
        return players as Players

    } catch (e) {
        console.error(e)
    }
}

export default fetchPlayers