"use client";

import { useEffect, useRef } from "react";

type ResizeDirection =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

interface FinishCallback {
  size: [number, number], 
  position: [number, number]
}

export const useResizeAbleWinApp = (
  refContainer: React.RefObject<HTMLDivElement | null>,
  appId: string,
  type: ResizeDirection,
  onFinish: (size: FinishCallback) => void,
  options?: {
    minWidth?: number;
    minHeight?: number;
  }
) => {
  const isDraggingRef = useRef(false);
  const startMouseRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
  const windowAppRef = useRef<HTMLElement | null>(null);

  const minWidth = options?.minWidth ?? 100;
  const minHeight = options?.minHeight ?? 100;

  useEffect(() => {
    windowAppRef.current = document.getElementById(appId);
    if (windowAppRef.current) {
      const rect = windowAppRef.current.getBoundingClientRect();
      startSizeRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };
    }
  }, [appId]);

  useEffect(() => {
    if (!refContainer?.current || !windowAppRef.current) return;

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;

      const rect = windowAppRef.current!.getBoundingClientRect();
      startMouseRef.current = { x: e.clientX, y: e.clientY };
      startSizeRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !windowAppRef.current) return;

      const dx = e.clientX - startMouseRef.current.x;
      const dy = e.clientY - startMouseRef.current.y;

      let newWidth = startSizeRef.current.width;
      let newHeight = startSizeRef.current.height;
      let newLeft = startSizeRef.current.left;
      let newTop = startSizeRef.current.top;

      switch (type) {
        case "right":
          newWidth = startSizeRef.current.width + dx;
          break;
        case "left":
          newWidth = startSizeRef.current.width - dx;
          newLeft = startSizeRef.current.left + dx;
          break;
        case "bottom":
          newHeight = startSizeRef.current.height + dy;
          break;
        case "top":
          newHeight = startSizeRef.current.height - dy;
          newTop = startSizeRef.current.top + dy;
          break;
        case "topLeft":
          newWidth = startSizeRef.current.width - dx;
          newHeight = startSizeRef.current.height - dy;
          newLeft = startSizeRef.current.left + dx;
          newTop = startSizeRef.current.top + dy;
          break;
        case "topRight":
          newWidth = startSizeRef.current.width + dx;
          newHeight = startSizeRef.current.height - dy;
          newTop = startSizeRef.current.top + dy;
          break;
        case "bottomLeft":
          newWidth = startSizeRef.current.width - dx;
          newHeight = startSizeRef.current.height + dy;
          newLeft = startSizeRef.current.left + dx;
          break;
        case "bottomRight":
          newWidth = startSizeRef.current.width + dx;
          newHeight = startSizeRef.current.height + dy;
          break;
      }

      // Apply minimum size constraints
      newWidth = Math.max(newWidth, minWidth);
      newHeight = Math.max(newHeight, minHeight);

      // Apply styles
      const style = windowAppRef.current.style;
      style.width = `${newWidth}px`;
      style.height = `${newHeight}px`;

      if (["left", "top", "topLeft", "topRight", "bottomLeft"].includes(type)) {
        style.left = `${newLeft}px`;
      }
      if (["top", "topLeft", "topRight"].includes(type)) {
        style.top = `${newTop}px`;
      }
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current || !windowAppRef.current) return;
      isDraggingRef.current = false;

      const rect = windowAppRef.current.getBoundingClientRect();
      onFinish({
        size: [rect.width, rect.height],
        position: [rect.left, rect.top],
      });
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
  }, [refContainer, type, onFinish, minWidth, minHeight]);

  return {
    isDragging: isDraggingRef.current,
  };
};
