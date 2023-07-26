import {Exercise, Theory} from ".";

export type Section = {
    title: string;
    theory: Theory;
    exercises: Exercise[];
}