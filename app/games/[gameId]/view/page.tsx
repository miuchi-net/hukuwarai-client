import { css } from "@/styled-system/css";
import { NextPage } from "next";

const ViewGameDetailsPage: NextPage<{ params: { gameId: string } }> = async ({
  params: { gameId },
}) => {
  const scores: {
    id: number;
    player_id: number;
    score: number;
    rendered_url: string;
    code: string;
  }[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/scores/${gameId}/result`
  ).then((res) => res.json());

  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
      })}
    >
      {scores.map((score) => (
        <div key={score.id} className={css({ position: "relative" })}>
          <div
            className={css({
              aspectRatio: "1/1",
              border: "1px solid token(colors.gray.200)",
            })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={score.rendered_url} alt="" />
          </div>
          <p
            className={css({
              position: "absolute",
              m: 2,
              left: 0,
              bottom: 0,
            })}
          >
            {score.score}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ViewGameDetailsPage;
