import { useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import { graphqlClient } from "../../../lib/graphql/client";
import { GetEventQuery } from "../../../lib/graphql/generated";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header } from "../../../components/pages/events/Header";

type Props = {
  event: GetEventQuery["event"];
};

const InputGameResultPage: NextPage<Props> = ({ event }) => {
  const initialScores: (string | null)[] = [null, null, null, null];
  const [scores, setScores] = useState(initialScores);
  const router = useRouter();

  function handleInput(e, i) {
    const s = scores.slice();
    s[i] = e.target.value;
    setScores(s);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await graphqlClient.createGame({
      eventToken: event.token,
      results: event.participants.map((p, i) => {
        return { participantId: p.id, score: parseInt(scores[i], 10) };
      }),
    });
    router.push(`/events/${event.token}`);
  }

  return (
    <main>
      <Header
        title="スコア入力"
        leftButton={
          <Link href="/events/[token]" as={`/events/${event.token}`}>
            <a>＜</a>
          </Link>
        }
      ></Header>
      <form onSubmit={handleSubmit}>
        <ul>
          {event.participants.map((p, i) => (
            <li key={p.id}>
              <label>{p.name}</label>
              <input
                type="text"
                value={scores[i] ?? ""}
                onChange={(e) => handleInput(e, i)}
              />
            </li>
          ))}
        </ul>
        <button type="submit">入力</button>
      </form>
    </main>
  );
};

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
