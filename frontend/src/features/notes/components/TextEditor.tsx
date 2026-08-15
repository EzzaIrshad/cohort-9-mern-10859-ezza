import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextEditorToolbar } from './TextEditorToolbar'
import { useEffect } from 'react'

interface TextEditorProps {
    value?: string
    onChange?: (html: string) => void
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value || "",
        editorProps: {
            attributes: {
                class:
                    'prose max-w-none p-4 min-h-[160px] focus:outline-none focus:ring-0',
            },


        },
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getHTML())
            }
        },
    })

    useEffect(() => {
        if(!editor) return
        if(value !== editor.getHTML()) {
            editor.commands.setContent(value || "", {
                emitUpdate: false,
            })
        }
    }, [value, editor])

    return (
        <div className="w-full overflow-hidden bg-card ">
            <TextEditorToolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}