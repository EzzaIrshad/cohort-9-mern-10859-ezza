import { Pin, Pen, Trash } from "lucide-react";
import type { Note } from "../types/notes.types";

interface ToneItem {
    bg: string;
    pinColor: string;
    chip: string;
    pillBg: string;
}

interface NoteCardProps {
    tone: ToneItem;
    noteData: Note;
}

export const NoteCard = ({
    tone,
    noteData
}: NoteCardProps) => {
    return (
        <div
            className="group relative flex flex-col justify-between rounded-sm p-3 shadow-card"
            style={{ backgroundColor: tone.bg }}
        >
            <div>
                {/* Header Actions */}
                <div className="flex items-start justify-between">
                    <span
                        className="grid size-9 place-items-center rounded-[9px] bg-white"
                        style={{
                            boxShadow:
                                "-2px 2px 2px rgba(0, 0, 0, 0.3), rgba(9, 30, 66, 0.25) 0px 1px 2px, inset -2px 2px 3px 0px rgba(255, 255, 255, 0.5), inset 2px -2px 3px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <Pin
                            className={`size-3.5 sm:size-4 rotate-45 icon-shadow ${tone.pinColor}`}
                        />
                    </span>
                    <div className="flex items-start gap-2">
                        <span
                            className="grid size-9 place-items-center rounded-[9px]"
                            style={{ background: tone.chip }}
                        >
                            <Pen className="size-3.5 sm:size-4 text-white fill-white icon-shadow" />
                        </span>
                        <span
                            className="grid size-9 place-items-center rounded-[9px]"
                            style={{ background: tone.chip }}
                        >
                            <Trash className="size-3.5 sm:size-4 text-white fill-white icon-shadow" />
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div>
                    <h3 className="mt-4 line-clamp-2 font-nunito text-lg font-extrabold leading-tight tracking-tight text-foreground">
                        {noteData.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/70">
                        {noteData.content}
                    </p>
                </div>
            </div>

            {/* Date Pill */}
            <span
                className={`text-xs font-semibold text-foreground/60 dark:text-foreground/80 mt-8 rounded-full py-1 px-2 w-fit ${tone.pillBg}`}
            >
                {new Date(noteData.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                })}
            </span>
        </div>
    );
};