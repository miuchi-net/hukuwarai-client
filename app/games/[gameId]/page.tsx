import { css } from "@/styled-system/css";
import { NextPage } from "next";
import { Editor } from "./Editor";
import { HtmlValidate } from "html-validate/browser";

const dummyGame = {
  title: "Figma",
  targetImageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1667px-Figma-logo.svg.png",
};

const GamePage: NextPage<{ params: { gameId: string } }> = async ({
  params,
}) => {
  return (
    <div>
      <div
        className={css({
          padding: 5,
          height: "120px",
        })}
      >
        <h1 className={css({ fontSize: 24, fontWeight: "bold" })}>
          {dummyGame.title}
        </h1>
        <p>Game ID: {params.gameId.toLowerCase()}</p>
      </div>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          height: "calc(100vh - 120px)",
          maxHeight: "calc(100vh - 120px)",
        })}
      >
        <Editor />
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
            src={dummyGame.targetImageUrl}
            alt={dummyGame.title}
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
