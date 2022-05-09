import { css } from "@emotion/react";
import { FC, useCallback, useMemo, useState } from "react";
import { GetEventQuery } from "../../../lib/graphql/generated";
import { Button } from "../../Button";

/**
 * スコア入力のテキストボックスの状態を表す型
 */
type ScoreInput =
  | { state: "filled"; value: string } // 人が入力した。valueは `-` のみの場合もあるので string
  | { state: "calculated"; value: number } // 自動計算された
  | null; // 未入力

/**
 * ScoreInputを数値のスコアにして返す
 */
function scoreInputToValue(input: ScoreInput): number {
  if (input === null) return 0;
  if (input.state === "calculated") return input.value;
  return parseFloat(input.value);
}

/**
 * フォーム入力時の値と対象のインデックスを受け取って next state を返す
 */
function calcNextScoreInputs(inputs: ScoreInput[], value: string, index: number): ScoreInput[] {
  const nextScoreInputs: ScoreInput[] = inputs.map((input, i) => {
    // 計算済みのフィールドはnullに戻しておかないとfilledの数が3->2になった場合に残ってしまう
    if (input?.state === "calculated") return null;
    if (i !== index) return input;

    if (value === "") {
      return null;
    } else {
      return { state: "filled", value };
    }
  });

  const filledInputs = nextScoreInputs.filter((input) => input?.state === "filled");
  if (filledInputs.length !== 3) return nextScoreInputs;
  const topScore = -filledInputs.map(scoreInputToValue).reduce((acc, v) => acc + v);
  if (Number.isNaN(topScore)) return nextScoreInputs;

  return nextScoreInputs.map((input) => {
    if (input === null) {
      return { state: "calculated", value: topScore };
    } else {
      return input;
    }
  });
}

/**
 * フォームが送信可能な状態の場合にtrueを返す
 */
function validateScoreInputs(scores: ScoreInput[]): boolean {
  if (scores.filter((s) => s?.state === "filled").length !== 3) return false;
  if (scores.filter((s) => s?.state === "calculated").length !== 1) return false;
  return true;
}

/**
 * スコアの配列をScoreInputの配列にして返す
 */
function scoresToInputs(scores: Array<number | null>): ScoreInput[] {
  const filledScores = scores.filter((s) => s !== null) as number[];
  // 全部埋められている場合はトップをcalculatedとみなす
  if (filledScores.length === 4) {
    const topIndex = filledScores.indexOf(Math.max(...filledScores));
    return filledScores.map((score, i) => {
      if (i === topIndex) {
        return { state: "calculated", value: score };
      } else {
        return { state: "filled", value: score.toString() };
      }
    });
  } else {
    return scores.map((score) => {
      if (score === null) {
        return null;
      } else {
        return { state: "filled", value: score.toString() };
      }
    });
  }
}

type Props = {
  event: GetEventQuery["event"];
  initialScores: Array<number | null>;
  onSubmit: (scores: number[]) => void;
};

export const ScoreInputForm: FC<Props> = ({ event, initialScores, onSubmit }) => {
  const [scoreInputs, setScoreInputs] = useState<ScoreInput[]>(() => scoresToInputs(initialScores));

  const isValidScores = useMemo(() => validateScoreInputs(scoreInputs), [scoreInputs]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      setScoreInputs(calcNextScoreInputs(scoreInputs, e.target.value, index));
    },
    [scoreInputs]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateScoreInputs(scoreInputs)) return;
      const scores = scoreInputs.map(scoreInputToValue);
      onSubmit(scores);
    },
    [scoreInputs]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table css={formTableStyle}>
          <tbody>
            {event.participants.map((p, i) => (
              <tr key={p.id}>
                <th>{p.name}</th>
                <td>
                  <input
                    type="text"
                    value={scoreInputs[i]?.value ?? ""}
                    onChange={(e) => handleInput(e, i)}
                    css={inputStyle(scoreInputToValue(scoreInputs[i]))}
                    disabled={scoreInputs[i]?.state === "calculated"}
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
