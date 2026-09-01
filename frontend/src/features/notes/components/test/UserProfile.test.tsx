import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

type MockUser = {
    fullName: string;
    email: string;
    createdAt: string;
};

type MockNote = {
    createdAt: string;
};

type LogoutMutationOptions = {
    onSuccess?: () => void;
};

const mockNavigate = jest.fn<
    (to: string, options?: { replace?: boolean }) => void
>();

const mockMutate = jest.fn<
    (variables: undefined, options: LogoutMutationOptions) => void
>();

let mockUserData: MockUser | undefined;
let mockNotesData: MockNote[] | undefined;
let mockIsPending = false;

jest.unstable_mockModule("@/features/auth/hooks/useGetUser", () => ({
    useGetUser: () => ({
        data: mockUserData
            ? {
                data: mockUserData,
            }
            : undefined,
    }),
}));

jest.unstable_mockModule("../../hooks/useGetNotes", () => ({
    useGetNotes: () => ({
        data: mockNotesData
            ? {
                data: mockNotesData,
            }
            : undefined,
    }),
}));

jest.unstable_mockModule("@/features/auth/hooks/useLogout", () => ({
    useLogout: () => ({
        mutate: mockMutate,
        isPending: mockIsPending,
    }),
}));

jest.unstable_mockModule("react-router-dom", async () => {
    const actual = await jest.requireActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

jest.unstable_mockModule("@/shared/components/ui/alert-dialog", () => {

    const AlertDialog = ({
        children,
        open,
        onOpenChange,
    }: {
        children: React.ReactNode;
        open?: boolean;
        onOpenChange?: (open: boolean) => void;
    }) => {
        return (
            <div
                data-testid="alert-dialog"
                data-open={open}
                onClick={() => onOpenChange?.(false)}
            >
                {children}
            </div>
        );
    };

    const AlertDialogTrigger = ({
        render,
    }: {
        render: React.ReactElement;
    }) => render;

    const AlertDialogContent = ({
        children,
    }: {
        children: React.ReactNode;
    }) => (
        <div data-testid="alert-dialog-content">
            {children}
        </div>
    );

    const AlertDialogHeader = ({
        children,
    }: {
        children: React.ReactNode;
    }) => <div>{children}</div>;

    const AlertDialogFooter = ({
        children,
    }: {
        children: React.ReactNode;
    }) => <div>{children}</div>;

    const AlertDialogTitle = ({
        children,
    }: {
        children: React.ReactNode;
    }) => <h2>{children}</h2>;

    const AlertDialogDescription = ({
        children,
    }: {
        children: React.ReactNode;
    }) => <p>{children}</p>;

    const AlertDialogCancel = ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        className?: string;
    }) => <button {...props}>{children}</button>;

    const AlertDialogAction = ({
        children,
        onClick,
        ...props
    }: {
        children: React.ReactNode;
        onClick?: () => void;
        className?: string;
    }) => (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    );

    return {
        AlertDialog,
        AlertDialogAction,
        AlertDialogCancel,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle,
        AlertDialogTrigger,
    };
});

const { default: UserProfile } = await import("../UserProfile");

const renderUserProfile = (
    onOpenChange: (open: boolean) => void = jest.fn()
) => {
    return render(
        <MemoryRouter>
            <UserProfile onOpenChange={onOpenChange} />
        </MemoryRouter>
    );
};

