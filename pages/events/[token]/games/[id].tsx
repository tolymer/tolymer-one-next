/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { BiTrash } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Header } from "../../../../components/pages/events/Header";
import { ScoreInputForm } from "../../../../components/pages/events/ScoreInputForm";
import { graphqlClient } from "../../../../lib/graphql/client";
import { GetEventQuery } from "../../../../lib/graphql/generated";

type Props = {
  event: GetEventQuery["event"];
  game: GetEventQuery["event"]["games"][number];
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
    <div css={rootStyle}>
      <Header
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
      ></Header>
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
  const gameId = Number(query.id);
  const { event } = await graphqlClient.getEvent({ token });
  const game = event.games.find((game) => game.id === gameId);

  return {
    props: {
      event,
      game,
    },
  };
};

export default GamePage;
