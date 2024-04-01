const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
function run() {
    // the following code requires to install node.js
    // not going to run here

    // 1) get some input values
    const bucket = core.getInput('bucket', { required : true});
    const bucketRegion = core.getInput('bucket-region', {required : true});
    const distFolder = core.getInput('dist-folder', { required : true});

    // 2) upload files
    const s3Uri = `s3://${bucket}`;

    // this job will fail without proper authentication
    // can set up the access key in the workflow so the action can be re-used
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    // set an output
    const websiteUrl = `http//${bucket}.s3-website-${bucketRegion}.amaonzaws.com`;
    core.setOutputs('website-url', websiteUrl);

    core.notice('Hello from my custom JS Actions!');
}

run();