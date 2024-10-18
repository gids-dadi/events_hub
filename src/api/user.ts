import { event_hub_axios_server } from ".";

type UserProfile = {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  photo: string;
  active: boolean;
  __v: number;
  accessToken: string;
};
export async function getUserProfile() {
  const res = await event_hub_axios_server.get<UserProfile>(
    "/users/current_user"
  );
  return res.data;
}

export async function registerUser(data: {
  fullName: string;
  email: string;
  photo: string;
  password: string;
  terms: boolean;
}) {
  const res = await event_hub_axios_server.post<any>("/users", data);
  return res.data;
}
