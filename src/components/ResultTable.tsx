import { css } from "@emotion/react";
import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import type { GetEventQuery } from "~/lib/graphql/generated";

type Event = NonNullable<GetEventQuery["event"]>;

type Props = {
  event: Event;
};

function getTotalScores(event: Event): number[] {
  const scores: Record<number, number> = {};
  event.games.forEach((game) => {
    game.results.forEach((result) => {
      if (scores[result.participantId] === undefined) {
        scores[result.participantId] = 0;
      }
      scores[result.participantId] += result.score * 10;
    });
  });
  event.tip?.results.forEach((result) => {
    if (scores[result.participantId] === undefined) {
      scores[result.participantId] = 0;
    }
    scores[result.participantId] += result.score * 10;
  });

  return event.participants.map((p) => scores[p.id] / 10);
}

export const ResultTable: FC<Props> = ({ event }) => {
  const [rate, setRate] = useState<number | null>(null);
  const tip = event.tip;

  function multiplyRate() {
    const value = Number(prompt("?", "50"));
    if (value !== 0 && Number.isInteger(value)) {
      setRate(value);
    } else {
      alert("Please enter an integer greater than 0.");
      return false;
    }
  }

  return (
    <div css={rootStyle}>
      <table css={tableStyle}>
        <thead>
          <tr>
            <th></th>
            {event.participants.map((p) => (
              <th key={p.id}>{p.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {event.games.length === 0 && (
            <tr>
              <th css={gameNumberStyle}></th>
              {event.participants.map((p) => (
                <td key={p.id}></td>
              ))}
            </tr>
          )}
          {event.games.map((game, i) => (
            <tr key={game.id}>
              <th css={gameNumberStyle}>
                <Link href="/events/[token]/games/[id]" as={`/events/${event.token}/games/${game.id}`}>
                  <a>{i + 1}</a>
                </Link>
              </th>
              {event.participants.map((p) => {
                const score = game.results.filter((r) => r.participantId === p.id)[0].score;
                return <ScoreRow key={p.id} score={score} />;
              })}
            </tr>
          ))}
          {tip && (
            <tr>
              <th css={[gameNumberStyle, tipStyle]}>
                <Link href="/events/[token]/tip" as={`/events/${event.token}/tip`}>
                  <a>T</a>
                </Link>
              </th>
              {event.participants.map((p) => {
                const score = tip.results.filter((r) => r.participantId === p.id)[0].score;
                return <ScoreRow key={p.id} score={score} />;
              })}
            </tr>
          )}
          {event.games.length !== 0 && (
            <tr css={totalRowStyle}>
              <th>
                <button type="button" onClick={() => multiplyRate()} css={rateStyle} aria-label="Rate"></button>
              </th>
              {getTotalScores(event).map((score, i) => (
                <ScoreRow key={i} score={score} />
              ))}
            </tr>
          )}
          {rate && (
            <tr css={totalRowStyle}>
              <th></th>
              {getTotalScores(event).map((score, i) => (
                <ScoreRow key={i} score={Number((score * rate).toFixed())} />
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const ScoreRow: FC<{ score: number }> = ({ score }) => {
  const style = score > 0 ? plusStyle : score < 0 ? minusStyle : null;
  return <td css={style}>{score}</td>;
};

const rootStyle = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
`;

const tableStyle = css`
  border-collapse: collapse;
  width: 100%;

  thead {
    border-bottom: 1px solid #999;
  }

  td,
  th {
    padding: 15px 0;
  }

  td {
    text-align: center;
    width: 60px;
  }

  tbody td,
  tbody th {
    border-top: 1px solid #999;
    font-size: 18px;
  }
`;

const plusStyle = css`
  color: #006700;
`;

const minusStyle = css`
  color: #c72222;
`;

const totalRowStyle = css`
  td,
  th {
    border-top: 1px solid #999;
    font-size: 18px;
    font-weight: bold;
    background-color: #efefef;
  }
`;

const gameNumberStyle = css`
  width: 20px;
  padding-left: 5px;
  padding-right: 0;

  > a {
    display: inline-block;
    background-color: #4e7ba2;
    color: #fff;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    text-align: center;
    text-decoration: none;
  }
`;

const tipStyle = css`
  a {
    background-color: #e67b3a;
  }
`;

const rateStyle = css`
  display: block;
  width: 100%;
  height: 26px;
  background-color: transparent;
  border: 0;
  appearance: none;
  -webkit-tap-highlight-color: none;
`;
