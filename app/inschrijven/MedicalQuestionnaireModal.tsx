"use client";

import { useEffect, useState, useCallback } from "react";
import { Stethoscope } from "lucide-react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";

import MedicalQuestion from "./MedicalQuestion";

export const ADULT_QUESTIONS_MAP: Record<string, string> = {
  q0: "Is er de agelopen maanden iets aan uw gezondheid veranderd?",
  q1: "Bent u ergens allergisch voor?",
  q2: "Heeft u een hartinfarct gehad?",
  q3: "Heeft u last van hartkloppingen?",
  q4: "Wordt u voor hoge bloeddruk behandeld?",
  q5: "Heeft u pijn op de borst bij inspanning?",
  q6: "Wordt u kortademig als u plat in bed ligt?",
  q7: "Heeft u een hartklepgebrek of een kunsthartklep?",
  q8: "Heeft u een aangeboren hartafwijking?",
  q9: "Heeft u wel eens een endocarditis (ontsteking aan het hart) doorgemaakt?",
  q10: "Heeft u een pacemaker (of ICD) of neurostimulator?",
  q11: "Bent u ooit flauwgevallen bij een tandheelkundige of medische behandeling?",
  q12: "Heeft u epilepsie, vallende ziekte?",
  q13: "Heeft u wel eens een hersenbloeding of beroerte (of TIA) gehad?",
  q14: "Heeft u last van longklachten zoals astma, bronchitis of chronische hoest?",
  q15: "Heeft u suikerziekte?",
  q16: "Heeft u bloedarmoede?",
  q17: "Heeft u wel eens langdurige bloedingen gehad na het trekken van tanden/kiezen of na een operatie?",
  q18: "Heeft u hepatitis, geelzucht of andere leverziekte (gehad)?",
  q19: "Heeft u een nierziekte?",
  q20: "Heeft u reuma en/of chronische gewrichtsklachten?",
  q21: "Bent u bestraald vanwege een tumor in hoofd of hals?",
  q22: "Rookt u?",
  q23: "Bent u zwanger?",
  q24: "Geeft u borstvoeding?",
  q25: "Heeft u een ziekte of aandoening waar niet naar is gevraagd?",
  q26: "Heeft u in het verleden een geneesmiddel gebruikt tegen o.a. botontkalking (een bisfosfonaat of denosumab)?",
  q27: "Gebruikt u medicijnen?",
};

export const KID_QUESTIONS_MAP: Record<string, string> = {
  q0: "Is er de agelopen maanden iets aan de gezondheid van uw kind veranderd?",
  q1: "Is uw kind onder behandeling van een (huis)arts of medisch specialist?",
  q2: "Is uw kind allergisch?",
  q3: "Heeft uw kind een aangeboren hartafwijking?",
  q4: "Heeft uw kind epilepsie?",
  q5: "Heeft uw kind astma, chronische bronchitis of een andere chronische longziekte?",
  q6: "Heeft uw kind suikerziekte?",
  q7: "Heeft uw kind bloedarmoede?",
  q8: "Heeft uw kind hepatitis of andere leverziekte?",
  q9: "Heeft uw kind een nierziekte?",
  q10: "Heeft u kind problemen met de voeding of maag-darmklachten?",
  q11: "Is uw kind angstig of hyperactief of heeft het andere gedragsproblemen?",
  q12: "Volgt uw kind speciaal onderwijs of bezoekt het een medisch dagverblijf?",
  q13: "Heeft uw kind een ziekte of aandoening waar niet naar is gevraagd?",
  q14: "Gebruikt u kind momenteel medicijnen?",
};

export const ADULT_DETAIL_QUESTIONS_MAP: Record<string, string> = {
  q0: "Wat is er veranderd?",
  q1: "Waarvoor bent u allergisch?",
  q2: "Wanneer?",
  q22: "Hoeveel per dag?",
  q25: "Welke ziekte of aandoening?",
  q26: "Welk geneesmiddel?",
  q27: "Welke medicijnen?",
};

export const KID_DETAIL_QUESTIONS_MAP: Record<string, string> = {
  q0: "Wat is er veranderd?",
  q1: "Waarvoor is uw kind onder behandeling?",
  q2: "Waarvoor is uw kind allergisch?",
  q3: "Toelichting",
  q13: "Welke ziekte of aandoening?",
  q14: "Welke medicijnen?",
};

