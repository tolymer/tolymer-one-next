/** @jsx jsx */
import { NextPage } from "next";
import { useRouter } from "next/router";
import { jsx, css } from "@emotion/core";
import { EventForm, EventFormValue } from "../components/EventForm";
import { graphqlClient } from "../lib/graphql/client";

const Home: NextPage = () => {
  const router = useRouter();

  async function handleSubmit(formValue: EventFormValue): Promise<void> {
    const value = {
      eventDate: formValue.eventDate,
      participants: formValue.participants.map((p) => p.name),
    };
    const result = await graphqlClient.createEvent(value);
    const token = result.createEvent?.event?.token;
    if (!token) throw new Error("Request failed");
    router.push(`/events/${token}`);
  }

  return (
    <main>
      <div css={sticksStyle}></div>
      <h1 css={titleStyle}>tolymer</h1>
      <EventForm onSubmit={handleSubmit} />
    </main>
  );
};

export default Home;

const sticksStyle = css`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  width: 313px;
  height: 120px;
  background-image: url(/sticks.svg);
  background-size: 313px 214px;
  background-position: bottom;
`;

const titleStyle = css`
  font-size: 32px;
  margin-bottom: 32px;
  text-align: center;
  font-family: Asap, sans-serif;
`;
