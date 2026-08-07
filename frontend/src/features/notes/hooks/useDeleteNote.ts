import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "../api/notes.api"


/**
 * Delete a note by its Id and invalidate the notes cache
 * @returns 
 */
export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notes"],
            });
        },
    });
}