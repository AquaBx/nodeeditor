<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Trash, Plus } from "@steeze-ui/heroicons";
  import { Entry } from "../NodesClass/common.svelte";
  import { get_instance } from "../store.svelte";

  type $$Props = NodeProps;

  let data = $props();

  let instance = get_instance(data.id);

  function add() {
    let entry = new Entry(instance.inputs.length, "", "");
    instance.inputs.push(entry);
    console.log(instance.inputs);
  }

  function remove(i: number) {
    instance.inputs = instance.inputs.splice(i, 1);
  }
</script>

<div class="p-4 rounded-2xl flex bg-gray-100 dark:bg-gray-700 relative">
  <div class="flex flex-col">
    <input placeholder="TableName" bind:value={instance.label} />

    <Handle type="target" position={Position.Top} />

    <table>
      {#each instance.inputs as i}
        <!-- svelte-ignore node_invalid_placement_ssr -->
        <tr class="pt-2">
          <Handle
            type="source"
            position={Position.Right}
            style="position:relative; transform:unset;"
            id="o{i.id}"
          />
          <td class="pr-2">
            <select placeholder="type" bind:value={i.type}>
              <option value="date">date</option>
              <option value="number">number</option>
              <option value="string">string</option>
            </select>
          </td>
          <td class="pr-2">
            <input placeholder="name" bind:value={i.value} />
          </td>
          <td class="pr-2">
            <Icon
              src={Trash}
              onclick={() => remove(i.id)}
              theme="solid"
              class="color-gray-900 h-4"
            />
          </td>
        </tr>
      {/each}
    </table>
  </div>

  <button
    onclick={add}
    class="flex bg-red-500 absolute -bottom-4 items-center gap-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <Icon src={Plus} theme="solid" class="color-gray-900 h-4" />
    Add
  </button>
</div>
