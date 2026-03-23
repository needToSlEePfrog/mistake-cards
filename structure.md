# 错题 Dashboard PWA — 文件结构

/
├── index.html          # Dashboard 主页
├── subject.html        # 错题本页面（科目视图）
├── card.html           # 单张卡片详情页
├── import.html         # 导入 JSON/图片页面
├── manifest.json       # PWA manifest（每科一个 shortcut）
├── sw.js               # Service Worker（离线缓存）
├── css/
│   └── app.css
├── js/
│   ├── db.js           # IndexedDB 封装
│   ├── katex-render.js # KaTeX 数学渲染
│   └── app.js          # 主逻辑
└── icons/              # 各科目图标
