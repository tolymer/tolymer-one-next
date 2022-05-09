import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded date */
  ISO8601Date: string;
};

/** Autogenerated input type of CreateEvent */
export type CreateEventInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  eventDate: Scalars['ISO8601Date'];
  participants: Array<Scalars['String']>;
};

/** Autogenerated return type of CreateEvent */
export type CreateEventPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  event: Event;
};

/** Autogenerated input type of CreateGame */
export type CreateGameInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  eventToken: Scalars['String'];
  results: Array<GameResultInput>;
};

/** Autogenerated return type of CreateGame */
export type CreateGamePayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  game: Game;
};

/** Autogenerated input type of DeleteGame */
export type DeleteGameInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  eventToken: Scalars['String'];
  gameId: Scalars['Int'];
};

/** Autogenerated return type of DeleteGame */
export type DeleteGamePayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteTip */
export type DeleteTipInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  eventToken: Scalars['String'];
};

/** Autogenerated return type of DeleteTip */
export type DeleteTipPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Event = {
  eventDate: Scalars['ISO8601Date'];
  games: Array<Game>;
  participants: Array<Participant>;
  tip?: Maybe<Tip>;
  token: Scalars['String'];
};

export type Game = {
  id: Scalars['Int'];
  results: Array<GameResult>;
};

export type GameResult = {
  participantId: Scalars['Int'];
  rank: Scalars['Int'];
  score: Scalars['Float'];
};

export type GameResultInput = {
  participantId: Scalars['Int'];
  score: Scalars['Float'];
};

export type Mutation = {
  createEvent?: Maybe<CreateEventPayload>;
  createGame?: Maybe<CreateGamePayload>;
  deleteGame?: Maybe<DeleteGamePayload>;
  deleteTip?: Maybe<DeleteTipPayload>;
  updateEvent?: Maybe<UpdateEventPayload>;
  updateGame?: Maybe<UpdateGamePayload>;
  updateParticipants?: Maybe<UpdateParticipantsPayload>;
  upsertTip?: Maybe<UpsertTipPayload>;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateGameArgs = {
  input: CreateGameInput;
};


export type MutationDeleteGameArgs = {
  input: DeleteGameInput;
};


export type MutationDeleteTipArgs = {
  input: DeleteTipInput;
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


export type MutationUpdateGameArgs = {
  input: UpdateGameInput;
};


export type MutationUpdateParticipantsArgs = {
  input: UpdateParticipantsInput;
};


export type MutationUpsertTipArgs = {
  input: UpsertTipInput;
};

export type Participant = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ParticipantRenameInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Query = {
  event?: Maybe<Event>;
};


export type QueryEventArgs = {
  token: Scalars['String'];
};

export type Tip = {
  results: Array<TipResult>;
};

export type TipResult = {
  participantId: Scalars['Int'];
  score: Scalars['Float'];
};

export type TipResultInput = {
  participantId: Scalars['Int'];
  score: Scalars['Float'];
};

/** Autogenerated input type of UpdateEvent */
export type UpdateEventInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  eventDate: Scalars['ISO8601Date'];
  eventToken: Scalars['String'];
};

/** Autogenerated return type of UpdateEvent */
export type UpdateEventPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  event: Event;
};

/** Autogenerated input type of UpdateGame */
export type UpdateGameInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  eventToken: Scalars['String'];
  gameId: Scalars['Int'];
  results: Array<GameResultInput>;
};

/** Autogenerated return type of UpdateGame */
export type UpdateGamePayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  game: Game;
};

/** Autogenerated input type of UpdateParticipants */
export type UpdateParticipantsInput = {
  addingNames?: InputMaybe<Array<Scalars['String']>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  deletingIds?: InputMaybe<Array<Scalars['Int']>>;
  eventToken: Scalars['String'];
  renamingParticipants?: InputMaybe<Array<ParticipantRenameInput>>;
};

/** Autogenerated return type of UpdateParticipants */
export type UpdateParticipantsPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  participants: Array<Participant>;
};

/** Autogenerated input type of UpsertTip */
export type UpsertTipInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  eventToken: Scalars['String'];
  results: Array<TipResultInput>;
};

/** Autogenerated return type of UpsertTip */
export type UpsertTipPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  tip: Tip;
};

