<script lang="ts">
    import {dnd, templates} from "../store.svelte";

    const onDragStart = (event: DragEvent, nodeType: any) => {
        if (!event.dataTransfer) {
            return null;
        }

        dnd.setType(nodeType);

        event.dataTransfer.effectAllowed = "move";
    };
</script>

<aside
        class="w-full bg-gray-500 text-sm flex flex-col items-center justify-center"
>
    <div class="my-4 text-xs">You can drag these nodes to the pane below.</div>
    <div class="flex items-center justify-center">
        {#each templates as template}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                    class="m-2 border-black px-4 py-2 font-bold rounded-xl cursor-grab"
                    ondragstart={(event) => onDragStart(event, template)}
                    draggable={true}
            >
                {template.type}
            </div>
        {/each}
    </div>
</aside>
