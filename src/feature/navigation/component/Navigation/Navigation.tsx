import styles from "./Navigation.module.scss";
import {JSXElement, For} from "solid-js";
import {A} from "@solidjs/router";

export function Navigation(): JSXElement {
    const links = [
        {href: "/", name: "Index"},
        {href: "/playground", name: "Playground"},
    ];

    return (
        <nav class={styles.navigation}>
            <For each={links}>{({href, name}): JSXElement =>
                <A href={href}>{name}</A>
            }</For>
        </nav>
    );
}