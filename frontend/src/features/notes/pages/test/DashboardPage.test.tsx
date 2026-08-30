import { jest } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const mockUseGetNotes = jest.fn();
const mockUseOutletContext = jest.fn();
const mockNotesPanel = jest.fn();

jest.unstable_mockModule("react-router-dom", () => {
    const actual = jest.requireActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );

    return {
        ...actual,
        useOutletContext: mockUseOutletContext,
    };
});

jest.unstable_mockModule("../../hooks/useGetNotes", () => ({
    useGetNotes: mockUseGetNotes,
}));

jest.unstable_mockModule("../../components/NotesPanel", () => ({
    default: (props: {
        notes: unknown[];
        isLoading: boolean;
        tab: string;
        setTab: (tab: string) => void;
        search: string;
        sort: string;
        setSort: (sort: string) => void;
    }) => {
        mockNotesPanel(props);

        return (
            <div data-testid="notes-panel">
                Notes Panel
            </div>
        );
    },
}));

const { default: DashboardPage } = await import("../DashboardPage");

describe("DashboardPage", () => {
    const mockSetTab = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        mockUseOutletContext.mockReturnValue({
            search: "",
            tab: "all-notes",
            setTab: mockSetTab,
        });

        mockUseGetNotes.mockReturnValue({
            data: {
                data: [
                    {
                        _id: "1",
                        title: "First Note",
                    },
                    {
                        _id: "2",
                        title: "Second Note",
                    },
                ],
            },
            isLoading: false,
        });
    });

    const renderDashboard = () => {
        return render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );
    };

    it("should render the NotesPanel", () => {
        renderDashboard();

        expect(
            screen.getByTestId("notes-panel")
        ).toBeInTheDocument();
    });

    it("should call useGetNotes with default parameters", () => {
        renderDashboard();

        expect(mockUseGetNotes).toHaveBeenCalledWith({
            search: undefined,
            isPinned: undefined,
            sort: "createdAt",
        });
    });

    it("should pass search to useGetNotes", () => {
        mockUseOutletContext.mockReturnValue({
            search: "meeting",
            tab: "all-notes",
            setTab: mockSetTab,
        });

        renderDashboard();

        expect(mockUseGetNotes).toHaveBeenCalledWith({
            search: "meeting",
            isPinned: undefined,
            sort: "createdAt",
        });
    });

    it("should request only pinned notes when the pinned tab is active", () => {
        mockUseOutletContext.mockReturnValue({
            search: "",
            tab: "pinned",
            setTab: mockSetTab,
        });

        renderDashboard();

        expect(mockUseGetNotes).toHaveBeenCalledWith({
            search: undefined,
            isPinned: true,
            sort: "createdAt",
        });
    });

    it("should pass notes and loading state to NotesPanel", () => {
        const notes = [
            {
                _id: "1",
                title: "First Note",
            },
            {
                _id: "2",
                title: "Second Note",
            },
        ];

        mockUseGetNotes.mockReturnValue({
            data: {
                data: notes,
            },
            isLoading: false,
        });

        renderDashboard();

        expect(mockNotesPanel).toHaveBeenCalledWith(
            expect.objectContaining({
                notes,
                isLoading: false,
                tab: "all-notes",
                search: "",
                sort: "createdAt",
                setTab: mockSetTab,
                setSort: expect.any(Function),
            })
        );
    });

    it("should pass loading state to NotesPanel", () => {
        mockUseGetNotes.mockReturnValue({
            data: undefined,
            isLoading: true,
        });

        renderDashboard();

        expect(mockNotesPanel).toHaveBeenCalledWith(
            expect.objectContaining({
                notes: [],
                isLoading: true,
            })
        );
    });

    it("should render the create new note link", () => {
        renderDashboard();

        const createNoteLink = screen.getByRole("link", {
            name: "Create new note",
        });

        expect(createNoteLink).toHaveAttribute(
            "href",
            "/notes/new"
        );
    });

    it("should use an empty notes array when no data is returned", () => {
        mockUseGetNotes.mockReturnValue({
            data: undefined,
            isLoading: false,
        });

        renderDashboard();

        expect(mockNotesPanel).toHaveBeenCalledWith(
            expect.objectContaining({
                notes: [],
                isLoading: false,
            })
        );
    });

    it("should update the sort value when setSort is called", async () => {
        renderDashboard();

        const firstCallProps = mockNotesPanel.mock
            .calls[0][0] as {
                setSort: (
                    sort: "createdAt" | "updatedAt"
                ) => void;
            };

        firstCallProps.setSort("updatedAt");

        await waitFor(() => {
            expect(mockUseGetNotes).toHaveBeenLastCalledWith({
                search: undefined,
                isPinned: undefined,
                sort: "updatedAt",
            });
        });
    });
});