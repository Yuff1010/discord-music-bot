# Progress

Last updated: 2026-04-26

## Current Snapshot

仓库已经从“基础工程已搭好”推进到 M1 Core Music MVP 的第一轮实现阶段。

当前已落地 `/play`、`/skip`、`/stop`、`/queue` 四个核心音乐命令，新增基础 player event 反馈，并为队列展示与曲目信息格式化补充了单元测试。由于 Discord 语音播放依赖真实 bot token、guild、频道权限和上游音源，本地验证目前覆盖模块导入、纯逻辑测试和文档 harness，端到端语音路径仍需要在真实 Discord 环境中 smoke test。

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
- 新增 `/play`、`/skip`、`/stop`、`/queue` 核心音乐命令
- 新增 `src/utils/music.js`，统一曲目信息与队列展示格式
- 新增 `src/events/player/` 基础事件处理：开始播放、加入队列、队列结束、频道无人、断开连接、播放错误
- 为音乐队列格式化逻辑新增单元测试
- 将 YouTube 播放 extractor 切换到 `discord-player-youtubei`，规避旧 scraping-based extractor 在 smoke test 中无法提取 playable formats 的问题
- 将 Discord ready 事件名更新为 `clientReady`，消除 v15 迁移前的 deprecation warning

## In Progress

- 在真实 Discord 环境中验证 M1 播放路径
- 根据 smoke test 结果修正播放、权限和事件反馈边界

## Next Up

- 使用真实 Discord 凭据运行 `npm run register`
- 启动 bot 后验证 `/play` 搜索与播放
- 验证 `/skip`、`/stop`、`/queue` 在同频道和跨频道场景下的反馈
- 视 smoke test 结果补命令级测试或调整 `discord-player` 调用细节
- 修复当前用户可见中文字符串的编码异常

## Risks / Blockers

- 音乐播放路径已实现但尚未在真实 Discord 语音环境中验证
- Discord 相关命令依赖真实凭据，不能在无凭据环境下做端到端验证
- YouTube 上游仍可能限制非官方提取链路，后续 smoke test 仍需覆盖多首公开视频
- 当前部分中文消息文本存在编码异常，后续需要统一修复
- `lint` 脚本存在，但仓库未配置 ESLint 依赖和规则，暂时不能作为真实质量门禁
- CD 依赖 GitHub secrets 中存在 Docker Hub 凭据，否则 tag 流水线无法完成镜像推送
- `npm ci` 后 `npm audit` 报告 9 个依赖漏洞，需要单独评估依赖升级风险

## Decision Log

- 2026-04-21: 采用 `docs/` 作为项目、产品和执行计划的系统记录，而不是把背景知识放在聊天历史里。
- 2026-04-21: 文档 harness 先从“关键文件存在 + 核心交叉链接 + 状态字段存在”这一级别开始，后续再增强。
- 2026-04-26: M1 第一轮实现先覆盖核心命令、player event 反馈和队列格式化单测；Discord 端到端语音验证作为下一步 smoke test。
