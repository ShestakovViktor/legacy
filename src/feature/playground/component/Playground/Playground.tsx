import styles from "./Playground.module.scss";

import {JSXElement} from "solid-js";
import {createStore} from "solid-js/store";
import {TabPanel, TabItem} from "@src/component";

import {
    Viewport,
    Editor,
    Sandbox,
    Console,
} from "@feature/playground/component";

export function Playground(): JSXElement {
    const [date, setState] = createStore<{code: string}>({code: ""});

    return (
        <div class={styles.playground}>
            <TabPanel>
                <TabItem title="Instructions">
                    <Viewport />
                </TabItem>

                <TabItem title="Output">
                    <Sandbox project={date} />
                </TabItem>
            </TabPanel>

            <Editor src={setState} />
            <Console />
        </div>
    );
}