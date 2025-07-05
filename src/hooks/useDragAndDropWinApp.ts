"use client";

import { useEffect, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

export const useDragAndDrop = (
  refContainer: React.RefObject<HTMLDivElement | null>,
  appId: string,
  onFinish: (pos: Position) => void
) => {
  const isDraggingRef = useRef(false);
  const startMouseRef = useRef<Position>({ x: 0, y: 0 });
  const startPosRef = useRef<Position>({ x: 0, y: 0 });
  const windowAppRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    windowAppRef.current = document.getElementById(appId);
  }, [appId]);

  useEffect(() => {
    if (!refContainer?.current || !windowAppRef.current) return;

    const onMouseDown = (e: MouseEvent) => {
      const rect = windowAppRef.current!.getBoundingClientRect();
      isDraggingRef.current = true;
      startMouseRef.current = { x: e.clientX, y: e.clientY };
      startPosRef.current = { x: rect.left, y: rect.top };

      // Optional: nâng z-index khi drag
      windowAppRef.current!.style.zIndex = "9999";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !windowAppRef.current) return;

      const dx = e.clientX - startMouseRef.current.x;
      const dy = e.clientY - startMouseRef.current.y;

      const newX = startPosRef.current.x + dx;
      const newY = startPosRef.current.y + dy;

      const el = windowAppRef.current!;
      el.style.position = "absolute";
      el.style.left = `${newX}px`;
      el.style.top = `${newY}px`;
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current || !windowAppRef.current) return;
      isDraggingRef.current = false;

      const rect = windowAppRef.current.getBoundingClientRect();
      onFinish({ x: rect.left, y: rect.top });

      // Optional: reset z-index
      windowAppRef.current.style.zIndex = "initial";
    };

    const current = refContainer.current;
    current.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      current.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [refContainer, onFinish]);

  return {
    isDragging: isDraggingRef.current,
  };
};
