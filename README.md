# Discord Music Bot

一个可自托管的 Discord 音乐机器人仓库，基于 `discord.js v14` 和 `discord-player v6`。

当前代码库已经具备运行骨架、Docker 打包、CI 和斜杠命令注册能力，但音乐播放核心能力还没有完成。这个仓库现在采用文档先行的方式推进，先把产品需求、项目计划、进度跟踪和 harness engineering 约束沉淀到仓库里，再按执行计划逐步补齐 `/play`、`/skip`、`/stop`、`/queue` 等命令。

## 文档入口

- [Documentation Index](docs/INDEX.md)
- [PRD](docs/product-specs/PRD.md)
- [Project Plan](docs/project/PROJECT.md)
- [Progress](docs/project/PROGRESS.md)
- [Harness](docs/HARNESS.md)
- [Active Execution Plan](docs/exec-plans/active/mvp-core-music-bot.md)
- [Agent Map](AGENTS.md)

## 当前状态

- 已完成：Discord 客户端初始化、`discord-player` 初始化、命令/事件动态加载、`/ping` 示例命令、命令注册脚本、Dockerfile、`docker-compose.yml`、GitHub Actions 基础 CI/CD。
- 未完成：核心音乐命令、播放器事件消息、播放队列可视化、自动离开策略验证、端到端测试。
- 当前优先级：先完成文档与 harness，再按执行计划交付 MVP 音乐能力。

## 快速开始

前置要求：`Node.js 22 LTS`

1. 安装依赖：`npm ci`
2. 复制环境变量模板：`Copy-Item .env.example .env`
3. 在 `.env` 中填写 `DISCORD_TOKEN`、`CLIENT_ID`、可选的 `GUILD_ID`
4. 注册命令：`npm run register`
5. 本地启动：`npm run dev`

如果使用容器：

1. 准备 `.env`
2. 运行：`docker compose up --build`

## 工程约束

- `docs/` 是仓库内产品、架构、进度和执行计划的 source of truth。
- 多步骤改动必须先看 [AGENTS.md](AGENTS.md) 和当前 active plan。
- 新增能力时要同步更新相应文档，而不是只改代码。
- 提交前至少运行一次：`npm run docs:check`
- 每完成一个可验证切片，都要先运行测试，再提交并推送到 GitHub，让 CI 自动验证。

## CI/CD

- CI: GitHub Actions 在推送到 `main` / `dev` 或发起 `pull_request` 时自动运行 `npm run docs:check`、`npm test` 和 Docker build check。
- CD: 推送 `v*.*.*` tag 后，GitHub Actions 会构建并推送 Docker 镜像到 Docker Hub。
- 建议的提交节奏：完成一个小切片后，执行 `npm run docs:check` 和 `npm test`，通过后立即 commit / push，不要积累大批未验证改动。

## 参考资料

- Gabriel Tanner: https://gabrieltanner.org/blog/dicord-music-bot/
- OpenAI Harness Engineering: https://openai.com/index/harness-engineering/
