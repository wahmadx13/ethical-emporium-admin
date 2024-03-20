export interface IBaseProps {
    projectThunkHandler: any;
    targetId: string;
    jwtToken: string;
    formLabel?: string;
    placeholder?: string;
    buttonName?: string;
    isLoading: boolean;
}

export interface IProjectTitleProps extends IBaseProps {
    projectTitle: string;
}

export interface IProjectDescriptionProps extends IBaseProps {
    projectDescription: string;
}

export interface IProjectTagsProps extends IBaseProps {
    tagsSelect: {
        label: string;
        options: {
            value: string;
            label: string;
        }[];
    }[];
    projectTags: string[];
}

export interface IProjectCategoryProps extends IBaseProps {
    categoryOptions: {
        value: string;
        label: string;
    }[];
    projectCategoryTitle: string;
}
export interface IProjectImagesProps extends IBaseProps {
    path: string;
    productImages: {
        asset_id: string;
        public_id: string;
        url: string;
    }[];
}

export interface IProductPriceProps extends IBaseProps {
    productPrice: number;
}
export interface IProductQuantityProps extends IBaseProps {
    productQuantity: number;
}

export interface IProjectBrandProps extends IBaseProps {
    projectBrand: string;
}

export interface IProjectColorsProps extends IBaseProps {
    productColors: string[];
}