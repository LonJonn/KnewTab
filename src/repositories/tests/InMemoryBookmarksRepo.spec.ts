import { InMemoryBookmarksRepo } from "../InMemoryBookmarksRepo";
import { IBookmarksRepo } from "../interfaces/IBookmarksRepo";

//#region Before

let bookmarksRepo: IBookmarksRepo;
beforeEach(() => {
    bookmarksRepo = new InMemoryBookmarksRepo();
});

//#endregion

describe("in-memory bookmarks repo", () => {
    describe("recent bookmarks", () => {
        test("it gets the most recent bookmarks correctly", () => {
            // Logic for adding a new bookmark
            // Then check for that bookmark below

            const recentBookmarks = bookmarksRepo.findByRecentlyBookmarked();
            expect(recentBookmarks).toContainEqual(expect.objectContaining({ id: 69 }));
        });
    });
});
