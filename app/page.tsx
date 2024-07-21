"use client";

import { css } from "@/styled-system/css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit } = useForm<{ id: number }>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    router.push(`/games/${data.id}`);
  });

  return (
    <div
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
      <div>
        <p className={css({ textAlign: "center" })}>
          HTML & CSS の目レンダリング力を鍛える
        </p>
        <h1
          className={css({
            fontSize: "lg",
            fontWeight: "bold",
            textAlign: "center",
          })}
        >
          HTML 福笑い
        </h1>
      </div>
      <form onSubmit={onSubmit} className={css({ display: "grid", gap: 4 })}>
        <div className={css({ display: "grid" })}>
          <label>ゲーム ID</label>
          <input
            {...register("id")}
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
          参加
        </button>
      </form>
    </div>
  );
}
