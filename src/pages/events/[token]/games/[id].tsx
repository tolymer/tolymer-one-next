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

type Event = NonNullable<GetEventQuery["event"]>;
type Game = Event["games"][number];

type Props = {
  event: Event;
  game: Game;
};

const GamePage: NextPage<Props> = ({ event, game }) => {
  const router = useRouter();
  const handleSubmit = useCallback(
    async (scores: number[]) => {
      await graphqlClient.updateGame({
        eventToken: event.token,
        gameId: game.id,
        results: event.participants.map((p, i) => {
          return { participantId: p.id, score: scores[i] };
        }),
      });
      router.push(`/events/${event.token}`);
    },
    [event, game, router]
  );
  const handleDelete = useCallback(async () => {
    if (window.confirm("削除しますか？") === false) {
      return;
    }
    await graphqlClient.deleteGame({
      eventToken: event.token,
      gameId: game.id,
    });
    router.push(`/events/${event.token}`);
  }, [event, game, router]);
  const initialScores = useMemo(() => {
    return game.results.map((result) => result.score);
  }, [game]);

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
          <button onClick={handleDelete}>
            <BiTrash />
          </button>
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
  const gameId = Number(query.id);
  const { event } = await graphqlClient.getEvent({ token });
  const game = event?.games.find((game) => game.id === gameId);

  if (event == null || game == null) {
    return { notFound: true };
  }

  return {
    props: { event, game },
  };
};

export default GamePage;
