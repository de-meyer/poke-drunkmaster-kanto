"use client";
import { type CardInfo } from "~/types/CardInfo";
import { useState } from "react";
import Image from "next/image";

enum GameStatus {
  Not_Started = "NOT_STARTED",
  Started = "STARTED",
  Ended = "ENDED",
}
export default function HomePage() {
  const [cardInfo, setCardInfo] = useState<CardInfo>();
  const [gameStatus, setGameStatus] = useState(GameStatus.Not_Started);

  const fetchData = async () => {
    const response = await fetch("/data.json");
    const json = (await response.json()) as CardInfo;
    setCardInfo(json);
    setGameStatus(GameStatus.Started);
    if (cardInfo && cardInfo != undefined) {
      console.log(cardInfo.fields);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 sm:py-8">
        <h1 className="py-4 text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Pokémon Drunkmaster Mobile
        </h1>
        <button onClick={fetchData}>Start</button>

        <div className="overflow-x-auto whitespace-nowrap">
          {gameStatus == GameStatus.Started && cardInfo && (
            <>
              {cardInfo.fields
                .filter((field) => field.type != "rules")
                .map((field) => (
                  <div key={field.id} className="my-2">
                    <div
                      className={`items-center justify-center rounded-lg border ${field.type == "trainer" ? "bg-[#fecb0d]" : field.type == "area" ? "bg-[#c4c4c4]" : "bg-white"} `}
                    >
                      <Image
                        className="inline-block w-full rounded-md"
                        src={field.path + field.imageName}
                        alt={field.description}
                        width={340}
                        height={100}
                      />
                      <div className="p-5">
                        <p className="mb-3 overflow-hidden text-wrap font-normal text-black">
                          {field.id + ". " + field.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
