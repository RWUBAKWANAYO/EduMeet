import {
  PeerActionType,
  ADD_ALL_PEERS,
  ADD_PEER_STREAM,
  ADD_PEER_TRACK,
  ADD_SINGLE_PEER,
  PeerStateType,
  REMOVE_PEER,
} from "./types";

const peerReducer = (state: PeerStateType, action: PeerActionType): PeerStateType => {
  switch (action.type) {
    case ADD_ALL_PEERS:
      return {
        ...state,
        ...action.payload.peers,
      };
    case ADD_SINGLE_PEER:
      return {
        ...state,
        [action.payload.peer._id]: {
          user: action.payload.peer,
          streamTrack: {
            audio: false,
            video: false,
          },
        },
      };
    case ADD_PEER_STREAM:
      return {
        ...state,
        [action.payload.peerId]: {
          ...state[action.payload.peerId],
          stream: action.payload.stream,
        },
      };
    case REMOVE_PEER:
      const { [action.payload.peerId]: _, ...rest } = state;
      return rest;
    case ADD_PEER_TRACK:
      return {
        ...state,
        [action.payload.peerId]: {
          ...state[action.payload.peerId],
          streamTrack: action.payload.streamTrack,
        },
      };
    default:
      return state;
  }
};

export default peerReducer;
