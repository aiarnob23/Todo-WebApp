import { Types } from "mongoose";

export type TtodoStatus = "incomplete" | "complete";

export type Ttodo = {
  user: Types.ObjectId;
  title: string;
  description?: string;
  date: string;
  status?: TtodoStatus;
  isDeleted?: boolean;
};
