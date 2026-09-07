'use client';

import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const STAGES = ['LLM', 'Chatbot', 'Tool Use', 'Agent', 'Harness', 'Multi-Agent'];

type RevealProps = { at: number; step: number; children: ReactNode; className?: string };
type Slide = { active?: string; max: number; render: (step: number) => ReactNode };

function Reveal({ at, step, children, className = '' }: RevealProps) {
  return <div className={`reveal ${step >= at ? 'is-visible' : ''} ${className}`}>{children}</div>;
}

function Roadmap({ active }: { active?: string }) {
  return (
    <div className="roadmap" aria-label="AI 能力演进路线">
      {STAGES.map((stage, index) => (
        <div className="roadmap-item" key={stage}>
          <span className={active === stage ? 'active' : ''}>{stage}</span>
          {index < STAGES.length - 1 && <b>→</b>}
        </div>
      ))}
    </div>
  );
}

function SlideTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return <header className="slide-title">{kicker && <div className="kicker">{kicker}</div>}<h2>{children}</h2></header>;
}

function VerticalFlow({ items, accent = false, compact = false }: { items: string[]; accent?: boolean; compact?: boolean }) {
  return (
    <div className={`vertical-flow ${accent ? 'accent-flow' : ''} ${compact ? 'compact-flow' : ''}`}>
      {items.map((item, index) => (
        <div className="flow-part" key={`${item}-${index}`}>
          <div className="flow-node">{item}</div>
          {index < items.length - 1 && <div className="down-arrow">↓</div>}
        </div>
      ))}
    </div>
  );
}

function HorizontalFlow({ items, accentIndex = -1, className = '' }: { items: string[]; accentIndex?: number; className?: string }) {
  return (
    <div className={`horizontal-flow ${className}`}>
      {items.map((item, index) => (
        <div className="horizontal-part" key={`${item}-${index}`}>
          <div className={`flow-node ${index === accentIndex ? 'accent-node' : ''}`}>{item}</div>
          {index < items.length - 1 && <div className="right-arrow">→</div>}
        </div>
      ))}
    </div>
  );
}

function Tags({ items, accent = false }: { items: string[]; accent?: boolean }) {
  return <div className={`tags ${accent ? 'accent-tags' : ''}`}>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function AgentLoop({ mini = false }: { mini?: boolean }) {
  const items = mini ? ['Goal', 'Act', 'Observe'] : ['Goal', 'Plan', 'Act', 'Observe', 'Verify'];
  return (
    <div className={`agent-loop ${mini ? 'mini-loop' : ''}`} aria-label="Agent Loop">
      <div className="loop-ring" />
      {items.map((item, index) => <div className={`loop-node loop-node-${index}`} key={item}>{item}</div>)}
      <div className="loop-center">Agent<br /><span>Loop</span></div>
    </div>
  );
}

function CodeWindow({ title = 'TERMINAL', lines }: { title?: string; lines: ReactNode[] }) {
  return (
    <div className="code-window">
      <div className="window-bar"><i /><i /><i /><span>{title}</span></div>
      <div className="code-lines">{lines.map((line, index) => <div key={index}>{line}</div>)}</div>
    </div>
  );
}

function Robot({ small = false }: { small?: boolean }) {
  return (
    <div className={`robot ${small ? 'small-robot' : ''}`} aria-label="机器人类比图">
      <div className="antenna" /><div className="robot-head"><i /><i /><span /></div>
      <div className="robot-body"><b>AGENT</b></div><div className="robot-arm left-arm" /><div className="robot-arm right-arm" />
      <div className="robot-leg left-leg" /><div className="robot-leg right-leg" />
    </div>
  );
}

const capabilities = [
  ['LLM', '智能核心'], ['Chatbot', '用对话访问模型'], ['Tool Use', '模型开始使用外部能力'],
  ['Agent', '围绕目标持续行动'], ['Harness', '支撑 Agent 行动的基础设施'], ['Multi-Agent', '多个 Agent 分工合作'],
];

const slides: Slide[] = [
  {
    max: 0,
    render: () => (
      <div className="title-slide">
        <div className="eyebrow">机器人社 · 招新培训</div>
        <h1>从 Chatbot 到 Agent</h1>
        <p className="subtitle">AI 工具与 Agentic Workflow 入门</p>
        <div className="hero-sequence"><span>Chat</span><i>↓</i><span>Tools</span><i>↓</i><span>Agent</span><i>↓</i><span>Computer</span></div>
      </div>
    ),
  },
  {
    active: 'Agent', max: 3,
    render: (step) => (
      <>
        <SlideTitle>AI 已经不只是聊天</SlideTitle>
        <div className="comparison">
          <Reveal at={1} step={step} className="comparison-card muted-card"><div className="card-label">Chatbot</div><VerticalFlow items={['User', 'Prompt', 'Model', 'Text']} compact /></Reveal>
          <Reveal at={2} step={step} className="comparison-card accent-card"><div className="card-label">Agent</div><VerticalFlow items={['User', 'Goal', 'Agent', 'Files · Terminal · Browser · APIs', 'Result']} accent compact /></Reveal>
        </div>
        <Reveal at={3} step={step} className="takeaway">AI 正在从 <strong>“回答问题”</strong> 走向 <strong>“完成任务”</strong></Reveal>
      </>
    ),
  },
  {
    max: 1,
    render: (step) => (
      <>
        <SlideTitle>AI 能力地图</SlideTitle>
        <div className="capability-map">{capabilities.map(([name, desc], index) => <div className="capability-step" key={name}><div className="capability-card"><strong>{name}</strong><span>{desc}</span></div>{index < capabilities.length - 1 && <b>→</b>}</div>)}</div>
        <Reveal at={1} step={step} className="takeaway compact">这不是严格技术栈，而是一条 <strong>能力演进路线</strong></Reveal>
      </>
    ),
  },
  {
    active: 'LLM', max: 3,
    render: (step) => (
      <>
        <SlideTitle kicker="01 · INTELLIGENCE">LLM = 大脑</SlideTitle>
        <div className="center-stack">
          <div className="equation hero-equation">Model <em>≠</em> Product</div>
          <Reveal at={1} step={step}><Tags items={['GPT', 'Claude', 'Gemini', 'Qwen', 'DeepSeek']} /></Reveal>
          <Reveal at={2} step={step} className="engine-analogy"><span>Model</span><b>=</b><span className="engine-box">Engine</span><i>→</i><span>AI Product</span></Reveal>
        </div>
        <Reveal at={3} step={step} className="takeaway">模型只是整个 AI 系统中的 <strong>智能核心</strong></Reveal>
      </>
    ),
  },
  {
    active: 'Chatbot', max: 2,
    render: (step) => (
      <>
        <SlideTitle kicker="02 · CONVERSATION">Chatbot</SlideTitle>
        <div className="two-column lesson-grid">
          <VerticalFlow items={['User', 'Prompt', 'LLM', 'Response']} accent />
          <Reveal at={1} step={step} className="prompt-list"><p>“解释 PID 控制”</p><p>“帮我看看这段代码”</p><p>“总结这篇文章”</p></Reveal>
        </div>
        <Reveal at={2} step={step} className="takeaway"><strong>Chatbot</strong> &nbsp; Input → Output</Reveal>
      </>
    ),
  },
  {
    active: 'Tool Use', max: 4,
    render: (step) => (
      <>
        <SlideTitle kicker="03 · ACTION">Tool Use</SlideTitle>
        <div className="tool-orbit">
          <div className="orbit-core">Model</div>
          {['Web', 'Files', 'Python', 'Terminal', 'API'].map((tool, index) => <Reveal at={1} step={step} className={`orbit-tool orbit-${index}`} key={tool}>{tool}</Reveal>)}
        </div>
        <Reveal at={2} step={step} className="think-act"><div><small>MODEL</small><b>Think</b></div><span>×</span><div><small>TOOLS</small><b>Act</b></div></Reveal>
        <Reveal at={3} step={step} className="build-case">
          <CodeWindow title="ROS2 · DEBUG" lines={['Read Repo', 'Run colcon build', 'Read Error', 'Inspect Files', <strong key="find">Find Problem ✓</strong>]} />
          <div className="case-note"><span>普通 Chatbot</span><p>只能根据你复制的错误分析</p><span>Tool-enabled AI</span><p>可以进入项目实际查找问题</p></div>
        </Reveal>
        <Reveal at={4} step={step} className="takeaway">工具让模型第一次真正具有 <strong>“行动能力”</strong></Reveal>
      </>
    ),
  },
  {
    active: 'Agent', max: 3,
    render: (step) => (
      <>
        <SlideTitle kicker="04 · LOOP">如果 AI 可以不断使用工具呢？</SlideTitle>
        <div className="loop-layout">
          <Reveal at={1} step={step}><AgentLoop /></Reveal>
          <Reveal at={2} step={step} className="action-list">{['观察当前状态', '决定下一步', '调用工具', '读取结果', '调整计划', '再次行动'].map((x, i) => <p key={x}><b>{String(i + 1).padStart(2, '0')}</b>{x}</p>)}</Reveal>
        </div>
        <Reveal at={3} step={step} className="formula-strip"><span>Agent ≈</span><b>Model</b><i>+</i><b>Tools</b><i>+</i><b>Loop</b><i>+</i><b>Goal</b></Reveal>
      </>
    ),
  },
  {
    active: 'Agent', max: 3,
    render: (step) => (
      <>
        <SlideTitle kicker="ROBOTICS CASE">修复机器人电机振荡</SlideTitle>
        <div className="case-timeline">{['Read PID Code', 'Read Motor Log', '发现 Overshoot', 'Modify', 'Run Test', 'Still Unstable', 'Analyze Again', 'Modify Again', 'Tests Pass'].map((item, index) => <Reveal at={index < 3 ? 1 : index < 6 ? 2 : 3} step={step} className={`timeline-step ${item === 'Still Unstable' ? 'warning' : ''} ${item === 'Tests Pass' ? 'success' : ''}`} key={item}><b>{String(index + 1).padStart(2, '0')}</b><span>{item}</span>{index < 8 && <i>→</i>}</Reveal>)}</div>
        <div className="corner-loop"><AgentLoop mini /></div>
        <Reveal at={3} step={step} className="takeaway"><strong>Try</strong> → <strong>Observe</strong> → <strong>Retry</strong><small>Agent 的能力来自循环，不是一次完美回答</small></Reveal>
      </>
    ),
  },
  {
    active: 'Harness', max: 7,
    render: (step) => (
      <>
        <SlideTitle kicker="05 · INFRASTRUCTURE">Harness <small>智能体的“外壳 / 执行底座”</small></SlideTitle>
        {step <= 1 && <div className="harness-question"><p>如果 Model 是“大脑”，</p><strong>Agent 靠什么真正工作？</strong><Reveal at={1} step={step}><div className="harness-definition"><b>Harness</b><span>=</span><p>包裹在模型之外的<br /><strong>“基础设施 + 工程系统”</strong></p></div></Reveal></div>}
        {step >= 2 && step <= 5 && <div className="harness-cards">
          {[
            ['01', '工具与行动力', ['Files', 'Terminal', 'Browser', 'APIs', 'Computer'], '读写 · 执行 · 调用 · 操作'],
            ['02', '记忆与状态', ['Conversation', 'Task State', 'History', 'Memory'], '多轮任务 · 中间状态 · 历史信息'],
            ['03', '规划与编排', ['Planning', 'Scheduling', 'Retry', 'Error Handling'], '规划 · 执行 · 重试 · 纠错'],
            ['04', '安全与可观测性', ['Sandbox', 'Permissions', 'Logs', 'Monitoring'], '权限 · 隔离 · 日志 · 监控'],
          ].map((item, index) => <Reveal at={index + 2} step={step} className="harness-card" key={item[1] as string}><div className="number">{item[0] as string}</div><h3>{item[1] as string}</h3><Tags items={item[2] as string[]} /><p>{item[3] as string}</p></Reveal>)}
        </div>}
        {step === 6 && <div className="agent-vs-harness">
          <div className="vs-card agent-side"><span>Agent</span><h3>完整的“执行者”</h3><p><b>组成</b> Model + Harness</p><p><b>层次</b> 更高层的抽象概念</p><p><b>类比</b> 能独立工作的机器人</p><p><b>产物</b> 可完成任务的应用或服务</p></div>
          <div className="vs-divider">VS</div>
          <div className="vs-card harness-side"><span>Harness</span><h3>工作台 / 操作系统 / 基础设施</h3><p><b>组成</b> Tools · Memory · Execution · Planning · Safety</p><p><b>层次</b> 更具体的工程实现层</p><p><b>类比</b> 身体 · 传感器 · 执行器 · 控制系统</p><p><b>产物</b> 框架 · 平台 · 运行环境 · 工具系统</p></div>
        </div>}
        {step >= 7 && <div className="robot-analogy"><div className="analogy-block"><small>“大脑”</small><b>Model</b><span>负责想</span></div><i>+</i><div className="analogy-block wide"><small>“身体、传感器、执行器、控制系统”</small><b>Harness</b><span>让它能够行动</span></div><i>=</i><div className="robot-wrap"><Robot /><strong>Agent</strong><span>最终的执行者</span></div></div>}
      </>
    ),
  },
  {
    active: 'Multi-Agent', max: 3,
    render: (step) => (
      <>
        <SlideTitle kicker="06 · ORCHESTRATION">如果一个 Agent 不够呢？</SlideTitle>
        <div className="multi-agent-flow"><Reveal at={1} step={step} className="manager-path"><div>Complex Task</div><i>↓</i><strong>Manager Agent</strong><i>↓</i></Reveal><Reveal at={2} step={step} className="worker-row"><div>Research Agent</div><div>Coding Agent</div><div>Testing Agent</div></Reveal><Reveal at={3} step={step} className="result-node"><i>↓</i><strong>Final Result</strong></Reveal></div>
        <Reveal at={3} step={step} className="takeaway compact"><span className="strike">让几个 AI 聊天</span><strong>任务拆解 + 专业分工 + 协调执行 + 结果汇总</strong></Reveal>
      </>
    ),
  },
  {
    active: 'Agent', max: 3,
    render: (step) => (
      <>
        <SlideTitle>Prompt 很重要 <small>但 Context 往往更重要</small></SlideTitle>
        <div className="context-layout">
          <div className="prompt-bubble">“帮我写一个 PID 控制器。”</div>
          <Reveal at={1} step={step} className="context-spec">{[
            ['Project', 'STM32F407'], ['Encoder', '500 PPR'], ['Gear Ratio', '19:1'], ['Control Frequency', '1 kHz'], ['Existing Files', 'motor.c · encoder.c'], ['Goal', '实现速度环 PID'], ['Constraint', '不要修改 HAL 初始化代码'], ['Verification', '运行现有 Tests'],
          ].map(([k, v]) => <div key={k}><b>{k}</b><span>{v}</span></div>)}</Reveal>
        </div>
        <Reveal at={2} step={step} className="context-groups"><Tags items={['Goal', 'Context', 'Constraints', 'Resources', 'Verification']} accent /></Reveal>
        <Reveal at={3} step={step} className="takeaway compact">不靠一句“神奇 Prompt”，而是提供 <strong>正确的信息环境</strong></Reveal>
      </>
    ),
  },
  {
    active: 'Agent', max: 2,
    render: (step) => (
      <>
        <SlideTitle>如何给 Agent 一个好任务</SlideTitle>
        <div className="five-areas">{[
          ['Goal', '你希望完成什么？'], ['Context', 'Agent 需要知道什么？'], ['Constraints', '什么不能做？'], ['Tools', '可以使用什么能力？'], ['Verification', '怎样证明任务完成？'],
        ].map(([name, desc], index) => <Reveal at={1} step={step} className={`area-card ${index === 4 ? 'verify-card' : ''}`} key={name}><b>{name}</b><p>{desc}</p></Reveal>)}</div>
        <Reveal at={2} step={step} className="verification-zone"><p>不要只让 AI 自己说“我完成了”</p><Tags items={['Tests', 'Build', 'Logs', 'Measurements', 'Simulation']} accent /></Reveal>
      </>
    ),
  },
  {
    active: 'Tool Use', max: 3,
    render: (step) => (
      <>
        <SlideTitle kicker="STANDARD CONNECTION">MCP <small>Model Context Protocol</small></SlideTitle>
        <div className="mcp-comparison">
          <Reveal at={1} step={step} className="interface-column"><strong>Computer</strong><i>↓</i><b>USB</b><i>↓</i><Tags items={['Keyboard', 'Mouse', 'Camera']} /></Reveal>
          <div className="analogy-equals">≈</div>
          <Reveal at={2} step={step} className="interface-column accent-interface"><strong>Agent</strong><i>↓</i><b>MCP</b><i>↓</i><Tags items={['GitHub', 'Database', 'Docs', 'APIs', 'Tools']} accent /></Reveal>
        </div>
        <Reveal at={3} step={step} className="takeaway"><strong>MCP</strong> = 让 Agent 用标准化方式连接外部工具和数据</Reveal>
      </>
    ),
  },
  {
    active: 'Harness', max: 3,
    render: (step) => (
      <>
        <SlideTitle kicker="REUSABLE WORKFLOW">Skill</SlideTitle>
        <div className="prompt-skill"><Reveal at={1} step={step} className="prompt-skill-card"><small>Prompt</small><b>“这一次怎么做”</b></Reveal><i>→</i><Reveal at={2} step={step} className="prompt-skill-card accent-card"><small>Skill</small><b>“这一类任务以后都怎么做”</b></Reveal></div>
        <Reveal at={2} step={step} className="skill-workflow"><div className="skill-name">ROS2 Debugging Skill</div><HorizontalFlow items={['Read package.xml', 'Check CMakeLists', 'Run colcon build', 'Analyze Error', 'Fix Code', 'Run Tests', 'Report']} accentIndex={6} /></Reveal>
        <Reveal at={3} step={step} className="takeaway"><strong>Skill</strong> = Reusable Workflow <small>把经验、规则、流程变成 Agent 可重复使用的能力</small></Reveal>
      </>
    ),
  },
  {
    max: 2,
    render: (step) => (
      <>
        <SlideTitle>这些概念在真实工具里是什么样？</SlideTitle>
        <div className="product-grid">{[
          ['NotebookLM', '资料与知识', '01'], ['VS Code + AI', '传统 IDE + AI', '02'], ['Cursor', 'AI Native IDE', '03'], ['Codex', 'Coding Agent', '04'],
        ].map(([name, desc, no]) => <Reveal at={1} step={step} className="product-card" key={name}><span>{no}</span><h3>{name}</h3><p>{desc}</p></Reveal>)}</div>
        <Reveal at={2} step={step} className="takeaway">不是寻找“最强 AI”，而是寻找 <strong>“适合这个工作流的 AI”</strong></Reveal>
      </>
    ),
  },
  {
    max: 3,
    render: (step) => (
      <>
        <SlideTitle kicker="KNOWLEDGE TOOL">NotebookLM <small>让 AI 围绕你的资料工作</small></SlideTitle>
        <div className="notebook-flow"><Reveal at={1} step={step}><Tags items={['PDF', 'Docs', 'Datasheet', 'Notes']} /></Reveal><i>↓</i><div className="notebook-core">NotebookLM<span>GROUNDED</span></div><i>↓</i><Reveal at={2} step={step}><Tags items={['Ask', 'Summarize', 'Compare', 'Explain']} accent /></Reveal></div>
        <Reveal at={2} step={step} className="source-examples"><p>STM32 Manual</p><p>Motor Driver Datasheet</p><p>ROS2 Documentation</p><p>Competition Rules</p></Reveal>
        <Reveal at={3} step={step} className="takeaway compact"><strong>Grounded</strong> = AI 的回答围绕你提供的 <strong>Context</strong> 建立</Reveal>
      </>
    ),
  },
  {
    max: 3,
    render: (step) => (
      <>
        <SlideTitle kicker="AI CODING · MODE 1">VS Code + AI Plugins</SlideTitle>
        <div className="ide-window">
          <div className="ide-sidebar"><i /><i /><i /><i /></div>
          <div className="ide-code"><div className="ide-tab">motor_controller.cpp</div><code><span>class</span> MotorController {'{'}<br />&nbsp;&nbsp;<span>void</span> update(float target) {'{'}<br />&nbsp;&nbsp;&nbsp;&nbsp;error = target - speed;<br />&nbsp;&nbsp;&nbsp;&nbsp;output = pid.step(error);<br />&nbsp;&nbsp;{'}'}<br />{'}'};</code></div>
          <Reveal at={1} step={step} className="ide-chat"><b>AI CHAT</b><p>重构这段 PID 更新逻辑，保留当前接口。</p><div className="typing-line" /></Reveal>
          <div className="ide-terminal"><span>$ colcon build</span><b>Finished ✓</b></div>
        </div>
        <Reveal at={2} step={step} className="ide-features"><Tags items={['Autocomplete', 'Explain', 'Refactor', 'Generate Tests', 'Agent']} accent /></Reveal>
        <Reveal at={3} step={step} className="takeaway compact"><strong>VS Code + AI Extension</strong> = 在熟悉的开发环境中加入 AI 能力</Reveal>
      </>
    ),
  },
  {
    active: 'Agent', max: 3,
    render: (step) => (
      <>
        <SlideTitle kicker="AI CODING · MODE 2">Cursor</SlideTitle>
        <Reveal at={1} step={step} className="workflow-row"><small>TRADITIONAL IDE</small><HorizontalFlow items={['Engineer', 'Search', 'Edit', 'Terminal', 'Debug']} /></Reveal>
        <Reveal at={2} step={step} className="workflow-row agentic-row"><small>AI NATIVE IDE</small><HorizontalFlow items={['Engineer', 'Goal', 'Agent', 'Search Repo', 'Edit Files', 'Run Commands', 'Verify']} accentIndex={2} /></Reveal>
        <Reveal at={3} step={step} className="cursor-summary"><div className="equation">Cursor <em>=</em> IDE + Context + Coding Agent</div><Tags items={['日常 Coding', '理解陌生 Repo', '跨文件修改', 'Debug', 'Refactor']} /></Reveal>
      </>
    ),
  },
  {
    active: 'Harness', max: 4,
    render: (step) => (
      <>
        <SlideTitle kicker="FROM ASSISTANT TO AGENT">Codex</SlideTitle>
        <Reveal at={1} step={step} className="codex-task-flow"><HorizontalFlow items={['Task', 'Understand Repo', 'Plan', 'Edit', 'Run', 'Test', 'Verify']} accentIndex={6} /></Reveal>
        <Reveal at={2} step={step} className="codex-tools"><Tags items={['Files', 'Terminal', 'Git', 'Tests', 'Browser', 'Computer']} accent /></Reveal>
        <Reveal at={3} step={step} className="codex-stack"><div className="stack-model">Model</div><i>↓</i><div className="stack-harness"><b>Harness</b><span>Files · Terminal · Browser · Execution Environment · Permissions · Verification</span></div><i>↓</i><div className="stack-agent">Agent</div></Reveal>
        <Reveal at={4} step={step} className="takeaway compact"><span className="strike">“帮我补代码”</span><strong>“把一个工程任务交给 Agent”</strong></Reveal>
      </>
    ),
  },
  {
    active: 'Tool Use', max: 3,
    render: (step) => (
      <>
        <SlideTitle>如果 Agent 不只能操作代码呢？</SlideTitle>
        <div className="expanding-tools">
          <div className="agent-source">Agent</div><i>↓</i>
          {step === 0 && <Tags items={['Terminal']} accent />}
          {step === 1 && <Tags items={['Files', 'Terminal', 'Browser']} accent />}
          {step >= 2 && <div className="computer-node">Computer</div>}
        </div>
        <Reveal at={2} step={step} className="computer-actions"><HorizontalFlow items={['See', 'Think', 'Click', 'Type', 'Observe', 'Repeat']} /></Reveal>
        <Reveal at={3} step={step} className="takeaway compact"><strong>Computer Use</strong> 不是新的“智能”，只是 Agent 多了一种新的 <strong>Tool</strong></Reveal>
      </>
    ),
  },
  {
    active: 'Agent', max: 3,
    render: (step) => (
      <>
        <SlideTitle kicker="COMPUTER USE">它是怎么工作的？</SlideTitle>
        <div className="computer-loop-layout"><div className="screen-loop"><div className="screen-frame"><div className="screen-top" /><div className="screen-button" /></div><i>↓</i><b>Observe</b><i>↓</i><b>Decide</b><i>↓</i><b>Click / Type</b><i>↺</i></div><Reveal at={1} step={step} className="connection-line"><span>same pattern</span></Reveal><Reveal at={1} step={step}><AgentLoop mini /></Reveal></div>
        <Reveal at={2} step={step} className="unknowns"><p>AI 并不提前知道：</p><Tags items={['按钮在哪里', '网页下一步是什么', '窗口会出现什么']} /></Reveal>
        <Reveal at={3} step={step} className="takeaway"><strong>Observe → Decide → Act → Observe</strong><small>Computer Use 本质上依然是 Agent Loop</small></Reveal>
      </>
    ),
  },
  {
    active: 'Agent', max: 3,
    render: (step) => (
      <>
        <SlideTitle kicker="AFTER THE DEMO">Agentic Workflow</SlideTitle>
        <div className="workflow-comparison"><Reveal at={1} step={step} className="workflow-column"><small>传统</small><VerticalFlow items={['Engineer', 'Search Docs', 'Write Code', 'Run Commands', 'Debug', 'Test', 'Document']} compact /></Reveal><Reveal at={2} step={step} className="workflow-column agentic-column"><small>Agentic</small><VerticalFlow items={['Engineer', 'Define Goal', 'Provide Context', 'Set Constraints', 'Agent Execute', 'Verify', 'Review']} compact accent /></Reveal></div>
        <Reveal at={3} step={step} className="engineer-skills"><Tags items={['定义正确问题', '提供 Context', '设计 Constraints', '选择 Tools', '设计 Verification']} accent /><p>AI 可以执行很多步骤。但 <strong>“什么值得做？”</strong> 和 <strong>“怎样证明它做对了？”</strong> 仍然是工程问题。</p></Reveal>
      </>
    ),
  },
  {
    max: 3,
    render: (step) => (
      <>
        <SlideTitle>从 Chatbot 到 Agent</SlideTitle>
        <div className={`closing-map ${step >= 1 ? 'fade-others' : ''}`}>{capabilities.map(([name], index) => <div className={name === 'Agent' ? 'keep' : ''} key={name}><span>{name}</span>{index < capabilities.length - 1 && <i>→</i>}</div>)}</div>
        <Reveal at={1} step={step} className="closing-equation"><div><b>Model</b><i>+</i><b>Context</b><i>+</i><b>Tools</b><i>+</i><b>Harness</b></div><span>↓</span><strong>Agent Capability</strong></Reveal>
        <Reveal at={2} step={step} className="closing-analogy"><div><b>Model</b><span>= 大脑</span></div><div><b>Harness</b><span>= 身体 + 传感器 + 执行器 + 控制系统</span></div><div><b>Agent</b><span>= 完整的执行者</span></div></Reveal>
        <Reveal at={3} step={step} className="final-question"><small>不要只问：“哪个 AI 最强？”</small><strong>对于这个任务，我需要怎样的 Model、Context、Tools 和 Harness？</strong></Reveal>
      </>
    ),
  },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const slide = useMemo(() => slides[index], [index]);

  const next = useCallback(() => {
    if (step < slide.max) setStep((value) => value + 1);
    else if (index < slides.length - 1) { setIndex((value) => value + 1); setStep(0); }
  }, [index, slide.max, step]);
  const previous = useCallback(() => {
    if (step > 0) setStep((value) => value - 1);
    else if (index > 0) { const target = index - 1; setIndex(target); setStep(slides[target].max); }
  }, [index, step]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') { event.preventDefault(); next(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
      if (event.key.toLowerCase() === 'f' && !document.fullscreenElement) document.documentElement.requestFullscreen?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, previous]);

  useEffect(() => { window.sessionStorage.setItem('agent-deck-slide', String(index)); }, [index]);
  useEffect(() => {
    const saved = Number(window.sessionStorage.getItem('agent-deck-slide'));
    if (Number.isInteger(saved) && saved >= 0 && saved < slides.length) setIndex(saved);
  }, []);

  return (
    <main className="presentation">
      {index > 0 && <Roadmap active={slide.active} />}
      <section className={`slide slide-${index + 1}`} key={index}>{slide.render(step)}</section>
      <div className="key-hint"><kbd>←</kbd><kbd>→</kbd><kbd>Space</kbd><kbd>F</kbd></div>
      <nav className="controls" aria-label="演示控制">
        <button onClick={previous} disabled={index === 0 && step === 0} aria-label="上一步">←</button>
        <span>{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <button onClick={next} disabled={index === slides.length - 1 && step === slide.max} aria-label="下一步">→</button>
      </nav>
    </main>
  );
}
