 🧭 Git + Changelog + Release Cheat Sheet

This cheat sheet shows how commits, changelogs, and version tags fit together during development and release.

---

## 🔁 Everyday Dev Loop

| Task                  | Command                                                 | Notes                      |
| --------------------- | ------------------------------------------------------- | -------------------------- |
| Stage changes         | `git add .` or `git add <file>`                         | Stage work for commit      |
| Commit (feat/fix/etc) | `git commit -m "feat: add command to start MCP server"` | Use Conventional Commits   |
| Push changes          | `git push`                                              | Backup or sync your branch |

---

## 📦 Releasing a New Version

| Task                 | Command                                                          | Notes                               |
| -------------------- | ---------------------------------------------------------------- | ----------------------------------- |
| Run tests/lint/build | `just lint && just test && just build`                           | Ensure quality                      |
| Generate changelog   | `just changelog`                                                 | Updates `CHANGELOG.md` from commits |
| Commit changelog     | `git add CHANGELOG.md && git commit -m "chore(release): v0.X.Y"` | Manual, one-time per release        |
| Tag the release      | `git tag v0.X.Y`                                                 | Marks version in Git                |
| Push code and tag    | `git push && git push --tags`                                    | Makes release public                |

---

## 🧠 Conventional Commit Types

| Type        | Purpose                             | Example                                 |
| ----------- | ----------------------------------- | --------------------------------------- |
| `feat:`     | New feature                         | `feat: add updateMCPConfig command`     |
| `fix:`      | Bug fix                             | `fix: correct webview CSP injection`    |
| `chore:`    | Maintenance / deps / no user impact | `chore: bump express to 4.21.2`         |
| `docs:`     | Documentation only                  | `docs: explain Cursor activationEvents` |
| `refactor:` | Code change without features/fixes  | `refactor: extract memory loader`       |
| `test:`     | Adding or updating tests            | `test: add unit test for port fallback` |

---

## 📌 File Roles in Release

| File            | Role                               |
| --------------- | ---------------------------------- |
| `CHANGELOG.md`  | Human-readable version history     |
| `package.json`  | Declares extension metadata + main |
| `dist/`         | Output code and assets             |
| `.vscodeignore` | Controls what gets packed          |

---

Happy releasing! 🐹
