import { NextPage } from "next";
import { notFound } from "next/navigation";
import { GameDetails } from "./GameDetails";

export type Game = {
  id: number;
  name: string;
  started: boolean;
  finished: boolean;
  answer_url: string;
};

const GamePage: NextPage<{ params: { gameId: number } }> = async ({
  params: { gameId },
}) => {
  const gameData: Game = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/games/${gameId}`
  )
    .catch(() => {
      notFound();
    })
    .then((res) => {
      return res.json();
    });

  if (!gameData.started) {
    return (
      <>
        <h1>ゲームの開始までお待ちください</h1>
      </>
    );
  }

  if (gameData.finished) {
    return (
      <>
        <h1>すでに終了したゲームです</h1>
      </>
    );
  }

  return <GameDetails gameData={gameData} />;
};

export default GamePage;
