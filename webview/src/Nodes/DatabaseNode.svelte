<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import { get_instance } from "../store.svelte";

  type $$Props = NodeProps;

  let data = $props();

  let instance = get_instance(data.id);
</script>

<div class="py-4 rounded-xl bg-gray-100 dark:bg-gray-700">
  <h2>{instance.label}</h2>
  <main class="flex gap-2">
    <table>
      {#each instance.inputs as i}
        <!-- svelte-ignore node_invalid_placement_ssr -->
        <tr class="pt-2">
          <td
            ><Handle
              type="source"
              position={Position.Right}
              style="position:relative; transform:unset;"
              id="o{i.id}"
            /></td
          >
          <td class="pl-2">{i.type}</td>
          <td class="pl-2">{i.value}</td>
        </tr>
      {/each}
    </table>

    <table>
      {#each instance.outputs as i}
        <!-- svelte-ignore node_invalid_placement_ssr -->
        <tr class="pt-2">
          <Handle
            type="source"
            position={Position.Right}
            style="position:relative; transform:unset;"
            id="o{i.id}"
          />
          <td class="pr-2">{i.value}</td>
          <td class="pr-2">{i.type}</td>
        </tr>
      {/each}
    </table>
  </main>
</div>
