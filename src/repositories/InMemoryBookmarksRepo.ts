import { IBookmarksRepo } from "./interfaces/IBookmarksRepo";
import { Bookmark } from "../models/Bookmark";
import { InMemoryRepositoryBase } from "./InMemoryRepositoryBase";

export class InMemoryBookmarksRepo extends InMemoryRepositoryBase<Bookmark> implements IBookmarksRepo {
    findByRecentlyBookmarked(): Bookmark[] {
        return [{
            id: 69,
            title: "special",
            link: new URL("http://special.com"),
            thumbnail: new URL("http://special.net"),
        }];
    }
}
