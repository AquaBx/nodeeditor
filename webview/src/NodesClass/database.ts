import {common} from "./common.svelte";

export class databaseTable extends common {
    type = "DatabaseTable";
    unique = true;
}

export class databaseGet extends common {
    type = "DatabaseGet";
}

export class databaseUpdate extends common {
    type = "DatabaseUpdate";
}

export class databaseRemove extends common {
    type = "DatabaseRemove";
}
