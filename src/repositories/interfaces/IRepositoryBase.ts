import { AddDTO, UpdateDTO } from "../../dtos/DTOBase";

interface IRead<T> {
  find(id: number): T | undefined;

  findAll(): T[];
}

interface IWrite<T> {
  add(item: AddDTO<T>): T;

  update(item: T, update: UpdateDTO<T>): boolean;

  update(id: number, update: UpdateDTO<T>): boolean;

  remove(item: T): boolean;

  remove(id: number): boolean;
}

/**
 * Base Repository Definition
 */
export interface IRepositoryBase<T> extends IRead<T>, IWrite<T> {}
