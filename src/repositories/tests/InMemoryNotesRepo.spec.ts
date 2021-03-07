import { InMemoryNotesRepo } from "../InMemoryNotesRepo";

//#region Before

let notesRepo: InMemoryNotesRepo;
beforeEach(() => {
    notesRepo = new InMemoryNotesRepo();
});

//#endregion

describe("in-memory notes repo", () => {
    describe("completed notes", () => {
        test("it finds completed notes correctly", () => {
            const note1 = notesRepo.add({ text: "note 1" });
            const note2 = notesRepo.add({ text: "note 2" });
            const note3 = notesRepo.add({ text: "note 3" });

            notesRepo.update(note1, { completed: true });
            notesRepo.update(note3, { completed: true });

            const completedNotes = notesRepo.findAllCompleted();

            expect(completedNotes.sort()).toEqual([note1, note3].sort());
            expect(completedNotes).not.toContain(note2);
        });
    });

});
