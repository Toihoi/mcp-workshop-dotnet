import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Mention from '@tiptap/extension-mention';
import React from 'react';
import './TiptapEditor.css';

interface TiptapEditorProps {
  content: string;
  onChange?: (content: string) => void;
  editable?: boolean;
  placeholder?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange, editable = true, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
      }),
    ],
    content: content ? JSON.parse(content) : '',
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(JSON.stringify(editor.getJSON()));
    },
  });

  return (
    <div className={`tiptap-editor ${!editable ? 'tiptap-editor--readonly' : ''}`}>
      {editable && editor && (
        <div className="tiptap-toolbar">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            List
          </button>
        </div>
      )}
      <EditorContent editor={editor} className="tiptap-content" />
    </div>
  );
};

export default TiptapEditor;
