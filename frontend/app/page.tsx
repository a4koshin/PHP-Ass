"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ItemsTable from "@/components/ItemsTable";
import CreateItemDialog from "@/components/CreateItemDialog";
import EditItemDialog from "@/components/EditItemDialog";
import { getItems, createItem, updateItem, deleteItem, Item } from "@/lib/api";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
      setError("");
    } catch {
      setError("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <main className="mx-auto max-w-4xl p-10 space-y-6">
      <div className="flex items-center justify-center  gap-96">
        <h1>Register the you Lost</h1>
        <Button onClick={() => setOpenCreate(true)}>Create Item</Button>
      </div>

      {loading && <p>Loading items...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <ItemsTable
          items={items}
          onEdit={(item) => {
            setSelectedItem(item);
            setOpenEdit(true);
          }}
          onDelete={async (id) => {
            await deleteItem(id);
            loadItems();
          }}
        />
      )}

      <CreateItemDialog
        open={openCreate}
        setOpen={setOpenCreate}
        onCreate={async (data) => {
          await createItem(data);
          loadItems();
        }}
      />

      <EditItemDialog
        open={openEdit}
        setOpen={setOpenEdit}
        item={selectedItem}
        onUpdate={async (id, data) => {
          await updateItem(id, data);
          loadItems();
        }}
      />
    </main>
  );
}
