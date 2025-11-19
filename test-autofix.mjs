import { validateAndFormatPhone } from './lib/phoneUtils.ts';

// Test with the example
const testCases = [
  '7122028*701',
  '712*345*678',
  '0712345678',
  '+254712345678',
];

console.log('Testing Auto-Fix Logic:\n');

testCases.forEach(input => {
  const result = validateAndFormatPhone(input);
  console.log(`Input: ${input}`);
  console.log(`  Valid: ${result.isValid}`);
  console.log(`  Formatted: ${result.formatted}`);
  console.log(`  Error Type: ${result.errorType}`);
  console.log(`  Best Attempt: ${result.bestAttempt}`);
  console.log(`  Errors: ${result.errors.join(', ')}`);
  console.log(`  Suggestions: ${result.suggestions.join(', ')}`);
  console.log('');
});