describe("UserProfile", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        mockUserData = {
            fullName: "John Doe",
            email: "john@example.com",
            createdAt: "2026-01-15T00:00:00.000Z",
        };

        mockNotesData = [
            {
                createdAt: new Date().toISOString(),
            },
            {
                createdAt: new Date().toISOString(),
            },
            {
                createdAt: "2025-01-10T00:00:00.000Z",
            },
        ];

        mockIsPending = false;
    });

    it("should render the user profile information", () => {
        renderUserProfile();

        expect(
            screen.getByRole("heading", {
                name: "My Profile",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: "John Doe",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByText("john@example.com")
        ).toBeInTheDocument();

        expect(
            screen.getByText("January 2026")
        ).toBeInTheDocument();
    });

    it("should render the user's initials", () => {
        renderUserProfile();

        expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should display total notes count", () => {
        renderUserProfile();

        expect(screen.getByText("3")).toBeInTheDocument();

        expect(
            screen.getByText("Total Notes")
        ).toBeInTheDocument();
    });

    it("should display notes created this month", () => {
        renderUserProfile();

        expect(
            screen.getByText("Created this month")
        ).toBeInTheDocument();

        const currentMonthNotes = mockNotesData?.filter((note) => {
            const date = new Date(note.createdAt);
            const now = new Date();

            return (
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear()
            );
        }).length;

        expect(
            screen.getByText(String(currentMonthNotes))
        ).toBeInTheDocument();
    });

    it("should show Unknown when user creation date is unavailable", () => {
        mockUserData = {
            fullName: "John Doe",
            email: "john@example.com",
            createdAt: "",
        };

        renderUserProfile();

        expect(screen.getByText("Unknown")).toBeInTheDocument();
    });

    it("should call onOpenChange with false when Cancel is clicked", async () => {
        const user = userEvent.setup();
        const mockOnOpenChange = jest.fn<(open: boolean) => void>();

        renderUserProfile(mockOnOpenChange);

        await user.click(
            screen.getByRole("button", { name: "Cancel profile" })
        );

        expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });

    it("should open the logout confirmation dialog", async () => {
        const user = userEvent.setup();

        renderUserProfile();

        await user.click(
            screen.getByRole("button", {
                name: /log out/i,
            })
        );

        expect(
            screen.getByRole("heading", {
                name: "Log out of Notik?",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "You'll need to sign in again to access your notes."
            )
        ).toBeInTheDocument();
    });

    it("should close the logout confirmation dialog when Cancel is clicked", async () => {
        const user = userEvent.setup();

        renderUserProfile();

        await user.click(
            screen.getByRole("button", {
                name: /log out/i,
            })
        );

        expect(
            screen.getByRole("heading", {
                name: "Log out of Notik?",
            })
        ).toBeInTheDocument();

        await user.click(
            screen.getByRole("button", {
                name: "Cancel",
            })
        );

        expect(
            screen.getByRole("heading", {
                name: "Log out of Notik?",
            })
        ).toBeInTheDocument();
    });

    it("should call logout mutation when logout is confirmed", async () => {
        const user = userEvent.setup();

        renderUserProfile();

        await user.click(
            screen.getByRole("button", {
                name: /log out/i,
            })
        );

        await user.click(
            screen.getByRole("button", {
                name: "Logout",
            })
        );

        expect(mockMutate).toHaveBeenCalledTimes(1);

        expect(mockMutate).toHaveBeenCalledWith(
            undefined,
            expect.objectContaining({
                onSuccess: expect.any(Function),
            })
        );
    });

    it("should navigate to login after successful logout", async () => {
        const user = userEvent.setup();

        renderUserProfile();

        await user.click(
            screen.getByRole("button", {
                name: /log out/i,
            })
        );

        await user.click(
            screen.getByRole("button", {
                name: "Logout",
            })
        );

        const [, options] = mockMutate.mock.calls[0];

        options.onSuccess?.();

        expect(mockNavigate).toHaveBeenCalledWith("/login", {
            replace: true,
        });
    });

    it("should render Unknown when user data is unavailable", () => {
        mockUserData = undefined;

        renderUserProfile();

        expect(screen.getByText("Unknown")).toBeInTheDocument();
    });

    it("should handle notes data being unavailable", () => {
        mockNotesData = undefined;

        renderUserProfile();

        expect(
            screen.getByText("Total Notes")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Created this month")
        ).toBeInTheDocument();
    });
});