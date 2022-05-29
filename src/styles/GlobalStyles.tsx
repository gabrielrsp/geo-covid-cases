import { css, Global } from "@emotion/react";

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        :root {
          --background: #fff;
          --red: #ff5455;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          height: 100%;
        }

        body {
          background: var(--background);
          -webkit-font-smoothing: antialiased;
        }

        body,
        input,
        textarea,
        button {
          font-family: "Open Sans", sans-serif;
          font-weight: 400;
          color: #343148;
          margin: 3px;
        }

        button {
          cursor: pointer;
        }

        [disabled] {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}
    />
  );
}
