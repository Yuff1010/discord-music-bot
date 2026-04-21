# Progress

Last updated: 2026-04-21

## Current Snapshot

仓库处于“基础工程已搭好，但音乐 MVP 还未开始实现”的阶段。

今天完成的主线工作是把仓库从“只有代码骨架”推进到“有可执行文档系统和最小 harness”的状态，这样后续实现功能时可以直接围绕 PRD、项目计划和 active execution plan 迭代。

## Completed

- Discord bot 基础项目已初始化
- `discord.js`、`discord-player`、提取器和 `ffmpeg` 依赖已接入
- 命令与事件动态加载机制已落地
- `npm run register` 命令注册脚本已存在
- `/ping` 命令已实现
- Dockerfile、`docker-compose.yml`、GitHub Actions 基础流水线已存在
- 新增 README、AGENTS、PRD、PROJECT、HARNESS 和 active execution plan
- 新增 `npm run docs:check` 文档校验 harness
- 为 `formatDuration` 新增基础单元测试，避免 `npm test` 为空跑
- 把“每个切片先测试、再 commit / push、再由 CI 验证”的规则写入仓库文档
- 发现并修复 CI 的 Node 版本不一致问题，统一到 Node 22

## In Progress

- 建立以 `docs/` 为 source of truth 的协作方式
- 为 MVP 音乐命令准备任务拆解和验收标准

## Next Up

- 实现 `/play`
- 实现 `/skip`
- 实现 `/stop`
- 实现 `/queue`
- 新建 `src/events/player/` 事件处理模块
- 为语音校验和文档 harness 补更多测试

## Risks / Blockers

- 当前仓库还没有可用的音乐播放路径
- Discord 相关命令依赖真实凭据，不能在无凭据环境下做端到端验证
- 当前部分中文消息文本存在编码异常，后续需要统一修复
- `lint` 脚本存在，但仓库未配置 ESLint 依赖和规则，暂时不能作为真实质量门禁
- CD 依赖 GitHub secrets 中存在 Docker Hub 凭据，否则 tag 流水线无法完成镜像推送

## Decision Log

- 2026-04-21: 采用 `docs/` 作为项目、产品和执行计划的系统记录，而不是把背景知识放在聊天历史里。
- 2026-04-21: 文档 harness 先从“关键文件存在 + 核心交叉链接 + 状态字段存在”这一级别开始，后续再增强。
