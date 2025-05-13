<script lang="ts">
    import {Handle, type NodeProps, Position} from "@xyflow/svelte";
    import {get_instance} from "../store.svelte";

    type $$Props = NodeProps;

    let data = $props();

    let instance = get_instance(data.id);
</script>

<div class="py-4 rounded-xl bg-gray-100 dark:bg-gray-700">
    <h2>{instance.label}</h2>
    <main class="flex gap-2">
        <table class="border-spacing-4">
            {#each instance.inputs as i}
                <!-- svelte-ignore node_invalid_placement_ssr -->
                <tr>
                    <td
                    >
                        <Handle
                                type="source"
                                position={Position.Right}
                                style="position:relative; transform:unset;"
                                id="o{i.id}"
                        />
                    </td
                    >
                    <td>{i.type}</td>
                    <td>{i.value}</td>
                </tr>
            {/each}
        </table>

        <Handle
                id="o"
                position={Position.Right}
                type="target"
        />
    </main>
</div>
