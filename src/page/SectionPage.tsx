import {JSXElement} from "solid-js";
import {Page} from "@src/layout";
import {useParams} from "@solidjs/router";
import {SectionView} from "@feature/section/component";



export function SectionPage(): JSXElement {
    const params = useParams<{id: string}>();

    return (
        <Page>
            <SectionView id={params.id}/>
        </Page>
    );
}