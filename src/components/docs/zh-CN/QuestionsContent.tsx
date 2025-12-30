import { questionsStyles as styles } from '../styles/questions.style';

export default function QuestionsContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>题目练习</h1>
        <p className={styles.subtitle}>
          练习技术题目，提升你的求职竞争力
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>功能介绍</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            题目练习功能会根据你的目标职位，自动生成相关的技术面试题目。
            你可以通过练习这些题目，熟悉可能遇到的面试问题，并获得专业的 AI 反馈。
          </p>
          <p className="text-white/80">
            支持多种难度级别，从基础到进阶，满足不同阶段的练习需求。
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>核心特性</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 智能题目生成</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>根据目标职位生成相关题目</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>涵盖常见技术面试知识点</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>题目类型多样（概念题、算法题、设计题等）</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📊 难度分级</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>简单</span> - 基础概念和常见问题</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>中等</span> - 需要一定思考的问题</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>困难</span> - 复杂的技术挑战</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>💡 智能反馈</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>AI 自动评分</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>指出回答中的优点和不足</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>提供参考答案和解析</span>
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
                <p className="font-semibold mb-1">选择职位和难度</p>
                <p className="text-white/60 text-sm">选择目标职位和想要练习的题目难度</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">生成题目</p>
                <p className="text-white/60 text-sm">点击生成，AI 会创建一道相关题目</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">作答</p>
                <p className="text-white/60 text-sm">认真思考并输入你的答案</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">获取反馈</p>
                <p className="text-white/60 text-sm">提交后查看 AI 的评分和反馈</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>练习技巧</h2>
        <div className={styles.note}>
          <p className="font-semibold mb-2">💡 有效练习建议</p>
          <ul className="space-y-2 text-sm">
            <li>• 从简单难度开始，逐步提升</li>
            <li>• 先独立思考，再查看参考答案</li>
            <li>• 仔细阅读 AI 反馈，了解改进方向</li>
            <li>• 定期复习做错的题目</li>
            <li>• 每天坚持练习，保持手感</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>常见问题</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">题目会重复吗？</h3>
          <p className="text-white/60">
            AI 每次都会根据职位要求动态生成新题目，重复概率很低。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">可以选择特定知识点吗？</h3>
          <p className="text-white/60">
            目前根据职位自动生成题目，后续会支持知识点筛选功能。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">免费版有使用限制吗？</h3>
          <p className="text-white/60">
            免费版每日可练习 10 道题。升级到专业版可解锁无限次使用。
          </p>
        </div>
      </div>
    </>
  );
}
