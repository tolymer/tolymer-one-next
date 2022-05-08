/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import dayjs from "dayjs";
import { graphqlClient } from "../../../lib/graphql/client";
import { GetEventQuery } from "../../../lib/graphql/generated";
import { Header } from "../../../components/pages/events/Header";
import { ResultTable } from "../../../components/pages/events/ResultTable";
import { LinkButton } from "../../../components/Button";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { BiEdit } from "react-icons/bi";

type Event = GetEventQuery["event"];

type Props = {
  event: Event;
};

const EventPage: NextPage<Props> = ({ event }) => {
  const formattedDate = dayjs(event.eventDate).format("YYYY/M/D");
  return (
    <main>
      <Head>
        <title>{formattedDate}のスコア - Tolymer One</title>
        <meta
          name="description"
          content={`${formattedDate}に開催。参加者は${event.participants
            .map((p) => p.name)
            .join("、")}`}
        />
      </Head>
      <Header
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
      <ResultTable event={event} />
      <div css={inputButtonWrapperStyle}>
        <LinkButton
          href="/events/[token]/input"
          as={`/events/${event.token}/input`}
          kind="primary"
        >
          スコア入力
        </LinkButton>
      </div>
    </main>
  );
};

const inputButtonWrapperStyle = css`
  margin-top: 40px;
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

export default EventPage;
