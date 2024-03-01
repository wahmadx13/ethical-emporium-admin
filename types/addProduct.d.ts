export interface IProduct {
    title: string;
    slug?: string;
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
    onChange?: any;
    onBlur?: any;
    name: string;
    placeholder: string;
    formikTouched: boolean;
    formikError: string | string[];
    multipleOpt: boolean;
    options: any;
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

export interface ISelectProps {
    value: string;
    label: string;
}

export interface ISelectColorProps {
    value: string;
    label: string;
    colorScheme: string;
}