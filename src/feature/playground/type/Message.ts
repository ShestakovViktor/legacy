export type Message = {
    type: "sys" | "log" | "err";
    text: string;
}
