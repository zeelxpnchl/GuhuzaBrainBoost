// utils/fUser.ts
import prisma from "@/lib/prisma";

export type PlayerWithMilestone = Awaited<
    ReturnType<typeof prisma.player.findUnique>
>;

const fetchUser = async (
    userid: number,
    username: string,
    email: string
): Promise<PlayerWithMilestone> => {
    const existing = await prisma.player.findUnique({
        where: { Player_ID: userid },
        include: { milestone: true },
    });

    if (existing) {
        // ✅ Get temp score via API route handler
        const tempRes = await fetch("http://localhost:3000/api/reset-temp-score", {
            method: "POST",
        });
        const { tempScore = 0 } = await tempRes.json();
        const totalPoints = existing.Playerpoint + tempScore;

        
        const updated = await prisma.player.update({
            where: { Player_ID: userid },
            data: {
                Player_name: username,
                email,
                Playerpoint: totalPoints,
                
            },
            include: { milestone: true },
        });

        return updated;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const created = await prisma.player.create({
        data: {
            Player_ID: userid,
            Player_name: username,
            email,
            Playerpoint: 0,
            Level_Id: 1,
            Milestone_Id: 1,
            lastLogin: yesterday,
            streak: 0,
        },
        include: { milestone: true },
    });

    return created;
};

export default fetchUser;
