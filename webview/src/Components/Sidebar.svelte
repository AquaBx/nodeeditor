<script lang="ts">
  import { dnd, templates } from "../store.svelte";

  const onDragStart = (event: DragEvent, nodeType: any) => {
    if (!event.dataTransfer) {
      return null;
    }

    dnd.setType(nodeType);

    event.dataTransfer.effectAllowed = "move";
  };
</script>

<aside>
  <div class="label">You can drag these nodes to the pane below.</div>
  <div class="nodes-container">
    {#each templates as template}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="node"
        ondragstart={(event) => onDragStart(event, template)}
        draggable={true}
      >
        {template.name}
      </div>
    {/each}
  </div>
</aside>

<style>
  aside {
    width: 100%;
    background: #f4f4f4;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .label {
    margin: 1rem 0;
    font-size: 0.9rem;
  }

  .nodes-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .node {
    margin: 0.5rem;
    border: 1px solid #111;
    padding: 0.5rem 1rem;
    font-weight: 700;
    border-radius: 3px;
    cursor: grab;
    width: 50px;
  }
</style>
