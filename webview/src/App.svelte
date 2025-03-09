<script lang="ts">
  import { SvelteFlowProvider, SnapGrid } from "@xyflow/svelte";

  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import "@xyflow/svelte/dist/style.css";
  import Sidebar from "./Components/Sidebar.svelte";
  import Flow from "./Components/Flow.svelte";

  let colorMode: "system" | "light" | "dark" = $state("light");

  function updateColorMode() {
    colorMode =
      document.querySelector("body").getAttribute("data-vscode-theme-kind") ==
      "vscode-light"
        ? "light"
        : "dark";
  }

  updateColorMode();

  // Sélectionner la div que vous souhaitez observer
  const targetNode = document.querySelector("body");

  // Configurer les options de l'observateur
  const config = { attributes: true };

  // Fonction de rappel qui sera appelée lorsque des mutations sont détectées
  const callback = function (mutationsList, observer) {
    updateColorMode();
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

<SvelteFlowProvider>
  <div style:height="100vh">
    <Sidebar></Sidebar>
    <Flow {colorMode}></Flow>
  </div>
</SvelteFlowProvider>
