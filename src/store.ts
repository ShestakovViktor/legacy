import dataString from "@src/asset/data.json";

import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import {Exercise, Section, Theory} from "./type";

const dataJSON = JSON.parse(dataString) as {
    exercise: Exercise[];
    theory: Theory[];
    section: Section[];
};

PouchDB.plugin(PouchDBFind);

const exercise = new PouchDB<Exercise>("exercise");
exercise
    .bulkDocs(dataJSON.exercise)
    .catch(err => console.log(err));

exercise
    .createIndex({index: {fields: ["_id"]}})
    .catch(err => console.log(err));


const theory = new PouchDB<Theory>("theory");
theory
    .bulkDocs(dataJSON.theory)
    .catch(err => console.log(err));


const section = new PouchDB<Section>("section");
section
    .bulkDocs(dataJSON.section)
    .catch(err => console.log(err));


export const store = {
    exercise,
    theory,
    section,
};


/*
const ddoc = {
    _id: "_design/my_index",
    views: {
        by_name: {
            map: ((doc: TOC): void => {emit(doc._id);}).toString(),
        },
    },
};

PouchDB
    .put(ddoc)
    .catch(err => console.log(err));

export store;
*/