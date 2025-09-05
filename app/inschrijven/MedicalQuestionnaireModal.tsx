'use client';

import { useEffect, useState, useCallback } from 'react';
import { Stethoscope } from 'lucide-react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { RadioGroup, Radio } from '@heroui/radio';
import MedicalQuestion from './MedicalQuestion';

export const ADULT_QUESTIONS_MAP: Record<string, string> = {
  "q0": "Is er de agelopen maanden iets aan uw gezondheid veranderd?",
  "q1": "Bent u ergens allergisch voor?",
  "q2": "Heeft u een hartinfarct gehad?",
  "q3": "Heeft u last van hartkloppingen?",
  "q4": "Wordt u voor hoge bloeddruk behandeld?",
  "q5": "Heeft u pijn op de borst bij inspanning?",
  "q6": "Wordt u kortademig als u plat in bed ligt?",
  "q7": "Heeft u een hartklepgebrek of een kunsthartklep?",
  "q8": "Heeft u een aangeboren hartafwijking?",
  "q9": "Heeft u wel eens een endocarditis (ontsteking aan het hart) doorgemaakt?",
  "q10": "Heeft u een pacemaker (of ICD) of neurostimulator?",
  "q11": "Bent u ooit flauwgevallen bij een tandheelkundige of medische behandeling?",
  "q12": "Heeft u epilepsie, vallende ziekte?",
  "q13": "Heeft u wel eens een hersenbloeding of beroerte (of TIA) gehad?",
  "q14": "Heeft u last van longklachten zoals astma, bronchitis of chronische hoest?",
  "q15": "Heeft u suikerziekte?",
  "q16": "Heeft u bloedarmoede?",
  "q17": "Heeft u wel eens langdurige bloedingen gehad na het trekken van tanden/kiezen of na een operatie?",
  "q18": "Heeft u hepatitis, geelzucht of andere leverziekte (gehad)?",
  "q19": "Heeft u een nierziekte?",
  "q20": "Heeft u reuma en/of chronische gewrichtsklachten?",
  "q21": "Bent u bestraald vanwege een tumor in hoofd of hals?",
  "q22": "Rookt u?",
  "q23": "Bent u zwanger?",
  "q24": "Geeft u borstvoeding?",
  "q25": "Heeft u een ziekte of aandoening waar niet naar is gevraagd?",
  "q26": "Heeft u in het verleden een geneesmiddel gebruikt tegen o.a. botontkalking (een bisfosfonaat of denosumab)?",
  "q27": "Gebruikt u medicijnen?",
};

export const KID_QUESTIONS_MAP: Record<string, string> = {
  "q0": "Is er de agelopen maanden iets aan de gezondheid van uw kind veranderd?",
  "q1": "Is uw kind onder behandeling van een (huis)arts of medisch specialist?",
  "q2": "Is uw kind allergisch?",
  "q3": "Heeft uw kind een aangeboren hartafwijking?",
  "q4": "Heeft uw kind epilepsie?",
  "q5": "Heeft uw kind astma, chronische bronchitis of een andere chronische longziekte?",
  "q6": "Heeft uw kind suikerziekte?",
  "q7": "Heeft uw kind bloedarmoede?",
  "q8": "Heeft uw kind hepatitis of andere leverziekte?",
  "q9": "Heeft uw kind een nierziekte?",
  "q10": "Heeft u kind problemen met de voeding of maag-darmklachten?",
  "q11": "Is uw kind angstig of hyperactief of heeft het andere gedragsproblemen?",
  "q12": "Volgt uw kind speciaal onderwijs of bezoekt het een medisch dagverblijf?",
  "q13": "Heeft uw kind een ziekte of aandoening waar niet naar is gevraagd?",
  "q14": "Gebruikt u kind momenteel medicijnen?",
};

export const ADULT_DETAIL_QUESTIONS_MAP: Record<string, string> = {
  "q0": "Wat is er veranderd?",
  "q1": "Waarvoor bent u allergisch?",
  "q2": "Wanneer?",
  "q22": "Hoeveel per dag?",
  "q25": "Welke ziekte of aandoening?",
  "q26": "Welk geneesmiddel?",
  "q27": "Welke medicijnen?",
};

export const KID_DETAIL_QUESTIONS_MAP: Record<string, string> = {
  "q0": "Wat is er veranderd?",
  "q1": "Waarvoor is uw kind onder behandeling?",
  "q2": "Waarvoor is uw kind allergisch?",
  "q3": "Toelichting",
  "q13": "Welke ziekte of aandoening?",
  "q14": "Welke medicijnen?",
};

