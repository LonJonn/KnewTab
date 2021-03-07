import { EntityBase } from "../../models/EntityBase";
import { LocalStorageRepositoryBase } from "../LocalStorageRepositoryBase";

class TestModel extends EntityBase {
  value!: string;
}

type NewTestModelDTO = Omit<TestModel, "id">;

//#region Test Constants

const newItem: NewTestModelDTO = { value: "new item" };

const existingItem = Object.assign<TestModel, TestModel>(new TestModel(), {
  id: 1,
  value: "existing item",
});

//#endregion

//#region Before

let itemsRepo: LocalStorageRepositoryBase<TestModel>;
beforeEach(() => {
  localStorage.clear();
  itemsRepo = new LocalStorageRepositoryBase<TestModel>();
  itemsRepo.add(existingItem);
});

//#endregion

describe("localstorage repo", () => {
  describe("adding an item", () => {
    test("it returns the new item id", () => {
      const { id } = itemsRepo.add(newItem);
      expect(id).toBeGreaterThan(0);
    });

    test("it adds the new item to the collection", () => {
      itemsRepo.add(newItem);

      const items = itemsRepo.findAll();

      expect(items).toHaveLength(2);
      expect(items).toEqual(
        expect.arrayContaining([expect.objectContaining({ value: "new item" })])
      );
    });

    test("it saves to localstorage", () => {
      itemsRepo.add(newItem);
      const savedItems: TestModel[] = JSON.parse(
        localStorage.getItem(itemsRepo.constructor.name)!
      );
      expect(savedItems).toEqual(
        expect.arrayContaining([expect.objectContaining({ value: "new item" })])
      );
    });
  });

  describe("removing a item by reference", () => {
    test("it returns whether or not the item was removed", () => {
      const didRemove = itemsRepo.remove(existingItem);
      expect(didRemove).toBeTruthy();
    });

    test("it removes the item from the collection", () => {
      itemsRepo.remove(existingItem);

      const items = itemsRepo.findAll();

      expect(items).toHaveLength(0);
      expect(items).not.toContain(existingItem);
    });
  });

  describe("removing an item by id", () => {
    test("it returns whether or not the item was removed", () => {
      const didRemove = itemsRepo.remove(1);
      expect(didRemove).toBeTruthy();
    });

    test("it removes the item from the collection", () => {
      itemsRepo.remove(1);

      const items = itemsRepo.findAll();

      expect(items).toHaveLength(0);
      expect(items).not.toContain(existingItem);
    });
  });
});
