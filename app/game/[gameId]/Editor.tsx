"use client";

import { css } from "@/styled-system/css";
import { highlight, languages } from "prismjs";
import { FC, PropsWithChildren, useState } from "react";
import ReactSimpleCodeEditor from "react-simple-code-editor";
import "prismjs/themes/prism.css";
import cssValidator from "w3c-css-validator";

const EditorArea: FC<
  PropsWithChildren<{
    lang: string;
    isValid: boolean;
  }>
> = ({ lang, children, isValid }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "full",
      })}
    >
      <div
        className={css({
          bg: "gray.200",
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        <p
          className={css({
            fontWeight: "bold",
          })}
        >
          {lang.toUpperCase()}
        </p>
        <p className={css({ fontSize: "sm" })}>
          {isValid ? "" : "🚨 コードが間違っています"}
        </p>
      </div>
      <div
        className={css({
          flexGrow: 1,
          width: "full",
          height: "full",
          maxHeight: "calc((100dvh - 120px) / 2)",
          overflowY: "scroll",
        })}
      >
        {children}
      </div>
    </div>
  );
};

const editorStyle = css({
  padding: 2,
  fontFamily: '"JetBrains Mono", "Fira code", "Fira Mono", monospace',
  fontSize: 16,
  minHeight: "full",
});

export const Editor: FC = () => {
  const [code, setCode] = useState({
    html: {
      isValid: true,
      code: "<!-- body の中身だけ書いてください -->",
    },
    css: {
      isValid: true,
      code: "// CSS",
    },
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
        <EditorArea lang="html" isValid={true}>
          <ReactSimpleCodeEditor
            value={code.html.code}
            onValueChange={(code) => {
              setCode((prev) => ({
                ...prev,
                html: {
                  ...prev.html,
                  code,
                },
              }));
            }}
            highlight={(code) => highlight(code, languages.html, "html")}
            padding={8}
            className={editorStyle}
            // onBlur={() => {
            //   const validator = new HtmlValidate();
            //   const result = validator.validateStringSync(code.html.code);

            //   setCode((prev) => ({
            //     ...prev,
            //     css: {
            //       ...prev.css,
            //       isValid: result.valid,
            //     },
            //   }));
            // }}
          />
        </EditorArea>
        <EditorArea lang="css" isValid={code.css.isValid}>
          <ReactSimpleCodeEditor
            value={code.css.code}
            onValueChange={(code) => {
              setCode((prev) => ({
                ...prev,
                css: {
                  ...prev.css,
                  code,
                },
              }));
            }}
            highlight={(code) => highlight(code, languages.css, "css")}
            padding={8}
            className={editorStyle}
            onBlur={() => {
              if (!code.css.code) {
                setCode((prev) => ({
                  ...prev,
                  css: {
                    ...prev.css,
                    code: "",
                    isValid: true,
                  },
                }));
                return;
              }

              (async () => {
                const errors = await cssValidator.validateText(code.css.code);
                setCode((prev) => ({
                  ...prev,
                  css: {
                    ...prev.css,
                    isValid: errors.valid,
                  },
                }));
              })();
            }}
          />
        </EditorArea>
      </div>
    </>
  );
};
