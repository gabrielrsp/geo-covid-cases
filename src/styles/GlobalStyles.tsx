import { css, Global } from "@emotion/react";

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        :root {
          --background: #fff;
          --red: #ff5455;
          --green: #5cd65c;
          --blue-dark: #343148;
          --light-gray:RGBA(179,200,203,0.26);
          --text-title: #363f5f;
          --text-body: #b3c8cb;
          --gray: #d9d9d9
          --background: #fff;
          --shape: #ffffff;
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

        /* h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        strong {
          color: #FFF;
          font-weight: 700;
        } */

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
