import styles from "./TreeView.module.scss";
import {JSXElement, createSignal, For, Show} from "solid-js";


type Node = {
    label: string;
    children?: Node[];
}

type Props = {
    node: Node;
    lvl?: number;
    onclick?: (selected: any) => void;
}

export function TreeView(props: Props): JSXElement {
    const childs = (): Node[] | undefined => props.node.children;
    const [isCollapsed, setCollapsed] = createSignal(false);

    function titleOnclick(event: MouseEvent): void {
        event.stopPropagation();

        if (props.node.children) {
            setCollapsed(!isCollapsed());
        }
        else if (props.onclick) {
            props.onclick(props.node);
        }
    }

    const type = !props.lvl ? "root" : !childs() ? "leaf" : "branch";

    return (
        <div classList={{
            [styles.node]: true,
            [styles[type]]: true,
            [styles.open]: !isCollapsed(),
        }}>
            <div class={styles.head} onClick={titleOnclick}>
                {props.node.label}
            </div>
            <Show when={childs() && !isCollapsed()}>
                <div class={styles.body}>
                    <For each={childs()}>{(child): JSXElement =>
                        <TreeView
                            node = {child}
                            lvl = {(props.lvl ?? 0) + 1}
                        />
                    }</For>
                </div>
            </Show>
        </div>
    );
}
