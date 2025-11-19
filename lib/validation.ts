import * as yup from "yup";

// Phone number validation schema
export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
});

// CSV row validation schema
export const csvRowSchema = yup.object().shape({
  phone: yup.string().required(),
  // Add other fields as needed based on your CSV structure
});

// Validate a phone number
export const validatePhone = async (
  phone: string,
): Promise<{ isValid: boolean; error?: string }> => {
  try {
    await phoneSchema.validate({ phone });
    return { isValid: true };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { isValid: false, error: error.message };
    }
    return { isValid: false, error: "Unknown validation error" };
  }
};

// Validate CSV row
export const validateCsvRow = async (
  row: Record<string, unknown>,
): Promise<{ isValid: boolean; errors?: string[] }> => {
  try {
    await csvRowSchema.validate(row, { abortEarly: false });
    return { isValid: true };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { isValid: false, errors: error.errors };
    }
    return { isValid: false, errors: ["Unknown validation error"] };
  }
};
