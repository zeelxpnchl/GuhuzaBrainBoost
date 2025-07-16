"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

function WhyplaySection() {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const content = [
        {
            image: "/WhyGraphics/LightBulb.svg",
            title: t("whyplay.job_search_title"),
            description: t("whyplay.job_search_desc"),
        },
        {
            image: "/WhyGraphics/Trophy.svg",
            title: t("whyplay.features_title"),
            description: t("whyplay.features_desc"),
        },
        {
            image: "/WhyGraphics/Aproved.svg",
            title: t("whyplay.trusted_title"),
            description: t("whyplay.trusted_desc"),
        },
    ];

    return (
        <section className="bg-gray-50 dark:bg-black mt-20 py-16 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <h2 className="text-center px-4 py-1 bg-blue-400 dark:bg-blue-600 text-4xl w-fit m-auto rounded font-bold text-gray-900 dark:text-white mb-10 intersect:motion-preset-slide-up motion-delay-200 intersect-once">
                    {t("whyplay.heading")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.map((reason, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center text-center p-6 rounded-lg transition-colors duration-300 intersect:motion-preset-slide-up-lg motion-delay-${index * 100
                                } intersect-once bg-white dark:bg-neutral-900`}
                        >
                            <Image
                                src={reason.image}
                                alt={reason.title + " image"}
                                width={80}
                                height={80}
                                className="mb-4"
                            />
                            <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                {reason.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-justify">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyplaySection;
