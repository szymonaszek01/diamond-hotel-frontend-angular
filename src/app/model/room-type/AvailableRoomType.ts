import {RoomType} from "./RoomType";
import {RoomTypeOpinion} from "./RoomTypeOpinion";

export interface AvailableRoomType {
  roomType: RoomType;
  roomTypeOpinion: RoomTypeOpinion;
  available?: number;
}
