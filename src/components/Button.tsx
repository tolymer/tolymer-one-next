import { css } from "@emotion/react";
import Link from "next/link";
import type { FC } from "react";
import { ThreeDots } from "react-loading-icons";

const baseStyle = css`
  padding: 0.75em 16px;
  border: 2px solid transparent;
  border-radius: 100em;
  background-color: transparent;
  text-align: center;
  line-height: 1.1;
  font-weight: bold;
  font-size: 100%;
  transition: border-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
  will-change: border-color, box-shadow;
  box-sizing: content-box;

  :focus {
    outline: none;
  }
`;

const normalStyle = css`
  border: 2px solid #f2eeec;
  background-color: #f2eeec;
  color: #2e282a;

  :hover {
    border-color: #d3ccc9;
  }

  :focus {
    border-color: #d3ccc9;
    box-shadow: 0 0 0 3px #5dc0f6;
  }
`;

const primaryStyle = css`
  color: #2e282a;
  border: 2px solid #3de884;
  background-color: #3de884;

  :hover {
    border-color: #099f47;
  }

  :focus {
    border-color: #099f47;
    box-shadow: 0 0 0 3px #5dc0f6;
  }
`;

const modestStyle = css`
  border-radius: 0;
  padding: 0.5em 0;
  color: #099f47;
  border: 0;
  background-color: transparent;
  font-size: small;

  :hover {
    border: 0;
  }

  :focus {
    border-color: #099f47;
    box-shadow: 0 0 0 3px #5dc0f6;
  }
`;

const disableStyle = css`
  border: 2px solid #f2eeec;
  background-color: #f2eeec;
  color: #d6d1d1;
  pointer-events: none;
`;

const kinds = {
  normal: normalStyle,
  primary: primaryStyle,
  modest: modestStyle,
  disable: disableStyle,
} as const;

const sizes = {
  normal: css`
    min-width: 80px;
  `,
  large: css`
    min-width: 240px;
  `,
} as const;

const loadingIconStyle = css`
  vertical-align: bottom;
  line-height: 0.8;
`;

const LoadingIcon: FC = () => {
  return (
    <span css={loadingIconStyle}>
      <ThreeDots width="30" height="1em" fill="#2e282a" />
    </span>
  );
};

type ButtonProps = {
  kind?: keyof typeof kinds;
  size?: keyof typeof sizes;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
} & Omit<React.HTMLProps<HTMLButtonElement>, "type" | "size">;

export const Button: FC<ButtonProps> = ({
  type = "button",
  kind = "normal",
  size = "normal",
  loading,
  children,
  ...props
}) => {
  const styles = [baseStyle, kinds[kind], sizes[size]];
  if (loading) {
    props.disabled = true;
  }
  return (
    <button css={styles} type={type} {...props}>
      {loading ? <LoadingIcon /> : children}
    </button>
  );
};

type ButtonLinkProps = {
  href: string;
  as: string;
  kind?: keyof typeof kinds;
  size?: keyof typeof sizes;
} & Omit<React.HTMLProps<HTMLAnchorElement>, "href">;

export const LinkButton: FC<ButtonLinkProps> = ({ href, as, kind = "normal", children, ...props }) => {
  const styles = [baseStyle, kinds[kind]];
  return (
    <Link href={href} as={as}>
      <a css={styles} {...props}>
        {children}
      </a>
    </Link>
  );
};
