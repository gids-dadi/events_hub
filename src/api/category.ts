import { event_hub_axios_server } from ".";

export async function createCategory(data: { name: string }) {
  const res = await event_hub_axios_server.post<any>("/categories", data);
  return res.data;
}
export async function getAllCategories() {
  const res = await event_hub_axios_server.get<any>("/categories");
  return res.data;
}
