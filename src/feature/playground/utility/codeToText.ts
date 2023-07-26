export function codeToText(fn: () => void): string {
    const temp = fn.toString();

    const text = temp.slice(
        temp.indexOf("{") + 1,
        temp.lastIndexOf("}")
    );

    return text;
}