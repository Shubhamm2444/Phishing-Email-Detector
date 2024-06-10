const emailContentInput = document.getElementById('email-content');
const riskScoreSpan = document.getElementById('risk-score');
const riskMessage = document.getElementById('risk-message');

const redFlags = {
  urgent: /urgent|immediate|account suspension/,
  genericGreeting: /dear customer|dear user/,
  mismatchedSender: /(.*?)@(.*?) on behalf of (.*?)\.com/,
  typos: /\b\w+\b|\s\w+$/, // (very basic)
  suspiciousUrl: /http(s)?:\/\/[^\s]+/, // (checks for presence of URL only)
  personalInfoRequest: /password|credit card|social security/i
};

emailContentInput.addEventListener('input', () => {
  const emailContent = emailContentInput.value;
  let riskScore = 0;

  // Check for missing "@" symbol
  if (!emailContent.includes('@')) {
    riskScore = -1; // Special case for missing "@"
  } else {
    for (const flag in redFlags) {
      if (redFlags[flag].test(emailContent)) {
        riskScore++;
      }
    }
  }

  updateResult(riskScore);
});

function updateResult(score) {
  riskScoreSpan.textContent = score;
  let message;
  if (score === -1) {
    message = 'Unsafe: Email address format is invalid (missing "@").';
  } else if (score === 0) {
    message = 'Low Risk: This email seems legitimate.';
  } else if (score <= 2) {
    message = 'Medium Risk: Some red flags detected, proceed with caution.';
  } else {
    message = 'High Risk: This email exhibits multiple phishing indicators.';
  }
  riskMessage.textContent = message;
}
