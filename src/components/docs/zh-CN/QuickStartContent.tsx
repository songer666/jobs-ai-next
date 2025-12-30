import { quickStartStyles as styles } from '../styles/quick-start.style';

export default function QuickStartContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>快速开始</h1>
        <p className={styles.subtitle}>
          5 分钟快速上手 Jobs AI，开启你的求职之旅
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>第一步：注册账号</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            访问 Jobs AI 首页，点击"注册"按钮创建账号。支持以下注册方式：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>邮箱注册 - 使用邮箱和密码注册</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>GitHub 登录 - 使用 GitHub 账号快速登录</span>
            </li>
          </ul>
        </div>
        <div className={styles.note}>
          <p className="font-semibold mb-1">💡 提示</p>
          <p className="text-sm">
            使用 GitHub 登录更加便捷，无需记住额外的密码。
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>第二步：完善个人信息</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            登录后，前往"账户设置"页面完善个人信息。这些信息将帮助 AI 更好地为你服务：
          </p>
          <ol className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.number}>1</span>
              <div>
                <p className="font-semibold mb-1">基本信息</p>
                <p className="text-white/60 text-sm">姓名、联系方式、当前职位等</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.number}>2</span>
              <div>
                <p className="font-semibold mb-1">教育背景</p>
                <p className="text-white/60 text-sm">学校、专业、学历等</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.number}>3</span>
              <div>
                <p className="font-semibold mb-1">工作经历</p>
                <p className="text-white/60 text-sm">公司、职位、工作内容、成就等</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.number}>4</span>
              <div>
                <p className="font-semibold mb-1">技能特长</p>
                <p className="text-white/60 text-sm">编程语言、框架、工具等</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>第三步：添加目标职位</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            在"目标职位"页面添加你感兴趣的职位。详细的职位信息能让 AI 提供更精准的服务：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <div>
                <p className="font-semibold">职位名称</p>
                <p className="text-white/60 text-sm">如"前端开发工程师"、"产品经理"等</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <div>
                <p className="font-semibold">公司名称</p>
                <p className="text-white/60 text-sm">目标公司（可选）</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <div>
                <p className="font-semibold">职位描述</p>
                <p className="text-white/60 text-sm">完整的 JD 内容，越详细越好</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <div>
                <p className="font-semibold">技能要求</p>
                <p className="text-white/60 text-sm">职位要求的技能和经验</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>第四步：开始使用功能</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            现在你可以开始使用 Jobs AI 的各项功能了：
          </p>
          
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">🎯 AI 模拟面试</h4>
              <p className="text-white/60 text-sm mb-2">
                选择目标职位，开始与 AI 面试官对话练习。
              </p>
              <p className="text-white/60 text-sm">
                推荐频率：每周 2-3 次
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">📝 简历生成</h4>
              <p className="text-white/60 text-sm mb-2">
                选择职位和模板，让 AI 帮你生成专业简历。
              </p>
              <p className="text-white/60 text-sm">
                推荐场景：投递新职位前
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">📊 简历分析</h4>
              <p className="text-white/60 text-sm mb-2">
                上传简历，获取专业的优化建议。
              </p>
              <p className="text-white/60 text-sm">
                推荐场景：简历修改后验证
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">📚 题目练习</h4>
              <p className="text-white/60 text-sm mb-2">
                练习技术题目，提升专业能力。
              </p>
              <p className="text-white/60 text-sm">
                推荐频率：每天 5-10 题
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>使用建议</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📅 制定学习计划</h3>
          <p className="text-white/60 text-sm mb-3">
            建议制定一个系统的学习计划，充分利用各项功能：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>每周 2-3 次 AI 模拟面试</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>每天练习 5-10 道题目</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>定期更新和优化简历</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>投递前使用简历分析功能</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 设定目标</h3>
          <p className="text-white/60 text-sm mb-3">
            明确的目标能帮助你更有效地使用 Jobs AI：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>短期目标：掌握面试技巧，优化简历</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>中期目标：获得理想公司的面试机会</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>长期目标：成功拿到 offer</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📈 追踪进度</h3>
          <p className="text-white/60 text-sm mb-3">
            定期查看你的使用记录和进步：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>查看历史面试记录，对比评分变化</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>复习做错的题目，巩固知识点</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>对比简历优化前后的分析结果</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>常见问题</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">需要付费吗？</h3>
          <p className="text-white/60">
            Jobs AI 提供免费版本，每日有一定的使用次数限制。如需无限使用，可以升级到专业版。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">数据安全吗？</h3>
          <p className="text-white/60">
            我们非常重视数据安全，所有数据都经过加密存储，不会泄露给第三方。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">遇到问题怎么办？</h3>
          <p className="text-white/60">
            可以查看详细的功能文档，或联系客服获取帮助。
          </p>
        </div>
      </div>
    </>
  );
}
