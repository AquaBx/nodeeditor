<script lang=ts>
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte'

    import {
      SvelteFlow,
      Controls,
      Background,
      BackgroundVariant,
      MiniMap,

      SnapGrid

    } from '@xyflow/svelte';
   
    // 👇 this is important! You need to import the styles for Svelte Flow to work
    import '@xyflow/svelte/dist/style.css';
    import CustomNode from './CustomNode.svelte';

    const nodeTypes = {
      'customNode': CustomNode
    };
   
    // We are using writables for the nodes and edges to sync them easily. When a user drags a node for example, Svelte Flow updates its position.
    const nodes = writable([
      {
        id: '1',
        type: 'customNode',
        data: { label: 'Input Node' },
        position: { x: 0, y: 0 }
      },
      {
        id: '2',
        type: 'customNode',
        data: { label: 'Node' },
        position: { x: 0, y: 150 }
      }
    ]);
   
    // same for edges
    const edges = writable([
      // {
      //   id: '1-2',
      //   type: 'default',
      //   source: '1',
      //   target: '2',
      //   label: 'Edge Text'
      // }
    ]);
   
    let colorMode : 'system' | 'light' | 'dark' = $state("light")

    function updateColorMode() {
      colorMode = document.querySelector("body").getAttribute("data-vscode-theme-kind") == "vscode-light" ? "light" : "dark"
    }

    updateColorMode()

    const snapGrid : SnapGrid = [25, 25];

    // Sélectionner la div que vous souhaitez observer
    const targetNode = document.querySelector("body");

    // Configurer les options de l'observateur
    const config = { attributes: true };

    // Fonction de rappel qui sera appelée lorsque des mutations sont détectées
    const callback = function(mutationsList, observer) {
      updateColorMode()
    };

    // Créer une instance de MutationObserver et la lier à la fonction de rappel
    const observer = new MutationObserver(callback);

    // Commencer à observer les modifications sur l'élément sélectionné
    observer.observe(targetNode, config);

  </script>
   
  <!--
  👇 By default, the Svelte Flow container has a height of 100%.
  This means that the parent container needs a height to render the flow.
  -->
<div style:height="100vh">
  <SvelteFlow
    {nodes}
    {edges}
    {snapGrid}
    {colorMode}
    {nodeTypes}
    fitView
    on:nodeclick={(event) => console.log('on node click', event.detail.node)}
    >
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
    <MiniMap />
  </SvelteFlow>
</div>