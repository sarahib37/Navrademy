"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import type { Course } from "@/lib/courses";

type CouponData = {
    courseId?: string;
    code: string;
    discountType: "percentage" | "fixed";
    discountValue: string;
    usageLimit: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses: Course[];
  data: CouponData;
  setData: React.Dispatch<React.SetStateAction<CouponData>>
  onSubmit: () => void;
  loading?: boolean;
};

export default function CouponModal({
  open,
  onOpenChange,
  courses,
  data,
  setData,
  onSubmit,
  loading,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Coupon</DialogTitle>
          <DialogDescription>
            Create a discount coupon for a course.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Course */}
          <div className="space-y-2">
            <Label>Course</Label>
            <Select
              value={data.courseId || "all"}
              onValueChange={(value) =>
                setData({
                  ...data,
                  courseId: value === "all" ? "" : value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>

                {courses.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Code */}
          <div className="space-y-2">
            <Label>Coupon Code</Label>
            <Input
              value={data.code}
              onChange={(e) =>
                setData({ ...data, code: e.target.value.toUpperCase() })
              }
              placeholder="e.g. NAV20"
            />
          </div>

          {/* Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Discount Type</Label>
              <Select
                onValueChange={(value: "percentage" | "fixed") =>
                    setData((prev) => ({
                    ...prev,
                    discountType: value,
                    }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">
                    Percentage (%)
                  </SelectItem>
                  <SelectItem value="fixed">
                    Fixed Amount (₦)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={data.discountValue}
                onChange={(e) =>
                  setData({ ...data, discountValue: e.target.value })
                }
              />
            </div>
          </div>

          {/* Usage limit */}
          <div className="space-y-2">
            <Label>Usage Limit</Label>
            <Input
              type="number"
              value={data.usageLimit}
              onChange={(e) =>
                setData({ ...data, usageLimit: e.target.value })
              }
              placeholder="15"
            />
            <p className="text-xs text-muted-foreground">
              Coupon expires automatically after this many uses.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button
            onClick={onSubmit}
            disabled={
              loading ||
              !data.code ||
              !data.discountValue
            }
          >
            {loading ? "Creating..." : "Create Coupon"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}