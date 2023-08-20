import styles from "./Playground.module.scss";

import {JSXElement} from "solid-js";
import {createStore} from "solid-js/store";
import {TabView, TabItem} from "@src/component";

import {
    HtmlView,
    CodeView,
    Editor,
    Sandbox,
    Console,
} from "@feature/playground/component";

type Mode = "education";

type Props = {
    problem?: string;
    solution?: string;
    mode?: Mode;
}

export function Playground(props: Props): JSXElement {
    const [date, setState] = createStore<{code: string}>({code: ""});

    return (
        <div class={styles.playground}>
            <TabView>
                <TabItem title="Instructions">
                    <HtmlView html={props.problem} />
                </TabItem>

                <TabItem title="Hints">
                    <HtmlView html={props.solution} />
                </TabItem>

                <TabItem title="Solution">
                    <CodeView html={props.solution} />
                </TabItem>

                <TabItem title="Output">
                    <Sandbox project={date} />
                </TabItem>
            </TabView>

            <Editor src={setState} />
            <Console />
        </div>
    );
}