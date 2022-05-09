import { css } from "@emotion/react";
import type { FC } from "react";

export const Input: FC<React.HTMLProps<HTMLInputElement>> = (props) => {
  return <input css={style} {...props} />;
};

const style = css`
  outline: none;
  padding: 8px 12px;
  border-width: 0;
  border-bottom: 2px solid #2e282a;
  background-color: #f2eeec;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  will-change: border-color, box-shadow;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  width: 100%;
  box-sizing: border-box;

  :focus {
    border-color: #5dc0f6;
  }
`;
