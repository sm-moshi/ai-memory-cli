# Manual & Optional GitHub Actions/CI Configuration 🛠️

This file documents additional steps for robust CI/CD and git-flow enforcement that must be configured manually or outside workflow YAML files.

---

## 1. Branch Protection Rules (GitHub UI)
- Require pull requests for all merges to `main` and `develop`
- Require status checks (build, lint, test) to pass before merging
- Require at least one code review
- Block force-pushes and direct commits
- (Optional) Require signed commits

**How to set up:**
1. Go to your repository on GitHub
2. Click `Settings` > `Branches`
3. Add or edit a branch protection rule for `main` and `develop`
4. Enable the above options as needed

---

## 2. PR Branch Naming Enforcement
- Can be enforced via a custom workflow or a GitHub App (e.g., [Branch Naming](https://github.com/marketplace/actions/branch-name))
- Example: Only allow PRs from `feature/*`, `release/*`, or `hotfix/*` branches

---

## 3. Scheduled Workflows
- Example: Weekly team sync issue creation (see [GitHub Docs](https://docs.github.com/en/actions/managing-issues-and-pull-requests/scheduling-issue-creation))
- Add a workflow with `on: schedule:` and a cron expression

---

## 4. Docs Deployment & Semantic Release
- If you want to auto-deploy documentation (e.g., to GitHub Pages), add a `docs.yml` workflow
- For automated versioning and changelog generation, use a tool like `semantic-release`

---

## 5. Notifications
- Slack, Discord, or email notifications can be added via marketplace actions

---

## References
- [GitHub Actions Documentation](https://docs.github.com/en/actions/)
- [About Continuous Integration](https://docs.github.com/en/actions/automating-builds-and-tests/about-continuous-integration)
- [Scheduling Issue Creation](https://docs.github.com/en/actions/managing-issues-and-pull-requests/scheduling-issue-creation)

---

These steps complement the automated workflows already implemented in `.github/workflows/`. For further customisation, see the official documentation or request additional workflow examples.
