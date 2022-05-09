import { css } from "@emotion/react";
import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { EventPageHeader } from "../../../components/Header";
import { ScoreInputForm } from "../../../components/ScoreInputForm";
import { graphqlClient } from "../../../lib/graphql/client";
import type { GetEventQuery } from "../../../lib/graphql/generated";

type Props = {
  event: GetEventQuery["event"];
};

const initialScores = [null, null, null, null];

const InputGameResultPage: NextPage<Props> = ({ event }) => {
  const router = useRouter();
  const handleSubmit = useCallback(
    async (scores: number[]) => {
      await graphqlClient.createGame({
        eventToken: event.token,
        results: event.participants.map((p, i) => {
          return { participantId: p.id, score: scores[i] };
        }),
      });
      router.push(`/events/${event.token}`);
    },
    [event, router]
  );

  return (
    <div css={rootStyle}>
      <EventPageHeader
        title="スコア入力"
        leftButton={
          <Link href="/events/[token]" as={`/events/${event.token}`}>
            <a>
              <IoMdArrowRoundBack />
            </a>
          </Link>
        }
        rightButton={
          <Link href="/events/[token]/tip" as={`/events/${event.token}/tip`}>
            <a>Tip</a>
          </Link>
        }
      ></EventPageHeader>
      <ScoreInputForm event={event} initialScores={initialScores} onSubmit={handleSubmit} />
    </div>
  );
};

const rootStyle = css`
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
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