export type CreateEventMutationVariables = Exact<{
  eventDate: Scalars['ISO8601Date'];
  participants: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateEventMutation = { createEvent?: { event: { token: string } } | null };

export type CreateGameMutationVariables = Exact<{
  eventToken: Scalars['String'];
  results: Array<GameResultInput> | GameResultInput;
}>;


export type CreateGameMutation = { createGame?: { game: { id: number, results: Array<{ participantId: number, score: number, rank: number }> } } | null };

export type DeleteGameMutationVariables = Exact<{
  eventToken: Scalars['String'];
  gameId: Scalars['Int'];
}>;


export type DeleteGameMutation = { deleteGame?: { clientMutationId?: string | null } | null };

export type DeleteTipMutationVariables = Exact<{
  eventToken: Scalars['String'];
}>;


export type DeleteTipMutation = { deleteTip?: { clientMutationId?: string | null } | null };

export type UpdateEventMutationVariables = Exact<{
  eventToken: Scalars['String'];
  eventDate: Scalars['ISO8601Date'];
  participants: Array<ParticipantRenameInput> | ParticipantRenameInput;
}>;


export type UpdateEventMutation = { updateEvent?: { event: { token: string } } | null, updateParticipants?: { participants: Array<{ id: number }> } | null };

export type UpdateGameMutationVariables = Exact<{
  eventToken: Scalars['String'];
  gameId: Scalars['Int'];
  results: Array<GameResultInput> | GameResultInput;
}>;


export type UpdateGameMutation = { updateGame?: { clientMutationId?: string | null } | null };

export type UpsertTipMutationVariables = Exact<{
  eventToken: Scalars['String'];
  results: Array<TipResultInput> | TipResultInput;
}>;


export type UpsertTipMutation = { upsertTip?: { clientMutationId?: string | null } | null };

export type GetEventQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetEventQuery = { event?: { token: string, eventDate: string, participants: Array<{ id: number, name: string }>, games: Array<{ id: number, results: Array<{ participantId: number, score: number, rank: number }> }>, tip?: { results: Array<{ participantId: number, score: number }> } | null } | null };


export const CreateEventDocument = gql`
    mutation createEvent($eventDate: ISO8601Date!, $participants: [String!]!) {
  createEvent(input: {eventDate: $eventDate, participants: $participants}) {
    event {
      token
    }
  }
}
    `;
export const CreateGameDocument = gql`
    mutation createGame($eventToken: String!, $results: [GameResultInput!]!) {
  createGame(input: {eventToken: $eventToken, results: $results}) {
    game {
      id
      results {
        participantId
        score
        rank
      }
    }
  }
}
    `;
export const DeleteGameDocument = gql`
    mutation deleteGame($eventToken: String!, $gameId: Int!) {
  deleteGame(input: {eventToken: $eventToken, gameId: $gameId}) {
    clientMutationId
  }
}
    `;
export const DeleteTipDocument = gql`
    mutation deleteTip($eventToken: String!) {
  deleteTip(input: {eventToken: $eventToken}) {
    clientMutationId
  }
}
    `;
export const UpdateEventDocument = gql`
    mutation updateEvent($eventToken: String!, $eventDate: ISO8601Date!, $participants: [ParticipantRenameInput!]!) {
  updateEvent(input: {eventToken: $eventToken, eventDate: $eventDate}) {
    event {
      token
    }
  }
  updateParticipants(
    input: {eventToken: $eventToken, renamingParticipants: $participants}
  ) {
    participants {
      id
    }
  }
}
    `;
export const UpdateGameDocument = gql`
    mutation updateGame($eventToken: String!, $gameId: Int!, $results: [GameResultInput!]!) {
  updateGame(input: {eventToken: $eventToken, gameId: $gameId, results: $results}) {
    clientMutationId
  }
}
    `;
export const UpsertTipDocument = gql`
    mutation upsertTip($eventToken: String!, $results: [TipResultInput!]!) {
  upsertTip(input: {eventToken: $eventToken, results: $results}) {
    clientMutationId
  }
}
    `;
export const GetEventDocument = gql`
    query getEvent($token: String!) {
  event(token: $token) {
    token
    eventDate
    participants {
      id
      name
    }
    games {
      id
      results {
        participantId
        score
        rank
      }
    }
    tip {
      results {
        participantId
        score
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createEvent(variables: CreateEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEventMutation>(CreateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createEvent', 'mutation');
    },
    createGame(variables: CreateGameMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateGameMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateGameMutation>(CreateGameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createGame', 'mutation');
    },
    deleteGame(variables: DeleteGameMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteGameMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteGameMutation>(DeleteGameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteGame', 'mutation');
    },
    deleteTip(variables: DeleteTipMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTipMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTipMutation>(DeleteTipDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteTip', 'mutation');
    },
    updateEvent(variables: UpdateEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateEventMutation>(UpdateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateEvent', 'mutation');
    },
    updateGame(variables: UpdateGameMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateGameMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateGameMutation>(UpdateGameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateGame', 'mutation');
    },
    upsertTip(variables: UpsertTipMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertTipMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertTipMutation>(UpsertTipDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'upsertTip', 'mutation');
    },
    getEvent(variables: GetEventQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEventQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventQuery>(GetEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEvent', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;