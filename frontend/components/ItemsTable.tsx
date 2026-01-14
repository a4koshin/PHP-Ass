"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Item } from "@/app/page";

type Props = {
  items: Item[];
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};

export default function ItemsTable({ items, onUpdate, onDelete }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [value, setValue] = useState("");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              {editingId === item.id ? (
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              ) : (
                item.name
              )}
            </TableCell>

            <TableCell className="text-right space-x-2">
              {editingId === item.id ? (
                <Button
                  size="sm"
                  onClick={() => {
                    onUpdate(item.id, value);
                    setEditingId(null);
                  }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(item.id);
                    setValue(item.name);
                  }}
                >
                  Edit
                </Button>
              )}

              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
