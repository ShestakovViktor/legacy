import {Message} from "@feature/playground/type";

export function setupSandbox(): void {
    const message: Message = {type: "sys", text: "start"};
    window.parent.postMessage(message);


    console.log = (event: Event | string): boolean => {
        if (event instanceof Event) event = event.toString();

        const message: Message = {type: "log", text: event};

        window.parent.postMessage(message);

        return true;
    };


    window.onerror = (event: Event | string): boolean => {
        if (event instanceof Event) event = event.toString();

        const message: Message = {type: "err", text: event};

        window.parent.postMessage(message);

        return true;
    };

}