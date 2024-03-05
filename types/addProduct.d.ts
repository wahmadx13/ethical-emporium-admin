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
    [key?: string]: any
}

export interface IRichTextEditor {
    onChange: any;
    formLabel: string;
    placeholder: string;
    value: string;
    setProductDescription: (text: string) => void;
    validationError: boolean;
    setValidationError: Dispatch<SetStateAction<boolean>>;
}

export interface IFormControlSelectProps {
    formLabel: string;
    onChange?: any;
    name: string;
    placeholder: string;
    multipleOpt: boolean;
    value: string | string[];
    validationError: boolean;
    setValidationError: Dispatch<SetStateAction<boolean>>;
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