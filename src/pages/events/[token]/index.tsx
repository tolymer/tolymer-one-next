import dayjs from "dayjs";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { LinkButton } from "~/components/Button";
import { EventPageHeader } from "~/components/Header";
import { Main } from "~/components/Main";
import { ResultTable } from "~/components/ResultTable";
import { graphqlClient } from "~/lib/graphql/client";
import type { GetEventQuery } from "~/lib/graphql/generated";

type Props = {
  event: NonNullable<GetEventQuery["event"]>;
};

const EventPage: NextPage<Props> = ({ event }) => {
  const formattedDate = dayjs(event.eventDate).format("YYYY/M/D");
  return (
    <div>
      <Head>
        <title>{formattedDate}のスコア - Tolymer One</title>
        <meta
          name="description"
          content={`${formattedDate}に開催。参加者は${event.participants.map((p) => p.name).join("、")}`}
        />
      </Head>
      <EventPageHeader
        title={formattedDate}
        leftButton={
          <Link href="/">
            <a>
              <IoMdHome />
            </a>
          </Link>
        }
        rightButton={
          <Link href="/events/[token]/edit" as={`/events/${event.token}/edit`}>
            <a>
              <BiEdit />
            </a>
          </Link>
        }
      />
      <Main>
        <ResultTable event={event} />
        <div css={{ marginTop: 40, textAlign: "center" }}>
          <LinkButton href="/events/[token]/input" as={`/events/${event.token}/input`} kind="primary">
            スコア入力
          </LinkButton>
        </div>
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

export default EventPage;
