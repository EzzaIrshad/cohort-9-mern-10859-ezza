import { Sparkles } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import EditorTopBar from "../components/EditorTopBar"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNoteSchema, updateNoteSchema, type CreateNoteInput, type UpdateNoteInput } from "../schemas/note.schema";
import { useGetNote } from "../hooks/useGetNote";
import { useCreateNote } from "../hooks/useCreateNote";
import { useUpdateNote } from "../hooks/useUpdateNote";
import { useEffect } from "react";
import { MdError } from "react-icons/md";
import TagInput from "../components/TagInput";
import { toast } from "sonner";

const NoteEditorPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<CreateNoteInput | UpdateNoteInput>({
        resolver: zodResolver(isEdit ? updateNoteSchema : createNoteSchema),
        defaultValues: {
            title: "",
            content: "",
            tags: [],
            isPinned: false
        }
    });

    const { data: note } = useGetNote(id ?? "", isEdit);

    const createMutation = useCreateNote();
    const updateMutation = useUpdateNote(id!);

    useEffect(() => {
        if (note) {
            reset({
                title: note.data?.title ?? "",
                content: note.data?.content ?? "",
                tags: note.data?.tags ?? [],
                isPinned: note.data?.isPinned ?? false,
            })
        }
    }, [note, reset])

    const onSubmit = (data: CreateNoteInput | UpdateNoteInput) => {
        if (isEdit && id) {
            updateMutation.mutate(data as UpdateNoteInput, {
                onSuccess: () => {
                    toast.success("Note updated successfully");
                }
            })
            return
        }

        createMutation.mutate(data as CreateNoteInput, {
            onSuccess: () => {
                toast.success("Note created successfully");
                navigate("/dashboard");
            }
        });
    }

    return (
        <main className="mx-auto w-full max-w-275 px-4 py-4 sm:px-6 lg:px-8">

            <EditorTopBar
                isEdit={isEdit}
                updateMutation={{ isLoading: updateMutation.isPending }}
                createMutation={{ isLoading: createMutation.isPending }}
            />

            {/* Workspace panel */}
            <section
                className="relative mt-4 2xl:mt-6 overflow-hidden rounded-xl border border-border/60 bg-card shadow-card">
                {/* Accent stripe */}
                <div className="h-1.5 w-full bg-primary/40" aria-hidden />

                <div className="px-6 py-6 2xl:px-8">

                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary/40 text-primary px-3 py-1 text-xs font-semibold">
                            <Sparkles className="h-3 w-3" />
                            {isEdit ? "Editing note" : "New note"}
                        </span>
                    </div>

                    <form
                        id="note-editor-form"
                        onSubmit={handleSubmit(onSubmit)}>

                        {/* Title */}
                        <div className="mt-4">
                            <label htmlFor="note-title" className="sr-only">Note title</label>
                            <input
                                id="note-title"
                                placeholder="Untitled note"
                                aria-invalid={!!errors.title}
                                aria-describedby="title-error"
                                {...register("title")}
                                className={`w-full bg-transparent font-nunito text-3xl sm:text-4xl font-extrabold text-foreground placeholder:text-foreground/25 focus:outline-none  border-b-2 border-transparent focus:border-primary pb-2`}
                            />
                            {errors.title?.message && (
                                <div className="flex items-center gap-2 mt-1.5 text-destructive">
                                    <MdError size={16} />
                                    <p id="title-error" className="text-xs">
                                        {errors.title?.message}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Editor Component */}
                        {/* <TiptapEditor
                        value="<p>Hello world! Start editing this text...</p>"
                        onChange={handleEditorChange}
                    /> */}

                        <Controller
                            name="tags"
                            control={control}
                            render={({ field }) => (
                                <TagInput
                                    value={field.value ?? []}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </form>
                </div>
            </section>
        </main>
    )
}

export default NoteEditorPage