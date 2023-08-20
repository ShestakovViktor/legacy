import fs from "fs/promises";
import path from "path";
import {Text} from "@src/type";
import {Exercise} from "@feature/exercise/type";
import {Theory} from "@feature/theory/type";

import {Section} from "@feature/section/type";
import {language} from "../src/common";

const root = path.join(__dirname, ".");

const result: {
    exercise: Exercise[];
    theory: Theory[];
    section: Section[];
} = {
    exercise: [],
    theory: [],
    section: [],
};

function jsId(id: string): string {
    return `js:${id}`;
}

async function addExercise(folder: string): Promise<Exercise> {
    const _id = jsId(path.parse(folder).name);

    const text: Text = {};
    for await (const lang of language) {
        const filePath = path.join(folder, `text.${lang}.html`);
        text[lang] = await fs.readFile(filePath, "utf8");
    }

    const data = path.join(folder, "data.json");
    const json = await fs.readFile(data, "utf8");
    const {hints} = JSON.parse(json) as {
        hints: {[key in typeof language[number]]: string}[];
    };


    const testPath = path.join(folder, "test.ts");
    const test = await fs.readFile(testPath, "utf8");


    const solutionPath = path.join(folder, "solution.ts");
    const solution = await fs.readFile(solutionPath, "utf8");

    const exercise: Exercise = {
        _id,
        text,
        hints,
        test,
        solution,
    };

    return exercise;
}


async function addTheory(folder: string): Promise<Theory> {
    const _id = jsId(path.parse(folder).name);

    const text: Text = {};

    const data = path.join(folder, "data.json");
    const json = await fs.readFile(data, "utf8");
    const {title} = JSON.parse(json) as {
        title: {[key in typeof language[number]]: string};
    };


    for await (const name of language) {
        const filePath = path.join(folder, `text.${name}.html`);
        text[name] = await fs.readFile(filePath, "utf8");
    }

    const theory: Theory = {_id, title, text};

    return theory;
}


async function addSection(folder: string): Promise<Section> {
    const _id = jsId(path.parse(folder).name);

    const json = await fs.readFile(folder, "utf8");
    const data = JSON.parse(json) as {
        title: {[key in typeof language[number]]?: string};
        parentId: string;
        theoryIds?: string[];
        exerciseIds?: string[];
    };

    const section: Section = {
        _id,
        parentId: jsId(data.parentId),
        title: data.title,
        ...data.theoryIds && {
            theoryIds: data.theoryIds.map(id => jsId(id)),
        },
        ...data.exerciseIds && {
            exerciseIds: data.exerciseIds.map(id => jsId(id)),
        },
    };

    return section;
}


async function init(pathToAssets: string): Promise<void> {
    const jsRoot = path.join(__dirname, ".", "javascript");


    const exercisePath = path.join(jsRoot, "exercise");

    for await (const dirent of await fs.opendir(exercisePath)) {
        const folderPath = path.join(exercisePath, dirent.name);
        const exercise = await addExercise(folderPath);
        result.exercise.push(exercise);
    }


    const theoryPath = path.join(jsRoot, "theory");

    for await (const dirent of await fs.opendir(theoryPath)) {
        const folderPath = path.join(theoryPath, dirent.name);
        const theory = await addTheory(folderPath);
        result.theory.push(theory);
    }


    const sectionPath = path.join(jsRoot, "section");

    for await (const dirent of await fs.opendir(sectionPath)) {
        const filePath = path.join(sectionPath, dirent.name);
        const section = await addSection(filePath);
        result.section.push(section);
    }


    const fileName = path.join(root, pathToAssets, "data.json");

    await fs.writeFile(fileName, JSON.stringify(result, null, "    "));
}

init("../src/asset")
    .then(() => console.log(result))
    .catch((err) => console.log(err));