const SIXTEEN_AND_OLDER_QUESTION_IDS = [
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
];

const YOUNGER_THAN_SIXTEEN_QUESTION_IDS = [
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

const validateAnswers = (
  answers: Record<string, { answer: string; details?: string }>,
  requiredQuestionIds: string[],
  isAdultForm: boolean,
  salutation?: string,
) => {
  for (const qId of requiredQuestionIds) {
    // Handle gender-specific questions for adults
    if (
      isAdultForm &&
      (qId === "q23" || qId === "q24") &&
      salutation !== "Mevr."
    ) {
      continue; // Skip if not a female adult
    }

    const answerEntry = answers[qId];

    if (!answerEntry || !answerEntry.answer) {
      return `Gelieve alle vragen in te vullen.`;
    }
  }

  return null; // No errors
};

type FormProps = {
  onQuestionChange: (
    questionId: string,
    value: { answer: string; details?: string },
  ) => void;
  salutation?: string;
};

// Special component for the blood pressure question
const BloodPressureQuestion = ({
  onQuestionChange,
}: {
  onQuestionChange: FormProps["onQuestionChange"];
}) => {
  const [answer, setAnswer] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  useEffect(() => {
    const details =
      answer === "Ja" ? `Bovendruk: ${systolic}, Onderdruk: ${diastolic}` : "";

    onQuestionChange("q4", { answer, details });
  }, [answer, systolic, diastolic, onQuestionChange]);

  return (
    <div className="py-4 border-b">
      <label className="font-semibold text-gray-800">
        Wordt u voor hoge bloeddruk behandeld?{" "}
        <span className="text-red-500">*</span>
      </label>
      <RadioGroup
        isRequired
        className="mt-2"
        name="q4"
        value={answer}
        onValueChange={setAnswer}
      >
        <Radio key="q4-Nee" value="Nee">
          Nee
        </Radio>
        <Radio key="q4-Ja" value="Ja">
          Ja
        </Radio>
      </RadioGroup>
      {answer === "Ja" && (
        <div className="mt-4 ml-6 space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="onderdruk"
              >
                Onderdruk
              </label>
              <Input
                id="onderdruk"
                name="onderdruk"
                placeholder="Onderdruk"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="bovendruk"
              >
                Bovendruk
              </label>
              <Input
                id="bovendruk"
                name="bovendruk"
                placeholder="Bovendruk"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Special component for the diabetes question
const DiabetesQuestion = ({
  question,
  questionId,
  insulinQuestionLabel,
  onQuestionChange,
}: {
  question: string;
  questionId: string;
  insulinQuestionLabel: string;
  onQuestionChange: FormProps["onQuestionChange"];
}) => {
  const [hasDiabetes, setHasDiabetes] = useState("");
  const [usesInsulin, setUsesInsulin] = useState("");

  useEffect(() => {
    const details =
      hasDiabetes === "Ja" ? `Gebruikt insuline: ${usesInsulin}` : "";

    onQuestionChange(questionId, { answer: hasDiabetes, details });
  }, [hasDiabetes, usesInsulin, onQuestionChange, questionId]);

  return (
    <div className="py-4 border-b">
      <label className="font-semibold text-gray-800">
        {question} <span className="text-red-500">*</span>
      </label>
      <RadioGroup
        isRequired
        className="mt-2"
        name={questionId}
        value={hasDiabetes}
        onValueChange={setHasDiabetes}
      >
        <Radio key={`${questionId}-Nee`} value="Nee">
          Nee
        </Radio>
        <Radio key={`${questionId}-Ja`} value="Ja">
          Ja
        </Radio>
      </RadioGroup>

      {hasDiabetes === "Ja" && (
        <div className="mt-4 ml-6 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {insulinQuestionLabel}
          </label>
          <RadioGroup value={usesInsulin} onValueChange={setUsesInsulin}>
            <Radio key={`${questionId}-insulin-Nee`} value="Nee">
              Nee
            </Radio>
            <Radio key={`${questionId}-insulin-Ja`} value="Ja">
              Ja
            </Radio>
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

const SixteenAndOlderForm = ({ onQuestionChange, salutation }: FormProps) => (
  <>
    <MedicalQuestion
      required
      name="q0"
      options={["Nee", "Ja --> Wat is er veranderd?"]}
      question="Is er de agelopen maanden iets aan uw gezondheid veranderd?"
      onValueChange={(value) => onQuestionChange("q0", value)}
    />
    <MedicalQuestion
      required
      name="q1"
      options={["Nee", "Ja --> Waarvoor bent u allergisch?"]}
      question="Bent u ergens allergisch voor?"
      onValueChange={(value) => onQuestionChange("q1", value)}
    />
    <MedicalQuestion
      required
      name="q2"
      options={["Nee", "Ja --> Wanneer?"]}
      question="Heeft u een hartinfarct gehad?"
      onValueChange={(value) => onQuestionChange("q2", value)}
    />
    <MedicalQuestion
      required
      name="q3"
      options={["Nee", "Ja"]}
      question="Heeft u last van hartkloppingen?"
      onValueChange={(value) => onQuestionChange("q3", value)}
    />
    <BloodPressureQuestion onQuestionChange={onQuestionChange} />
    <MedicalQuestion
      required
      name="q5"
      options={["Nee", "Ja"]}
      question="Heeft u pijn op de borst bij inspanning?"
      onValueChange={(value) => onQuestionChange("q5", value)}
    />
    <MedicalQuestion
      required
      name="q6"
      options={["Nee", "Ja"]}
      question="Wordt u kortademig als u plat in bed ligt?"
      onValueChange={(value) => onQuestionChange("q6", value)}
    />
    <MedicalQuestion
      required
      name="q7"
      options={["Nee", "Ja"]}
      question="Heeft u een hartklepgebrek of een kunsthartklep?"
      onValueChange={(value) => onQuestionChange("q7", value)}
    />
    <MedicalQuestion
      required
      name="q8"
      options={["Nee", "Ja"]}
      question="Heeft u een aangeboren hartafwijking?"
      onValueChange={(value) => onQuestionChange("q8", value)}
    />
    <MedicalQuestion
      required
      name="q9"
      options={["Nee", "Ja"]}
      question="Heeft u wel eens een endocarditis (ontsteking aan het hart) doorgemaakt?"
      onValueChange={(value) => onQuestionChange("q9", value)}
    />
    <MedicalQuestion
      required
      name="q10"
      options={["Nee", "Ja"]}
      question="Heeft u een pacemaker (of ICD) of neurostimulator?"
      onValueChange={(value) => onQuestionChange("q10", value)}
    />
    <MedicalQuestion
      required
      name="q11"
      options={["Nee", "Ja"]}
      question="Bent u ooit flauwgevallen bij een tandheelkundige of medische behandeling?"
      onValueChange={(value) => onQuestionChange("q11", value)}
    />
    <MedicalQuestion
      required
      name="q12"
      options={["Nee", "Ja"]}
      question="Heeft u epilepsie, vallende ziekte?"
      onValueChange={(value) => onQuestionChange("q12", value)}
    />
    <MedicalQuestion
      required
      name="q13"
      options={["Nee", "Ja"]}
      question="Heeft u wel eens een hersenbloeding of beroerte (of TIA) gehad?"
      onValueChange={(value) => onQuestionChange("q13", value)}
    />
    <MedicalQuestion
      required
      name="q14"
      options={["Nee", "Ja"]}
      question="Heeft u last van longklachten zoals astma, bronchitis of chronische hoest?"
      onValueChange={(value) => onQuestionChange("q14", value)}
    />
    <DiabetesQuestion
      insulinQuestionLabel="Gebruikt u insuline?"
      question="Heeft u suikerziekte?"
      questionId="q15"
      onQuestionChange={onQuestionChange}
    />
    <MedicalQuestion
      required
      name="q16"
      options={["Nee", "Ja"]}
      question="Heeft u bloedarmoede?"
      onValueChange={(value) => onQuestionChange("q16", value)}
    />
    <MedicalQuestion
      required
      name="q17"
      options={["Nee", "Ja"]}
      question="Heeft u wel eens langdurige bloedingen gehad na het trekken van tanden/kiezen of na een operatie?"
      onValueChange={(value) => onQuestionChange("q17", value)}
    />
    <MedicalQuestion
      required
      name="q18"
      options={["Nee", "Ja"]}
      question="Heeft u hepatitis, geelzucht of andere leverziekte (gehad)?"
      onValueChange={(value) => onQuestionChange("q18", value)}
    />
    <MedicalQuestion
      required
      name="q19"
      options={["Nee", "Ja"]}
      question="Heeft u een nierziekte?"
      onValueChange={(value) => onQuestionChange("q19", value)}
    />
    <MedicalQuestion
      required
      name="q20"
      options={["Nee", "Ja"]}
      question="Heeft u reuma en/of chronische gewrichtsklachten?"
      onValueChange={(value) => onQuestionChange("q20", value)}
    />
    <MedicalQuestion
      required
      name="q21"
      options={["Nee", "Ja"]}
      question="Bent u bestraald vanwege een tumor in hoofd of hals?"
      onValueChange={(value) => onQuestionChange("q21", value)}
    />
    <MedicalQuestion
      required
      name="q22"
      options={["Nee", "Ja --> Hoeveel per dag?"]}
      question="Rookt u?"
      onValueChange={(value) => onQuestionChange("q22", value)}
    />
    {salutation === "Mevr." && (
      <>
        <MedicalQuestion
          required
          name="q23"
          options={["Nee", "Ja"]}
          question="Bent u zwanger?"
          onValueChange={(value) => onQuestionChange("q23", value)}
        />
        <MedicalQuestion
          required
          name="q24"
          options={["Nee", "Ja"]}
          question="Geeft u borstvoeding?"
          onValueChange={(value) => onQuestionChange("q24", value)}
        />
      </>
    )}
    <MedicalQuestion
      required
      name="q25"
      options={["Nee", "Ja --> Welke ziekte of aandoening?"]}
      question="Heeft u een ziekte of aandoening waar niet naar is gevraagd?"
      onValueChange={(value) => onQuestionChange("q25", value)}
    />
    <MedicalQuestion
      required
      name="q26"
      options={["Nee", "Ja --> Welk geneesmiddel?"]}
      question="Heeft u in het verleden een geneesmiddel gebruikt tegen o.a. botontkalking (een bisfosfonaat of denosumab)?"
      onValueChange={(value) => onQuestionChange("q26", value)}
    />
    <MedicalQuestion
      required
      name="q27"
      options={["Nee", "Ja --> Welke medicijnen?"]}
      question="Gebruikt u medicijnen?"
      onValueChange={(value) => onQuestionChange("q27", value)}
    />
  </>
);

const YoungerThanSixteenForm = ({ onQuestionChange }: FormProps) => (
  <>
    <MedicalQuestion
      required
      name="q0"
      options={["Nee", "Ja --> Wat is er veranderd?"]}
      question="Is er de agelopen maanden iets aan de gezondheid van uw kind veranderd?"
      onValueChange={(value) => onQuestionChange("q0", value)}
    />
    <MedicalQuestion
      required
      name="q1"
      options={["Nee", "Ja --> Waarvoor is uw kind onder behandeling?"]}
      question="Is uw kind onder behandeling van een (huis)arts of medisch specialist?"
      onValueChange={(value) => onQuestionChange("q1", value)}
    />
    <MedicalQuestion
      required
      name="q2"
      options={["Nee", "Ja --> Waarvoor is uw kind allergisch?"]}
      question="Is uw kind allergisch?"
      onValueChange={(value) => onQuestionChange("q2", value)}
    />
    <MedicalQuestion
      required
      name="q3"
      options={["Nee", "Ja --> Toelichting"]}
      question="Heeft uw kind een aangeboren hartafwijking?"
      onValueChange={(value) => onQuestionChange("q3", value)}
    />
    <MedicalQuestion
      required
      name="q4"
      options={["Nee", "Ja"]}
      question="Heeft uw kind epilepsie?"
      onValueChange={(value) => onQuestionChange("q4", value)}
    />
    <MedicalQuestion
      required
      name="q5"
      options={["Nee", "Ja"]}
      question="Heeft uw kind astma, chronische bronchitis of een andere chronische longziekte?"
      onValueChange={(value) => onQuestionChange("q5", value)}
    />
    <DiabetesQuestion
      insulinQuestionLabel="Gebruikt uw kind insuline?"
      question="Heeft uw kind suikerziekte?"
      questionId="q6"
      onQuestionChange={onQuestionChange}
    />
    <MedicalQuestion
      required
      name="q7"
      options={["Nee", "Ja"]}
      question="Heeft uw kind bloedarmoede?"
      onValueChange={(value) => onQuestionChange("q7", value)}
    />
    <MedicalQuestion
      required
      name="q8"
      options={["Nee", "Ja"]}
      question="Heeft uw kind hepatitis of andere leverziekte?"
      onValueChange={(value) => onQuestionChange("q8", value)}
    />
    <MedicalQuestion
      required
      name="q9"
      options={["Nee", "Ja"]}
      question="Heeft uw kind een nierziekte?"
      onValueChange={(value) => onQuestionChange("q9", value)}
    />
    <MedicalQuestion
      required
      name="q10"
      options={["Nee", "Ja"]}
      question="Heeft u kind problemen met de voeding of maag-darmklachten?"
      onValueChange={(value) => onQuestionChange("q10", value)}
    />
    <MedicalQuestion
      required
      name="q11"
      options={["Nee", "Ja"]}
      question="Is uw kind angstig of hyperactief of heeft het andere gedragsproblemen?"
      onValueChange={(value) => onQuestionChange("q11", value)}
    />
    <MedicalQuestion
      required
      name="q12"
      options={["Nee", "Ja"]}
      question="Volgt uw kind speciaal onderwijs of bezoekt het een medisch dagverblijf?"
      onValueChange={(value) => onQuestionChange("q12", value)}
    />
    <MedicalQuestion
      required
      name="q13"
      options={["Nee", "Ja --> Welke ziekte of aandoening?"]}
      question="Heeft uw kind een ziekte of aandoening waar niet naar is gevraagd?"
      onValueChange={(value) => onQuestionChange("q13", value)}
    />
    <MedicalQuestion
      required
      name="q14"
      options={["Nee", "Ja --> Welke medicijnen?"]}
      question="Gebruikt u kind momenteel medicijnen?"
      onValueChange={(value) => onQuestionChange("q14", value)}
    />
  </>
);

type MedicalQuestionnaireModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Record<string, { answer: string; details?: string }>,
  ) => void;
  dateOfBirth: string;
  personName: string;
  salutation?: string;
};

export default function MedicalQuestionnaireModal({
  isOpen,
  onClose,
  onSubmit,
  dateOfBirth,
  personName,
  salutation,
}: MedicalQuestionnaireModalProps) {
  const [formToShow, setFormToShow] = useState<React.ReactNode>(null);
  const [answers, setAnswers] = useState<
    Record<string, { answer: string; details?: string }>
  >({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleQuestionChange = useCallback(
    (questionId: string, value: { answer: string; details?: string }) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    [],
  );

  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age >= 16) {
        setFormToShow(
          <SixteenAndOlderForm
            salutation={salutation}
            onQuestionChange={handleQuestionChange}
          />,
        );
      } else {
        setFormToShow(
          <YoungerThanSixteenForm onQuestionChange={handleQuestionChange} />,
        );
      }
    }
  }, [dateOfBirth, salutation, handleQuestionChange]);

  const handleSubmit = () => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const isAdultForm = age >= 16;
    const requiredIds = isAdultForm
      ? SIXTEEN_AND_OLDER_QUESTION_IDS
      : YOUNGER_THAN_SIXTEEN_QUESTION_IDS;

    const validationError = validateAnswers(
      answers,
      requiredIds,
      isAdultForm,
      salutation,
    );

    if (validationError) {
      setErrorMessage(validationError);

      return;
    }

    setErrorMessage(null); // Clear any previous errors
    onSubmit(answers);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 px-5 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          Medische Vragenlijst voor {personName}{" "}
          <Stethoscope className="inline-block mr-2" strokeWidth={2} />{" "}
        </h2>
        <div className="space-y-4">{formToShow}</div>
        <div className="mt-8 flex justify-end space-x-4">
          {errorMessage && (
            <p className="text-red-500 text-sm mr-auto">{errorMessage}</p>
          )}
          <Button className="bg-zinc-200" color="secondary" onPress={onClose}>
            Annuleren
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Opslaan
          </Button>
        </div>
      </div>
    </div>
  );
}
