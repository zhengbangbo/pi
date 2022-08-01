"use strict";

// src/agents.ts
var pipenvRun = (agent) => (args2) => {
  if (args2.length > 1)
    return `${agent} run ${args2[0]} -- ${args2.slice(1).join(" ")}`;
  else
    return `${agent} run ${args2[0]}`;
};
var AGENTS = {
  pipenv: {
    run: pipenvRun("pipenv"),
    install: "pipenv install",
    add: "pipenv install {0}",
    shell: "pipenv shell"
  }
};

// src/commands.ts
function getCommand(agent, commnad, args2) {
  const c = AGENTS[agent][commnad];
  if (typeof c === "function")
    return c(args2);
  return c.replace("{0}", args2.join(" "));
}
function parsePsh(agent, _args) {
  let command = "shell";
  let args2 = [];
  return getCommand(agent, command, args2);
}

// src/runner.ts
var import_child_process = require("child_process");

// src/utils.ts
function remove(arr, v) {
  const index = arr.indexOf(v);
  if (index >= 0)
    arr.splice(index, 1);
  return arr;
}

// src/runner.ts
var args = process.argv.slice(2).filter(Boolean);
var DEBUG_SIGN = "?";
async function run(fn) {
  const agent = "pipenv";
  const debug = args.includes(DEBUG_SIGN);
  if (debug)
    remove(args, DEBUG_SIGN);
  const command = await fn(agent, args, debug);
  if (debug)
    console.log(command);
  else
    (0, import_child_process.execSync)(command, { stdio: "inherit" });
}

// src/psh.ts
run(async (agent, args2) => {
  return parsePsh(agent, args2);
});
