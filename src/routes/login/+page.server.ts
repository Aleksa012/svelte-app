import { getUser } from "../../services/+instance";
import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { invalid, type Actions, type RequestEvent } from "@sveltejs/kit";
import { login, type User } from "./../../services/+users";
import type { AxiosError, AxiosResponse } from "axios";

export async function load() {
  if (browser) {
    const user = getUser();

    console.log(user);

    if (!user) {
      goto("/");
    }
  } else {
    return {};
  }
}

export const actions: Actions = {
  default: async ({
    request,
  }: RequestEvent<Partial<Record<string, string>>>) => {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    if (!name) {
      return invalid(100, {
        error: "name",
        message: "Please enter a name",
      });
    }

    if (!password) {
      return invalid(100, {
        error: "password",
        message: "Please enter a password",
        name,
      });
    }

    if (name && password) {
      try {
        const { data }: AxiosResponse<User> = await login({
          name,
          password,
        });
        return {
          user: data,
          message: "Successfully logged in",
        };
      } catch (err) {
        const error = err as AxiosError;
        const { message } = error.response?.data as AxiosError;
        return invalid(400, {
          name,
          message,
        });
      }
    }
  },
};
