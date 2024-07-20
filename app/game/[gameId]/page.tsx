import { css } from "@/styled-system/css";
import { NextPage } from "next";
import { Editor } from "./Editor";
import { notFound } from "next/navigation";

type Game = {
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
    `${process.env.API_ENDPOINT}/game/${gameId}`
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

  return (
    <div>
      <div
        className={css({
          padding: 5,
          height: "120px",
        })}
      >
        <h1 className={css({ fontSize: 24, fontWeight: "bold" })}>
          {gameData.name}
        </h1>
        <p>Game ID: {gameId}</p>
      </div>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          height: "calc(100vh - 120px)",
          maxHeight: "calc(100vh - 120px)",
        })}
      >
        <Editor gameId={gameId} />
        <div
          className={css({
            width: "full",
            height: "full",
            display: "grid",
            placeContent: "center",
            bg: "gray.50",
          })}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={gameData.answer_url}
            alt={gameData.name}
            className={css({
              width: "400px",
              aspectRatio: "1/1",
              objectFit: "contain",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
