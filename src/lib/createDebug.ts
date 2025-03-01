import createDebug from "debug";

createDebug.log = console.info.bind(console);

export { createDebug };
