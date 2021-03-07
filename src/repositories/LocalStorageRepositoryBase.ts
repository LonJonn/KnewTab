import { IRepositoryBase } from "./interfaces/IRepositoryBase";
import { AddDTO, UpdateDTO } from "../dtos/DTOBase";
import { EntityBase } from "../models/EntityBase";

export class LocalStorageRepositoryBase<T extends EntityBase>
  implements IRepositoryBase<T> {
  collection: T[];

  constructor() {
    const savedBookmarks = localStorage.getItem(this.constructor.name) || "[]";
    this.collection = JSON.parse(savedBookmarks);
  }

  find(id: number): T | undefined {
    return this.collection.find((item) => item.id === id);
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
    this.saveToLocalStorage();

    return newItem;
  }

  remove(item: T): boolean;
  remove(id: number): boolean;
  remove(arg: T | number): boolean {
    // Handle pass by ID overload
    if (typeof arg === "number") {
      this.collection = this.collection.filter((item) => item.id !== arg);
      this.saveToLocalStorage();

      return true;
    }
    // Handle pass by reference overload
    else {
      const { id } = arg;
      this.collection = this.collection.filter((item) => item.id !== id);
      this.saveToLocalStorage();

      return true;
    }
  }

  update(item: T, update: UpdateDTO<T>): boolean;
  update(id: number, update: UpdateDTO<T>): boolean;
  update(item: T | number, update: UpdateDTO<T>): boolean {
    return false;
  }

  private saveToLocalStorage() {
    localStorage.setItem(
      this.constructor.name,
      JSON.stringify(this.collection)
    );
  }
}
