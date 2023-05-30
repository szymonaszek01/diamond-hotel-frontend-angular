import {ErrorDto} from "../../dto/error/ErrorDto";

export interface FilterModel {
  roomTypeList: string[];
  numberOfPeopleList: string[];
  errorDto: ErrorDto;
}
