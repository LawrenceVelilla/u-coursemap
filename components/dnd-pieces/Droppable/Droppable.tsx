import React from "react";
import { useDroppable, UniqueIdentifier } from "@dnd-kit/core";

interface Props {
  children: React.ReactNode;
  dragging: boolean;
  id: UniqueIdentifier;
}

export function Droppable({ children, id }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id
  });

  return (
    <div
      ref={setNodeRef}
      className={isOver ? "bg-blue-50" : ""}
      aria-label="Droppable region"
    >
      {children}
    </div>
  );
}
