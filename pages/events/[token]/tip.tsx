/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { BiTrash } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Header } from "../../../components/pages/events/Header";
import { ScoreInputForm } from "../../../components/pages/events/ScoreInputForm";
import { graphqlClient } from "../../../lib/graphql/client";
import { GetEventQuery } from "../../../lib/graphql/generated";

type Props = {
  event: GetEventQuery["event"];
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
      return event.participants.map((_) => null);
    }
  }, [event]);

  return (
    <div css={rootStyle}>
      <Header
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
  const { event } = await graphqlClient.getEvent({ token });

  return {
    props: {
      event,
    },
  };
};

export default TipPage;
