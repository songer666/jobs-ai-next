import { resumeAnalyzerStyles as styles } from '../styles/resume-analyzer.style';

export default function ResumeAnalyzerContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Resume Analysis</h1>
        <p className={styles.subtitle}>
          Deep analysis of your resume with professional optimization suggestions
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Feature Introduction</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            The Resume Analysis feature uses AI technology to comprehensively evaluate your resume, analyzing it from multiple dimensions including content quality, format standards, and keyword matching,
            and provides specific optimization suggestions.
          </p>
          <p className="text-white/80">
            Especially suitable for self-checking before submitting resumes to ensure quality and improve pass rates.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Features</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📊 Multi-dimensional Scoring</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Content Completeness - Check if necessary information is complete</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Keyword Matching - Analyze match with position requirements</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Format Standards - Evaluate professionalism and readability</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Language Expression - Check professionalism of wording and descriptions</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 Targeted Analysis</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Analysis based on target position</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Identify gaps with position requirements</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Provide targeted optimization directions</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>💡 Specific Suggestions</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Identify issues and shortcomings in resume</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Provide specific modification suggestions</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Give optimized examples</span>
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
                <p className="font-semibold mb-1">Upload Resume</p>
                <p className="text-white/60 text-sm">Paste your resume content into the text box</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Select Target Position</p>
                <p className="text-white/60 text-sm">Choose the target position you want to apply for (optional)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Start Analysis</p>
                <p className="text-white/60 text-sm">Click "Start Analysis" and AI will comprehensively evaluate your resume</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">View Report</p>
                <p className="text-white/60 text-sm">Review detailed analysis report and scores</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">5</span>
              <div>
                <p className="font-semibold mb-1">Optimize Resume</p>
                <p className="text-white/60 text-sm">Modify resume based on suggestions, can re-analyze to verify improvements</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Analysis Dimensions</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Content Completeness</h3>
          <p className="text-white/60 text-sm mb-2">
            Check if resume includes necessary information modules:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Basic information (name, contact, etc.)</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Education background</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Work experience</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Skills and expertise</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Keyword Matching</h3>
          <p className="text-white/60 text-sm mb-2">
            Analyze match between resume and position requirements:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Skill keyword coverage</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Industry terminology usage</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Experience relevance</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Tips</h2>
        <div className={styles.note}>
          <p className="font-semibold mb-2">💡 Optimization Suggestions</p>
          <ul className="space-y-2 text-sm">
            <li>• Use analysis feature for self-checking before submission</li>
            <li>• Analyze and optimize separately for different positions</li>
            <li>• Focus on dimensions with lower scores</li>
            <li>• Re-analyze after optimization to verify improvements</li>
            <li>• Refer to AI-provided examples for modifications</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">How long does analysis take?</h3>
          <p className="text-white/60">
            Usually only takes a few seconds to complete analysis and generate report.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">Can I analyze multiple times?</h3>
          <p className="text-white/60">
            Yes. You can re-analyze after modifications to compare optimization effects.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">What are the free version limitations?</h3>
          <p className="text-white/60">
            The free version allows 3 resume analyses per day. Upgrade to Pro to unlock unlimited usage.
          </p>
        </div>
      </div>
    </>
  );
}
