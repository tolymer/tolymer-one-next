import { css } from "@emotion/react";
import type { FC } from "react";
import { useCallback } from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import type { GetEventQuery } from "~/lib/graphql/generated";
import type { EventFormValue } from "~/lib/hooks/useEventForm";
import { useEventForm } from "~/lib/hooks/useEventForm";

type Props = {
  event: NonNullable<GetEventQuery["event"]>;
  onSubmit: (value: EventFormValue) => void;
};

export const EditEventForm: FC<Props> = ({ event, onSubmit }) => {
  const [state, dispatch] = useEventForm({
    eventDate: event.eventDate,
    participants: event.participants,
  });
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(state);
    },
    [state, onSubmit]
  );
  return (
    <form onSubmit={handleSubmit} css={rootStyle}>
      <section css={sectionStyle}>
        <h2 css={headStyle}>参加者</h2>
        <ul css={inputListStyle}>
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
              />
            </li>
          ))}
        </ul>
      </section>

      <section css={sectionStyle}>
        <h2 css={headStyle}>開催日</h2>
        <Input
          type="date"
          value={state.eventDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "inputDate", value: e.target.value })}
        />
      </section>
      <div css={buttonStyle}>
        <Button type="submit" kind="primary">
          更新
        </Button>
      </div>
    </form>
  );
};

const rootStyle = css`
  padding: 20px 16px;
`;

const sectionStyle = css`
  margin-bottom: 30px;
`;

const inputListStyle = css`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin: 10px 0;
  }
`;

const headStyle = css`
  font-size: 16px;
  margin: 10px 0;
`;

const buttonStyle = css`
  text-align: center;
`;
