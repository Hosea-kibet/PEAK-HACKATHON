/**
 * Script to fix phone numbers that were stored with scientific notation
 * This re-validates and attempts to clean records in CleanedData table
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Convert scientific notation to normal number string
function convertScientificNotation(input: string): string {
  if (/^\d+\.?\d*[eE][+\-]?\d+$/.test(input.trim())) {
    try {
      const num = parseFloat(input);
      return num.toFixed(0);
    } catch {
      return input;
    }
  }
  return input;
}

// Simple validation function
function validateAndFormatPhone(input: string): { isValid: boolean; formatted: string; bestAttempt: string; error: string } {
  if (!input) {
    return { isValid: false, formatted: '', bestAttempt: '', error: 'Phone number is required' };
  }

  // Convert scientific notation first
  const processedInput = convertScientificNotation(input.trim());
  
  // Remove all non-digit characters
  const cleaned = processedInput.replace(/\D/g, '');

  if (!cleaned) {
    return { isValid: false, formatted: '', bestAttempt: '', error: 'Phone number contains no digits' };
  }

  // Store cleaned as bestAttempt
  const bestAttempt = cleaned;
  let formatted = '';

  // Handle different formats
  if (cleaned.startsWith('254')) {
    if (cleaned.length === 12) {
      formatted = `+${cleaned}`;
    } else {
      return { isValid: false, formatted: '', bestAttempt, error: `Invalid length: ${cleaned.length} digits (expected 12 with country code)` };
    }
  } else if (cleaned.startsWith('0')) {
    if (cleaned.length === 10) {
      formatted = `+254${cleaned.substring(1)}`;
    } else {
      return { isValid: false, formatted: '', bestAttempt, error: `Invalid length: ${cleaned.length} digits (expected 10 starting with 0)` };
    }
  } else if (cleaned.length === 9) {
    formatted = `+254${cleaned}`;
  } else {
    return { isValid: false, formatted: '', bestAttempt, error: `Unrecognized format with ${cleaned.length} digits` };
  }

  return { isValid: true, formatted, bestAttempt, error: '' };
}

async function main() {
  console.log('🔍 Finding invalid cleaned records...\n');

  // Get all invalid records from CleanedData
  const invalidRecords = await prisma.cleanedData.findMany({
    where: {
      isValid: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  console.log(`Found ${invalidRecords.length} invalid records\n`);

  if (invalidRecords.length === 0) {
    console.log('No invalid records to fix!');
    return;
  }

  let fixed = 0;
  let stillInvalid = 0;

  for (const record of invalidRecords) {
    const originalPhone = record.originalPhone;
    console.log(`\nProcessing: ${originalPhone}`);
    console.log(`   Original error: ${record.errorMessage}`);

    // Re-validate with new logic
    const result = validateAndFormatPhone(originalPhone);

    if (result.isValid) {
      // Update the record with valid formatted phone
      await prisma.cleanedData.update({
        where: { id: record.id },
        data: {
          cleanedPhone: result.formatted,
          isValid: true,
          errorMessage: null,
        },
      });
      console.log(`   FIXED! New value: ${result.formatted}`);
      fixed++;
    } else {
      // Even if invalid, save the best attempt (cleaned digits)
      const cleanedPhoneValue = result.bestAttempt || originalPhone;
      await prisma.cleanedData.update({
        where: { id: record.id },
        data: {
          cleanedPhone: cleanedPhoneValue,
          errorMessage: result.error,
        },
      });
      console.log(`   Still invalid but saved cleaned version: ${cleanedPhoneValue}`);
      console.log(`   Error: ${result.error}`);
      stillInvalid++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\nSummary:`);
  console.log(`   Total processed: ${invalidRecords.length}`);
  console.log(`   Fixed (now valid): ${fixed}`);
  console.log(`   Updated (still invalid but cleaned): ${stillInvalid}`);
  console.log('');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
