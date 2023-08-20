import {Table, Text, Exercise, Theory, Section} from "../type";

export class Store {
    public data: {
        text: Table<Text>;
        exercise: Table<Exercise>;
        theory: Table<Theory>;
        toc: Table<Section>;
    } = {
            text: {},
            exercise: {},
            theory: {},
            toc: {},
        };

    genId(table: Table<any>): string {
        while (true) {
            const id = Math.random().toString(36).slice(-4);
            if (!(id in table)) return id;
        }
    }

    insert<T extends {id: string}>(table: Table<T>, item: T): string {
        if (item.id && item.id in table) {
            throw new Error(`Id ${item.id} already exists in table ${table.toString()}`);
        }

        if (!item.id) item.id = this.genId(table);

        table[item.id] = item;

        return item.id;
    }

    select<T>(table: Table<T>, id: string): T {
        return table[id];
    }

    selectWhere<T extends {[key: string]: any}>(
        table: Table<T>,
        property: string,
        value: string
    ): T[] {
        return Object.values(table).filter(row => row[property] == value);
    }

    import(str: string): void {
        this.data = JSON.parse(str) as typeof this["data"];
    }

    export(): string {
        return JSON.stringify(this.data, null, "    ");
    }

    show(): void {
        console.log(JSON.stringify(this.data, null, "  "));
    }
}