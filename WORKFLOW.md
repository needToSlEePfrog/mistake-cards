# Mistake Cards — Claude 工作流

## 身份与上下文

这是 Orca（安徽大学通信工程大二）的题目卡片库 App。
部署在 https://mistake-cards.vercel.app，源码在 https://github.com/needToSlEePfrog/mistake-cards。

科目：信号与系统、复变函数、电磁波与电磁场、嵌入式系统。

---

## 工作流：添加一张新卡片

### 触发方式
Orca 发来题目（文字或图片），说明是哪个科目，Claude 负责解题并整理成卡片直接 push 进 repo。

### 第一步：解题
- 认真解题，解题过程要正确、完整
- 数学公式使用 KaTeX 语法（`$...$` 行内，`$$...$$` 块级）
- 如有原题图，图片会在对话中作为附件上传，Claude 环境里可以访问

### 第二步：整理成 card.json 格式

单张卡片结构：
```json
{
  "id": "yyyymmdd-{科目缩写}-{3位序号}",
  "subject": "信号与系统",
  "type": "mistake | example | good",
  "title": "题目简述（15字以内）",
  "question": "题目正文，支持 KaTeX",
  "image": null,
  "steps": [
    { "key": true,  "content": "关键步骤，始终展示，支持 KaTeX" },
    { "key": false, "content": "细节步骤，默认折叠，支持 KaTeX" }
  ],
  "conclusion": "结论或关键点，支持 KaTeX",
  "tags": ["标签1", "标签2"],
  "created": "yyyy-mm-dd"
}
```

字段说明：
- `type`：mistake（错题）/ example（例题）/ good（好题）
- `steps`：关键步骤（`key: true`）始终展示；细节步骤（`key: false`）默认折叠，点击展开
- `image`：原题图片的文件名（如 `q-20260324-001.jpg`），null 表示无图

### 第三步：push 到 repo

卡片数据存放位置：`/data/{科目}.json`，每个科目一个文件，格式为数组。

科目文件名映射：
- 信号与系统 → `signals.json`
- 复变函数 → `complex.json`
- 电磁波与电磁场 → `em.json`
- 嵌入式系统 → `embedded.json`

如果原题有图片，图片存放在 `/data/images/` 目录下。

Push 完成后 Vercel 自动部署，App 刷新即可看到新卡片。

### 第四步：告知 Orca
Push 成功后，告诉 Orca 卡片已添加，说明卡片 id 和科目。

---

## 卡片设计规范

- 白色卡片，深色 App 背景（`#0f0f1a`）
- 手机尺寸优先，假设在手机大小的实物卡上排版
- 精致、简约、有视觉层次
- 解题过程：关键步骤突出展示，细节步骤折叠
- 数学公式用 KaTeX 渲染

---

## GitHub 信息

- Repo：`needToSlEePfrog/mistake-cards`
- 主分支：`main`
- Token：由 Orca 在对话中提供（每次对话需重新提供）

---

## 注意事项

- 解题必须正确，有疑问时先说明再 push
- 每次对话开始时 Orca 会提供 GitHub token
- `key: true` 的步骤要精简，是"看一眼就能回忆思路"的那种
- 结论要能独立成句，是这道题最值得记住的一句话
