import styles from "./Sanbox.module.scss";

import {JSXElement} from "solid-js";
import {
    codeToText,
    textToURL,
    setupSandbox,
} from "@feature/playground/utility";

type Props = {
    project: {
        code: string;
    };
}

export function Sandbox(props: Props): JSXElement {
    function foo(): string {
        const setupSandboxCode = codeToText(setupSandbox);

        const document = `
            <html>
                <head>
                    <script>
                        ${setupSandboxCode}
                    </script>
                    <script>
                        ${props.project.code}
                    </script>
                </head>
            </html>
        `;

        return textToURL(document);
    }

    return (<iframe class={styles.sandbox} src={foo()} />);
}