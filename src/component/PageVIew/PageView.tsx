import styles from "./PageView.module.scss";
import {JSXElement, children} from "solid-js";

type Props = {
    children: JSXElement | JSXElement[];
}

export function PageView(props: Props): JSXElement {
    const pages = children(() => props.children);
    //.toArray() as unknown as JSXElement[];

    //const [selected, setSelected] = createSignal(0);

    return (
        <div class={styles.pageView}>
            <div class={styles.pageContainer}>{pages()}</div>
            <div class={styles.pageNumberBar}>Pagination</div>
        </div>
    );
}