"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreate: (name: string) => void;
};

export default function CreateItemDialog({ open, setOpen, onCreate }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate(name);
    setName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Item</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
}
