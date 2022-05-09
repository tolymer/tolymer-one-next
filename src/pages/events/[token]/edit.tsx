import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { EditEventForm } from "~/components/EditEventForm";
import { EventPageHeader } from "~/components/Header";
import { Main } from "~/components/Main";
import { graphqlClient } from "~/lib/graphql/client";
import type { GetEventQuery } from "~/lib/graphql/generated";
import type { EventFormValue, Participant } from "~/lib/hooks/useEventForm";

type Props = {
  event: NonNullable<GetEventQuery["event"]>;
};

const EditPage: NextPage<Props> = ({ event }) => {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (formValue: EventFormValue) => {
      await graphqlClient.updateEvent({
        eventToken: event.token,
        eventDate: formValue.eventDate,
        participants: formValue.participants as Required<Participant>[], // FIXME
      });
      router.push(`/events/${event.token}`);
    },
    [event.token, router]
  );

  return (
    <div>
      <EventPageHeader
        title="イベント情報の変更"
        leftButton={
          <Link href="/events/[token]" as={`/events/${event.token}`}>
            <a>
              <IoMdArrowRoundBack />
            </a>
          </Link>
        }
      />

      <Main>
        <EditEventForm onSubmit={handleSubmit} event={event} />
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

export default EditPage;
