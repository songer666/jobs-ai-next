import { resumeAnalyzerStyles as styles } from '../styles/resume-analyzer.style';

export default function ResumeAnalyzerContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>简历分析</h1>
        <p className={styles.subtitle}>
          深度分析你的简历，提供专业优化建议
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>功能介绍</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            简历分析功能使用 AI 技术对你的简历进行全面评估，从内容质量、格式规范、关键词匹配等多个维度进行分析，
            并提供具体的优化建议。
          </p>
          <p className="text-white/80">
            特别适合在投递简历前进行自查，确保简历质量，提高通过率。
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>核心特性</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📊 多维度评分</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>内容完整性 - 检查必要信息是否齐全</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>关键词匹配 - 分析与职位要求的匹配度</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>格式规范 - 评估简历的专业性和可读性</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>语言表达 - 检查用词和描述的专业程度</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 针对性分析</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>基于目标职位进行分析</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>识别与职位要求的差距</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>提供针对性的优化方向</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>💡 具体建议</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>指出简历中的问题和不足</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>提供具体的修改建议</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>给出优化后的示例</span>
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
                <p className="font-semibold mb-1">上传简历</p>
                <p className="text-white/60 text-sm">粘贴你的简历内容到文本框中</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">选择目标职位</p>
                <p className="text-white/60 text-sm">选择你要投递的目标职位（可选）</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">开始分析</p>
                <p className="text-white/60 text-sm">点击"开始分析"，AI 会对简历进行全面评估</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">查看报告</p>
                <p className="text-white/60 text-sm">查看详细的分析报告和评分</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">5</span>
              <div>
                <p className="font-semibold mb-1">优化简历</p>
                <p className="text-white/60 text-sm">根据建议修改简历，可以重新分析验证效果</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>分析维度说明</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>内容完整性</h3>
          <p className="text-white/60 text-sm mb-2">
            检查简历是否包含必要的信息模块：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>基本信息（姓名、联系方式等）</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>教育背景</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>工作经历</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>技能特长</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>关键词匹配</h3>
          <p className="text-white/60 text-sm mb-2">
            分析简历与职位要求的匹配程度：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>技能关键词覆盖率</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>行业术语使用</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>经验相关性</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>使用技巧</h2>
        <div className={styles.note}>
          <p className="font-semibold mb-2">💡 优化建议</p>
          <ul className="space-y-2 text-sm">
            <li>• 在投递前使用分析功能进行自查</li>
            <li>• 针对不同职位分别分析和优化</li>
            <li>• 重点关注评分较低的维度</li>
            <li>• 优化后重新分析，验证改进效果</li>
            <li>• 参考 AI 给出的示例进行修改</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>常见问题</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">分析需要多长时间？</h3>
          <p className="text-white/60">
            通常只需要几秒钟就能完成分析并生成报告。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">可以分析多次吗？</h3>
          <p className="text-white/60">
            可以。你可以在修改后重新分析，对比优化效果。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">免费版有使用限制吗？</h3>
          <p className="text-white/60">
            免费版每日可分析 3 次简历。升级到专业版可解锁无限次使用。
          </p>
        </div>
      </div>
    </>
  );
}
