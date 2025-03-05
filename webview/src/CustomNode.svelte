<script lang="ts">
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
    import type { Writable } from 'svelte/store';
   
    type $$Props = NodeProps;
   
    let data: { color: Writable<string> } = $props();
   
    const { color } = data;

    let inputs = $state(1)
    let outputs = $state(1)

    let arr1 = $derived([...Array(inputs).keys()])
    let arr2 = $derived([...Array(outputs).keys()])

  </script>
   
  <div class="customnode">
    {#each arr1 as i}
        <Handle type="target" position={Position.Left} style="top:auto;bottom:{10*i}px" id="i{i}"/>
    {/each}


    <div style="display:flex;">
    <div style="display:flex; flex-direction:column;">
      {#each arr1 as _}
        <input>
      {/each}
    </div>

    <div style="display:flex; flex-direction:column;">
      <input
        class="nodrag"
        type="number"
        bind:value={inputs}
      />
      <input
        class="nodrag"
        type="number"
        bind:value={outputs}
      />
    </div>


    <div style="display:flex; flex-direction:column;">
      {#each arr2 as _}
        <input>
      {/each}
    </div>

    {#each arr2 as i}
        <Handle type="source" position={Position.Right} style="top:auto;bottom:{10*i}px" id="o{i}"/>
    {/each}
  </div>
</div>

  <style>
    .customnode {
      padding: 1rem;
      background: #eee;
      border-radius: 0.125rem;
      font-size: 0.7rem;
    }
  </style>