import { EntityBase } from "./EntityBase";

export class Note extends EntityBase {
  text!: string;
  completed: boolean = false;
}
