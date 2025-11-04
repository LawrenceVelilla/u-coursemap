import React from "react";
import { useDroppable, UniqueIdentifier } from "@dnd-kit/core";

interface Props {
  id: UniqueIdentifier;
}

export function Trash({ id }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="fixed left-1/2 bottom-5 -ml-[150px] w-[300px] h-[60px] flex items-center justify-center rounded border transition-colors"
      style={{
        borderColor: isOver ? "red" : "#DDD",
      }}
    >
      Drop here to delete
    </div>
  );
}
