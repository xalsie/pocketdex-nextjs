"use client";

import { useState, useEffect, useRef } from "react";

export default function MultiSelectDropdown({
    formFieldName,
    options,
    onChange,
    placeHolder = "Select one or more options",
}) {
    const [isJsEnabled, setIsJsEnabled] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [search, setSearch] = useState("");
    const optionsListRef = useRef(null);

    useEffect(() => {
        setIsJsEnabled(true);
    }, []);

    const handleChange = (e) => {
        const isChecked = e.target.checked;
        const optionId = e.target.value;
        const optionName = e.target.getAttribute("data-name");
        let newSelectedOptions = [...selectedOptions];
        if (isChecked) {
            newSelectedOptions.push({ id: optionId, name: optionName });
        } else {
            newSelectedOptions = newSelectedOptions.filter((opt) => opt.id !== optionId);
        }
        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
    };

    const isClearSelectionEnabled = selectedOptions.length > 0;

    const handleClearSelectionClick = (e) => {
        e.preventDefault();

        const optionsInputs = optionsListRef.current.querySelectorAll("input");
        optionsInputs.forEach((input) => {
            input.checked = false;
        });

        setSelectedOptions([]);
        onChange([]);
    };

    return (
        <label className="relative">
            <input type="checkbox" className="hidden peer" />

            <div
                className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center transition-transform inline-flex border border-gray-200 rounded-sm px-5 py-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {placeHolder}
                {isJsEnabled && selectedOptions.length > 0 && (
                    <span className="ml-1 text-blue-500">{`(${selectedOptions.length} selected)`}</span>
                )}
            </div>

            <div className="absolute bg-white border border-gray-200 transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto w-full max-h-60 overflow-y-scroll z-10">
                {isJsEnabled && (
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full border rounded px-2 py-1 mb-2"
                        />
                        {isClearSelectionEnabled && (
                            <button
                                onClick={handleClearSelectionClick}
                                className="w-full text-left px-2 py-1 text-blue-600 hover:underline mb-2"
                            >
                                Tout désélectionner
                            </button>
                        )}
                    </div>
                )}
                <ul ref={optionsListRef}>
                    {options.filter(option => option.name.toLowerCase().includes(search.toLowerCase())).map((option, i) => {
                        return (
                            <li key={option.id}>
                                <label
                                    className={`flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200`}
                                >
                                    <input
                                        type="checkbox"
                                        name={formFieldName}
                                        value={option.id}
                                        data-name={option.name}
                                        className="cursor-pointer"
                                        checked={selectedOptions.some((opt) => opt.id === String(option.id))}
                                        onChange={handleChange}
                                    />
                                    <span className="ml-1">{option.name}</span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </label>
    );
}