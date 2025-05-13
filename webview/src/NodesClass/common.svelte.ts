import {get_instance} from "../store.svelte";

export class Entry {
    public id: string = $state("");
    public type: string = $state("");
    public value: string = $state("");

    constructor(id: string, type: string, value: string) {
        this.id = id;
        this.type = type;
        this.value = value;
    }
}

export class common {
    static origin = [0.5, 0.0];
    static unique = false;
    id: string;
    type: string;
    position: XYPosition;
    unique = false;
    reference: string | undefined = undefined;

    constructor() {
    }

    _label: string = $state("");

    get label() {
        return this.reference ? get_instance(this.reference).label : this._label;
    }

    _inputs: Entry[] = $state([]);

    get inputs() {
        return this.reference ? get_instance(this.reference).inputs : this._inputs;
    }

    _outputs: Entry[] = $state([]);

    get outputs() {
        return this.reference
            ? get_instance(this.reference).outputs
            : this._outputs;
    }

    set sinputs(nval: Entry[]) {
        if (this.reference) {
            get_instance(this.reference).inputs = nval;
        } else {
            this._inputs = nval;
        }
    }

    set soutputs(nval: Entry[]) {
        if (this.reference) {
            get_instance(this.reference).outputs = nval;
        } else {
            this._outputs = nval;
        }
    }

    set slabel(nval: string) {
        if (this.reference) {
            get_instance(this.reference).label = nval;
        } else {
            this._label = nval;
        }
    }

    instanciate(id: string, name: string, position: XYPosition): common {
        return Object.assign(new common(), {...this, id, name, position});
    }
}
