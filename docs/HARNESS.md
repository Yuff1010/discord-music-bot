# Harness

Last updated: 2026-04-21

## Why This Exists

这个仓库使用 harness engineering 的思路来组织开发流程。这里的重点不是“让 agent 多写代码”，而是把约束、上下文、反馈回路和校验机制放进仓库里，让后续工作可以稳定复用。

本文件参考了 OpenAI 在 2026 年发布的 harness engineering 文章，并结合这个 Discord music bot 仓库做了缩小版落地。

## Core Principles

### Humans steer, agents execute

- 人负责定义范围、优先级和验收标准
- agent 负责在仓库约束下执行具体实现

### Repository is the system of record

- 产品范围在 `docs/product-specs/PRD.md`
- 项目规划在 `docs/project/PROJECT.md`
- 当前状态在 `docs/project/PROGRESS.md`
- 当前主线任务在 `docs/exec-plans/active/`
- 行为规则在 `AGENTS.md` 和本文件

如果信息只存在于聊天、脑海或外部文档里，对后续 agent 来说等于不存在。

### Progressive disclosure

- 不用一个超长文档承载所有背景
- 先给 agent 一个入口，再通过索引跳到需要的文件
- 新任务优先更新相关文档，而不是继续堆大而全说明

### Feedback loops over memory

- 需求变化后，优先把变化写回仓库
- 问题复现后，优先补测试、校验或文档，而不是只口头说明
- 文档和计划应该跟随实现一起收敛

## Execution Loop

任何多步骤工作默认遵循下面循环：

1. 读取 `README.md`、`AGENTS.md`、`docs/INDEX.md`
2. 确认 PRD 范围和 active execution plan
3. 选择最小可验证切片实现
4. 修改代码和相应文档
5. 运行验证
6. 更新 `docs/project/PROGRESS.md`
7. 提交到 git，并尽快推送到 GitHub 触发 CI
8. 如果策略变化，更新 `PROJECT.md` 或 active plan

## Mechanical Checks

当前仓库已经具备最小文档机械校验：

- 命令：`npm run docs:check`
- 校验内容：
  - 关键文档是否存在
  - `README.md` 是否链接核心文档
  - `AGENTS.md` 是否指向当前 active plan
  - `PROGRESS.md` 是否保留固定状态段落
  - `HARNESS.md` 是否描述 mechanical checks

CI 也会运行这个步骤，避免“文档存在但没有入口”或者“计划改了但状态没更新”的低级漂移。

## Commit And Delivery Discipline

- 每个完成的工作切片都必须先通过本地验证，再 commit
- commit 应该是小而可回滚的，不要把多个不相关改动堆在一起
- push 到 GitHub 后，由 Actions 执行 CI
- 发布通过 tag 驱动 CD，而不是手工在服务器上改状态

## Required Artifacts

对于这个仓库，以下文档是必需的：

- `README.md`
- `AGENTS.md`
- `docs/INDEX.md`
- `docs/product-specs/PRD.md`
- `docs/project/PROJECT.md`
- `docs/project/PROGRESS.md`
- `docs/HARNESS.md`
- 至少一个 active execution plan

## Change Rules

### When product scope changes

- 更新 `PRD.md`
- 更新 active execution plan 的验收标准

### When architecture changes

- 更新 `PROJECT.md`
- 如有必要，更新 `AGENTS.md` 的 repo map

### When progress changes

- 更新 `PROGRESS.md`
- 保持 `Last updated` 新鲜

### When a new recurring failure appears

- 优先把它变成自动化检查、测试或明确文档约束

## Definition Of Done For Agent Work

一次非 trivial 改动完成时，至少应该满足：

- 相关代码已落地
- 对应文档已同步
- 有一个清晰的验证动作
- 进度文档已更新
- 未来 agent 能在不看聊天历史的情况下理解该改动

## Future Harness Upgrades

当前 harness 只是最小版本，后续建议继续补：

- 为关键命令补单元测试和集成测试
- 为 Discord 交互流程定义更细的验收清单
- 为 Docker 运行和命令注册增加 smoke test
- 为文案和编码一致性增加专门检查
