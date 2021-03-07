import { IRepositoryBase } from "./interfaces/IRepositoryBase";
import { EntityBase } from "../models/EntityBase";
import { AddDTO, UpdateDTO } from "../dtos/DTOBase";

export class InMemoryRepositoryBase<T extends EntityBase>
  implements IRepositoryBase<T> {
  collection: T[] = [];

  find(id: number): T | undefined {
    return this.collection.find((b) => b.id === id);
  }

  findAll(): T[] {
    return this.collection;
  }

  add(item: AddDTO<T>): T {
    const newItem = {
      id: this.collection.length + 1,
      ...item,
    } as T;

    this.collection.push(newItem);

    return newItem;
  }

  remove(item: T): boolean;
  remove(id: number): boolean;
  remove(arg: T | number): boolean {
    // Handle pass by ID overload
    if (typeof arg === "number") {
      this.collection = this.collection.filter((item) => item.id !== arg);

      return true;
    }
    // Handle pass by reference overload
    else {
      const { id } = arg;
      this.collection = this.collection.filter((item) => item.id !== id);

      return true;
    }
  }

  update(item: T, update: UpdateDTO<T>): boolean;
  update(id: number, update: UpdateDTO<T>): boolean;
  update(arg: T | number, update: UpdateDTO<T>): boolean {
    // Handle pass by ID overload
    if (typeof arg === "number") {
      const toUpdate = this.collection.find((item) => item.id === arg);
      if (!toUpdate) {
        console.error(
          `Unable to find ${this.constructor.name} with ID: ${arg}`
        );
        return false;
      }

      Object.assign(toUpdate, update);

      return true;
    }
    // Handle pass by reference overload
    else {
      const { id } = arg;
      return this.update(id, update);
    }
  }
}
