import {language} from "@src/common";

export type TextId = string;

export type Text = {
    [key in typeof language[number]]?: string;
};