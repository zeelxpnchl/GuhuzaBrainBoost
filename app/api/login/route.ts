﻿import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { useContext } from "react";
import PlayerContextProvider from "@/app/context/playerContext";

export async function POST(req: Request) {
    try {
        
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                Username: username,
            },
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.Password);

        if (!passwordMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }


        const player = await prisma.player.findFirst({
            where: {
                user_Id: user.User_Id,
            },
            include: {
                milestone: true

            }
        });

        if (!player) {
            return NextResponse.json({ message: "Player data not found for this user" }, { status: 404 });
        }
        if (player) { 
            const cookieStore =  cookies()
            cookieStore.set('LoggedIn', 'true', { secure: true , httpOnly:true,sameSite:"strict", path:"/", })
            cookieStore.set('PlayerLevel', String(player.Level_Id), { secure: true , httpOnly:true,sameSite:"strict", path:"/", })

        }
        return NextResponse.json({ message: "Login successful", player: player }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "An error occurred during login" + error }, { status: 500 });
    }
}