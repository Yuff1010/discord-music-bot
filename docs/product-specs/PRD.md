# PRD: Discord Music Bot

Last updated: 2026-04-21
Status: draft for MVP delivery

## Product Summary

构建一个可自托管的 Discord 音乐机器人，支持在服务器内通过 slash commands 播放音乐、维护播放队列并给出清晰的交互反馈。产品以小型社群和个人服务器为主要使用场景，强调部署简单、运行稳定、消息反馈明确。

这个 PRD 参考了 Gabriel Tanner 的 Discord music bot 教学文章，但实现目标基于现代栈：`discord.js v14`、`discord-player v6`、容器化部署、CI 校验和文档化执行计划。

## Problem

当前仓库只有基础骨架，没有真正可用的音乐播放体验。对于一个 Discord music bot，用户最核心的期望不是“机器人在线”，而是：

- 能进正确的语音频道
- 能找到并播放请求的歌曲
- 能看懂当前队列状态
- 能在失败时给出明确反馈
- 能在长期运行时保持低维护成本

## Goals

- 支持 MVP 级音乐播放命令：`/play`、`/skip`、`/stop`、`/queue`
- 保证语音频道校验和权限校验明确可见
- 提供稳定、可读的文本反馈和播放器事件提示
- 支持本地启动与 Docker 部署
- 让后续 agent 或开发者能仅依靠仓库文档继续推进项目

## Non-Goals

- 不在 MVP 内实现网页控制台
- 不在 MVP 内做多语种国际化体系
- 不在 MVP 内做复杂 DJ 权限、投票跳过、点歌积分
- 不在 MVP 内做跨 guild 的统一调度
- 不在 MVP 内追求大型公共 bot 所需的分片和多实例编排

## Primary Users

### Server Admin

- 需要一个容易部署和维护的音乐机器人
- 希望通过 `.env` 和 Docker 快速上线
- 需要明确知道哪些功能已经可用、哪些还在开发

### Listener

- 在 Discord 文本频道通过 slash commands 点歌
- 希望机器人自动加入自己的语音频道
- 希望失败提示明确，比如“你不在语音频道”“没有找到歌曲”“机器人没有权限发声”

## User Stories

- 作为用户，我希望输入 `/play <query>` 后，机器人搜索并播放歌曲或加入队列。
- 作为用户，我希望输入 `/skip` 后立刻跳到下一首。
- 作为用户，我希望输入 `/stop` 后停止播放、清空队列并退出语音频道。
- 作为用户，我希望输入 `/queue` 时能看到当前正在播放和接下来的曲目。
- 作为管理员，我希望通过容器或 Node 进程部署 bot，并通过 CI 尽早发现配置或文档缺失。

## Functional Requirements

### FR1 Slash Commands

- 系统必须注册并响应 `/play`、`/skip`、`/stop`、`/queue`
- 系统必须保留 `/ping` 作为基础健康检查命令

### FR2 Voice Validation

- 当用户不在语音频道时，机器人必须拒绝执行播放相关命令
- 当机器人缺少 `Connect` 或 `Speak` 权限时，必须返回明确错误
- 当机器人已在其他语音频道中播放时，必须阻止不同频道的用户直接控制队列

### FR3 Playback Flow

- `/play` 必须支持关键词或链接查询
- 搜索无结果时必须明确提示
- 首次播放时应尝试连接语音频道并启动队列
- 已有队列时应把新曲目加入现有队列

### FR4 Queue Management

- `/skip` 必须跳过当前曲目
- `/stop` 必须销毁队列并退出语音频道
- `/queue` 必须返回当前曲目和待播列表的摘要

### FR5 Player Feedback

- 当歌曲开始播放、歌曲加入队列、队列结束、机器人被踢出频道、频道无人时，系统应发送清晰消息

### FR6 Deployment And Operations

- 必须支持 `.env` 驱动的本地运行
- 必须支持 Docker 镜像构建
- CI 至少要校验文档 harness 和基础测试命令

## Non-Functional Requirements

- 代码结构要适合后续继续拆分命令和事件模块
- 用户可见消息要清晰、避免模糊失败
- 关键流程要有最少量自动校验，不依赖纯手工记忆
- 文档要足够让新 agent 在不知道历史聊天的情况下继续推进

## MVP Scope

MVP 必须包含：

- `/ping`
- `/play`
- `/skip`
- `/stop`
- `/queue`
- 基础 player events
- README 与文档导航
- 文档校验 harness

MVP 之后可选扩展：

- `/pause`、`/resume`
- `/nowplaying`
- `/volume`
- 自动清理和空闲超时策略
- E2E 语音回归测试

## Success Metrics

- 新用户可在 15 分钟内完成本地配置、注册命令和启动 bot
- MVP 命令在单 guild 场景下具备可重复验证的成功路径
- 文档变更可通过 CI 机械检查，而不是靠人工记忆
- 后续任务能直接挂到 active execution plan 上推进

## Risks

- YouTube 提取器和上游平台规则可能变化，导致播放能力不稳定
- Discord 语音权限和频道状态会造成高频用户错误，需要强校验
- 当前仓库存在部分中文字符串编码异常，后续需要统一修复

## References

- Gabriel Tanner, How to create a music bot using Discord.js: https://gabrieltanner.org/blog/dicord-music-bot/
- OpenAI, Harness engineering: leveraging Codex in an agent-first world: https://openai.com/index/harness-engineering/
