"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryList from "./CategoryList";

export default function CategoryListWrapper({ initialCategory }: { initialCategory: string }) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        if (category) {
            router.push(`/?category=${encodeURIComponent(category)}`);
        } else {
            router.push("/");
        }
    };

    return (
        <CategoryList
            onSelectCategory={handleSelectCategory}
            selectedCategory={selectedCategory}
        />
    );
}
