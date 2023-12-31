import styles from "./TabView.module.scss";
import {JSXElement, children, For, createSignal} from "solid-js";

type Tab = {
    title: string;
    children: JSXElement;
}

type Props = {
    children: JSXElement[];
}

export function TabView(props: Props): JSXElement {
    const tabs = children(() => props.children).toArray() as unknown as Tab[];

    const [selected, setSelected] = createSignal(0);

    return (
        <div class={styles.tabView}>
            <div class={styles.tabBar}>
                <For each={tabs}>
                    {(tab, index): JSXElement =>
                        <button
                            class={styles.button}
                            onClick={(): number => setSelected(index())}
                        >
                            {tab.title}
                        </button>
                    }
                </For>
            </div>
            <div class={styles.tabContainer}>
                <For each={tabs}>
                    {(tab, index): JSXElement =>
                        <div classList={{
                            [styles.tabPane]: true,
                            [styles.visible]: index() == selected(),
                        }}>
                            {tab.children}
                        </div>
                    }
                </For>
            </div>
        </div>
    );
}