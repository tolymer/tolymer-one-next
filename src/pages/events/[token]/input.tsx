import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { EventPageHeader } from "~/components/Header";
import { Main } from "~/components/Main";
import { ScoreInputForm } from "~/components/ScoreInputForm";
import { graphqlClient } from "~/lib/graphql/client";
import type { GetEventQuery } from "~/lib/graphql/generated";

type Props = {
  event: NonNullable<GetEventQuery["event"]>;
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
    <div>
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
      <Main>
        <ScoreInputForm event={event} initialScores={initialScores} onSubmit={handleSubmit} />
      </Main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { query } = context;
  const token = query.token as string;
  const { event } = await graphqlClient.getEvent({ token });

  if (event == null) return { notFound: true };

  return {
    props: { event },
  };
};

export default InputGameResultPage;
