"use client";
import React, { useState } from "react";
import Image from "next/image";
import Search from "../assets/svgs/search.svg";
import Close from "../assets/svgs/close.svg";
import { useRouter } from "next/navigation";

interface SearchInputProps {
    isMobile?: boolean;
    onToggle?: () => void;
    padding?: string;
    width?: string;
    height?: string;
    placeHolder?: string;
    textColor?: string;
    borderRadius?: string
    backgroundColor?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    isMobile = false,
    onToggle,
    padding = "p-1 pr-2",
    width = "w-[250px]",
    height = "h-auto",
    placeHolder = "text-gray-600",
    textColor = "gray-700",
    borderRadius = "full",
    backgroundColor = ""
}) => {
    const [query, setQuery] = useState<string>("");
    const router = useRouter();

    const handleSearch = () => {
        if (query.trim() !== "") {
            router.push(`/search?query=${encodeURIComponent(query)}`);
        }
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div
            className={`flex justify-between gap-1 items-center border bg-${backgroundColor} rounded-${borderRadius} ${padding} ${height} ${isMobile ? "md:hidden" : "hidden md:flex"
                }`}
        >
            <input
                placeholder="Find any apps"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className={`${width} bg-transparent focus:outline-none rounded-${borderRadius} text-md p-1 pl-2 placeholder:${placeHolder} text-${textColor}`}
            />
            {isMobile ? (
                <Image
                    src={Close}
                    alt="close"
                    className="w-5 cursor-pointer"
                    onClick={onToggle}
                    loading="lazy"
                />
            ) : (
                <Image
                    src={Search}
                    alt="search"
                    className="w-5 cursor-pointer"
                    onClick={handleSearch}
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default SearchInput;
