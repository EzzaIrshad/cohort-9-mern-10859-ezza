import { HeadingButton, type Level } from './tiptap-ui/heading-button';
import { UndoRedoButton } from './tiptap-ui/undo-redo-button'
import { Editor } from '@tiptap/react'

interface ToolbarProps {
    editor: Editor | null
}

export const TextEditorToolbar = ({ editor }: ToolbarProps) => {
    if (!editor) return null;
    const levels = [1, 2, 3, 4];

    return (
        <div className="w-full py-2 border-y border-y-gray-200 mt-4">
            <div className="flex flex-wrap items-center gap-1.5 px-3 py-1  border border-gray-200 bg-background rounded-2xl ">

                <UndoRedoButton action="undo" editor={editor} />
                <UndoRedoButton action="redo" editor={editor} />

                {levels.map((level) => (
                    <HeadingButton
                        key={level}
                        editor={editor}
                        level={level as Level}
                        showShortcut={false}
                    />
                ))}
            </div>
        </div>
    )
}