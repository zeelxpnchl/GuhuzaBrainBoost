// app/api/updateScore/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    console.log("🔥 [updateScore] called at:", new Date().toISOString());

    let body;
    try {
        body = await req.json();
        console.log("🟢 Incoming Request Body:", body);
    } catch (error) {
        console.error("❌ Failed to parse JSON body");
        return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    try {
        const { playerId, score = 0, newlevel } = body;

        // Validate input
        if (!playerId || typeof score !== "number") {
            console.warn("⚠️ Invalid input", { playerId, score, newlevel });
            return NextResponse.json(
                { message: "Invalid input", details: { score, newlevel, playerId } },
                { status: 400 }
            );
        }

        // Fetch player
        const existingPlayer = await prisma.player.findUnique({
            where: { Player_ID: playerId },
        });

        if (!existingPlayer) {
            console.error("❌ Player not found:", playerId);
            return NextResponse.json({ message: "Player not found" }, { status: 404 });
        }

        const updateData: any = {
            // Always increment points
            Playerpoint: { increment: score },
        };

        // —— STREAK LOGIC: only bump once per day AND only if they scored > 0 —— //
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const last = new Date(existingPlayer.lastLogin);
        last.setHours(0, 0, 0, 0);

        // only bump streak when user actually scored something and hasn't played today
        if (score > 0 && last < today) {
            const dayDiff = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
            let newStreak = existingPlayer.streak;

            if (dayDiff === 1) {
                newStreak += 1; // consecutive day
            } else {
                newStreak = 1; // missed one or more days
            }

            updateData.streak = newStreak;
            updateData.lastLogin = today;
        }

        // —— LEVEL UNLOCK logic —— //
        if (newlevel && newlevel === existingPlayer.Level_Id + 1) {
            updateData.Level_Id = newlevel;
        }

        console.log("🛠 Performing update:", updateData);

        const updatedPlayer = await prisma.player.update({
            where: { Player_ID: playerId },
            data: updateData,
            include: { milestone: true },
        });

        console.log("✅ Update successful:", updatedPlayer);

        return NextResponse.json(
            {
                message: "Score (and streak if applicable) updated successfully.",
                player: updatedPlayer,
                levelAfterUpdate: updatedPlayer.Level_Id,
                pointsAfterUpdate: updatedPlayer.Playerpoint,
                streakAfterUpdate: updatedPlayer.streak,
            },
            { status: 201 }
        );
    } catch (e) {
        console.error("🔥 UpdateScore Error:", e);
        return NextResponse.json(
            { message: "Internal server error", error: String(e) },
            { status: 500 }
        );
    }
}
