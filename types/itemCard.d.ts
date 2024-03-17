export interface IItemCardProps {
    id: Object;
    name: string;
    image: string | null;
    images?: {
        asset_id: string;
        public_id: string;
        url: string;
    }[];
    handleModelOpen: (id: Object, title: string, assetIds: string[]) => void;
    colors?: string[];
    brand?: string;
    totalRating?: number;
    url: string;
    author?: string;
    likes?: [];
    dislikes?: [];
}