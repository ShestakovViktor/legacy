import {Section} from "@feature/section/type";
import {Exercise} from "@feature/exercise/type";
import {Theory} from "@feature/theory/type";

export type Store = {
    exercise: PouchDB.Database<Exercise>;
    theory: PouchDB.Database<Theory>;
    section: PouchDB.Database<Section>;
};