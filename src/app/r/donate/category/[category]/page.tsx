import React from 'react';
import { useRouter } from "next/navigation";

const CategoryPage: React.FC = () => {
    const router = useRouter();
    const { category } = router.query;

    return (
        <div>
            <h1>Donate to {category}</h1>
            <p>Thank you for considering a donation to {category}. Your support helps us continue our mission.</p>
            {/* Add more content and components as needed */}
        </div>
    );
};

export default CategoryPage;