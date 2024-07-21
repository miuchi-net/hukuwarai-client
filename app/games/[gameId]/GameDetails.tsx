"use client";

import { FC } from "react";
import { Game } from "./page";
import { css } from "@/styled-system/css";
import { Editor } from "./Editor";
import { useAtom } from "jotai";
import { playerAtom } from "./playerAtom";
import { useForm } from "react-hook-form";

export const GameDetails: FC<{ gameData: Game }> = ({ gameData }) => {
  const [player, setPlayer] = useAtom(playerAtom);
  const { register, handleSubmit } = useForm<{ name: string }>();

  const onSubmit = handleSubmit(async (data) => {
    const createdPlayer = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/players/${gameData.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name === "" ? "anonymous" : data.name,
        }),
      }
    ).then((res) => res.json());

    setPlayer(createdPlayer);
  });

  if (player === null) {
    return (
      <form
        onSubmit={onSubmit}
        className={css({
          maxWidth: "400px",
          mx: "auto",
          border: "1px solid token(colors.gray.200)",
          bg: "gray.50",
          rounded: "xl",
          p: 5,
          my: 5,
          display: "grid",
          gap: 4,
        })}
      >
        <h1
          className={css({
            fontSize: "lg",
            fontWeight: "bold",
            textAlign: "center",
          })}
        >
          {gameData.name} へ参加しますか？
        </h1>
        <div className={css({ display: "grid", gap: 1 })}>
          <label className={css({ fontWeight: "bold" })}>名前</label>
          <input
            className={css({
              bg: "white",
              border: "1px solid token(colors.gray.200)",
              rounded: "md",
              p: 1,
            })}
            placeholder="anonymous"
            {...register("name")}
          />
        </div>
        <button
          className={css({
            bg: "orange.500",
            display: "inline-flex",
            textAlign: "center",
            justifySelf: "center",
            width: "full",
            px: 3,
            py: 1,
            rounded: "md",
            justifyContent: "center",
            fontWeight: "bold",
            color: "white",
          })}
        >
          参加
        </button>
      </form>
    );
  }

  return (
    <div>
      <div
        className={css({
          padding: 5,
          height: "120px",
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <div>
          <h1 className={css({ fontSize: 24, fontWeight: "bold" })}>
            {gameData.name}
          </h1>
          <p>Game ID: {gameData.id}</p>
        </div>
        <div className={css({ display: "flex", gap: 3, alignItems: "center" })}>
          <button
            onClick={() => {
              setPlayer(null);
            }}
            className={css({ fontSize: "sm" })}
          >
            ログアウト
          </button>
          <p className={css({ px: 2, py: 1, bg: "gray.100", rounded: "full" })}>
            👤 {player.name}
          </p>
        </div>
      </div>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          height: "calc(100vh - 120px)",
          maxHeight: "calc(100vh - 120px)",
        })}
      >
        <Editor gameId={gameData.id} />
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
