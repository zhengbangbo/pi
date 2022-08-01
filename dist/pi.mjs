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
    add: "pipenv install {0}"
  }
};

// src/commands.ts
function getCommand(agent, commnad, args2) {
  const c = AGENTS[agent][commnad];
  if (typeof c === "function")
    return c(args2);
  return c.replace("{0}", args2.join(" "));
}
function parsePi(agent, _args) {
  let command = "install";
  let args2 = [];
  if (_args.length === 0) {
    command = "install";
    args2 = [];
  } else {
    command = "add";
    args2 = _args;
  }
  return getCommand(agent, command, args2);
}

// src/runner.ts
import { execSync } from "child_process";

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
    execSync(command, { stdio: "inherit" });
}

// src/pi.ts
run(async (agent, args2) => {
  return parsePi(agent, args2);
});
