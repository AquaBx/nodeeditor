import { get_instance } from "../store.svelte";

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
  id: string;
  name: string;
  position: XYPosition;
  unique = false;

  reference: string | undefined = undefined;
  _label: string = $state("");
  _inputs: Entry[] = $state([]);
  _outputs: Entry[] = $state([]);

  get inputs() {
    if (this.reference) {
        return get_instance(this.reference).inputs;
    }
    else {
        return this._inputs;
    }
  }

  
  get outputs() {
    if (this.reference) {
        return get_instance(this.reference).outputs;
    }
    else {
        return this._outputs;
    }
  } 

  get label() {
    if (this.reference) {
        return get_instance(this.reference).label;
    }
    else {
        return this._label;
    }
  } 

  static origin = [0.5, 0.0];
  static unique = false;

  constructor() {}

  instanciate(id: string, name: string, position: XYPosition): common {
    return Object.assign(new common(),{ ...this, id, name, position });
  }
}
