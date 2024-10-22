import uuid from "react-native-uuid";

export interface Item {
  title: string;
  id: string | number[];
}

function timeout<T>(response: T, milliseconds: number): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(response), milliseconds),
  );
}

export async function signIn(user: string, password: string) {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user,
      password: password,
      expiresInMins: 30,
    }),
    credentials: "include",
  });
  const data = await response.json();
  return { status: "success", user: data };
}

let items = [
  { title: "Title", id: uuid.v4() },
  { title: "Title", id: uuid.v4() },
  { title: "Title", id: uuid.v4() },
];

export async function getItems(): Promise<{
  status: string;
  items: Item[];
}> {
  return await timeout<{ status: string; items: Item[] }>(
    {
      status: "success",
      items,
    },
    800,
  );
}

export async function addItem(title: Item["title"]): Promise<{
  status: string;
  item: Item;
}> {
  const newItem: Item = { title, id: uuid.v4() };
  items = [...items, newItem];

  return await timeout(
    {
      status: "success",
      item: newItem,
    },
    500,
  );
}

export async function deleteItem(id: Item["id"]): Promise<{
  status: string;
  id: Item["id"];
}> {
  items = items.filter((item) => {
    return item.id !== id;
  });

  return await timeout(
    {
      status: "success",
      id,
    },
    500,
  );
}
