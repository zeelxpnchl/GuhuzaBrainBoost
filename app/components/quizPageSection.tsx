"use client";

import React, { useState } from "react";
import QuizCard from "./quizCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLang } from "../context/langContext";

type QuizeType = {
    question: string;
    comment: string;
    test_answer: number;
    answers: string[];
};

interface Props {
    Quizes: QuizeType[];
    levelNumber: string;
    levelTitle: string;
    player: any;
}

export default function QuizPageSection({
    Quizes,
    levelNumber,
    levelTitle,
    player,
}: Props) {
    const { lang } = useLang();
    const t = (en: string, fr: string) => (lang === "fr" ? fr : en);

    const len = Quizes.length;
    const router = useRouter();

    // Quiz state
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [ansCorrect, setAnsCorrect] = useState(false);
    const [usedHint, setUsedHint] = useState(false);

    // **NEW**: count retries across the whole quiz
    const [retryCount, setRetryCount] = useState(0);

    const quizer = Quizes[questionNumber];

    const resetQuestionState = () => {
        setSelectedAnswer(-1);
        setAnswerChecked(false);
        setAnsCorrect(false);
        setUsedHint(false);
        // **DO NOT** reset retryCount here
    };

    const handleScore = () => {
        setAnswerChecked(true);
        if (selectedAnswer === quizer.test_answer) {
            // award 30 pts first try, 10 after retry
            setScore((prev) => prev + (retryCount > 0 ? 10 : 30));
        }
    };

    const handleNextQuestion = () => {
        if (questionNumber < len - 1) {
            setQuestionNumber((n) => n + 1);
            resetQuestionState();
        }
    };

    // **NEW**: allow exactly one retry for the entire quiz
    const handleRetry = () => {
        if (retryCount < 1) {
            setAnswerChecked(false);
            setRetryCount((c) => c + 1);
        }
    };

    const handleSaveScore = async () => {
        const playerId = player?.Player_ID;
        const currentLevel = parseInt(levelNumber, 10);
        const unlocks =
            player?.Level_Id === currentLevel && score === len
                ? currentLevel + 1
                : player?.Level_Id;

        if (!playerId) return;

        const res = await fetch("/api/updateScore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playerId, score, newlevel: unlocks }),
        });

        if (res.ok) {
            const data = await res.json();
            router.push(`/quiz/${data.player.Level_Id}`);
        } else {
            console.error("Failed to save score:", await res.text());
        }
    };

    // **Render questions**
    if (questionNumber < len) {
        return (
            <div className="md:py-16 pt-8 pb-28">
                <div className="container flex justify-between flex-wrap">
                    <h2 className="title mb-4 md:mb-16">
                        {t("Level", "Niveau")} {levelNumber}: {levelTitle}
                    </h2>
                    <p>
                        {t("Question", "Question")}: {questionNumber + 1}/{len}
                    </p>
                </div>

                <div className="container">
                    <div className="flex justify-start md:gap-20">
                        <div className="flex-1">
                            <QuizCard
                                Question={quizer.question}
                                CorrectAns={quizer.test_answer}
                                Answers={quizer.answers}
                                selectedAnswer={selectedAnswer}
                                setSelectedAnswer={setSelectedAnswer}
                                checked={answerChecked}
                                setAnsCorrect={setAnsCorrect}
                            />

                            <div className="mt-10">
                                {answerChecked ? (
                                    !ansCorrect ? (
                                        <div>
                                            <div className="flex gap-10">
                                                {/* Only show Retry if they haven't retried yet */}
                                                {retryCount < 1 && (
                                                    <button className="quizPbtn" onClick={handleRetry}>
                                                        {t("Retry", "Recommencer")}
                                                    </button>
                                                )}
                                                <button
                                                    className="quizSbtn"
                                                    onClick={() => {
                                                        setSelectedAnswer(quizer.test_answer);
                                                        setUsedHint(true);
                                                    }}
                                                    disabled={usedHint}
                                                >
                                                    {t("Display Answer", "Afficher la réponse")}
                                                </button>
                                            </div>
                                            <p className="mt-6 text-sm absolute">
                                                {t(
                                                    "Use 'Display Answer' to move on without points.",
                                                    "Utilisez 'Afficher la réponse' pour passer sans points"
                                                )}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex">
                                            <button
                                                className="quizPbtn ml-auto"
                                                onClick={handleNextQuestion}
                                            >
                                                {questionNumber < len - 1
                                                    ? t("Next Question", "Question suivante")
                                                    : t("Finish Quiz", "Terminer le quiz")}
                                            </button>
                                        </div>
                                    )
                                ) : (
                                    <button
                                        className="quizPbtn"
                                        onClick={handleScore}
                                        disabled={selectedAnswer === -1}
                                    >
                                        {t("Check Answer", "Vérifier la réponse")}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="hidden md:block flex-1/2 w-100">
                            <Image
                                src={
                                    answerChecked
                                        ? ansCorrect
                                            ? "/mascot/greetingMascot.svg"
                                            : "/mascot/sadMascot.svg"
                                        : "/mascot/proudMascot.svg"
                                }
                                alt="Mascot"
                                height={100}
                                width={200}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // **Render summary + Save Score**
    return (
        <div className="md:py-16 py-8">
            <div className="container flex flex-col items-center">
                <h1 className="title text-center">
                    {t("Lesson Complete!", "Leçon terminée !")}
                </h1>

                <div className="flex flex-wrap-reverse justify-center gap-8 items-center mt-6">
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded px-6 py-4 flex flex-col items-center">
                        <p className="mt-4 text-xl">{t("PTS GAINED", "POINTS GAGNÉS")}</p>
                        <h1 className="text-6xl font-bold">{score}</h1>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-100 rounded px-6 py-4 flex flex-col items-center">
                        <p className="mt-4 text-xl">{t("TOTAL SCORE", "SCORE TOTAL")}</p>
                        <h1 className="text-6xl font-bold">
                            {player?.Playerpoint ?? 0} + {score} ={" "}
                            {player?.Playerpoint! + score}
                        </h1>
                    </div>
                    <Image
                        src="/mascot/proudMascot.svg"
                        width={250}
                        height={30}
                        alt="Mascot"
                        className="mt-8"
                    />
                </div>

                <button className="quizPbtn mt-20" onClick={handleSaveScore}>
                    {t("Save Score", "Enregistrer le score")}
                </button>

                <div className="flex flex-wrap justify-center gap-6 mt-8">
                    <button
                        onClick={() => router.push(`/quiz/${levelNumber}`)}
                        className="flex gap-4"
                    >
                        🔁 {t("Retry Same Lesson", "Recommencer la même leçon")}
                    </button>
                    <button onClick={() => console.log("share")} className="flex gap-4">
                        📤 {t("Share Score", "Partager le score")}
                    </button>
                </div>
            </div>
        </div>
    );
}
