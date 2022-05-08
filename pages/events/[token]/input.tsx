/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useCallback, useMemo, useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import { graphqlClient } from "../../../lib/graphql/client";
import { GetEventQuery } from "../../../lib/graphql/generated";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header } from "../../../components/pages/events/Header";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "../../../components/Button";

type Props = {
  event: GetEventQuery["event"];
};

type ScoreInputState =
  | { state: "inputted"; value: string }
  | { state: "calculated"; value: number }
  | null;

function scoreInputToValue(input: ScoreInputState): number {
  if (input === null) return 0;
  if (input.state === "calculated") return input.value;
  return parseFloat(input.value);
}

function fillTop(scores: ScoreInputState[]): void {
  scores.forEach((s, i) => {
    if (s?.state === "calculated") {
      scores[i] = null;
    }
  });
  const inputtedScores = scores.filter((s) => s?.state === "inputted");
  if (inputtedScores.length !== 3) return;
  const topScore = -inputtedScores
    .map(scoreInputToValue)
    .reduce((acc, v) => acc + v);
  if (Number.isNaN(topScore)) return;
  scores.forEach((s, i) => {
    if (s === null) {
      scores[i] = { state: "calculated", value: topScore };
    }
  });
}

function validateScores(scores: ScoreInputState[]): boolean {
  if (scores.filter((s) => s?.state === "inputted").length !== 3) return false;
  if (scores.filter((s) => s?.state === "calculated").length !== 1)
    return false;
  return true;
}

const InputGameResultPage: NextPage<Props> = ({ event }) => {
  const initialScores: ScoreInputState[] = [null, null, null, null];
  const [scores, setScores] = useState(initialScores);
  const router = useRouter();

  const isValidScores = useMemo(() => validateScores(scores), [scores]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
      const s = scores.slice();
      const v = e.target.value;
      if (v === "") {
        s[i] = null;
      } else {
        s[i] = { state: "inputted", value: v };
      }
      fillTop(s);
      setScores(s);
    },
    [scores]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateScores(scores)) return;
      const resultScores = scores.map(scoreInputToValue);

      await graphqlClient.createGame({
        eventToken: event.token,
        results: event.participants.map((p, i) => {
          return { participantId: p.id, score: resultScores[i] };
        }),
      });
      router.push(`/events/${event.token}`);
    },
    [router, scores]
  );

  return (
    <div css={rootStyle}>
      <Header
        title="スコア入力"
        leftButton={
          <Link href="/events/[token]" as={`/events/${event.token}`}>
            <a>
              <IoMdArrowRoundBack />
            </a>
          </Link>
        }
      ></Header>
      <form onSubmit={handleSubmit}>
        <table css={formTableStyle}>
          <tbody>
            {event.participants.map((p, i) => (
              <tr key={p.id}>
                <th>{p.name}</th>
                <td>
                  <input
                    type="text"
                    value={scores[i]?.value ?? ""}
                    onChange={(e) => handleInput(e, i)}
                    css={inputStyle(scoreInputToValue(scores[i]))}
                    disabled={scores[i]?.state === "calculated"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div css={buttonsStyle}>
          <Button
            type="submit"
            disabled={!isValidScores}
            kind={isValidScores ? "primary" : "disable"}
            onClick={handleSubmit}
          >
            決定
          </Button>
        </div>
      </form>
    </div>
  );
};

const rootStyle = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
`;

const formTableStyle = css`
  margin: 0 auto;
  font-size: 20px;
  border-collapse: collapse;

  th {
    padding: 30px 10px 0 10px;
    font-weight: normal;
    text-align: right;
  }

  td {
    padding: 30px 10px 0 10px;
  }
`;

const inputStyle = (score: number) => css`
  border: none;
  border-bottom: 1px solid #999;
  width: 80px;
  font-size: 24px;
  outline: none;
  text-align: center;
  padding: 3px 10px;
  border-radius: 0;
  -webkit-appearance: none;
  color: #333;
  background-color: transparent;

  ${score > 0 && "color: #006700;"}
  ${score < 0 && "color: #c72222;"}

  [disabled] {
    color: #2b9018;
    -webkit-text-fill-color: #2b9018;
    font-weight: bold;
    opacity: 1;
  }
`;

const buttonsStyle = css`
  margin-top: 60px;
  text-align: center;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const token = query.token as string;
  const eventQuery = await graphqlClient.getEvent({ token });

  return {
    props: {
      event: eventQuery.event,
    },
  };
};

export default InputGameResultPage;
