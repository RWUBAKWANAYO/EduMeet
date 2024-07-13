import { IUser } from "../../../../types/users.interface";
import { IStreamTrack } from "../../../context/types";

export const ADD_ALL_PEERS = "ADD_ALL_PEERS" as const;
export const ADD_SINGLE_PEER = "ADD_SINGLE_PEER" as const;
export const ADD_PEER_STREAM = "ADD_PEER_STREAM" as const;
export const REMOVE_PEER = "REMOVE_PEER" as const;
export const ADD_PEER_TRACK = "ADD_PEER_TRACK" as const;

export type PeerStateType = Record<
  string,
  {
    stream?: MediaStream;
    user: IUser;
    streamTrack: IStreamTrack;
  }
>;

export type PeerActionType =
  | {
      type: typeof ADD_ALL_PEERS;
      payload: { peers: PeerStateType };
    }
  | {
      type: typeof ADD_SINGLE_PEER;
      payload: { peer: IUser };
    }
  | {
      type: typeof ADD_PEER_STREAM;
      payload: { peerId: string; stream: MediaStream };
    }
  | {
      type: typeof REMOVE_PEER;
      payload: { peerId: string };
    }
  | {
      type: typeof ADD_PEER_TRACK;
      payload: { peerId: string; streamTrack: IStreamTrack };
    };
