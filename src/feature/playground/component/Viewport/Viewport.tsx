import styles from "./Viewport.module.scss";

import {JSXElement} from "solid-js";

export function Viewport(): JSXElement {

    return (
        <div class={styles.viewport}></div>
    );
}