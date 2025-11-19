// Phone number validation and formatting utilities for Kenyan numbers
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';

export type ErrorType = 
  | 'INVALID_CHARACTERS' 
  | 'TOO_SHORT' 
  | 'TOO_LONG' 
  | 'INVALID_FORMAT' 
  | 'INVALID_PREFIX'
  | 'EMPTY'
  | 'VALID';

export interface PhoneValidationResult {
  isValid: boolean;
  formatted: string;
  original: string;
  errors: string[];
  suggestions: string[];
  telco: TelcoProvider | null;
  bestAttempt?: string; // Best cleaned version even if invalid
  errorType?: ErrorType; // Type of validation error
}

export type TelcoProvider = "Safaricom" | "Airtel" | "Telkom" | "Unknown";

// Telco prefixes (note: approximate due to number portability)
const TELCO_PREFIXES = {
  Safaricom: [
    "110",
    "111",
    "112",
    "113",
    "114",
    "115",
    "700",
    "701",
    "702",
    "703",
    "704",
    "705",
    "706",
    "707",
    "708",
    "709",
    "710",
    "711",
    "712",
    "713",
    "714",
    "715",
    "716",
    "717",
    "718",
    "719",
    "720",
    "721",
    "722",
    "723",
    "724",
    "725",
    "726",
    "727",
    "728",
    "729",
    "740",
    "741",
    "742",
    "743",
    "745",
    "746",
    "748",
    "757",
    "758",
    "759",
    "768",
    "769",
    "790",
    "791",
    "792",
    "793",
    "794",
    "795",
    "796",
    "797",
    "798",
    "799",
  ],
  Airtel: [
    "730",
    "731",
    "732",
    "733",
    "734",
    "735",
    "736",
    "737",
    "738",
    "739",
    "750",
    "751",
    "752",
    "753",
    "754",
    "755",
    "756",
    "762",
    "763",
    "764",
    "765",
    "766",
    "767",
    "770",
    "771",
    "772",
    "773",
    "774",
    "775",
    "776",
    "777",
    "778",
  ],
  Telkom: [
    "770",
    "771",
    "772",
    "773",
    "774",
    "775",
    "776",
    "777",
    "778",
    "779",
    "780",
    "781",
    "782",
    "783",
    "784",
    "785",
    "786",
    "787",
    "788",
    "789",
  ],
};

/**
 * Identifies the telco provider based on phone number prefix
 */
export function identifyTelco(phoneNumber: string): TelcoProvider {
  // Extract the prefix (after country code)
  const cleaned = phoneNumber.replace(/\D/g, "");
  let prefix = "";

  if (cleaned.startsWith("254")) {
    prefix = cleaned.substring(3, 6); // Get 3 digits after 254
  } else if (cleaned.startsWith("0")) {
    prefix = cleaned.substring(1, 4); // Get 3 digits after 0
  } else if (cleaned.length === 9) {
    prefix = cleaned.substring(0, 3); // First 3 digits
  }

  // Check against telco prefixes
  for (const [telco, prefixes] of Object.entries(TELCO_PREFIXES)) {
    if (prefixes.includes(prefix)) {
      return telco as TelcoProvider;
    }
  }

  return "Unknown";
}

/**
 * Converts scientific notation to normal number string
 * Excel often converts large phone numbers to scientific notation (e.g., 2.54708E+11)
 */
function convertScientificNotation(input: string): string {
  // Check if input looks like scientific notation
  if (/^\d+\.?\d*[eE][+\-]?\d+$/.test(input.trim())) {
    try {
      // Parse the number and convert to string without scientific notation
      const num = parseFloat(input);
      // Use toFixed(0) to get integer without decimals
      return num.toFixed(0);
    } catch {
      return input;
    }
  }
  return input;
}

/**
 * Validates and formats a Kenyan phone number to +2547XXXXXXXX format
 * Now uses libphonenumber-js for accurate validation
 */
