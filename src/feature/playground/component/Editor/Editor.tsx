import styles from "./Editor.module.scss";

import {onMount, JSXElement} from "solid-js";

import {EditorView, basicSetup} from "codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {SetStoreFunction} from "solid-js/store";

type Props = {
    src: SetStoreFunction<{code: string}>;
}

export function Editor(props: Props): JSXElement {
    let container: HTMLDivElement | undefined;

    onMount(() => {
        const updateListenerExtension = EditorView
            .updateListener.of((event) => {
                if (event.docChanged) {
                    props.src({code: event.state.doc.toString()});
                }
            });

        new EditorView({
            extensions: [
                basicSetup,
                javascript(),
                updateListenerExtension,
            ],
            parent: container,
        });
    });

    return (<div class={styles.editor} ref={container}></div>);
}