const SIXTEEN_AND_OLDER_QUESTION_IDS = [
  "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10",
  "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20",
  "q21", "q22", "q23", "q24", "q25", "q26", "q27",
];

const YOUNGER_THAN_SIXTEEN_QUESTION_IDS = [
  "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10",
  "q11", "q12", "q13", "q14",
];

const validateAnswers = (answers: Record<string, { answer: string; details?: string }>, requiredQuestionIds: string[], isAdultForm: boolean, salutation?: string) => {
  for (const qId of requiredQuestionIds) {
    // Handle gender-specific questions for adults
    if (isAdultForm && (qId === "q23" || qId === "q24") && salutation !== "Mevr.") {
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
  onQuestionChange: (questionId: string, value: { answer: string; details?: string }) => void;
  salutation?: string;
};

// Special component for the blood pressure question
const BloodPressureQuestion = ({ onQuestionChange }: { onQuestionChange: FormProps['onQuestionChange'] }) => {
  const [answer, setAnswer] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');

  useEffect(() => {
    const details = answer === 'Ja' ? `Bovendruk: ${systolic}, Onderdruk: ${diastolic}` : '';
    onQuestionChange('q4', { answer, details });
  }, [answer, systolic, diastolic, onQuestionChange]);

  return (
    <div className="py-4 border-b">
      <label className="font-semibold text-gray-800">
        Wordt u voor hoge bloeddruk behandeld? <span className="text-red-500">*</span>
      </label>
      <RadioGroup
        className="mt-2"
        name="q4"
        value={answer}
        onValueChange={setAnswer}
        isRequired
      >
        <Radio key="q4-Nee" value="Nee">Nee</Radio>
        <Radio key="q4-Ja" value="Ja">Ja</Radio>
      </RadioGroup>
      {answer === 'Ja' && (
        <div className="mt-4 ml-6 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Wat is uw bloeddruk?</label>
          <div className="grid grid-cols-2 gap-4">

            <Input
              name="onderdruk"
              placeholder="Onderdruk"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
            />

            <Input
              name="bovendruk"
              placeholder="Bovendruk"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
            />

          </div>
        </div>
      )}
    </div>
  );
};

// Special component for the diabetes question
const DiabetesQuestion = ({ question, questionId, insulinQuestionLabel, onQuestionChange }: { question: string, questionId: string, insulinQuestionLabel: string, onQuestionChange: FormProps['onQuestionChange'] }) => {
  const [hasDiabetes, setHasDiabetes] = useState('');
  const [usesInsulin, setUsesInsulin] = useState('');

  useEffect(() => {
    const details = hasDiabetes === 'Ja' ? `Gebruikt insuline: ${usesInsulin}` : '';
    onQuestionChange(questionId, { answer: hasDiabetes, details });
  }, [hasDiabetes, usesInsulin, onQuestionChange, questionId]);

  return (
    <div className="py-4 border-b">
      <label className="font-semibold text-gray-800">
        {question} <span className="text-red-500">*</span>
      </label>
      <RadioGroup className="mt-2" name={questionId} value={hasDiabetes} onValueChange={setHasDiabetes} isRequired>
        <Radio key={`${questionId}-Nee`} value="Nee">Nee</Radio>
        <Radio key={`${questionId}-Ja`} value="Ja">Ja</Radio>
      </RadioGroup>

      {hasDiabetes === 'Ja' && (
        <div className="mt-4 ml-6 space-y-2">
          <label className="block text-sm font-medium text-gray-700">{insulinQuestionLabel}</label>
          <RadioGroup value={usesInsulin} onValueChange={setUsesInsulin}>
            <Radio key={`${questionId}-insulin-Nee`} value="Nee">Nee</Radio>
            <Radio key={`${questionId}-insulin-Ja`} value="Ja">Ja</Radio>
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

const SixteenAndOlderForm = ({ onQuestionChange, salutation }: FormProps) => (
  <>
    <MedicalQuestion
      name="q0"
      question="Is er de agelopen maanden iets aan uw gezondheid veranderd?"
      options={["Nee", "Ja --> Wat is er veranderd?"]}
      onValueChange={(value) => onQuestionChange("q0", value)}
      required
    />
    <MedicalQuestion
      name="q1"
      question="Bent u ergens allergisch voor?"
      options={["Nee", "Ja --> Waarvoor bent u allergisch?"]}
      onValueChange={(value) => onQuestionChange("q1", value)}
      required
    />
    <MedicalQuestion
      name="q2"
      question="Heeft u een hartinfarct gehad?"
      options={["Nee", "Ja --> Wanneer?"]}
      onValueChange={(value) => onQuestionChange("q2", value)}
      required
    />
    <MedicalQuestion
      name="q3"
      question="Heeft u last van hartkloppingen?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q3", value)}
      required
    />
    <BloodPressureQuestion onQuestionChange={onQuestionChange} />
    <MedicalQuestion
      name="q5"
      question="Heeft u pijn op de borst bij inspanning?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q5", value)}
      required
    />
    <MedicalQuestion
      name="q6"
      question="Wordt u kortademig als u plat in bed ligt?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q6", value)}
      required
    />
    <MedicalQuestion
      name="q7"
      question="Heeft u een hartklepgebrek of een kunsthartklep?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q7", value)}
      required
    />
    <MedicalQuestion
      name="q8"
      question="Heeft u een aangeboren hartafwijking?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q8", value)}
      required
    />
    <MedicalQuestion
      name="q9"
      question="Heeft u wel eens een endocarditis (ontsteking aan het hart) doorgemaakt?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q9", value)}
      required
    />
    <MedicalQuestion
      name="q10"
      question="Heeft u een pacemaker (of ICD) of neurostimulator?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q10", value)}
      required
    />
    <MedicalQuestion
      name="q11"
      question="Bent u ooit flauwgevallen bij een tandheelkundige of medische behandeling?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q11", value)}
      required
    />
    <MedicalQuestion
      name="q12"
      question="Heeft u epilepsie, vallende ziekte?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q12", value)}
      required
    />
    <MedicalQuestion
      name="q13"
      question="Heeft u wel eens een hersenbloeding of beroerte (of TIA) gehad?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q13", value)}
      required
    />
    <MedicalQuestion
      name="q14"
      question="Heeft u last van longklachten zoals astma, bronchitis of chronische hoest?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q14", value)}
      required
    />
    <DiabetesQuestion questionId="q15" question="Heeft u suikerziekte?" onQuestionChange={onQuestionChange} insulinQuestionLabel="Gebruikt u insuline?" />
    <MedicalQuestion
      name="q16"
      question="Heeft u bloedarmoede?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q16", value)}
      required
    />
    <MedicalQuestion
      name="q17"
      question="Heeft u wel eens langdurige bloedingen gehad na het trekken van tanden/kiezen of na een operatie?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q17", value)}
      required
    />
    <MedicalQuestion
      name="q18"
      question="Heeft u hepatitis, geelzucht of andere leverziekte (gehad)?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q18", value)}
      required
    />
    <MedicalQuestion
      name="q19"
      question="Heeft u een nierziekte?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q19", value)}
      required
    />
    <MedicalQuestion
      name="q20"
      question="Heeft u reuma en/of chronische gewrichtsklachten?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q20", value)}
      required
    />
    <MedicalQuestion
      name="q21"
      question="Bent u bestraald vanwege een tumor in hoofd of hals?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q21", value)}
      required
    />
    <MedicalQuestion
      name="q22"
      question="Rookt u?"
      options={["Nee", "Ja --> Hoeveel per dag?"]}
      onValueChange={(value) => onQuestionChange("q22", value)}
      required
    />
    {salutation === 'Mevr.' && (
      <>
        <MedicalQuestion
          name="q23"
          question="Bent u zwanger?"
          options={["Nee", "Ja"]}
          onValueChange={(value) => onQuestionChange("q23", value)}
          required
        />
        <MedicalQuestion
          name="q24"
          question="Geeft u borstvoeding?"
          options={["Nee", "Ja"]}
          onValueChange={(value) => onQuestionChange("q24", value)}
          required
        />
      </>
    )}
    <MedicalQuestion
      name="q25"
      question="Heeft u een ziekte of aandoening waar niet naar is gevraagd?"
      options={["Nee", "Ja --> Welke ziekte of aandoening?"]}
      onValueChange={(value) => onQuestionChange("q25", value)}
      required
    />
    <MedicalQuestion
      name="q26"
      question="Heeft u in het verleden een geneesmiddel gebruikt tegen o.a. botontkalking (een bisfosfonaat of denosumab)?"
      options={["Nee", "Ja --> Welk geneesmiddel?"]}
      onValueChange={(value) => onQuestionChange("q26", value)}
      required
    />
    <MedicalQuestion
      name="q27"
      question="Gebruikt u medicijnen?"
      options={["Nee", "Ja --> Welke medicijnen?"]}
      onValueChange={(value) => onQuestionChange("q27", value)}
      required
    />
  </>
);

