import styles from "./SectionView.module.scss";

import {JSXElement, useContext, createResource, For, Suspense} from "solid-js";

import {Section, SectionId} from "@feature/section/type";
import {Theory} from "@feature/theory/type";
import {Exercise} from "@feature/exercise/type";
import {context} from "@src/context";
import {TheoryView} from "@src/feature/theory/component";
import {ExerciseView} from "@src/feature/exercise/component";
import {PageView} from "@src/component";

type Resource = {
    section: Section;
    theories: Theory[];
    exercises: Exercise[];
}

type Props = {
    id: SectionId;
}

export function SectionView(props: Props): JSXElement {
    const {store} = useContext(context);

    const [resource] = createResource<Resource>(
        async(): Promise<Resource> => {
            const section = await store.section.get<Section>(props.id);

            const {docs: exercises} = await store.exercise
                .find({selector: {_id: {$in: section.exerciseIds}}});

            const {docs: theories} = await store.theory
                .find({selector: {_id: {$in: section.theoryIds}}});

            return {section, theories, exercises};
        }
    );


    return (
        <div class={styles.sectionView}>
            <Suspense>
                <div class={styles.heading}>
                    <h1>{resource()?.section.title.ru}</h1>
                </div>

                <PageView>
                    <For each={resource()?.theories}>{
                        (theory): JSXElement => <TheoryView theory={theory}/>
                    }</For>
                </PageView>

                <ExerciseView exercises={resource()?.exercises}/>
            </Suspense>
        </div>
    );
}