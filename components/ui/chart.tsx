"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import type { LegendProps } from "recharts";

import { cn } from "@/lib/utils";

/* ---------------------------------- */
/* THEME CONFIG */
/* ---------------------------------- */

const THEMES = {
  light: "",
  dark: ".dark",
} as const;

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

/* ---------------------------------- */
/* CONTEXT */
/* ---------------------------------- */

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within <ChartContainer />");
  }
  return context;
}

/* ---------------------------------- */
/* CHART CONTAINER */
/* ---------------------------------- */

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ReactNode;
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />

        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = "ChartContainer";

/* ---------------------------------- */
/* STYLE INJECTION */
/* ---------------------------------- */

export function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(([_, v]) => v.theme || v.color);
  if (!colorConfig.length) return null;

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => `
${prefix} [data-chart="${id}"] {
${colorConfig
  .map(([key, item]) => {
    const color = item.theme?.[theme as keyof typeof THEMES] ?? item.color;
    return color ? `--color-${key}: ${color};` : "";
  })
  .join("\n")}
}`)
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

/* ---------------------------------- */
/* TOOLTIP */
/* ---------------------------------- */

export type ChartTooltipContentProps = React.ComponentProps<"div"> & {
  active?: boolean;
  payload?: Array<{
    value?: number | string;
    name?: string;
    dataKey?: string | number;
    color?: string;
  }>;
  label?: string | number;
  hideLabel?: boolean;
  indicator?: "line" | "dot" | "dashed";
};

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(({ active, payload, label, className, hideLabel, indicator = "dot" }, ref) => {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-background px-3 py-2 text-xs shadow-xl",
        className
      )}
    >
      {!hideLabel && label != null && <div className="font-medium mb-1">{label}</div>}

      <div className="space-y-1">
        {payload.map((item, index) => {
          const key = (item.name as string) ?? String(item.dataKey ?? index);
          const itemConfig = config[key];

          return (
            <div key={key} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {indicator === "dot" && (
                  <span
                    className="h-2 w-2 rounded-sm"
                    style={{ background: item.color ?? "transparent" }}
                  />
                )}
                <span className="text-muted-foreground">{itemConfig?.label ?? key}</span>
              </div>

              <span className="font-mono tabular-nums">
                {Number(item.value ?? 0).toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ChartTooltipContent.displayName = "ChartTooltipContent";

export const ChartTooltip = RechartsPrimitive.Tooltip;

/* ---------------------------------- */
/* LEGEND */
/* ---------------------------------- */

export const ChartLegend = RechartsPrimitive.Legend;

type ChartLegendPayloadItem = {
    value?: string;
    dataKey?: string | number;
    color?: string;
  };
  
  type ChartLegendContentProps = React.ComponentProps<"div"> & {
    payload?: ChartLegendPayloadItem[];
    verticalAlign?: "top" | "middle" | "bottom";
  };

  export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(({ payload, className }, ref) => {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4 pt-3",
        className
      )}
    >
      {payload.map((item, index) => {
        const key =
          (item.dataKey as string) ??
          item.value ??
          String(index);

        const itemConfig = config[key];

        return (
          <div key={key} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-sm"
              style={{
                backgroundColor: item.color ?? "transparent",
              }}
            />
            {itemConfig?.label ?? key}
          </div>
        );
      })}
    </div>
  );
});

ChartLegendContent.displayName = "ChartLegendContent";

ChartLegendContent.displayName = "ChartLegendContent";