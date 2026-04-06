import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Ticket } from "lucide-react";
import CouponModal from "./CouponModal";
import { collection, addDoc, deleteDoc, serverTimestamp, doc, updateDoc, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CourseForm } from "./CourseForm";
import { type Course } from "@/lib/courses";
import { onSnapshot } from "firebase/firestore";
  
export default function AdminCourses() {
  type CouponData = {
    courseId?: string;
    code: string;
    discountType: "percentage" | "fixed";
    discountValue: string;
    usageLimit: string;
  };

  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [coupons, setCoupons] = useState<any[]>([]);
  const [couponDialog, setCouponDialog] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [couponData, setCouponData] = useState<CouponData>({
    courseId: "",
    code: "",
    discountType: "percentage",
    discountValue: "",
    usageLimit: "15",
  });


  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const q = query(
          collection(db, "coupons"),
          orderBy("created_at", "desc")
        );
  
        const querySnapshot = await getDocs(q);
  
        const coupon = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setCoupons(coupon);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
  
    fetchCoupons();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const q = query(collection(db, "courses"), orderBy("created_at", "desc"));
      const snapshot = await getDocs(q);

      setCourses(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })));
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "payments"), orderBy("created_at", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPayments(data);
    });

    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setCouponData({
      courseId: "",
      code: "",
      discountType: "percentage",
      discountValue: "",
      usageLimit: "15",
    });
  };

  const handleCreateCoupon = async () => {
    const { courseId, code, discountType, discountValue, usageLimit } = couponData;
  
    if (!code || !discountValue) {
      console.log("Missing required fields");
      return;
    }
  
    try {
      const payload = {
        course_id: courseId || null,
        code: code.toUpperCase(),
        discount_type: discountType,
        discount_value: parseFloat(discountValue),
        usage_limit: parseInt(usageLimit) || 15,
        usage_count: 0,
        is_active: true,
        created_at: serverTimestamp(),
      };
  
      const docRef = await addDoc(collection(db, "coupons"), payload);
  
      setCoupons((prev) => [
        { id: docRef.id, ...payload },
        ...prev,
      ]);
  
      setCouponDialog(false);
      resetForm();
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    try {
      await deleteDoc(doc(db, "coupons", id));
      setCoupons((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  const handleSaveCourse = async (data: Course) => {
    try {
      setLoading(true);

      if (mode === "edit" && editingCourse) {
        await updateDoc(doc(db, "courses", editingCourse.id), data);

        setCourses(prev =>
          prev.map(c => c.id === editingCourse.id ? { ...c, ...data } : c)
        );
      } else {
        const docRef = await addDoc(collection(db, "courses"), {
          ...data,
          created_at: serverTimestamp(),
        });

        setCourses(prev => [{ ...data }, ...prev]);
      }

      setMode("list");
      setEditingCourse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  const categoryLabel = (c: string) => ({ live: "Live", "self-paced": "Self-Paced", upcoming: "Upcoming" }[c] ?? c);
  const typeLabel = (t: string) => ({ career: "Career", corporate: "Corporate", individual: "Individual" }[t] ?? t);
  const levelLabel = (l: string) => l.charAt(0).toUpperCase() + l.slice(1);

  if (mode !== "list") {
    return (
      <CourseForm
        initialData={editingCourse}
        onSave={handleSaveCourse}
        onCancel={() => {
          setMode("list");
          setEditingCourse(null);
        }}
        isEditing={mode === "edit"}
        isSaving={loading}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Courses", value: courses.length },
          { label: "Live", value: courses.filter((c) => c.category === "live").length },
          { label: "Self-Paced", value: courses.filter((c) => c.category === "self-paced").length },
          { label: "Purchases", value: payments.length },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-heading font-bold text-foreground mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-semibold text-foreground">All Courses</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCouponDialog(true)}>
            <Ticket className="w-4 h-4 mr-2" /> New Coupon
          </Button>
          <Button onClick={() => setMode("create")}>
            <Plus className="w-4 h-4 mr-2" /> New Course
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden mb-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Price</TableHead>
              <TableHead className="hidden lg:table-cell">Duration</TableHead>
              <TableHead className="hidden lg:table-cell">Students</TableHead>
              <TableHead className="hidden lg:table-cell">Level</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                  No courses yet. Create your first course to get started.
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{course.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {categoryLabel(course.category)}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{typeLabel(course.type)}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">₦{course.price.toLocaleString()}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{course.duration}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{course.students}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{levelLabel(course.level)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => {setEditingCourse(course); setMode("edit");}}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCourse(course.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Coupons Section */}
      <div className="mb-10">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Coupons & Discounts</h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead className="hidden sm:table-cell">Course</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead className="hidden sm:table-cell">Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No coupons created yet.
                  </TableCell>
                </TableRow>
              ) : (
                coupons.map((coupon: any) => {
                  const expired = coupon.usage_count >= coupon.usage_limit;
                  return (
                    <TableRow key={coupon.code}>
                      <TableCell className="font-mono font-medium">{coupon.code}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {coupon.course_id
                        ? courses.find((c) => c.id === coupon.course_id)?.title || "Unknown"
                        : "All Courses"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {coupon.discount_type === "percentage" ? `${coupon.discount_value}%` : `₦${coupon.discount_value}`}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {coupon.usage_count}/{coupon.usage_limit}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          expired ? "bg-destructive/10 text-destructive" : coupon.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}>
                          {expired ? "Expired" : coupon.is_active ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCoupon(coupon.id)}
                      >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Paid Users</h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Email</TableHead>
                <TableHead className="hidden sm:table-cell">Course Purchased</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead className="hidden md:table-cell">Coupon</TableHead>
                <TableHead className="hidden md:table-cell">Referral</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No purchases yet.
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((p: any) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium text-sm">{p.email}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {p.courseTitle}
                    </TableCell>
                    <TableCell className="text-sm">₦{(p.amount/100).toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground font-mono">
                      {p.coupon ?? "No coupon used."}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground font-mono">
                      {p.referralCode ?? "No referral code."}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <CouponModal
        open={couponDialog}
        onOpenChange={setCouponDialog}
        courses={courses}
        data={couponData}
        setData={setCouponData}
        onSubmit={handleCreateCoupon}
        loading={false}
      />
      
    </>
  );
}