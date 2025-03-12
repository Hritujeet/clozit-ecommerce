export const DB_URI = process.env.MONGO_URI as string;

export type Credentials = {
    username?: string,
    email: string,
    password: string
}

export type Product = {
    productName: string;
    slug: string;
    description: string;
    price: number;
    category: "T-Shirts" | "Hoodies" | "Bottoms" | "Winter Wear";
    subCategory: string;
    stock: number;
    rating?: number;
    image: string;
    sizes: ("SM" | "M" | "L" | "XL" | "XXL")[];
    colors: string[];
    reviews?: string[]; // Assuming reviews contain ObjectId strings
    createdAt: string; // Using string since JSON responses return ISO date strings
    updatedAt: string;
};

export type ProductCardType = {
    name: string;
    price: number;
    discount: number;
    img: string;
    slug: string;
    avlSizes: string[];
    colors: string[];
};


