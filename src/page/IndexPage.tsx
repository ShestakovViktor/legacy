import {JSXElement} from "solid-js";
import {Page} from "@src/layout";
import {TreeView} from "@src/component";

export function IndexPage(): JSXElement {
    const tree = {
        label: "Chapter 1",
        children: [
            {
                label: "Chapter 1.1",
                children: [
                    {label: "Chapter 1.1.1"},
                    {label: "Chapter 1.1.2"},
                    {label: "Chapter 1.1.3"},
                ],
            },
            {
                label: "Chapter 2.1",
                children: [
                    {label: "Chapter 2.1.1"},
                ],
            },
            {label: "Chapter 3.1"},
        ],
    };

    return (
        <Page>
            <TreeView node={tree}/>
        </Page>
    );
}