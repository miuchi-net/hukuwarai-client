"use client";

import { css } from "@/styled-system/css";
import { highlight, languages } from "prismjs";
import { FC, useState } from "react";
import ReactSimpleCodeEditor from "react-simple-code-editor";
import "prismjs/themes/prism.css";
import cssValidator from "w3c-css-validator";
import { ValidateTextResultWithoutWarnings } from "w3c-css-validator/dist/types/result";

const CommonCodeEditor: FC<{
  lang: string;
  value: string;
  setValue: (value: string) => void;
}> = ({ lang, value, setValue }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "full",
      })}
    >
      <p className={css({ fontWeight: "bold", p: 1, bg: "gray.200" })}>
        {lang.toUpperCase()}
      </p>
      <div
        className={css({
          flexGrow: 1,
          width: "full",
          height: "full",
          maxHeight: "calc((100dvh - 120px) / 2)",
          overflowY: "scroll",
        })}
      >
        <ReactSimpleCodeEditor
          value={value}
          onValueChange={(code) => {
            setValue(code);
          }}
          highlight={(code) => highlight(code, languages[lang], lang)}
          padding={8}
          className={css({
            padding: 2,
            fontFamily: '"JetBrains Mono", "Fira code", "Fira Mono", monospace',
            fontSize: 16,
            minHeight: "full",
          })}
        />
      </div>
    </div>
  );
};

export const Editor: FC = () => {
  const [errors, setErrors] = useState<ValidateTextResultWithoutWarnings>();
  const [code, setCode] = useState({
    html: "<!-- body の中身だけ書いてください -->",
    css: "",
  });

  return (
    <>
      <div
        className={css({
          bg: "gray.100",
          display: "grid",
          gridTemplateRows: "repeat(2, 1fr)",
        })}
      >
        <CommonCodeEditor
          lang="html"
          value={code.html}
          setValue={(code) => {
            setCode((prev) => ({
              ...prev,
              html: code,
            }));
          }}
        />
        <CommonCodeEditor
          lang="css"
          value={code.css}
          setValue={(code) => {
            (async () => {
              if (code) {
                setErrors(await cssValidator.validateText(code));
              }
            })();

            setCode((prev) => ({
              ...prev,
              css: code,
            }));
          }}
        />
      </div>
    </>
  );
};
