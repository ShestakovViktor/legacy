import {Text} from "@src/type";

export type TheoryId = string;

export type Theory = {
    _id: TheoryId;
    title: Text;
    text: Text;
}