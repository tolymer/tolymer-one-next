/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FC } from "react";
import { GetEventQuery } from "../../../lib/graphql/generated";

type Event = GetEventQuery["event"];

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
      scores[result.participantId] += result.score;
    });
  });

  return event.participants.map((p) => scores[p.id]);
}

export const ResultTable: FC<Props> = ({ event }) => {
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
          {event.games.map((game, i) => (
            <tr key={1}>
              <th css={gameNumberStyle}>
                <a href="#TODO">{i + 1}</a>
              </th>
              {event.participants.map((p) => {
                const score = game.results.filter(
                  (r) => r.participantId === p.id
                )[0].score;
                return <ScoreRow key={p.id} score={score} />;
              })}
            </tr>
          ))}
          <tr css={totalRowStyle}>
            <th></th>
            {getTotalScores(event).map((score, i) => (
              <ScoreRow key={i} score={score} />
            ))}
          </tr>
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
  background-color: #e67b3a;
`;
