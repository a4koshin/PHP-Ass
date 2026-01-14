"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Item } from "@/lib/api";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  item: Item | null;
  onUpdate: (id: number, data: Omit<Item, "id" | "created_at">) => void;
};

export default function EditItemDialog({
  open,
  setOpen,
  item,
  onUpdate,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Lost" as "Lost" | "Found",
    location: "",
    contact: "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title,
        description: item.description,
        status: item.status,
        location: item.location,
        contact: item.contact,
      });
    }
  }, [item]);

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <Input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <Input
          placeholder="Status (Lost or Found)"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value as "Lost" | "Found",
            })
          }
        />

        <Input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <Input
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <Button
          onClick={() => {
            onUpdate(item.id, form);
            setOpen(false);
          }}
        >
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}
