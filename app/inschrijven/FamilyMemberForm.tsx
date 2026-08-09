import { Button } from "@heroui/button";
import { useState, Fragment } from "react";
import { Trash2 } from "lucide-react";

import RadioGroup from "./RadioGroup";
import MedicalQuestionnaireModal from "./MedicalQuestionnaireModal";

import FormField from "@/components/FormField";

// Family Member Form Component
export default function FamilyMemberForm({
  id,
  index,
  onRemove,
}: {
  id: number;
  index: number;
  onRemove: () => void;
}) {
  const namePrefix = `familyMembers[${id}]`;

  const [isMedicalModalOpen, setIsMedicalModalOpen] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [firstName, setFirstName] = useState("");
  const [salutation, setSalutation] = useState("");
  const [medicalResetNotice, setMedicalResetNotice] = useState(false);
  const [medicalData, setMedicalData] = useState<Record<
    string,
    { answer: string; details?: string }
  > | null>(null);

  const handleMedicalSubmit = (
    data: Record<string, { answer: string; details?: string }>,
  ) => {
    setMedicalData(data);
    setMedicalResetNotice(false);
    setIsMedicalModalOpen(false);
  };

  const resetMedicalDataIfNeeded = () => {
    if (medicalData) {
      setMedicalData(null);
      setMedicalResetNotice(true);
    }
  };

  const handleDateOfBirthChange = (value: string) => {
    if (value !== dateOfBirth) resetMedicalDataIfNeeded();
    setDateOfBirth(value);
  };

  const handleSalutationChange = (value: string) => {
    if (value !== salutation) resetMedicalDataIfNeeded();
    setSalutation(value);
  };

  const today = new Date();
  const maxDateOfBirth = new Date(
    today.getTime() - today.getTimezoneOffset() * 60_000,
  )
    .toISOString()
    .split("T")[0];

  return (
    <div className="relative mt-4 rounded-3xl border border-[#e4ded2] bg-[#faf8f3] px-4 py-6 [&_[data-slot=input-wrapper]]:border [&_[data-slot=input-wrapper]]:border-[#ded8cc] [&_[data-slot=input-wrapper]]:bg-white [&_[data-slot=input-wrapper]]:shadow-sm [&_[data-slot=input-wrapper]]:transition-colors [&_[data-slot=input-wrapper]:focus-within]:border-[#3a4e9d] sm:px-7 sm:py-10">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold text-[#11182b]">
          Gezinslid {index + 1}
        </h3>
        <Button
          aria-label="Gezinslid verwijderen"
          className="min-h-11 shrink-0 rounded-xl border border-rose-200 bg-white px-3 text-rose-700 shadow-sm transition hover:border-rose-300 hover:bg-rose-50"
          size="sm"
          startContent={<Trash2 aria-hidden="true" className="h-4 w-4" />}
          type="button"
          variant="bordered"
          onPress={onRemove}
        >
          <span className="hidden min-[350px]:inline">Verwijderen</span>
        </Button>
      </div>
      <p className="pb-4 pt-2 text-sm text-gray-500">
        Vul de gegevens van het gezinslid in.
      </p>

      <RadioGroup
        required
        label="Aanhef"
        name={`${namePrefix}[salutation]`}
        options={[
          { value: "Dhr.", label: "Dhr." },
          { value: "Mevr.", label: "Mevr." },
        ]}
        value={salutation}
        onValueChange={handleSalutationChange}
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <FormField
          required
          label="Voornaam"
          name={`${namePrefix}[firstName]`}
          placeholder="Voornaam"
          onValueChange={setFirstName}
        />
        <FormField
          required
          label="Achternaam"
          name={`${namePrefix}[lastName]`}
          placeholder="Achternaam"
        />
      </div>

      <FormField
        required
        label="Geboortedatum"
        name={`${namePrefix}[dateOfBirth]`}
        placeholder="Geboortedatum"
        type="date"
        max={maxDateOfBirth}
        onValueChange={handleDateOfBirthChange}
      />

      <FormField
        required
        autoComplete="street-address"
        label="Straatnaam"
        name={`${namePrefix}[streetName]`}
        placeholder="Straatnaam"
      />
      <FormField
        required
        label="Huisnummer"
        name={`${namePrefix}[houseNumber]`}
        placeholder="Huisnummer"
        type="number"
      />
      <FormField
        required
        autoComplete="postal-code"
        label="Postcode"
        name={`${namePrefix}[postalCode]`}
        placeholder="Postcode"
      />
      <FormField
        required
        autoComplete="address-level2"
        label="Plaatsnaam"
        name={`${namePrefix}[city]`}
        placeholder="Plaatsnaam"
      />
      <FormField
        required
        autoComplete="tel"
        label="Telefoonnummer"
        name={`${namePrefix}[phone]`}
        placeholder="Telefoonnummer"
        type="tel"
      />
      <FormField
        required
        autoComplete="email"
        label="E-mailadres"
        name={`${namePrefix}[email]`}
        placeholder="E-mail"
        type="email"
      />
      <FormField
        required
        label="BSN-nummer"
        name={`${namePrefix}[bsn]`}
        placeholder="BSN-nummer"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <FormField
        label="Naam huidige tandarts"
        name={`${namePrefix}[dentistName]`}
        placeholder="Naam huidige tandarts"
      />

      <div className="mt-6 border-t border-[#ddd7cb] pt-6">
        <h3 className="mb-2 font-semibold text-gray-700">
          Medische Vragenlijst <span className="text-red-500">*</span>
        </h3>
        <Button
          className="min-h-11"
          disabled={!dateOfBirth}
          type="button"
          onPress={() => setIsMedicalModalOpen(true)}
        >
          Open Vragenlijst
        </Button>
        {medicalData && (
          <span className="ml-3 inline-flex font-semibold text-green-600">
            ✓ Ingevuld
          </span>
        )}
        {!dateOfBirth && (
          <p className="text-sm text-gray-500 mt-2">
            Gelieve eerst de geboortedatum van het gezinslid in te vullen.
          </p>
        )}
        {medicalResetNotice && (
          <p className="text-sm text-amber-700 mt-2" role="status">
            De eerdere medische antwoorden zijn gewist. Vul de vragenlijst
            opnieuw in.
          </p>
        )}
      </div>

      {medicalData &&
        Object.entries(medicalData).map(([key, value]) => (
          <Fragment key={key}>
            <input
              name={`${namePrefix}[medical][${key}]`}
              type="hidden"
              value={value.answer}
            />
            {value.details && (
              <input
                name={`${namePrefix}[medical][${key}-details]`}
                type="hidden"
                value={value.details}
              />
            )}
          </Fragment>
        ))}

      <MedicalQuestionnaireModal
        dateOfBirth={dateOfBirth}
        isOpen={isMedicalModalOpen}
        personName={firstName || `Gezinslid ${index + 1}`}
        salutation={salutation}
        onClose={() => setIsMedicalModalOpen(false)}
        onSubmit={handleMedicalSubmit}
      />
    </div>
  );
}
