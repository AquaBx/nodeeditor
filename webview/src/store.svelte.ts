import {Writable, writable} from "svelte/store";
import DatabaseGet from "./Nodes/DatabaseGet.svelte";
import InputsNode from "./Nodes/InputsNode.svelte";
import OutputsNode from "./Nodes/OutputsNode.svelte";
import DatabaseTable from "./Nodes/DatabaseTable.svelte";

import {apiEndpoint} from "./NodesClass/apiEndpoint";
import {apiEntrypoint} from "./NodesClass/apiEntrypoint";
import {databaseTable} from "./NodesClass/database";
import {common} from "./NodesClass/common.svelte";
import crypto from "crypto";

export let templates: common[] = $state([
    new databaseTable(),
    new apiEndpoint(),
    new apiEntrypoint(),
]);

const nodesS: { [id: string]: common } = $state({});
export const nodes: Writable<any[]> = writable([]);

export const edges = writable([]);

export const nodeTypes = {
    DatabaseGet: DatabaseGet,
    InputsNode: InputsNode,
    OutputsNode: OutputsNode,
    DatabaseTable: DatabaseTable,
};

export function get_instance(id: string): common {
    return nodesS[id];
}

export function add_instance(classe: common, position: XYPosition) {
    let data: common = classe.instanciate(crypto.randomUUID(), classe.type, position);

    if (data.unique) {
        nodesS[data.id] = data;
    }

    nodes.update((n) => [...n, data]);
}

export function remove_instance(type: any, position: XYPosition) {
    nodes.update((n) => [...n, data]);
}

export class dnd {
    private static type: common | undefined = undefined;

    static setType(ntype: common | undefined) {
        this.type = ntype;
    }

    static getType() {
        return this.type;
    }
}
