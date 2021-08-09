declare function createComponent({ name, props, data, template, styles, methods, }: {
    name: string;
    props?: any;
    data?: Function;
    template: Function;
    styles?: string;
    methods?: any;
}): void;
export default createComponent;
