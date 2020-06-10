import { useReducer } from "react";

export type EventFormValue = {
  participants: string[];
  eventDate: string;
};

type Action =
  | { type: "inputName"; index: number; value: string }
  | { type: "inputDate"; value: string }
  | { type: "setParticipants"; participants: string[] };

function reducer(state: EventFormValue, action: Action) {
  switch (action.type) {
    case "inputName":
      const participants = state.participants.slice();
      participants[action.index] = action.value;
      return { ...state, participants };
    case "inputDate":
      return { ...state, eventDate: action.value };
    case "setParticipants":
      return { ...state, participants: action.participants };
    default:
      throw new Error("Invalid type");
  }
}

export function useEventForm(initialState: EventFormValue) {
  return useReducer(reducer, initialState);
}
