import { resumeGeneratorStyles as styles } from '../styles/resume-generator.style';

export default function ResumeGeneratorContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Resume Generation</h1>
        <p className={styles.subtitle}>
          AI generates professional resumes with one click, saving time and improving quality
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Feature Introduction</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            The Resume Generation feature uses AI technology to automatically generate professional resume content based on your personal information and target position.
            AI analyzes position requirements and highlights your relevant experience and skills, helping you create more targeted resumes.
          </p>
          <p className="text-white/80">
            Supports multiple professional templates, allowing you to choose appropriate styles for different industries and position types.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Features</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 Smart Content Generation</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Intelligently match and highlight relevant experience based on position requirements</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Automatically optimize language expression using professional terminology</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Quantify achievement descriptions to enhance persuasiveness</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎨 Multiple Templates</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Provide multiple professional resume templates</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Support custom colors and fonts</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Adapt to different industry and position styles</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📄 Word Export</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Export in Word format</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Professional document format, easy to print and share</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Save multiple versions for different positions</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>How to Use</h2>
        <div className={styles.card}>
          <ol className="space-y-4 text-white/80">
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Complete Personal Information</p>
                <p className="text-white/60 text-sm">Fill in your basic information, education, work experience, etc. in account settings</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Select Target Position</p>
                <p className="text-white/60 text-sm">Choose or add a target position with detailed job description</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Choose Template</p>
                <p className="text-white/60 text-sm">Select an appropriate style from multiple professional templates</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Generate Resume</p>
                <p className="text-white/60 text-sm">Click generate, and AI will create resume content based on position requirements</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">5</span>
              <div>
                <p className="font-semibold mb-1">Preview and Adjust</p>
                <p className="text-white/60 text-sm">Review the generated resume and manually edit and adjust content</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">6</span>
              <div>
                <p className="font-semibold mb-1">Export and Use</p>
                <p className="text-white/60 text-sm">Export as Word format, easy to print and share</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Tips</h2>
        <div className={styles.note}>
          <p className="font-semibold mb-2">💡 Optimization Suggestions</p>
          <ul className="space-y-2 text-sm">
            <li>• Provide detailed job descriptions for more targeted content generation</li>
            <li>• Use specific data and achievements in personal information</li>
            <li>• Manually adjust after generation to add personalized content</li>
            <li>• Generate different versions for different positions</li>
            <li>• Regularly update personal information to keep resume content current</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">Can I modify the generated resume?</h3>
          <p className="text-white/60">
            Yes. After generation, you can directly modify the content in the editor, adding or removing any sections.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">Can I save multiple versions?</h3>
          <p className="text-white/60">
            Yes. You can generate and save multiple resume versions for different positions.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">What are the free version limitations?</h3>
          <p className="text-white/60">
            The free version allows 3 resume generations per day. Upgrade to Pro to unlock unlimited usage.
          </p>
        </div>
      </div>
    </>
  );
}
