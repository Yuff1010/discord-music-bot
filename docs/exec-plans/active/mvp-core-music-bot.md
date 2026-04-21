# Execution Plan: MVP Core Music Bot

Status: active
Last updated: 2026-04-21

## Goal

把当前仅有 `/ping` 的骨架仓库推进到一个可用的 Discord music bot MVP，至少交付 `/play`、`/skip`、`/stop`、`/queue` 四个核心命令，并配套最小事件反馈和验证手段。

## Scope

In scope:

- 核心音乐命令
- 语音和权限校验复用
- player events
- README 和项目文档
- 文档 harness 与基础验证

Out of scope:

- 网页控制台
- 多实例部署
- 高级权限系统
- 复杂推荐和歌单管理

## References

- [PRD](../../product-specs/PRD.md)
- [Project Plan](../../project/PROJECT.md)
- [Progress](../../project/PROGRESS.md)
- [Harness](../../HARNESS.md)
- Gabriel Tanner article: https://gabrieltanner.org/blog/dicord-music-bot/

## Acceptance Criteria

- 用户可以通过 slash commands 完成播放、跳过、停止和查看队列
- 错误路径有清晰反馈
- player events 有最基础提示
- 文档描述与代码状态一致
- 至少有 docs harness 和若干基础测试保护关键约束

## Work Breakdown

- [x] 建立 README、PRD、PROJECT、PROGRESS、HARNESS、AGENTS
- [x] 为文档添加机械校验入口
- [x] 补一个基础单测，确保 `npm test` 不再是空跑
- [ ] 设计命令模块接口和共用校验流程
- [ ] 实现 `/play`
- [ ] 实现 `/skip`
- [ ] 实现 `/stop`
- [ ] 实现 `/queue`
- [ ] 实现 `src/events/player/` 下的基础事件
- [ ] 补最小测试与 smoke verification
- [ ] 修复当前用户可见中文字符串的编码问题

## Implementation Notes

- 优先做小步提交式推进，每次只交付一个可验证切片
- 每个切片完成后先跑本地验证，再 commit / push，交给 GitHub Actions 跑 CI
- 所有音乐命令都应复用 `src/utils/validate.js`
- 先让 happy path 成立，再补细粒度边界
- 命令反馈尽量通过统一 embed 工具生成

## Decision Log

- 2026-04-21: 文档和 harness 先于音乐命令落地，避免后续实现失去上下文约束。
- 2026-04-21: 继续沿用 `discord-player`，不手写底层语音播放管线。
