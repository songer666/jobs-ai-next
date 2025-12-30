import { resumeGeneratorStyles as styles } from '../styles/resume-generator.style';

export default function ResumeGeneratorContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>简历生成</h1>
        <p className={styles.subtitle}>
          AI 一键生成专业简历，节省时间，提高质量
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>功能介绍</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            简历生成功能利用 AI 技术，根据你的个人信息和目标职位，自动生成专业的简历内容。
            AI 会分析职位要求，突出你的相关经验和技能，帮助你制作出更有针对性的简历。
          </p>
          <p className="text-white/80">
            支持多种专业模板，可以根据不同行业和职位类型选择合适的样式。
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>核心特性</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 智能内容生成</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>根据职位要求智能匹配和突出相关经验</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>自动优化语言表达，使用专业术语</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>量化成果描述，增强说服力</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎨 多种模板</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>提供多种专业简历模板</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>支持自定义颜色和字体</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>适配不同行业和职位风格</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📄 Word 导出</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>支持 Word 格式导出</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>专业的文档格式，便于打印和分享</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>保存多个版本，针对不同职位</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>使用步骤</h2>
        <div className={styles.card}>
          <ol className="space-y-4 text-white/80">
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">完善个人信息</p>
                <p className="text-white/60 text-sm">在账户设置中填写你的基本信息、教育背景、工作经历等</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">选择目标职位</p>
                <p className="text-white/60 text-sm">选择或添加一个目标职位，提供详细的职位描述</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">选择模板</p>
                <p className="text-white/60 text-sm">从多种专业模板中选择适合的样式</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">生成简历</p>
                <p className="text-white/60 text-sm">点击生成，AI 会根据职位要求创建简历内容</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">5</span>
              <div>
                <p className="font-semibold mb-1">预览和调整</p>
                <p className="text-white/60 text-sm">查看生成的简历，可以手动编辑和调整内容</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">6</span>
              <div>
                <p className="font-semibold mb-1">导出使用</p>
                <p className="text-white/60 text-sm">导出为 Word 格式，便于打印和分享</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>使用技巧</h2>
        <div className={styles.note}>
          <p className="font-semibold mb-2">💡 优化建议</p>
          <ul className="space-y-2 text-sm">
            <li>• 提供详细的职位描述，AI 会生成更有针对性的内容</li>
            <li>• 在个人信息中使用具体的数据和成果</li>
            <li>• 生成后可以手动调整，添加个性化内容</li>
            <li>• 针对不同职位生成不同版本的简历</li>
            <li>• 定期更新个人信息，保持简历内容最新</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>常见问题</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">生成的简历可以修改吗？</h3>
          <p className="text-white/60">
            可以。生成后你可以直接在编辑器中修改内容，添加或删除任何部分。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">可以保存多个版本吗？</h3>
          <p className="text-white/60">
            可以。你可以为不同的职位生成和保存多个简历版本。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">免费版有使用限制吗？</h3>
          <p className="text-white/60">
            免费版每日可生成 3 次简历。升级到专业版可解锁无限次使用。
          </p>
        </div>
      </div>
    </>
  );
}
