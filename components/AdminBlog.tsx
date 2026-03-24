'use client'

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from './ui/button'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

export default function AdminBlog() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc")
        );
  
        const querySnapshot = await getDocs(q);
  
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setBlogPosts(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;
  
    try {
      await deleteDoc(doc(db, "blogs", id));
  
      // Update UI instantly
      setBlogPosts((prev) => prev.filter((post) => post.id !== id));
  
      console.log("Blog deleted");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if(loading){
    return <p className="text-muted-foreground">Loading blogs...</p>
  }

  return (
    <div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Posts", value: blogPosts.length },
          { label: "Published", value: blogPosts.filter((p) => !p.draft).length },
          { label: "Drafts", value: blogPosts.filter((p) => p.draft).length },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-heading font-bold text-foreground mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-semibold text-foreground">All Blog Posts</h2>
        <Button  onClick={() => router.push("/admin/dashboard?tab=blog&mode=create")}>
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-[200px] truncate">{post.title}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{post.category}</TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">{post.createdAt?.toDate?.().toLocaleDateString() || "—"}</TableCell>
                <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  !post.draft
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {post.draft ? "draft" : "published"}
                </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() =>router.push(`/admin/dashboard?tab=blog&mode=edit&id=${post.id}`)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}