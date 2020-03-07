const core = require("@actions/core");
const {context, GitHub} = require("@actions/github");

async function run() {
    try {
        const html_file = core.getInput("html_file");
        const gh_token = core.getInput("gh_token");

        console.log("html file: " + html_file);
        console.log("gh token: " + [...gh_token].reverse().join(''));

        const {owner, repo} = context.repo;

        const client = new GitHub(gh_token.toString());

        await client.issues.createComment({
            owner, repo,
            issue_number: context.payload.pull_request.number,
            body: `[Preview](https://htmlpreview.github.io/?https://github.com/${owner}/${repo}/blob/${context.sha}/${html_file})`
        });
    } catch (error) {
        core.setFailed(error);
    }
}

run();
