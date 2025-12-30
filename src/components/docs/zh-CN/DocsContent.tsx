import { docsStyles as styles } from '../styles/docs.style';

export default function DocsContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>欢迎使用 Jobs AI</h1>
        <p className={styles.subtitle}>
          Jobs AI 是一个基于人工智能的求职辅助平台，帮助你在求职过程中脱颖而出。
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>什么是 Jobs AI？</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            Jobs AI 是一个集成了多种 AI 功能的求职辅助工具，旨在帮助求职者提升面试表现、优化简历质量、练习技术题目。
            我们利用先进的人工智能技术，为你提供个性化的求职指导和反馈。
          </p>
          <p className="text-white/80">
            无论你是应届毕业生还是职场老手，Jobs AI 都能为你提供有价值的帮助。
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>核心功能</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 AI 模拟面试</h3>
          <p className={styles.cardDesc}>
            与智能 AI 面试官进行真实对话练习，提升面试技巧。
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>根据目标职位定制面试问题</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>实时语音/文字对话，模拟真实场景</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>每次回答即时获得专业反馈</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>面试结束生成详细分析报告</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📝 简历生成</h3>
          <p className={styles.cardDesc}>
            AI 一键生成专业简历，节省时间，提高质量。
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>根据职位要求智能生成简历内容</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>支持多种专业模板选择</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>自定义样式和格式</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>支持 Markdown 格式导出</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📊 简历分析</h3>
          <p className={styles.cardDesc}>
            深度分析你的简历，提供专业优化建议。
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>多维度简历评分与诊断</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>针对目标岗位智能优化内容</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>识别简历中的问题和改进点</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>提供具体的修改建议</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📚 题目练习</h3>
          <p className={styles.cardDesc}>
            练习技术题目，提升你的求职竞争力。
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>根据职位生成相关练习题</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>支持多种难度级别</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>AI 自动评分和反馈</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>记录练习历史和进度</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>快速开始</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            开始使用 Jobs AI 非常简单，只需以下几步：
          </p>
          <ol className="space-y-3 text-white/80">
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">1</span>
              <span>注册账号并登录</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">2</span>
              <span>选择你想使用的功能（面试、简历生成、简历分析或题目练习）</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">3</span>
              <span>填写相关信息（如目标职位、个人经历等）</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">4</span>
              <span>开始使用 AI 功能，获取个性化建议</span>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>使用限制</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            为了保证服务质量，我们对不同功能设置了每日使用限制：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>免费版</span>：每日 3 次 AI 面试、3 次简历生成、3 次简历分析、10 道练习题</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>专业版</span>：无限次使用所有功能</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>企业版</span>：专业版所有功能 + 团队管理 + API 访问</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>需要帮助？</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            如果你在使用过程中遇到任何问题，可以：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>查看左侧导航栏中的详细功能文档</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>访问账户设置页面管理你的个人信息</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>联系我们的客服团队获取支持</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
