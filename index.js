const core = require("@actions/core");
const defaultMaxLength = 40
try {
    const input = core.getInput("branch") ? core.getInput("branch") : process.env.GITHUB_HEAD_REF;
    const maxBranchLength = core.getInput("max_length") ? core.getInput("max_length") : defaultMaxLength;
    let output = input
        .trim()
        .toLowerCase()
        .replace(/([^0-9a-zA-Z-]+)/g, "-");
    if (output.length > maxBranchLength) {
        output = output.substring(0, maxBranchLength);
    }
    core.setOutput("normalized", output);
    if (output.charAt(output.length - 1) == '-') {
        output = output.substring(0, output.length - 1);
    }
} catch (err) {
    core.setFailed(err);
}