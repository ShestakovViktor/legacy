import styles from "./HtmlView.module.scss";
import {JSXElement} from "solid-js";

type Props = {
    html?: string;
}

export function HtmlView(props: Props): JSXElement {
    return (
        <div class={styles.viewport} innerHTML={props.html}/>
    );
}