export function asegurarId<T extends { _id?: unknown; id?: string }>(obj: T): T & { id: string } {
  return {
    ...obj,
    id: obj.id || (typeof obj._id === "string" ? obj._id : obj._id?.toString?.()) || "",
  };
}
