import { GripVertical } from "lucide-react";
import * as ResizablePanels from "react-resizable-panels";

import { cn } from "@/lib/utils";

/* ---------------------------------- */
/* Extract components (safe cast) */
/* ---------------------------------- */

const PanelGroup =
  (ResizablePanels as any).PanelGroup ??
  (ResizablePanels as any).default?.PanelGroup;

const Panel = ResizablePanels.Panel;

const PanelResizeHandle =
  (ResizablePanels as any).PanelResizeHandle;

/* ---------------------------------- */
/* PANEL GROUP */
/* ---------------------------------- */

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<"div"> & any) => (
  <PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
);

/* ---------------------------------- */
/* PANEL */
/* ---------------------------------- */

const ResizablePanel = Panel;

/* ---------------------------------- */
/* HANDLE */
/* ---------------------------------- */

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  withHandle?: boolean;
}) => (
  <PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
      "data-[panel-group-direction=vertical]:h-px",
      "data-[panel-group-direction=vertical]:w-full",
      "focus-visible:outline-none focus-visible:ring-1",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };