# Claude Code 常用用法与命令总结

## 1. CLI 启动参数

### 会话模式

| 参数 | 说明 |
|---|---|
| `claude` | 启动交互式会话（默认） |
| `-p, --print` | 非交互模式：打印响应后退出，适合管道和脚本 |
| `-c, --continue` | 继续当前目录下最近的一次会话 |
| `-r, --resume [value]` | 通过会话 ID 恢复会话，或打开交互式选择器 |
| `--from-pr [value]` | 恢复与 PR 关联的会话 |
| `--fork-session` | 恢复时创建新的会话 ID 而非复用原会话 |
| `--session-id <uuid>` | 指定会话 UUID |

### 模型选择

| 参数 | 说明 |
|---|---|
| `--model <model>` | 指定模型，可使用别名（`sonnet`、`opus`、`haiku`）或完整名（`claude-sonnet-4-6`） |
| `--fallback-model <model>` | 默认模型过载时自动回退（仅 `--print` 模式） |
| `--effort <level>` | 推理力度：`low`、`medium`、`high`、`xhigh`、`max` |

### 权限与安全

| 参数 | 说明 |
|---|---|
| `--permission-mode <mode>` | 权限模式：`acceptEdits`、`auto`、`bypassPermissions`、`default`、`dontAsk`、`plan` |
| `--dangerously-skip-permissions` | 跳过所有权限检查，仅限无网络沙盒环境 |
| `--allowedTools <tools...>` | 允许的工具，如 `"Bash(git *)" Edit` |
| `--disallowedTools <tools...>` | 拒绝的工具 |

### 系统提示与上下文

| 参数 | 说明 |
|---|---|
| `--system-prompt <prompt>` | 完全覆盖系统提示 |
| `--append-system-prompt <prompt>` | 追加到默认系统提示末尾 |
| `--add-dir <dirs...>` | 添加额外允许访问的目录 |
| `--agents <json>` | 定义自定义 agent 的 JSON |
| `--tools <tools...>` | 限制可用工具，如 `"Bash,Edit,Read"` |

### 输出与流式

| 参数 | 说明 |
|---|---|
| `--output-format <format>` | `text`（默认）、`json`、`stream-json`，仅 `--print` 模式 |
| `--input-format <format>` | `text`（默认）或 `stream-json` |
| `--json-schema <schema>` | JSON Schema 结构化输出校验 |
| `--max-budget-usd <amount>` | API 调用最大花费（仅 `--print`） |

### MCP 配置

| 参数 | 说明 |
|---|---|
| `--mcp-config <configs...>` | 从 JSON 文件或字符串加载 MCP 服务器 |
| `--strict-mcp-config` | 仅使用 `--mcp-config` 指定的服务器 |

### 调试与性能

| 参数 | 说明 |
|---|---|
| `-d, --debug [filter]` | 调试模式，支持过滤如 `"api,hooks"` 或 `"!1p,!file"` |
| `--debug-file <path>` | 将调试日志写入指定文件 |
| `--bare` | 精简模式：跳过 hooks、LSP、自动记忆等 |
| `--verbose` | 启用详细输出 |

### 会话命名与 Worktree

| 参数 | 说明 |
|---|---|
| `-n, --name <name>` | 设置会话显示名称 |
| `-w, --worktree [name]` | 为会话创建 git worktree |
| `--tmux` | 为 worktree 创建 tmux 会话 |

### 子命令

| 命令 | 说明 |
|---|---|
| `claude auth` | 管理认证 |
| `claude doctor` | 检查环境健康状态 |
| `claude install [target]` | 安装原生构建 |
| `claude mcp` | 配置和管理 MCP 服务器 |
| `claude plugin` | 管理插件 |
| `claude project` | 管理项目状态 |
| `claude setup-token` | 设置长期认证令牌（用于 CI） |
| `claude update` / `claude upgrade` | 检查并安装更新 |

---

## 2. 交互式斜杠命令

在 Claude Code 会话中输入的命令：

| 命令 | 说明 |
|---|---|
| `/help` | 显示帮助信息 |
| `/clear` | 清除当前对话上下文 |
| `/compact` | 压缩对话以节省上下文窗口，可指定重点：`/compact focus on auth changes` |
| `/config` | 打开或修改配置 |
| `/cost` | 显示当前会话的 token 用量和费用 |
| `/doctor` | 检查环境健康状态 |
| `/init` | 初始化 `CLAUDE.md` 文件（分析代码库自动生成） |
| `/login` | 登录 Anthropic |
| `/logout` | 登出 |
| `/mcp` | 查看和管理 MCP 服务器连接 |
| `/memory` | 打开 `CLAUDE.md` 进行编辑 |
| `/permissions` | 查看和管理当前权限模式 |
| `/review` | 审查 Pull Request |
| `/terminal-setup` | 安装 shell 集成（支持 Shift+Enter 换行等） |
| `/vim` | 切换 vim 键绑定 |
| `/model` | 会话中切换模型 |
| `/fast` | 临时切换到更快的模型 |
| `/bug` | 报告 bug |
| `/pr-comments` | 查看 PR 评论 |
| `/statusline` | 设置状态栏 UI |

### 常用技能（Skills）

| 技能 | 说明 |
|---|---|
| `/update-config` | 配置 settings.json（hooks、权限、环境变量） |
| `/simplify` | 审查变更代码的质量和效率 |
| `/fewer-permission-prompts` | 扫描常用工具调用生成允许列表，减少权限提示 |
| `/loop` | 按间隔重复运行命令，如 `/loop 5m /foo` |
| `/security-review` | 对当前分支的待提交变更进行安全审查 |

---

## 3. 快捷键

### 通用

| 快捷键 | 功能 |
|---|---|
| `Escape` | 取消当前生成或关闭输入 |
| `Enter` | 提交消息 |
| `Shift+Enter` | 插入换行（多行输入），部分终端需 `/terminal-setup` |
| `Tab` | 接受自动补全建议 |
| `Ctrl+C` | 取消当前操作 / 退出 |
| `Ctrl+D` | 退出（EOF） |
| `Ctrl+L` | 清屏 |

### 输入编辑

| 快捷键 | 功能 |
|---|---|
| `Up Arrow` | 回溯历史输入 |
| `Down Arrow` | 前进历史输入 |
| `Ctrl+A` | 光标移到行首 |
| `Ctrl+E` | 光标移到行尾 |
| `Ctrl+K` | 删除光标到行尾 |
| `Ctrl+U` | 删除光标到行首 |
| `Ctrl+W` | 删除光标前一个单词 |

### 模式切换

| 快捷键 | 功能 |
|---|---|
| `#`（行首输入） | 进入 Plan 模式（只分析不修改） |

---

## 4. 非交互式用法

### 管道用法

```bash
# 将输出传入 Claude
echo "Explain this error" | claude -p
cat logs/error.log | claude -p "Summarize the errors"
git diff | claude -p "Review these changes"
```

### 结构化输出

```bash
# JSON 输出
claude -p "List all functions in main.py" --output-format json

# 带 Schema 校验
claude -p "Extract entities" --json-schema '{"type":"object","properties":{"entities":{"type":"array"}}}'

# 流式 JSON
claude -p "Explain this code" --output-format stream-json
```

### 脚本集成

```bash
# 带预算控制
claude -p "Fix this bug" --max-budget-usd 0.50

# 指定模型
claude -p "Review this PR" --model sonnet

# 带回退模型
claude -p "Analyze this" --fallback-model haiku
```

### Agent-to-Agent（流式双向）

```bash
claude -p --input-format stream-json --output-format stream-json
```

---

## 5. MCP 服务器配置

### 配置文件位置

| 文件 | 作用域 |
|---|---|
| `~/.claude/mcp.json` | 用户级（全局） |
| `.mcp.json`（项目根目录） | 项目级（可通过版本控制共享） |

### 常用命令

```bash
# 添加 stdio 类型服务器
claude mcp add <name> -- <command> [args...]

# 添加带环境变量的服务器
claude mcp add <name> -e KEY=value -- <command> [args...]

# 添加 SSE 类型服务器
claude mcp add <name> --transport sse --url <url>

# 列出已配置的服务器
claude mcp list

# 移除服务器
claude mcp remove <name>

# 查看服务器详情
claude mcp get <name>
```

### JSON 配置格式

```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["path/to/server.js"],
      "env": { "API_KEY": "value" }
    },
    "sse-server": {
      "transport": "sse",
      "url": "http://localhost:3000/sse"
    }
  }
}
```

---

## 6. Hooks 系统

Hooks 在 `settings.json` 中配置，由框架自动在生命周期节点执行。

### 生命周期事件

| 事件 | 触发时机 |
|---|---|
| `PreToolUse` | 工具执行前 |
| `PostToolUse` | 工具执行后 |
| `Notification` | 发送通知时 |
| `Stop` | Claude 完成响应时（可强制继续） |
| `SubagentStop` | 子 Agent 完成时 |

### 配置示例

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "echo 'About to run bash'" }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [{ "type": "command", "command": "prettier --write $CLAUDE_FILE_PATH" }]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "echo 'Session done'" }]
      }
    ]
  }
}
```

### Matcher 模式

- `""` 或 `"*"` — 匹配所有工具
- `"Bash"` — 匹配特定工具
- `"Bash(git *)"` — 匹配特定输入模式

### 环境变量

- `CLAUDE_TOOL_NAME` — 当前工具名
- `CLAUDE_TOOL_INPUT` — 工具输入的 JSON
- `CLAUDE_FILE_PATH` — 相关文件路径
- `CLAUDE_SESSION_ID` — 当前会话 ID

### Stop Hook 特殊行为

Stop hook 退出码为 `2` 时，会强制 Claude 继续工作（输出作为指令反馈）。其他退出码允许正常停止。

---

## 7. CLAUDE.md 与记忆系统

### CLAUDE.md 文件位置

| 位置 | 作用域 |
|---|---|
| `~/.claude/CLAUDE.md` | 用户级，所有会话加载 |
| `CLAUDE.md`（项目根目录） | 项目级，可通过版本控制共享 |
| `CLAUDE.local.md`（项目根目录） | 本地项目覆盖（应 gitignore） |
| 子目录中的 `CLAUDE.md` | 在该子目录工作时加载 |

### CLAUDE.md 推荐内容

- 项目结构和架构概述
- 构建 / 测试 / lint 命令
- 编码规范和风格指南
- 常用工作流和模式
- 重要文件路径
- 团队特定指令

### 相关命令

- `/memory` — 在 `$EDITOR` 中打开 `CLAUDE.md` 编辑
- `/init` — 分析代码库自动生成 `CLAUDE.md`

### 设置优先级

| 级别 | 文件 | 作用域 |
|---|---|---|
| 企业级 | 组织管理 | 全组织 |
| 用户级 | `~/.claude/settings.json` | 所有项目 |
| 项目级 | `.claude/settings.json` | 共享项目设置 |
| 本地级 | `.claude/settings.local.json` | 本地覆盖 |
| 会话级 | CLI 参数 | 当前会话 |

---

## 8. 权限模式

### 可用模式

| 模式 | 行为 |
|---|---|
| `default` | 对潜在破坏性操作请求权限 |
| `acceptEdits` | 自动接受文件编辑，bash 命令仍需确认 |
| `auto` | 自动批准大多数操作（使用分类器评估风险） |
| `plan` | 只读模式，不能编辑或运行命令 |
| `dontAsk` | 从不请求权限 |
| `bypassPermissions` | 跳过所有权限检查 |

### 设置方式

```bash
# 启动时指定
claude --permission-mode auto

# 会话中切换
/permissions
```

### 细粒度工具权限

```bash
# 允许特定工具
claude --allowed-tools "Bash(git *)" "Edit" "Read"

# 拒绝特定工具
claude --disallowed-tools "Bash(rm *)" "Bash(curl *)"
```

### settings.json 中的持久化配置

```json
{
  "permissions": {
    "allow": ["Bash(npm test)", "Bash(npm run build)", "Read", "Edit", "Write"],
    "deny": ["Bash(rm -rf *)"]
  }
}
```

---

## 9. 会话管理

### 恢复会话

```bash
claude -c                      # 继续最近的会话
claude -r                      # 打开交互式会话选择器
claude -r <session-id>         # 恢复指定会话
claude -r <id> --fork-session  # 从已有会话创建分支
claude -n "my-task"            # 命名会话
```

### 上下文管理

- `/clear` — 清除对话历史重新开始
- `/compact` — 压缩对话节省上下文窗口，可加重点提示：`/compact focus on database migration`

### Plan 模式

在消息开头输入 `#` 进入 Plan 模式。Claude 只分析和规划，不执行任何修改。适用于：
- 理解代码库后再动手
- 制定多步骤计划
- 无副作用的分析

---

## 10. Git Worktree

```bash
claude -w                # 创建未命名 worktree
claude -w my-feature     # 创建命名 worktree
claude -w --tmux         # 使用 tmux 管理 worktree
```

---

## 11. 调试

```bash
claude -d                        # 启用所有调试日志
claude -d "api,hooks"            # 过滤特定类别
claude -d "!1p,!file"            # 排除特定类别
claude --debug-file ./debug.log  # 将日志写入文件
```

---

## 12. 认证

```bash
claude auth          # 管理认证
claude setup-token   # 设置长期令牌（用于 CI/无头环境）
claude login         # 交互式登录
claude logout        # 登出
```
