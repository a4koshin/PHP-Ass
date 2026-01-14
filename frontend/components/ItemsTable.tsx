"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Item } from "@/lib/api";

type Props = {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
};

export default function ItemsTable({ items, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>

            {/* Status badge added below (step 2) */}
            <TableCell>
              <span
                className={`px-2 py-1 rounded text-sm font-medium
                  ${
                    item.status === "Lost"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
              >
                {item.status}
              </span>
            </TableCell>

            <TableCell>{item.location}</TableCell>
            <TableCell>{item.contact}</TableCell>

            <TableCell className="text-right space-x-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                Edit
              </Button>

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
