import styles from "./Console.module.scss";

import {JSXElement, createSignal, For} from "solid-js";
import {Message} from "@feature/playground/type";

export function Console(): JSXElement {
    const [logs, setLogs] = createSignal<Message[]>([]);

    window.addEventListener("message", function (e) {
        const message = e.data as Message;

        if (message.type == "sys") {
            setLogs([]);
        }
        else {
            setLogs([...logs(), e.data]);
        }
    });

    return (
        <div class={styles.console}>
            <For each={logs()}>
                {(log): JSXElement =>
                    <li classList={{
                        [styles.log]: log.type == "log",
                        [styles.err]: log.type == "err",
                    }}>
                        {log.text}
                    </li>
                }
            </For>
        </div>
    );
}