基于你提供的项目代码、功能逻辑以及部署配置，我为你起草了一份专业的 **README.md**。这份文档涵盖了项目背景、核心功能、技术栈、安装指南以及部署注意事项。

---

# 🧿 Artkoff AI Coffee & Food Oracle (料理占卜师)

**Artkoff AI Coffee & Food Oracle** 是一款基于 Vue 3 和 AI 驱动的感官生活助手。它将咖啡萃取科学、分子风味化学与传统占卜元素相结合，通过深度学习模型为用户提供个性化的咖啡阅读、酱料配方合成及多场景菜单设计建议。

---

## ✨ 核心功能

### 1. ☕ 咖啡占卜 (Coffee Oracle)

根据用户当前的能量状态或随机参数，生成极具仪式感的萃取报告：

* **Daily Brew Reading**: 结合星座与天体能量，锁定今日的幸运咖啡。
* **Caffeine Aura**: 根据 8 种情绪维度（如 Deep Work, Melancholy, Zen）生成情感修复配方。
* **Extraction Seed**: 通过数秘术逻辑解析 1-99 之间的数字，将其转化为具体的物理萃取参数。

### 2. 🧪 糖浆风味大师 (Syrup Master)

专注于分子级别的风味合成，由“Artkoff 首席风味化学家”提供实验室级别的配方指南：

* **物理参数分析**: 自动计算并展示香气平衡度 (Aroma)、粘稠度 (Viscosity)、明亮度 (Brightness) 等关键指标。
* **纯风味逻辑**: AI 描述完全解耦咖啡依赖，专注于糖浆/果酱本身的化学稳定性与口感层次。

### 3. 🍱 智慧菜单与菜谱 (Table & Recipe)

* **一桌菜设计**: 根据用餐场景（家庭、浪漫、商务）智能搭配多道菜品，平衡营养与口味。
* **深度菜谱生成**: 提供包含火候控制、制作步骤及“大厨秘籍”的详细教程。
* **营养分析与搭配**: 对每道菜进行 1-10 分的健康评分，并推荐“接地气”的饮品搭配方案。

---

## 🛠️ 技术栈

* **前端框架**: Vue 3 (Composition API)
* **开发语言**: TypeScript
* **构建工具**: Vite 5
* **样式处理**: Tailwind CSS
* **状态管理**: Pinia
* **API 通信**: Axios
* **路由管理**: Vue Router

---

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/what-to-eat.git
cd what-to-eat

```

### 2. 环境配置

在根目录创建 `.env` 文件，并参考 `.env.example` 配置你的 AI API Key：

```env
VITE_API_KEY=your_api_key_here
VITE_BASE_URL=https://api.your-provider.com/v1

```

### 3. 安装依赖

```bash
npm install

```

### 4. 本地开发

```bash
npm run dev

```

### 5. 项目构建

```bash
npm run build

```

---

## 🌐 部署说明

### Netlify 部署

项目已通过 `netlify.toml` 进行预配置：

* **构建命令**: `npm install && npx vite build --config vite.config.prod.ts`。
* **基础路径**: 若部署在子目录（如 `/barista/`），请确保 `vite.config.ts` 中的 `base` 属性已正确设置。
* **重定向规则**: 包含针对子目录的 SPA 路由重定向配置。

### Vercel 部署

项目同样包含 `vercel.json` 配置文件，支持全量路由重写以兼容 Vue Router 的 History 模式。

---

## 📁 目录结构

* `src/views/`: 包含占卜、酱料设计、画廊等核心视图。
* `src/services/`: AI 逻辑处理核心，包含 Prompt 工程与 JSON 解析逻辑。
* `src/types/`: 严格的 TypeScript 接口定义。
* `src/config/`: 星座、情绪、食材等静态配置库。

---

## ⚖️ 开源协议

本项目遵循 MIT 协议。

---

**Would you like me to add a specific "Contribution" section or change the project name to something else?**