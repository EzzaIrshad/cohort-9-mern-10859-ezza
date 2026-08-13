import { useState } from "react";

type TagProps = {
    value: string[]
    onChange: (tags: string[]) => void
}

const TagInput = ({ value, onChange }: TagProps) => {
    const [input, setInput] = useState("");

    const addTag = () => {
        const tag = input.trim();

        if (!tag) return;

        if (!value.includes(tag)) {
            onChange([...value, tag])
        }

        setInput("")
    }

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove))
    };

    return (
        <div className="w-full px-3">

            {/* Wrapper input container simulating a single text box */}
            <div className="flex flex-wrap items-center gap-2 p-2 rounded-xs bg-background input-shadow focus-within:border-ring border min-h-11">

                {/* Rendered Tag List */}
                {value.map(tag => (
                    <span
                        key={tag}
                        className="flex items-center gap-1 bg-primary/40 text-forground text-sm font-medium px-2.5 py-1 rounded-md border border-primary"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-primary hover:text-red-500 transition-colors duration-150 focus:outline-none text-base font-bold leading-none pl-1"
                        >
                            &times;
                        </button>
                    </span>
                ))}

                <input
                    value={input}
                    placeholder="Add a Tag"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addTag()
                        }
                    }}
                    className="flex-1 bg-transparent border-0 outline-none p-1 text-sm text-gray-900 placeholder-gray-400 focus:ring-0 min-w-30"
                />
            </div>

            <p className="mt-2 text-xs text-gray-400">
                Press <kbd className="bg-gray-100 px-1 border rounded text-gray-600 font-sans text-[10px]">Enter</kbd> to add tag.
            </p>
        </div>
    );
};

export default TagInput;