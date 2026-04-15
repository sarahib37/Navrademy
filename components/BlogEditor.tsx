"use client";

import { useEffect, useState } from "react";
import { TiptapEditor } from "./TipTapEditor";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadImageToImgBB, deleteImageFromImgBB } from "@/lib/imgbb";

export const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [content, setContent] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [slug, setSlug] = useState(""); 
  const router = useRouter()
  const searchParams = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [deleteUrl, setDeleteUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageAlt, setImageAlt] = useState("");
  const [imageTitle, setImageTitle] = useState("");

  const mode = searchParams.get("mode"); // "create" or "edit"
  const id = searchParams.get("id");

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchBlog = async () => {
        try {
          const docRef = doc(db, "blogs", id);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            const data = docSnap.data();
  
            setTitle(data.title || "");
            setMetaTitle(data.metaTitle || "");
            setCategory(data.category || "");
            setExcerpt(data.excerpt || "");
            setMetaDescription(data.metaDescription || "");
            setContent(data.content || "");
            setIsDraft(data.draft || false);
            setSlug(data.slug || "");
            setImagePreview(data.featuredImage || "");
            setDeleteUrl(data.deleteUrl || "");
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      };
  
      fetchBlog();
    }
  }, [mode, id]); 

  // ✅ Slug generator
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-") // spaces → hyphens
      .replace(/-+/g, "-"); // remove duplicate hyphens
  };

  // ✅ Auto-fill meta title
  useEffect(() => {
    if (!metaTitle && title) {
      setMetaTitle(title);
    }
  }, [title]);

  // ✅ Auto-generate slug from title
  useEffect(() => {
    if (title) {
      setSlug(slugify(title));
    }
  }, [title]);

  const isSlugTaken = async (slug: string) => {
    const q = query(
      collection(db, "blogs"),
      where("slug", "==", slug)
    );
  
    const snapshot = await getDocs(q);
  
    // If editing, ignore current blog
    if (mode === "edit" && id) {
      return snapshot.docs.some(doc => doc.id !== id);
    }
  
    return !snapshot.empty;
  };

  const handleSaveBlog = async () => {
    setLoading(true);
    setError("");
  
    if (!title || !category || !excerpt || !metaDescription) {
      setLoading(false);
      return;
    }
  
    try {
      const slugExists = await isSlugTaken(slug);
  
      if (slugExists) {
        setError("Slug already exists. Please change the title.");
        setLoading(false);
        return;
      }
  
      let imageUrl = imagePreview;
      let imageDeleteUrl = deleteUrl;
  
      if (file) {
        setUploadingImage(true);

        await deleteImageFromImgBB(deleteUrl);

        const uploaded = await uploadImageToImgBB(file);

        imageUrl = uploaded.url;
        imageDeleteUrl = uploaded.deleteUrl;

        setUploadingImage(false);
      }
  
      const blogData = {
        title,
        metaTitle,
        slug,
        excerpt,
        metaDescription,
        category,
        content,
        draft: isDraft,
        featuredImage: imageUrl,
        deleteUrl: imageDeleteUrl,
        featuredImageAlt: imageAlt,
        featuredImageTitle: imageTitle,
        updatedAt: serverTimestamp(),
      };
  
      if (mode === "edit" && id) {
        await updateDoc(doc(db, "blogs", id), blogData);
      } else {
        await addDoc(collection(db, "blogs"), {
          ...blogData,
          createdAt: serverTimestamp(),
        });
      }
  
      router.push("/admin/dashboard?tab=blog");
  
    } catch (error) {
      console.error("Error saving blog:", error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleSaveBlog}>
        {loading
          ? "Loading..."
          : mode === "edit"
          ? "Update Blog"
          : isDraft
          ? "Save Draft"
          : "Publish Blog"}
        </Button>
      </div>

      {/* Title */}
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required/>
      </div>

      <div>
        <Label>Slug</Label>
        <Input value={slug} readOnly className="bg-muted" />
      </div>

      {/* Meta + Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Meta Title</Label>
          <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
        </div>

        <div>
          <Label>Category</Label>
          <Input value={category} required onChange={(e) => setCategory(e.target.value)} />
        </div>
      </div>

      {/* Excerpt + Meta Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Excerpt</Label>
          <Textarea value={excerpt} required onChange={(e) => setExcerpt(e.target.value)} />
        </div>

        <div>
          <Label>Meta Description</Label>
          <Textarea value={metaDescription}  required onChange={(e) => setMetaDescription(e.target.value)} />
        </div>
      </div>

      {/* Featured Image */}
      <div className="space-y-3">
        <Label>Featured Image</Label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full max-w-xs h-40 object-cover rounded-lg border"
          />
        )}

        <div className="flex items-center gap-3">
          <Input
            type="file"
            className="cursor-pointer"
            accept="image/*"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (!selected) return;

              setFile(selected);
              setImagePreview(URL.createObjectURL(selected));
            }}
          />

          {imagePreview && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setFile(null);
                setImagePreview("");
                setDeleteUrl("");
              }}
            >
              Remove
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Image Alt Text</Label>
            <Input
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              placeholder="Describe the image (SEO + accessibility)"
            />
          </div>

          <div>
            <Label>Image Title (optional)</Label>
            <Input
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              placeholder="Tooltip / additional context"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        <Label>Content</Label>
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      {/* Draft Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="draft"
          checked={isDraft}
          onChange={(e) => setIsDraft(e.target.checked)}
          className="w-4 h-4"
        />
        <Label htmlFor="draft">Save as draft</Label>
      </div>
    </div>
  );
};