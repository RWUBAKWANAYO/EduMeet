import { IUser } from "../../../../types/users.interface";
import { IStreamTrack } from "../../../context/types";
import {
	ADD_ALL_PEERS,
	ADD_PEER_STREAM,
	ADD_PEER_TRACK,
	ADD_SINGLE_PEER,
	PeerStateType,
	REMOVE_PEER,
} from "./types";

export const addAllPeersAction = (participants: IUser[]) => {
	let hash: PeerStateType = {};
	participants.forEach((participant: IUser) => {
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

export const addSinglePeerAction = (peer: IUser) => {
	return {
		type: ADD_SINGLE_PEER,
		payload: { peer },
	};
};

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
