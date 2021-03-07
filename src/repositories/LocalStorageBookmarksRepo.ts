import { LocalStorageRepositoryBase } from "./LocalStorageRepositoryBase";
import { Bookmark } from "../models/Bookmark";
import { IBookmarksRepo } from "./interfaces/IBookmarksRepo";

export class LocalStorageBookmarksRepo
  extends LocalStorageRepositoryBase<Bookmark>
  implements IBookmarksRepo {
  findByRecentlyBookmarked(): Bookmark[] {
    return this.collection;
  }
}
