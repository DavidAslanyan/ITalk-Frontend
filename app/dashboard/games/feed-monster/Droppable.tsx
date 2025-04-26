import React, { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  children: ReactNode;
}

export function Droppable({ id, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    // opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
