<script lang="ts">
    import {Handle, type NodeProps, Position} from "@xyflow/svelte";
    import {Icon} from "@steeze-ui/svelte-icon";
    import {Plus, Trash} from "@steeze-ui/heroicons";
    import {Entry} from "../NodesClass/common.svelte";
    import {get_instance} from "../store.svelte";

    type $$Props = NodeProps;

    let data = $props();

    let instance = get_instance(data.id);

    function add() {
        let entry = new Entry(instance.outputs.length, "", "");
        instance.outputs.push(entry);
    }

    function remove(i: number) {
        instance.soutputs = instance.outputs.splice(i, 1);
    }
</script>

<div class="p-4 rounded-2xl flex bg-gray-100 dark:bg-gray-700 relative">
    <div class="flex flex-col">
        <input bind:value={instance.label} placeholder="TableName"/>

        <table class="border-spacing-4">
            {#each instance.outputs as i}
                <!-- svelte-ignore node_invalid_placement_ssr -->
                <tr>
                    <td>
                        <select placeholder="type" bind:value={i.type}>
                            <option value="date">date</option>
                            <option value="number">number</option>
                            <option value="string">string</option>
                        </select>
                    </td>
                    <td>
                        <input placeholder="name" bind:value={i.value}/>
                    </td>
                    <td>
                        <Icon
                                src={Trash}
                                onclick={() => remove(i.id)}
                                theme="solid"
                                class="color-gray-900 h-4"
                        />
                    </td>
                    <Handle
                            type="source"
                            position={Position.Right}
                            style="position:relative; transform:unset;"
                            id="o{i.id}"
                    />

                </tr>
            {/each}
        </table>
    </div>

    <button
            class="flex bg-red-500 absolute -bottom-4 items-center gap-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onclick={add}
    >
        <Icon class="color-gray-900 h-4" src={Plus} theme="solid"/>
        Add
    </button>
</div>
