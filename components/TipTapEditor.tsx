"use client";

import { useEffect } from "react";
import { useEditor, EditorContent, setContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";

import {EditorToolbar} from "./EditorToolbar";

interface TiptapEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),

      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-md max-w-full",
        },
      }),

      BulletList,
      OrderedList,
      ListItem,

      Underline,
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor } : any) => {
      console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose max-w-none min-h-[300px] p-4 focus:outline-none text-foreground",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();

    if (content !== current) {
      editor.commands.setContent(content, {
        emitUpdate: false,
      }); // false = preserve cursor
    }
  }, [content, editor]);
  

  if (!editor) return null;

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};