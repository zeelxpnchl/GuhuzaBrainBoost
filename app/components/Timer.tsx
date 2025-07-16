"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface TimerProps {
    initialSeconds: number;
    onExpire: () => void;
}

export default function Timer({ initialSeconds, onExpire }: TimerProps) {
    const { t, i18n } = useTranslation();
    const [seconds, setSeconds] = useState(initialSeconds);
    const [hydrated, setHydrated] = useState(false);

    // ✅ Prevent hydration mismatch
    useEffect(() => {
        setHydrated(true);
    }, []);

    // Reset when initialSeconds changes
    useEffect(() => {
        setSeconds(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        if (seconds <= 0) {
            onExpire();
            return;
        }
        const id = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [seconds, onExpire]);

    const minutes = Math.floor(seconds / 60);
    const rem = seconds % 60;

    if (!hydrated) return null; // ✅ Prevent render until after hydration

    return (
        <div className="text-lg font-medium mb-4">
            {t("quiz.time_left")}: {minutes}:{rem.toString().padStart(2, "0")}
        </div>
    );
}
