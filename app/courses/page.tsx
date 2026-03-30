import CoursesComponent from "@/components/CoursesComponent";
import { getCourses, groupCourses,} from "@/lib/courses";

export const metadata = {
  title: "Navrademy Courses | Learn Practical Skills Online",
  description: "Explore Navrademy courses designed to teach practical skills, industry knowledge, and career-ready training for students, creators, and professionals.",
};

export default async function CoursesWrap() {
  const courses = await getCourses()
  const { live, selfPaced, upcoming } = groupCourses(courses);

  return (<CoursesComponent live={live} selfPaced={selfPaced} upcoming={upcoming}/>);
}