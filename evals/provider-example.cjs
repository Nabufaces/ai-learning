const { execFileSync } = require("node:child_process");

module.exports = {
  async callApi(prompt) {
    const output = execFileSync("pnpm", ["exec", "tsx", "evals/src/local-provider.ts", prompt], {
      encoding: "utf8"
    });

    return {
      output: output.trim()
    };
  }
};

