import type { SortOrder } from "mongoose";

export type BuildNoteQueryParams = {
    userId?: string;
    search?: string;
    isPinned?: "true" | "false";
    sort?: "createdAt" | "updatedAt";
};

export const buildNoteQuery = ({
    userId,
    search,
    isPinned,
    sort,
}: BuildNoteQueryParams) => {
    const filter: Record<string, unknown> = {
        userId,
    };

    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                content: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                tags: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    if (isPinned !== undefined) {
        filter.isPinned = isPinned === "true";
    }

    let sortOption: Record<string, SortOrder> = {
        isPinned: -1,
        updatedAt: -1,
    };

    if (sort === "createdAt") {
        sortOption = {
            isPinned: -1,
            createdAt: -1,
        };
    }

    return { filter, sortOption };
};
