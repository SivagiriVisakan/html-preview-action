const core = require("@actions/core");
const {context, GitHub} = require("@actions/github");

async function run() {
    try {
        const html_file = core.getInput("html_file");
        const gh_token = core.getInput("gh_token");

        const {owner, repo} = context.repo;

        const client = new GitHub(gh_token);

        await client.issues.createComment({
            owner, repo,
            issue_number: context.payload.pull_request.number,
            body: `[Click here to preview HTML page in browser](https://htmlpreview.github.io/?https://github.com/${owner}/${repo}/blob/${context.sha}/${html_file})`
        });
    } catch (error) {
        core.setFailed(error);
    }
}

run();
