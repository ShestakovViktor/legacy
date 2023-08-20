import {Text} from "../../../type/Text";

export type ExerciseId = string;

export type Exercise = {
    _id: ExerciseId;
    text: Text;
    hints: Text[];
    test: string;
    solution: string;
}