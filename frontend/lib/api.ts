const BASE_URL = "http://localhost:8000/api/items";

// GET all
export const getItems = async (): Promise<Item[]> => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// CREATE
export const createItem = async (data: Omit<Item, "id" | "created_at">) => {
  await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// UPDATE
export const updateItem = async (
  id: number,
  data: Omit<Item, "id" | "created_at">
) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// DELETE
export const deleteItem = async (id: number) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
