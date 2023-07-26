import {JSXElement} from "solid-js";

type Props = {
    title: string;
    children: JSXElement;
}

export function TabItem(props: Props): JSXElement {
    return props as unknown as JSXElement;
}