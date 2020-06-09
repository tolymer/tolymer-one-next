import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import dayjs from "dayjs";
import { graphqlClient } from "../../lib/graphql/client";
import { GetEventQuery } from "../../lib/graphql/generated";

type Event = GetEventQuery["event"];

type Props = {
  event: Event;
};

function getTotalScores(event: Event): number[] {
  const scores: Record<number, number> = {};
  event.games.forEach((game) => {
    game.results.forEach((result) => {
      if (scores[result.participantId] === undefined) {
        scores[result.participantId] = 0;
      }
      scores[result.participantId] += result.score;
    });
  });

  return event.participants.map((p) => scores[p.id]);
}

const EventPage: NextPage<Props> = ({ event }) => {
  return (
    <main>
      <h1>{dayjs(event.eventDate).format("YYYY/M/D")}</h1>
      <Link href="/events/[token]/input" as={`/events/${event.token}/input`}>
        <a>結果入力</a>
      </Link>
      <table>
        <thead>
          <tr>
            <th></th>
            {event.participants.map((p) => (
              <th key={p.id}>{p.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {event.games.map((game, i) => (
            <tr key={game.id}>
              <th>{i + 1}</th>
              {event.participants.map((p) => (
                <td key={p.id}>
                  {
                    game.results.filter((r) => r.participantId === p.id)[0]
                      .score
                  }
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th>合計</th>
            {getTotalScores(event).map((score, i) => (
              <td key={i}>{score}</td>
            ))}
          </tr>
        </tbody>
      </table>
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

export default EventPage;
