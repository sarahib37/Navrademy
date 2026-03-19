"use client";

// import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Minus,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { Separator } from "./ui/seperator";

interface Props {
  editor: any;
}

const Btn = ({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) => (
  <Toggle size="sm" pressed={active} onPressedChange={onClick} title={title}>
    {children}
  </Toggle>
);

export const EditorToolbar = ({ editor }: Props) => {
  const setLink = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-muted/30">
      <Btn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
        <Bold className="w-4 h-4" />
      </Btn>

      <Btn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
        <Italic className="w-4 h-4" />
      </Btn>

      <Btn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
        <UnderlineIcon className="w-4 h-4" />
      </Btn>

      <Btn active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strike">
        <Strikethrough className="w-4 h-4" />
      </Btn>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Btn active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="H1">
        <Heading1 className="w-4 h-4" />
      </Btn>

      <Btn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="H2">
        <Heading2 className="w-4 h-4" />
      </Btn>

      <Btn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="H3">
        <Heading3 className="w-4 h-4" />
      </Btn>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Btn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
        <List className="w-4 h-4" />
      </Btn>

      <Btn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List">
        <ListOrdered className="w-4 h-4" />
      </Btn>

      <Btn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">
        <Quote className="w-4 h-4" />
      </Btn>

      <Btn active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code">
        <Code className="w-4 h-4" />
      </Btn>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Btn active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} title="Left">
        <AlignLeft className="w-4 h-4" />
      </Btn>

      <Btn active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} title="Center">
        <AlignCenter className="w-4 h-4" />
      </Btn>

      <Btn active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} title="Right">
        <AlignRight className="w-4 h-4" />
      </Btn>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Btn active={editor.isActive("link")} onClick={setLink} title="Link">
        <LinkIcon className="w-4 h-4" />
      </Btn>

      <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="HR">
        <Minus className="w-4 h-4" />
      </Btn>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Btn onClick={() => editor.chain().focus().undo().run()} title="Undo">
        <Undo className="w-4 h-4" />
      </Btn>

      <Btn onClick={() => editor.chain().focus().redo().run()} title="Redo">
        <Redo className="w-4 h-4" />
      </Btn>
    </div>
  );
};