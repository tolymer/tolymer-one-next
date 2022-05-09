import { css } from "@emotion/react";
import type { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const Main: FC<Props> = ({ children }) => {
  return <main css={rootStyle}>{children}</main>;
};

const rootStyle = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
`;
