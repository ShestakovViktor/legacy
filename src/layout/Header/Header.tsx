import styles from "./Header.module.scss";
import {JSXElement} from "solid-js";
import {Navigation} from "@feature/navigation/component";

export function Header(): JSXElement {
    return (
        <header class={styles.header}>
            <Navigation />
        </header>
    );
}