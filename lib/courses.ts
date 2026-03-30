import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Course = {
  title: string;
  id: string;
  category: "live" | "self-paced" | "upcoming";
  type: "career" | "corporate" | "individual";
  price: number;
  duration: string;
  students?: string;
  level?: "beginner" | "intermediate" | "advanced";
  description: string;
  who_is_for: string[];
  who_is_not_for: string[];
  outcomes: string[];
  curriculum: string[];
  created_at?: string | null;
};

export async function getCourses(): Promise<Course[]> {
  const q = query(collection(db, "courses"), orderBy("created_at", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      created_at: data.created_at?.toDate().toISOString() ?? null,
    };
  }) as Course[];
}


export const filterLiveCourses = (courses: Course[]) =>
  courses.filter((c) => c.category === "live");

export const filterSelfPacedCourses = (courses: Course[]) =>
  courses.filter((c) => c.category === "self-paced");

export const filterUpcomingCourses = (courses: Course[]) =>
  courses.filter((c) => c.category === "upcoming");

// 🔹 (Optional but powerful)
export const groupCourses = (courses: Course[]) => ({
  live: filterLiveCourses(courses),
  selfPaced: filterSelfPacedCourses(courses),
  upcoming: filterUpcomingCourses(courses),
});

export async function getCoursesByCategory(category: Course["category"]) {
    const courses = await getCourses();
    return courses.filter((c) => c.category === category);
  }