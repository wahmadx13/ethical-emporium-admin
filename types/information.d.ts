export interface IInformationProps {
    title: string;
    value?: number | string | string[];
    ratings?: {
        star: number;
        comment: string;
        _id: string;
    }[];
    edit?: () => void;
    editable?: boolean;
    [x: string]: any;
}