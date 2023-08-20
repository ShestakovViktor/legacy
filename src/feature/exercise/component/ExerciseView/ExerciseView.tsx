import styles from "./ExerciseView.module.scss";

import {JSXElement, For} from "solid-js";
import {A} from "@solidjs/router";
import {Exercise} from "@feature/exercise/type";



type Props = {
    exercises?: Exercise[];
}

export function ExerciseView(props: Props): JSXElement {
    return (
        <div class={styles.exerciseView}>
            <For each={props.exercises}>{
                (exercise: Exercise): JSXElement =>
                    <A href={`/exercise/${exercise._id}`}>
                        {exercise._id}
                    </A>
            }</For>
        </div>
    );
}