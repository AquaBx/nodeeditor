<script lang="ts">
    import {
        Background,
        BackgroundVariant,
        Controls,
        MiniMap,
        SnapGrid,
        SvelteFlow,
        useSvelteFlow,
    } from "@xyflow/svelte";

    import {add_instance, dnd, edges, nodes, nodeTypes} from "../store.svelte"

    // 👇 this is important! You need to import the styles for Svelte Flow to work
    import "@xyflow/svelte/dist/style.css";

    let colorMode: "system" | "light" | "dark" = $state("light");

    function updateColorMode() {
        colorMode =
            document.querySelector("body").getAttribute("data-vscode-theme-kind") ==
            "vscode-light"
                ? "light"
                : "dark";
    }

    updateColorMode();

    const snapGrid: SnapGrid = [25, 25];

    // Sélectionner la div que vous souhaitez observer
    const targetNode = document.querySelector("body");

    // Configurer les options de l'observateur
    const config = {attributes: true};

    // Fonction de rappel qui sera appelée lorsque des mutations sont détectées
    const callback = function (mutationsList, observer) {
        updateColorMode();
    };

    // Créer une instance de MutationObserver et la lier à la fonction de rappel
    const observer = new MutationObserver(callback);

    // Commencer à observer les modifications sur l'élément sélectionné
    observer.observe(targetNode, config);

    const {screenToFlowPosition} = useSvelteFlow();

    const onDragOver = (event: DragEvent) => {
        event.preventDefault();

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
        }
    };

    const onDrop = (event: DragEvent) => {
        event.preventDefault();

        const type = dnd.getType();

        if (!type) {
            return;
        }

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        add_instance(type, position)
    };
</script>

<SvelteFlow
        {colorMode}
        {edges}
        fitView
        {nodeTypes}
        {nodes}
        on:dragover={onDragOver}
        on:drop={onDrop}
        on:nodeclick={(event) => console.log("on node click", event.detail.node)}
        {snapGrid}
>
    <Controls/>
    <Background variant={BackgroundVariant.Dots}/>
    <MiniMap/>
</SvelteFlow>
