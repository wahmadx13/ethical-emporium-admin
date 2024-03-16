export interface IReactCarouselProps {
    images: {
        asset_id: string;
        public_id: string;
        url: string;
    }[];
    edit: () => void;
    path: string;
    targetId: string;
}