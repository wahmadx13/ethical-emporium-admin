export interface IUpdateBlogFieldTypes {
    id: string;
    title?: string;
    slug?: string;
    description?: string;
    category?: string;
    tags?: string[];
}

export interface IBlog {
    title: string;
    slug?: string;
    description: string;
    category: string;
    tags: string[];
}