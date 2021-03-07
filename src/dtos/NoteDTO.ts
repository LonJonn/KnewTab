import { AddDTO } from "./DTOBase";
import { Note } from "../models/Note";

export type NewNoteDTO = Omit<AddDTO<Note>, "completed">;
