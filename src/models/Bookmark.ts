import { EntityBase } from "./EntityBase";

export class Bookmark extends EntityBase {
  title!: string;
  link!: URL;
  thumbnail!: URL;
}
