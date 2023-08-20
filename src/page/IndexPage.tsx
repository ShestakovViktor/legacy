import {JSXElement, useContext, createResource, Suspense} from "solid-js";
import {useNavigate} from "@solidjs/router";

import {context} from "@src/context";
import {Page} from "@src/layout";
import {TreeView} from "@src/component";
import {Section} from "@src/type";


type TOC = {
    _id: string;
    title: string;
    children?: TOC[];
}

export function IndexPage(): JSXElement {
    const navigate = useNavigate();
    const {store} = useContext(context);

    async function getTOC(toc: Section): Promise<TOC> {
        const chilren = await store.section.query(
            (doc, emit) => {if (emit) emit(doc.parentId, doc);},
            {key: toc._id, include_docs: true}
        );

        const boop = await Promise.all(
            chilren.rows.map(row => getTOC(row.value))
        );

        return {
            _id: toc._id,
            title: toc.title.ru ?? "undefined",
            ...chilren.rows.length && {
                children: boop,
            },
        };
    }

    const [data] = createResource(async() => {
        await new Promise(r => setTimeout(r, 1000));
        const root = await store.section.get<Section>("js:root");
        return getTOC(root);
    });

    function handleNavigate(obj: Section): void {
        navigate(`/section/${obj._id}`);
    }

    const bar: TOC = {
        _id: "",
        title: "hello",
    };

    return (
        <Page>
            <Suspense fallback={<p>Draw sheet</p>}>
                <TreeView node={data() ?? bar} onClick={handleNavigate}/>
            </Suspense>
        </Page>
    );
}