const core = require("@actions/core");
const {context, GitHub} = require("@actions/github");

async function run() {
    const html_file = core.getInput("html_file");
    const {owner, repo} = context.repo;

    const {GITHUB_TOKEN} = process.env;
    const client = new GitHub(GITHUB_TOKEN);

    await client.issues.createComment({
        owner, repo,
        issue_number: context.payload.pull_request.number,
        body: `[Preview](https://htmlpreview.github.io/?https://github.com/${owner}/${repo}/blob/${context.ref}/${html_file})`
    });
}

run().catch(core.error);
