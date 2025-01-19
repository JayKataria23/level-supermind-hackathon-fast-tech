"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export interface TypingConfig {
  speed: number;
  deleteSpeed: number;
  pauseDuration: number;
  words: string[];
}

const TYPING_CONFIG: TypingConfig = {
  speed: 150,
  deleteSpeed: 100,
  pauseDuration: 1000,
  words: ["Right", "Better", "With Precision"],
};

export default function Header() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const updateText = () => {
      const currentWord = TYPING_CONFIG.words[wordIndex];

      if (!isDeleting && displayText === currentWord) {
        timeout = setTimeout(
          () => setIsDeleting(true),
          TYPING_CONFIG.pauseDuration
        );
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_CONFIG.words.length);
      } else {
        const nextText = isDeleting
          ? displayText.slice(0, -1)
          : currentWord.slice(0, displayText.length + 1);

        timeout = setTimeout(
          () => setDisplayText(nextText),
          isDeleting ? TYPING_CONFIG.deleteSpeed : TYPING_CONFIG.speed
        );
      }
    };

    updateText();

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section id="get-started" className="relative ">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="container relative mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-0">
          <div className="flex-0 lg:text-left space-y-8">
            <div className="inline-block bg-primary/5 text-primary font-bold py-2 px-6 rounded-full animate-pulse">
              AI Powered
            </div>
            <div className="flex justify-center w-full max-w-xl">
              <h1 className="text-4xl font-black tracking-tighter sm:text-6xl xl:text-7xl text-white">
                Data-Driven Ads,
                <br />
                <span className="inline-block">
                  Done{" "}
                  <span className="font-black relative">
                    <span className="opacity-0">Right</span>
                    <span
                      className="absolute left-0 border-r-2 border-primary text-primary "
                      style={{ width: "max-content" }}
                    >
                      {displayText}
                    </span>
                  </span>
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-xl">
              Your go-to Ad-creation analysis tool
            </p>
            <div className="w-full max-w-md">
              <Link href="/protected">
              <Button
                className="mt-4 w-full bg-primary hover:bg-primary/90 text-black"
                size="lg"
              >
                Analyze Now <ArrowRight className="ml-2" />
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
