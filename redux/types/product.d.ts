export interface IUpdateProductFieldTypes {
    id: string,
    title?: string,
    slug?: string;
    description?: string;
    price?: number;
    quantity?: number,
    brand?: string;
    category?: string;
    color?: string[],
    tags?: string[]
}