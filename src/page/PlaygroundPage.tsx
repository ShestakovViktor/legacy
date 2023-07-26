import {JSXElement} from "solid-js";
import {Page} from "@src/layout";
import {Playground} from "@feature/playground/component";

export function PlaygroundPage(): JSXElement {
    return (
        <Page>
            <Playground />
        </Page>
    );
}