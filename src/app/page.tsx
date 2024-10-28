"use client";
import { type CardInfo } from "~/types/CardInfo";
import { useState } from "react";
import Image from "next/image";
import RulesModal from "./components/RulesModal";

enum GameStatus {
  Not_Started = "NOT_STARTED",
  Started = "STARTED",
  Ended = "ENDED",
}
export default function HomePage() {
  const [cardInfo, setCardInfo] = useState<CardInfo>();
  const [gameStatus, setGameStatus] = useState(GameStatus.Not_Started);
  const [modal, setModal] = useState(false);
  const fetchData = async () => {
    const response = await fetch("/data.json");
    const json = (await response.json()) as CardInfo;
    setCardInfo(json);
    setGameStatus(GameStatus.Started);

    if (cardInfo && cardInfo != undefined) {
      console.log(cardInfo.fields);
    }
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 sm:py-8">
        <h1 className="py-4 text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Pokémon Drunkmaster Mobile
        </h1>
        {gameStatus != GameStatus.Started && (
          <>
            <button
              className="rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              onClick={fetchData}
            >
              Start
            </button>
            <Image
              style={{ imageRendering: "pixelated" }}
              className="inline-block w-full rounded-md"
              src="/images/73_rules.jpg"
              alt="rules"
              width={340}
              height={100}
            />
          </>
        )}

        {gameStatus == GameStatus.Started && cardInfo && (
          <>
            <div className="whitespace-nowrap">
              {cardInfo.fields
                .filter((field) => field.type != "rules")
                .map((field) => (
                  <div key={field.id} className="my-2">
                    <div
                      className={`items-center justify-center rounded-lg border ${field.type == "trainer" ? "bg-[#fecb0d]" : field.type == "area" ? "bg-[#c4c4c4]" : "bg-white"} `}
                    >
                      <Image
                        style={{ imageRendering: "pixelated" }}
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
              <button
                className="sticky bottom-4 mb-2 self-start rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={toggleModal}
              >
                Rules
              </button>
            </div>
          </>
        )}
      </div>
      {modal && <RulesModal onToggleModal={toggleModal} />}
    </main>
  );
}
