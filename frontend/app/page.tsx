"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateItemDialog from "@/components/CreateItemDialog";
import ItemsTable from "@/components/ItemsTable";

export type Item = {
  id: string;
  name: string;
};

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);

  const addItem = (name: string) => {
    setItems((prev) => [...prev, { id: crypto.randomUUID(), name }]);
  };

  const updateItem = (id: string, name: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="mx-auto max-w-4xl p-10 space-y-6">
      <Button onClick={() => setOpen(true)}>Create Item</Button>

      <CreateItemDialog open={open} setOpen={setOpen} onCreate={addItem} />

      <ItemsTable items={items} onUpdate={updateItem} onDelete={deleteItem} />
    </main>
  );
}
