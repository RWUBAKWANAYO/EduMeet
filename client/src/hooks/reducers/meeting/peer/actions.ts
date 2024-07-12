import { IMeetingRoomParticipant, IStreamTrack } from "../../../../types/context.interface";
import {
  ADD_ALL_PEERS,
  ADD_PEER_STREAM,
  ADD_PEER_TRACK,
  ADD_SINGLE_PEER,
  PeerStateType,
  REMOVE_PEER,
} from "./types";

export const addAllPeersAction = (participants: IMeetingRoomParticipant[]) => {
  let hash: PeerStateType = {};
  participants.forEach((participant: IMeetingRoomParticipant) => {
    hash[participant._id] = {
      user: participant,
      streamTrack: {
        audio: false,
        video: false,
      },
    };
  });
  return {
    type: ADD_ALL_PEERS,
    payload: { peers: hash },
  };
};

export const addSinglePeerAction = (peer: IMeetingRoomParticipant) => ({
  type: ADD_SINGLE_PEER,
  payload: { peer },
});

export const addPeerStreamAction = (peerId: string, stream: MediaStream) => ({
  type: ADD_PEER_STREAM,
  payload: { peerId, stream },
});

export const removePeerAction = (peerId: string) => ({
  type: REMOVE_PEER,
  payload: { peerId },
});

export const addPeerTrackAction = (peerId: string, streamTrack: IStreamTrack) => ({
  type: ADD_PEER_TRACK,
  payload: { peerId, streamTrack },
});
