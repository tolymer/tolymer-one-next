import { css } from "@emotion/react";
import dayjs from "dayjs";
import type { FC } from "react";
import { useState, useCallback } from "react";
import { Button } from "./Button";
import { Input } from "~/components/Input";
import { useEventForm } from "~/lib/hooks/useEventForm";
import type { EventFormValue } from "~/lib/hooks/useEventForm";
import { storeParticipants, usePreviousParticipants } from "~/lib/hooks/usePreviousParitipants";
import { wait } from "~/lib/wait";

type Props = {
  onSubmit: (value: EventFormValue) => Promise<void>;
};

export type { EventFormValue };

const placeholderNames = ["ほかむら", "たに", "せんすい", "たなか"];

const initialState = {
  participants: [...Array(4)].map(() => ({ name: "" })),
  eventDate: dayjs().format("YYYY-MM-DD"),
};

export const NewEventForm: FC<Props> = ({ onSubmit }) => {
  const [state, dispatch] = useEventForm(initialState);
  const [isLoading, setLoading] = useState(false);
  const previousParticipants = usePreviousParticipants();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      storeParticipants(state.participants.map((p) => p.name));
      setLoading(true);
      onSubmit(state)
        .then(() => wait(3000)) // ページ遷移前にloadingが終わるので遅らせる
        .finally(() => {
          setLoading(false);
        });
    },
    [state, onSubmit]
  );

  return (
    <form css={rootStyle} onSubmit={handleSubmit}>
      <section css={sectionStyle}>
        <header css={participantsHeaderStyle}>
          <h2 css={titleStyle}>参加者</h2>
          {previousParticipants && (
            <Button
              kind="modest"
              onClick={() =>
                dispatch({
                  type: "setParticipants",
                  participants: previousParticipants.map((name) => {
                    return { name };
                  }),
                })
              }
            >
              前回の参加者を設定
            </Button>
          )}
        </header>
        <ul css={participantsListStyle}>
          {state.participants.map((participant, i) => (
            <li key={i}>
              <Input
                type="text"
                value={participant.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: "inputName",
                    value: e.target.value,
                    index: i,
                  })
                }
                placeholder={`例: ${placeholderNames[i]}`}
              />
            </li>
          ))}
        </ul>
      </section>
      <section css={sectionStyle}>
        <h2 css={titleStyle}>開催日</h2>
        <Input
          type="date"
          value={state.eventDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "inputDate", value: e.target.value })}
        />
      </section>
      <div css={actionStyle}>
        <Button type="submit" kind="primary" size="large" loading={isLoading}>
          イベント作成
        </Button>
      </div>
    </form>
  );
};

const rootStyle = css`
  padding-left: 16px;
  padding-right: 16px;
`;

const participantsHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  button {
    margin-bottom: 3px;
  }
`;

const titleStyle = css`
  font-size: 1rem;
  margin: 0 0 8px 0;
  padding: 0;
`;

const sectionStyle = css`
  margin-bottom: 30px;
`;

const participantsListStyle = css`
  margin: 0;
  padding: 0;
  list-style: none;
  > li {
    margin: 0 0 8px 0;
    font-size: 1rem;
  }
`;

const actionStyle = css`
  text-align: center;
`;