const YoungerThanSixteenForm = ({ onQuestionChange }: FormProps) => (
  <>
    <MedicalQuestion
      name="q0"
      question="Is er de agelopen maanden iets aan de gezondheid van uw kind veranderd?"
      options={["Nee", "Ja --> Wat is er veranderd?"]}
      onValueChange={(value) => onQuestionChange("q0", value)}
      required
    />
    <MedicalQuestion
      name="q1"
      question="Is uw kind onder behandeling van een (huis)arts of medisch specialist?"
      options={["Nee", "Ja --> Waarvoor is uw kind onder behandeling?"]}
      onValueChange={(value) => onQuestionChange("q1", value)}
      required
    />
    <MedicalQuestion
      name="q2"
      question="Is uw kind allergisch?"
      options={["Nee", "Ja --> Waarvoor is uw kind allergisch?"]}
      onValueChange={(value) => onQuestionChange("q2", value)}
      required
    />
    <MedicalQuestion
      name="q3"
      question="Heeft uw kind een aangeboren hartafwijking?"
      options={["Nee", "Ja --> Toelichting"]}
      onValueChange={(value) => onQuestionChange("q3", value)}
      required
    />
    <MedicalQuestion
      name="q4"
      question="Heeft uw kind epilepsie?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q4", value)}
      required
    />
    <MedicalQuestion
      name="q5"
      question="Heeft uw kind astma, chronische bronchitis of een andere chronische longziekte?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q5", value)}
      required
    />
    <DiabetesQuestion questionId="q6" question="Heeft uw kind suikerziekte?" onQuestionChange={onQuestionChange} insulinQuestionLabel="Gebruikt uw kind insuline?" />
    <MedicalQuestion
      name="q7"
      question="Heeft uw kind bloedarmoede?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q7", value)}
      required
    />
    <MedicalQuestion
      name="q8"
      question="Heeft uw kind hepatitis of andere leverziekte?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q8", value)}
      required
    />
    <MedicalQuestion
      name="q9"
      question="Heeft uw kind een nierziekte?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q9", value)}
      required
    />
    <MedicalQuestion
      name="q10"
      question="Heeft u kind problemen met de voeding of maag-darmklachten?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q10", value)}
      required
    />
    <MedicalQuestion
      name="q11"
      question="Is uw kind angstig of hyperactief of heeft het andere gedragsproblemen?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q11", value)}
      required
    />
    <MedicalQuestion
      name="q12"
      question="Volgt uw kind speciaal onderwijs of bezoekt het een medisch dagverblijf?"
      options={["Nee", "Ja"]}
      onValueChange={(value) => onQuestionChange("q12", value)}
      required
    />
    <MedicalQuestion
      name="q13"
      question="Heeft uw kind een ziekte of aandoening waar niet naar is gevraagd?"
      options={["Nee", "Ja --> Welke ziekte of aandoening?"]}
      onValueChange={(value) => onQuestionChange("q13", value)}
      required
    />
    <MedicalQuestion
      name="q14"
      question="Gebruikt u kind momenteel medicijnen?"
      options={["Nee", "Ja --> Welke medicijnen?"]}
      onValueChange={(value) => onQuestionChange("q14", value)}
      required
    />
  </>
);

type MedicalQuestionnaireModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, { answer: string; details?: string }>) => void;
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
  const [answers, setAnswers] = useState<Record<string, { answer: string; details?: string }>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleQuestionChange = useCallback((
    questionId: string,
    value: { answer: string; details?: string },
  ) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

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
        setFormToShow(<SixteenAndOlderForm onQuestionChange={handleQuestionChange} salutation={salutation} />);
      } else {
        setFormToShow(<YoungerThanSixteenForm onQuestionChange={handleQuestionChange} />);
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
    const requiredIds = isAdultForm ? SIXTEEN_AND_OLDER_QUESTION_IDS : YOUNGER_THAN_SIXTEEN_QUESTION_IDS;

    const validationError = validateAnswers(answers, requiredIds, isAdultForm, salutation);

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
        <h2 className="text-2xl font-bold mb-4">Medische Vragenlijst voor {personName} <Stethoscope className="inline-block mr-2" strokeWidth={2} /> </h2>
        <div className="space-y-4">
          {formToShow}
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          {errorMessage && (
            <p className="text-red-500 text-sm mr-auto">{errorMessage}</p>
          )}
          <Button color="secondary" onPress={onClose} className='bg-zinc-200'>
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
