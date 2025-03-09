import { Writable, writable } from "svelte/store";
import DatabaseNode from "./Nodes/DatabaseNode.svelte";
import InputsNode from "./Nodes/InputsNode.svelte";
import OutputsNode from "./Nodes/OutputsNode.svelte";
import DatabaseTable from "./Nodes/DatabaseTable.svelte";

import { databaseTable } from "./NodesClass/databaseTable";
import { apiEndpoint } from "./NodesClass/apiEndpoint";
import { apiEntrypoint } from "./NodesClass/apiEntrypoint";
import { common } from "./NodesClass/common.svelte";
import { databaseInstance } from "./NodesClass/databaseInstance";

export let templates: common[] = $state([
  new databaseTable(),
  new apiEndpoint(),
  new apiEntrypoint(),
]);

const nodesS: { [id: string]: common } = $state({});
export const nodes: Writable<any[]> = writable([]);

export const edges = writable([]);

export const nodeTypes = {
  DatabaseNode: DatabaseNode,
  InputsNode: InputsNode,
  OutputsNode: OutputsNode,
  DatabaseTable: DatabaseTable,
};

export function get_instance(id: string) : common {
  return nodesS[id];
}

export function add_instance(type: common, position: XYPosition) {
  let data: common = type.instanciate(`${Math.random()}`, type.name, position);

  if (data.unique) {
    let newnode = new databaseInstance();
    newnode.reference = data.id;
    templates.push(newnode);
  }

  nodesS[data.id] = data;
  nodes.update((n) => Object.values(nodesS));
}

export function remove_instance(type: any, position: XYPosition) {
  let data = new type(`${Math.random()}`, type, position);
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
