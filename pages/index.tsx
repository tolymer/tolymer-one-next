import { NextPage } from "next";
import { graphqlClient } from "../lib/graphql/client";
import { useReducer } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const placeholderNames = ["ほかむら", "たに", "せんすい", "たなか"];

type State = {
  participants: string[];
  eventDate: string;
};

type Action =
  | { type: "inputName"; index: number; value: string }
  | { type: "inputDate"; value: string };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "inputName":
      const participants = state.participants.slice();
      participants[action.index] = action.value;
      return { ...state, participants };
    case "inputDate":
      return { ...state, eventDate: action.value };
    default:
      throw new Error("Invalid type");
  }
}

const initialState = {
  participants: ["", "", "", ""],
  eventDate: dayjs().format("YYYY-MM-DD"),
};

const Home: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await graphqlClient.createEvent(state);
    const token = result.createEvent?.event?.token;
    if (!token) throw new Error("Request failed");
    router.push(`/events/${token}`);
  }

  return (
    <main>
      <h1>tolymer</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <h2>参加者</h2>
          <ul>
            {state.participants.map((name, i) => (
              <li key={i}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    dispatch({
                      type: "inputName",
                      value: e.target.value,
                      index: i,
                    })
                  }
                  placeholder={`例: ${placeholderNames[i]}`}
                />
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>開催日</h2>
          <input
            type="date"
            value={state.eventDate}
            onChange={(e) =>
              dispatch({ type: "inputDate", value: e.target.value })
            }
          />
        </section>
        <div>
          <button type="submit">イベント作成</button>
        </div>
      </form>
    </main>
  );
};

export default Home;
