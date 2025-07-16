"use client";

import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import fetchUser, { PlayerWithMilestone } from "@/utils/fUser";

// Extend the context type to include AssignPlayerData
type PlayerContextType = {
    player: PlayerWithMilestone | null;
    setPlayer: React.Dispatch<React.SetStateAction<PlayerWithMilestone | null>>;
    tempScore: number;
    setTempScore: (v: number) => void;
    AssignPlayerData: (player: PlayerWithMilestone) => void; // ✅ added
};

export const playerContext = createContext<PlayerContextType | null>(null);

export function PlayerContextProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [player, setPlayer] = useState<PlayerWithMilestone | null>(null);
    const [tempScore, setTempScore] = useState(0);

    // Fetch player data if session exists
    useEffect(() => {
        if (session?.user?.memberId) {
            const { memberId, name, email } = session.user as any;
            fetchUser(memberId, name, email)
                .then((u) => setPlayer(u))
                .catch(console.error);
        } else {
            setPlayer(null);
        }
    }, [session]);

    // Store in localStorage
    useEffect(() => {
        if (player) {
            localStorage.setItem("player", JSON.stringify(player));
        }
    }, [player]);

    // ✅ Provide the AssignPlayerData method
    const AssignPlayerData = (playerData: PlayerWithMilestone) => {
        setPlayer(playerData);
    };

    const value: PlayerContextType = {
        player,
        setPlayer,
        tempScore,
        setTempScore,
        AssignPlayerData, // ✅ added here
    };

    return (
        <playerContext.Provider value={value}>
            {children}
        </playerContext.Provider>
    );
}
