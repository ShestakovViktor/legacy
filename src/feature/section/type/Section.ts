import {Text} from "@src/type";
import {ExerciseId} from "@feature/exercise/type";
import {TheoryId} from "@feature/theory/type";

export type SectionId = string;

export type Section = {
    _id: SectionId;
    parentId: SectionId;
    title: Text;
    theoryIds?: TheoryId[];
    exerciseIds?: ExerciseId[];
}
