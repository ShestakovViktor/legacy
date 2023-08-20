import styles from "./TheoryView.module.scss";

import {JSXElement} from "solid-js";
import {Theory} from "@feature/theory/type";


type Props = {
    theory: Theory;
}

export function TheoryView(props: Props): JSXElement {
    return (
        <div class={styles.theoryView} innerHTML={props.theory.text.ru}/>
    );
}