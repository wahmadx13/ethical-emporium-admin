export interface IAddProduct {
    title: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    color: string[];
    quantity: number;
    tags: string[];
}

export interface IRichTextEditor {
    onChange: any;
    onBlur: any;
    formLabel: string;
    placeholder: string;
    value: string;
    formikTouched: boolean;
    formikError: string;
}

export interface IFormControlSelectProps {
    formLabel: string;
    onChange: any;
    onBlur: any;
    value: string[] | string;
    name: string;
    placeholder: string;
    formikTouched: boolean;
    formikError: string | string[];
    multipleOpt: boolean;
    options: string[];
    noOptionMessage?: string;
}

export interface IFormControlProps {
    formLabel: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    value: string | number;
    placeholder: string;
    name: string;
    type: string;
    formikTouched: boolean;
    formikError: string;
}