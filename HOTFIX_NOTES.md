# Hotfix notes

This branch now includes a small hotfix to improve behavior on many hosts:
- Added `engines.node` to require Node >=18 so hosts use a compatible runtime.
- Added a `postinstall` script that runs `npm run build` (many hosts run `npm install` on deploy, which triggers this; it helps ensure dist is built even if the host doesn't run an explicit build step).

After this commit, redeploy the service on your host (Render/Heroku) to make sure the new build runs.

If the site still fails after redeploying, please paste the deployment logs and I will continue diagnosing.
