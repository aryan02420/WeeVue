declare function createComponent({ elementName, props, data, template, styles, methods, }: {
    elementName: string;
    props?: string[];
    data?: any;
    template: string;
    styles?: string;
    methods?: any;
}): void;
export default createComponent;
