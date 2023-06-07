import {Row} from "./Row";

export interface Table {
  detailsBaseLink: string;
  headerList: string[];
  rowList: Row[];
}
