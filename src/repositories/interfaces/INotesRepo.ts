import { IRepositoryBase } from "./IRepositoryBase";
import { Note } from "../../models/Note";

export interface INotesRepo extends IRepositoryBase<Note> {
  findAllCompleted(): Note[];
}
