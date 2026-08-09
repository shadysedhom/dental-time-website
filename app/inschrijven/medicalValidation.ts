import type { MedicalAnswers } from "./registrationUtils";

export const ADULT_REQUIRED_QUESTION_IDS = [
  "q0",
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
  "q11",
  "q12",
  "q13",
  "q14",
  "q15",
  "q16",
  "q17",
  "q18",
  "q19",
  "q20",
  "q21",
  "q22",
  "q23",
  "q24",
  "q25",
  "q26",
  "q27",
  "q28",
  "q29",
];

export const CHILD_REQUIRED_QUESTION_IDS = [
  "q0",
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
  "q11",
  "q12",
  "q13",
  "q14",
];

const ADULT_DETAIL_QUESTION_IDS = new Set([
  "q0",
  "q1",
  "q2",
  "q22",
  "q25",
  "q26",
  "q27",
  "q28",
  "q29",
]);

const CHILD_DETAIL_QUESTION_IDS = new Set([
  "q0",
  "q1",
  "q2",
  "q3",
  "q13",
  "q14",
]);

export function validateMedicalAnswers(
  answers: MedicalAnswers,
  requiredQuestionIds: string[],
  isAdultForm: boolean,
  salutation?: string,
): string | null {
  for (const questionId of requiredQuestionIds) {
    if (
      isAdultForm &&
      (questionId === "q23" || questionId === "q24") &&
      salutation !== "Mevr."
    ) {
      continue;
    }

    const answerEntry = answers[questionId];

    if (!answerEntry?.answer) {
      return "Gelieve alle vragen in te vullen.";
    }

    if (answerEntry.answer !== "Ja") continue;

    const details = answerEntry.details?.trim() || "";

    if (
      isAdultForm &&
      questionId === "q4" &&
      !/Bovendruk:\s*\S+,\s*Onderdruk:\s*\S+/.test(details)
    ) {
      return "Vul zowel de boven- als onderdruk in.";
    }

    const isDiabetesQuestion =
      (isAdultForm && questionId === "q15") ||
      (!isAdultForm && questionId === "q6");

    if (
      isDiabetesQuestion &&
      !/Gebruikt insuline:\s*(Ja|Nee)$/.test(details)
    ) {
      return "Geef aan of er insuline wordt gebruikt.";
    }

    if (
      isAdultForm &&
      (questionId === "q28" || questionId === "q29") &&
      !/Naam:\s*[^,]+,\s*Telefoonnummer:\s*[^,]+,\s*E-mail:\s*\S+@\S+/.test(
        details,
      )
    ) {
      return "Vul alle contactgegevens volledig in.";
    }

    const requiresDetails = isAdultForm
      ? ADULT_DETAIL_QUESTION_IDS.has(questionId)
      : CHILD_DETAIL_QUESTION_IDS.has(questionId);

    if (requiresDetails && !details) {
      return "Vul ook de gevraagde toelichting in.";
    }
  }

  return null;
}
