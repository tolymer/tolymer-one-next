import { css } from "@emotion/react";
import { NextPage, GetServerSideProps } from "next";
import { graphqlClient } from "../../../lib/graphql/client";
import { GetEventQuery } from "../../../lib/graphql/generated";
import { Header } from "../../../components/pages/events/Header";
import { Button } from "../../../components/Button";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Input } from "../../../components/Input";
import { Participant, useEventForm } from "../../../lib/hooks/useEventForm";
import { useCallback } from "react";
import { useRouter } from "next/router";

type Event = GetEventQuery["event"];

type Props = {
  event: Event;
};

const EditPage: NextPage<Props> = ({ event }) => {
  const router = useRouter();
  const [state, dispatch] = useEventForm({
    eventDate: event.eventDate,
    participants: event.participants,
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await graphqlClient.updateEvent({
        eventToken: event.token,
        eventDate: state.eventDate,
        participants: state.participants as Required<Participant>[], // FIXME
      });
      router.push(`/events/${event.token}`);
    },
    [event, state]
  );
  return (
    <div>
      <Header
        title="イベント情報の変更"
        leftButton={
          <Link href="/events/[token]" as={`/events/${event.token}`}>
            <a>
              <IoMdArrowRoundBack />
            </a>
          </Link>
        }
      />

      <main css={mainStyle}>
        <form onSubmit={handleSubmit}>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({ type: "inputDate", value: e.target.value })
              }
            />
          </section>
          <div css={buttonStyle}>
            <Button type="submit" kind="primary">
              更新
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

const mainStyle = css`
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  max-width: 640px;
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

export default EditPage;
