import { Sparkles } from "lucide-react"
import { useParams } from "react-router-dom"
import EditorTopBar from "../components/EditorTopBar"

const NoteEditorPage = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);

    return (
        <main className="mx-auto w-full max-w-275 px-4 py-4 sm:px-6 lg:px-8">

            <EditorTopBar isEdit={isEdit} />

            {/* Workspace panel */}
            <section
                className="relative mt-4 2xl:mt-6 overflow-hidden rounded-xl border border-border/60 bg-card shadow-card">
                {/* Accent stripe */}
                <div className="h-1.5 w-full bg-primary/40" aria-hidden />

                <div className="px-6 py-6 2xl:px-8">

                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary/40 text-primary px-3 py-1 text-xs font-semibold"

                        >
                            <Sparkles className="h-3 w-3" />
                            {isEdit ? "Editing note" : "New note"}
                        </span>
                    </div>

                    {/* Title */}
                    <div className="mt-4">
                        <label htmlFor="note-title" className="sr-only">Note title</label>
                        <input
                            id="note-title"
                            value=""
                            onChange={() => { }}
                            placeholder="Untitled note"
                            aria-describedby="title-error"
                            className={`w-full bg-transparent font-nunito text-3xl sm:text-4xl font-extrabold text-foreground placeholder:text-foreground/25 focus:outline-none  border-b-2 border-transparent focus:border-primary pb-2`}
                        />
                    </div>

                </div>
            </section>
        </main>
    )
}

export default NoteEditorPage