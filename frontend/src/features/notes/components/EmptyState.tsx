import { Plus } from "lucide-react";
import empty from "@/assets/empty-state.png"

export function EmptyState() {
    return (
        <div className="flex font-nunito w-full h-full flex-col items-center justify-center text-center">
            <div className="relative mb-6 h-32">
                <img src={empty} className="size-full" />
            </div>
            <h3 className=" text-2xl font-extrabold tracking-tight text-foreground">
                Your notebook is waiting.
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Create your first note and start organizing your ideas beautifully.
            </p>
            <button className="group inline-flex shrink-0 mt-6 items-center justify-center gap-1 sm:gap-2 rounded-full bg-peach 
            border border-pink px-2.5 sm:px-5 py-1.75 md:py-3 text-xs sm:text-sm font-semibold text-card transition hover:-translate-y-0.5">
                <Plus className="size-4" strokeWidth={2.5} />
                Create note
            </button>
        </div>
    );
}