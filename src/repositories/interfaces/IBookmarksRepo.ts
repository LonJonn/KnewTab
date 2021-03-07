import { Bookmark } from "../../models/Bookmark";
import { IRepositoryBase } from "./IRepositoryBase";

export interface IBookmarksRepo extends IRepositoryBase<Bookmark> {
  findByRecentlyBookmarked(): Bookmark[];
}
