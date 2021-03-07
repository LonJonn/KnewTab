export type AddDTO<T> = Omit<T, "id">;
export type UpdateDTO<T> = Partial<AddDTO<T>>;

