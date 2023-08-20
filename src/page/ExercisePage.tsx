import {JSXElement, useContext, createResource} from "solid-js";
import {Page} from "@src/layout";
import {useParams} from "@solidjs/router";
import {context} from "@src/context";
import {Playground} from "@src/feature/playground/component";
import {Exercise} from "@src/type";


type Resource = {
    exercise: Exercise;
}

export function ExercisePage(): JSXElement {
    const params = useParams<{id: string}>();
    const {store} = useContext(context);

    const [resource] = createResource<Resource>(
        async(): Promise<Resource> => {
            const exercise = await store.exercise.get<Exercise>(params.id);

            console.log(exercise.solution);

            return {exercise};
        }
    );

    return (
        <Page>
            <Playground
                problem={resource()?.exercise.text.ru}
                solution={resource()?.exercise.solution}
            />
        </Page>
    );
}