export function textToURL(text: string): string {
    const blob = new Blob([text], {type: "text/html"});

    const url = URL.createObjectURL(blob);

    return url;
}