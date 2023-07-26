import styles from "./Page.module.scss";
import {JSXElement, children} from "solid-js";
import {Header} from "@src/layout";

type Props = {
    children: JSXElement;
}

export function Page(props: Props): JSXElement {
    const c = children(() => props.children);
    return (
        <div class={styles.page}>
            <Header />
            {c()}
        </div>
    );
}