export interface IUpdateProductState {
    title: string | null;
    productDescription: string | null;
    price: number | null;
    quantity: number | null;
    brand: string | null;
    category: string | null;
    colors: string[] | null;
    selectTags: string[] | null;
}

export interface IEditState {
    title: boolean;
    description: boolean;
    price: boolean;
    quantity: boolean;
    brand: boolean;
    category: boolean;
    colors: boolean;
    tags: boolean;
    images: boolean;
}