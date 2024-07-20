"use client";

import { useForm } from "react-hook-form";

const NewGamePage = () => {
  const { register, handleSubmit } = useForm<{
    name: string;
    answer_url: string;
  }>();

  const onSubmit = handleSubmit(async (data) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        answer_url: data.answer_url,
      }),
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>名前</label>
        <input {...register("name")} />
      </div>
      <div>
        <label>正解画像 URL</label>
        <input type="url" {...register("answer_url")} />
      </div>
      <button>作成</button>
    </form>
  );
};

export default NewGamePage;