export function validateAndFormatPhone(input: string): PhoneValidationResult {
  const result: PhoneValidationResult = {
    isValid: false,
    formatted: "",
    original: input,
    errors: [],
    suggestions: [],
    telco: null,
    bestAttempt: "",
    errorType: 'EMPTY',
  };

  if (!input || typeof input !== "string") {
    result.errors.push("Phone number is required");
    result.errorType = 'EMPTY';
    return result;
  }

  // Convert scientific notation first (Excel mangles phone numbers)
  const processedInput = convertScientificNotation(input.trim());

  // Check for invalid characters (non-digits except +, -, spaces, parentheses)
  // * is can be an invalid character that is automatically removed during cleaning,
  // add that to hasInvalidChars
  const hasInvalidChars = /[^0-9+\-\s()]/.test(processedInput);
  
  // Remove all non-digit characters
  const cleaned = processedInput.replace(/\D/g, "");

  // Store the cleaned digits as best attempt (for display purposes)
  result.bestAttempt = cleaned;

  // Check if empty after cleaning
  if (!cleaned) {
    result.errors.push("Phone number contains no digits");
    result.errorType = hasInvalidChars ? 'INVALID_CHARACTERS' : 'EMPTY';
    return result;
  }

  // Prepare input for libphonenumber validation
  let inputForLibPhone = cleaned;
  let wasAutoFixed = false;
  
  // Prepare input for libphonenumber - try to make it valid
  if (cleaned.startsWith('254')) {
    inputForLibPhone = '+' + cleaned;
  } else if (cleaned.startsWith('0')) {
    inputForLibPhone = '+254' + cleaned.substring(1);
    wasAutoFixed = true;
  } else {
    // For any other format, try adding +254 (even if too short)
    inputForLibPhone = '+254' + cleaned;
    wasAutoFixed = true;
  }

  // Use libphonenumber to validate
  try {
    const phoneNumber = parsePhoneNumber(inputForLibPhone, 'KE' as CountryCode);
    
    if (phoneNumber && phoneNumber.isValid()) {
      // Successfully validated - this can be auto-fixed
      result.isValid = true;
      result.formatted = phoneNumber.formatInternational().replace(/\s/g, '');
      result.errorType = 'VALID';
      result.telco = identifyTelco(result.formatted);
      
      // Add suggestions based on what was cleaned/fixed
      if (hasInvalidChars) {
        result.suggestions.push(`Removed invalid characters from "${processedInput}"`);
      }
      if (wasAutoFixed || processedInput !== result.formatted) {
        result.suggestions.push(`Auto-fixed to ${result.formatted}`);
      }
      
      return result;
    } else {
      // libphonenumber parsed it but says it's not valid
      result.errors.push(`Invalid Kenyan phone number - will be moved to manual cleaning tab`);
      result.errorType = 'INVALID_FORMAT';
      if (hasInvalidChars) {
        result.suggestions.push(`Removed invalid characters from "${processedInput}", tried "${inputForLibPhone}" but still invalid - requires manual review`);
      } else {
        result.suggestions.push(`Tried formatting as "${inputForLibPhone}" but not valid - requires manual review`);
      }
    }
  } catch {
    // libphonenumber couldn't parse it at all
    if (hasInvalidChars) {
      result.errors.push(`Contains invalid characters - will be moved to manual cleaning tab`);
      result.errorType = 'INVALID_CHARACTERS';
      result.suggestions.push(`Removed invalid characters from "${processedInput}" to get "${cleaned}", tried "${inputForLibPhone}" but still invalid - requires manual correction`);
    } else if (cleaned.length < 9) {
      result.errors.push(`Too short (${cleaned.length} digits) - needs at least 9 digits - will be moved to manual cleaning tab`);
      result.errorType = 'TOO_SHORT';
      result.suggestions.push(`Original: "${processedInput}", cleaned: "${cleaned}" (${cleaned.length} digits), tried "${inputForLibPhone}" but still too short - add missing digits manually`);
    } else if (cleaned.length > 12) {
      result.errors.push(`Too long (${cleaned.length} digits) - maximum 12 digits - will be moved to manual cleaning tab`);
      result.errorType = 'TOO_LONG';
      result.suggestions.push(`Original: "${processedInput}", cleaned: "${cleaned}" (${cleaned.length} digits), tried "${inputForLibPhone}" but still too long - remove extra digits manually`);
    } else {
      result.errors.push(`Invalid phone number format - will be moved to manual cleaning tab`);
      result.errorType = 'INVALID_FORMAT';
      result.suggestions.push(`Original: "${processedInput}", cleaned: "${cleaned}", tried "${inputForLibPhone}" but libphonenumber couldn't validate it - requires manual review`);
    }
  }

  return result;
}

/**
 * Auto-fix common phone number issues
 */
export function autoFixPhone(input: string): string {
  const result = validateAndFormatPhone(input);
  return result.formatted || input;
}

/**
 * Batch validate phone numbers
 */
export function batchValidatePhones(
  phoneNumbers: string[],
): PhoneValidationResult[] {
  return phoneNumbers.map((phone) => validateAndFormatPhone(phone));
}

/**
 * Get telco color for UI badges
 */
export function getTelcoColor(telco: TelcoProvider): string {
  switch (telco) {
    case "Safaricom":
      return "bg-green-100 text-green-800 border-green-300";
    case "Airtel":
      return "bg-red-100 text-red-800 border-red-300";
    case "Telkom":
      return "bg-blue-100 text-blue-800 border-blue-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}
