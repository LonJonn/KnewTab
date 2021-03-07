import { InMemoryRepositoryBase } from "./InMemoryRepositoryBase";
import { Note } from "../models/Note";
import { INotesRepo } from "./interfaces/INotesRepo";
import { NewNoteDTO } from "../dtos/NoteDTO";
import { AddDTO } from "../dtos/DTOBase";

export class InMemoryNotesRepo
  extends InMemoryRepositoryBase<Note>
  implements INotesRepo {
  add(item: NewNoteDTO): Note {
    // Note Class inits with completed set to false, so cast
    return super.add(item as AddDTO<Note>);
  }

  findAllCompleted(): Note[] {
    return this.collection.filter((todo) => todo.completed);
  }
}
