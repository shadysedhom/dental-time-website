import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateAge,
  formatDateForSubmission,
} from "./registrationUtils.ts";
import {
  ADULT_REQUIRED_QUESTION_IDS,
  CHILD_REQUIRED_QUESTION_IDS,
  validateMedicalAnswers,
} from "./medicalValidation.ts";

const answersFor = (questionIds, answer = "Nee") =>
  Object.fromEntries(questionIds.map((questionId) => [questionId, { answer }]));

test("formats dates for the existing Formcarry contract", () => {
  assert.equal(formatDateForSubmission("1990-01-09"), "09-01-1990");
  assert.equal(formatDateForSubmission(""), "");
});

test("calculates the age boundary on the sixteenth birthday", () => {
  assert.equal(calculateAge("2010-08-10", new Date(2026, 7, 9)), 15);
  assert.equal(calculateAge("2010-08-09", new Date(2026, 7, 9)), 16);
});

test("requires every child questionnaire answer", () => {
  const answers = answersFor(CHILD_REQUIRED_QUESTION_IDS);

  delete answers.q14;

  assert.equal(
    validateMedicalAnswers(
      answers,
      CHILD_REQUIRED_QUESTION_IDS,
      false,
    ),
    "Gelieve alle vragen in te vullen.",
  );
});

test("skips pregnancy questions for adult registrations without Mevr. salutation", () => {
  const answers = answersFor(ADULT_REQUIRED_QUESTION_IDS);

  delete answers.q23;
  delete answers.q24;

  assert.equal(
    validateMedicalAnswers(
      answers,
      ADULT_REQUIRED_QUESTION_IDS,
      true,
      "Dhr.",
    ),
    null,
  );
});

test("requires details for conditional medical answers", () => {
  const answers = answersFor(CHILD_REQUIRED_QUESTION_IDS);

  answers.q2 = { answer: "Ja", details: "" };

  assert.equal(
    validateMedicalAnswers(
      answers,
      CHILD_REQUIRED_QUESTION_IDS,
      false,
    ),
    "Vul ook de gevraagde toelichting in.",
  );
});

test("accepts a fully answered adult questionnaire", () => {
  const answers = answersFor(ADULT_REQUIRED_QUESTION_IDS);

  assert.equal(
    validateMedicalAnswers(
      answers,
      ADULT_REQUIRED_QUESTION_IDS,
      true,
      "Mevr.",
    ),
    null,
  );
});
