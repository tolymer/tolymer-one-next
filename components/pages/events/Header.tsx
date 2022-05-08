/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FC } from "react";

type Props = {
  title: string;
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
};

export const Header: FC<Props> = ({ title, leftButton, rightButton }) => {
  return (
    <header css={rootStyle}>
      <div css={innerStyle}>
        <h1 css={h1Style}>{title}</h1>
        {leftButton && <div css={leftButtonStyle}>{leftButton}</div>}
        {rightButton && <div css={rightButtonStyle}>{rightButton}</div>}
      </div>
    </header>
  );
};

const rootStyle = css`
  background-color: #f9bf3b;
`;

const innerStyle = css`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: 12px;
  max-width: 640px;
`;

const h1Style = css`
  text-align: center;
  font-size: 1rem;
  padding: 5px 0;
  margin: 0;
`;

const leftButtonStyle = css`
  position: absolute;
  left: 12px;
  top: 16px;
  font-size: 20px;

  a {
    color: black;
  }
`;

const rightButtonStyle = css`
  position: absolute;
  right: 12px;
  top: 16px;
  font-size: 20px;

  a {
    color: black;
  }
`;
