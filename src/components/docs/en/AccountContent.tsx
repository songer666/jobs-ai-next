import { accountStyles as styles } from '../styles/account.style';

export default function AccountContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Account Settings</h1>
        <p className={styles.subtitle}>
          Manage your account information and personal profile
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Personal Information</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            Completing your personal information helps AI better understand you and provide more accurate services.
            We recommend filling in the following information:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>Name</strong> - Used for resume generation</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>Current Position</strong> - Helps AI understand your background</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>Years of Experience</strong> - Used to match appropriate question difficulty</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>Skills</strong> - Helps generate more relevant content</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>Education</strong> - Used for resume generation</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>Work Experience</strong> - Used for resume generation and interview preparation</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Target Position Management</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            On the "Target Positions" page, you can add and manage positions you're interested in. Each position can include:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>Position Title</strong> - Such as "Frontend Developer"</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>Company Name</strong> - Target company</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>Job Description</strong> - JD content, the more detailed the better</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>Required Skills</strong> - Skills required for the position</span>
            </li>
          </ul>
        </div>
        <div className={styles.note}>
          <p className="font-semibold mb-2">💡 Tip</p>
          <p className="text-sm">
            After adding detailed position information, AI mock interviews, resume generation, question practice and other features will be optimized for that position.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Subscription Management</h2>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Current Plan</h3>
          <p className="text-white/80 mb-4">
            View and manage your subscription status on the "Subscription Management" page:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>View current plan and remaining usage</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Upgrade to Pro or Enterprise version</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>View billing history</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Manage payment methods</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Plan Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/80">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4">Feature</th>
                  <th className="text-center py-3 px-4">Free</th>
                  <th className="text-center py-3 px-4">Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">AI Interview</td>
                  <td className="text-center py-3 px-4">10/day</td>
                  <td className="text-center py-3 px-4">50/day</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">Resume Generation</td>
                  <td className="text-center py-3 px-4">20/day</td>
                  <td className="text-center py-3 px-4">100/day</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">Resume Analysis</td>
                  <td className="text-center py-3 px-4">20/day</td>
                  <td className="text-center py-3 px-4">100/day</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Question Practice</td>
                  <td className="text-center py-3 px-4">20/day</td>
                  <td className="text-center py-3 px-4">100/day</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Security Settings</h2>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Password Change</h3>
          <p className="text-white/80 mb-4">
            If you registered with email, you can change your password on the settings page. We recommend changing your password regularly to protect your account security.
          </p>
        </div>

        <div className={styles.warning}>
          <p className="font-semibold mb-2">⚠️ Note</p>
          <p className="text-sm">
            If you log in with GitHub, your password is managed by GitHub. Please change your password on GitHub.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Data Management</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            You can manage your data at any time:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Delete interview records</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Delete generated resumes</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Delete analysis reports</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Delete practice records</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">How do I delete my account?</h3>
          <p className="text-white/60">
            To delete your account, please contact customer service. After deletion, all data will be permanently removed and cannot be recovered.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">What if I forget my password?</h3>
          <p className="text-white/60">
            Click "Forgot Password" on the login page, and you can reset your password after email verification.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">How do I contact customer service?</h3>
          <p className="text-white/60">
            You can contact us through the contact information in the footer or send an email to support@jobsai.com.
          </p>
        </div>
      </div>
    </>
  );
}
