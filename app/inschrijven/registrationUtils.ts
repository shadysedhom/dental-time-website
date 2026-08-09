export type MedicalAnswer = {
  answer: string;
  details?: string;
};

export type MedicalAnswers = Record<string, MedicalAnswer>;

export function formatDateForSubmission(dateString: string): string {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");

  return `${day}-${month}-${year}`;
}

export function calculateAge(
  dateString: string,
  referenceDate = new Date(),
): number {
  const [year, month, day] = dateString.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = referenceDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && referenceDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
