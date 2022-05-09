import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { BiTrash } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { EventPageHeader } from "~/components/Header";
import { Main } from "~/components/Main";
import { ScoreInputForm } from "~/components/ScoreInputForm";
import { graphqlClient } from "~/lib/graphql/client";
import type { GetEventQuery } from "~/lib/graphql/generated";

type Props = {
  event: NonNullable<GetEventQuery["event"]>;
};

const TipPage: NextPage<Props> = ({ event }) => {
  const router = useRouter();
  const handleSubmit = useCallback(
    async (scores: number[]) => {
      await graphqlClient.upsertTip({
        eventToken: event.token,
        results: event.participants.map((p, i) => {
          return { participantId: p.id, score: scores[i] };
        }),
      });
      router.push(`/events/${event.token}`);
    },
    [event, router]
  );
  const handleDelete = useCallback(async () => {
    if (window.confirm("削除しますか？") === false) {
      return;
    }
    await graphqlClient.deleteTip({
      eventToken: event.token,
    });
    router.push(`/events/${event.token}`);
  }, [event, router]);

  const initialScores = useMemo(() => {
    if (event.tip) {
      return event.tip.results.map((result) => result.score);
    } else {
      return event.participants.map(() => null);
    }
  }, [event]);

  return (
    <div>
      <EventPageHeader
        title="チップ入力"
        leftButton={
          <Link href="/events/[token]" as={`/events/${event.token}`}>
            <a>
              <IoMdArrowRoundBack />
            </a>
          </Link>
        }
        rightButton={
          event.tip ? (
            <button onClick={handleDelete}>
              <BiTrash />
            </button>
          ) : undefined
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

export default TipPage;
