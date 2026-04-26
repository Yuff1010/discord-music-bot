# Project Plan

Last updated: 2026-04-26
Project phase: foundation to MVP

## Current Repository Snapshot

当前代码库已经具备以下工程基础：

- `src/client.js`: 初始化 Discord client 和 `discord-player`
- `src/index.js`: 启动流程、动态加载、进程级错误保护
- `src/handlers/commands.js`: 自动加载 `src/commands/*.js`
- `src/handlers/events.js`: 自动加载 `src/events/*.js`
- `src/handlers/playerEvents.js`: 预留 `src/events/player/` 的动态加载
- `src/commands/ping.js`: 示例 slash command
- `src/commands/play.js`: 搜索并播放音乐或加入队列
- `src/commands/skip.js`: 跳过当前曲目
- `src/commands/stop.js`: 停止播放并清空队列
- `src/commands/queue.js`: 展示当前播放与待播队列
- `src/events/player/`: 基础播放器事件反馈
- `src/utils/music.js`: 曲目信息和队列展示格式化
- `.github/workflows/`: CI 和 Docker deploy 骨架
- `Dockerfile` 与 `docker-compose.yml`: 自托管部署入口

当前主要缺口：

- 音乐命令尚未在真实 Discord 语音环境中 smoke test
- 还缺少命令执行层面的 mocks 或集成测试
- 当前部分中文文案仍需统一检查编码和可读性

## Target Architecture

MVP 目标架构如下：

- `src/commands/play.js`
- `src/commands/skip.js`
- `src/commands/stop.js`
- `src/commands/queue.js`
- `src/events/player/trackStart.js`
- `src/events/player/audioTrackAdd.js`
- `src/events/player/queueEnd.js`
- `src/events/player/disconnect.js`
- `src/utils/validate.js` 继续承担语音和上下文校验
- `src/utils/embed.js` 统一成功、错误、信息消息样式

## Milestones

### M0 Foundation

- 完成基础仓库初始化
- 完成 Docker/CI 骨架
- 完成基础命令注册能力

Status: done

### M1 Core Music MVP

- 实现 `/play`
- 实现 `/skip`
- 实现 `/stop`
- 实现 `/queue`
- 落地 player events
- 补齐基础测试

Status: next major delivery
Current state: core commands implemented, pending Discord smoke verification

### M2 Usability And Reliability

- 修复当前文案编码问题
- 统一 embed 风格和错误文案
- 增加空闲退出策略
- 补充更多命令如 `/pause`、`/resume`、`/nowplaying`

Status: planned

### M3 Release Hardening

- 增加更强的测试覆盖
- 验证 Docker 镜像运行路径
- 完善 README 运维说明
- 视需要增加 release checklist

Status: planned

## Workstreams

### Product

- 用 PRD 固定 MVP 范围
- 把非目标写清楚，避免在早期分散精力

### Application

- 以 slash commands 为主入口
- 以单 guild 单 queue 体验为核心
- 先保证 happy path，再补边界条件

### Quality

- 为校验工具和辅助函数补自动测试
- 对文档和计划增加机械校验
- 采用“小切片完成即验证、commit、push”的交付节奏

### Operations

- 保持 Node 本地运行和 Docker 运行都可用
- 通过 CI 验证 docs harness 和测试命令
- 通过 tag 驱动 Docker 镜像发布

## Dependencies

- Discord Developer Portal 中的 bot token 与 application id
- 目标服务器内的 bot 安装与语音权限
- `discord-player` 与提取器能力
- `discord-player-youtubei` 用于当前 YouTube 搜索和流创建
- `youtube-dl-exec` 是当前 `discord-player-youtubei` 版本的运行时导入依赖
- `ffmpeg` 运行环境

## Risks And Mitigations

### Upstream extractor instability

- 风险：平台变动会影响搜索和播放
- 应对：先把错误消息、重试边界和替代查询策略写清楚

### Voice permission failures

- 风险：最常见的用户失败路径来自频道和权限
- 应对：把 `validateVoice` / `validateSameChannel` 作为所有音乐命令的标准前置

### Doc drift

- 风险：文档和代码脱节后，agent 会基于过期信息工作
- 应对：把关键文件纳入 `npm run docs:check`，并要求在同一任务内更新 `PROGRESS.md`

### Encoding debt

- 风险：当前部分中文字符串存在 mojibake，会影响用户可读性
- 应对：在 M1 之后安排一次专门修复，统一编码和文案

## Definition Of Done

一个里程碑内的功能只有在同时满足下面条件后才算完成：

- 代码已经落地
- 用户路径可以清晰描述
- 相关文档已经更新
- 至少一个合适的验证步骤已经被执行
- `docs/project/PROGRESS.md` 已经反映最新状态
