"use client";

import { css } from "@/styled-system/css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NewGamePage = () => {
  const { register, handleSubmit } = useForm<{
    name: string;
    answer_url: string;
  }>();

  const onSubmit = handleSubmit(async (data) => {
    const game = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/games`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        answer_url: data.answer_url,
      }),
    }).then((res) => res.json());

    if (game) {
      toast.success(`新規ゲーム ${game.name}(id: ${game.id}) を作成しました`);
    } else {
      toast.error("新規ゲームの作成に失敗しました");
    }
  });

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
        新規ゲーム作成
      </h1>
      <div
        className={css({
          display: "grid",
        })}
      >
        <label>名前</label>
        <input
          {...register("name")}
          className={css({
            bg: "white",
            border: "1px solid token(colors.gray.200)",
            rounded: "md",
            p: 1,
          })}
        />
      </div>
      <div
        className={css({
          display: "grid",
        })}
      >
        <label>正解画像 URL</label>
        <input
          type="url"
          {...register("answer_url")}
          className={css({
            bg: "white",
            border: "1px solid token(colors.gray.200)",
            rounded: "md",
            p: 1,
          })}
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
        作成
      </button>
    </form>
  );
};

export default NewGamePage;
