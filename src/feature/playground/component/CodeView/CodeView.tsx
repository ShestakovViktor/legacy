import styles from "./CodeView.module.scss";
import {JSXElement, onMount} from "solid-js";
import {EditorView, basicSetup} from "codemirror";
import {javascript} from "@codemirror/lang-javascript";

type Props = {
    html?: string;
}

export function CodeView(props: Props): JSXElement {
    let container: HTMLDivElement | undefined;

    onMount(() => {
        new EditorView({
            extensions: [
                basicSetup,
                javascript(),
            ],
            doc: props.html,
            parent: container,
        });
    });

    return (
        <div class={styles.viewport} ref={container}/>
    );
}