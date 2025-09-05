import { Button } from "@heroui/button";
import { useState, Fragment } from "react";

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
  const [medicalData, setMedicalData] = useState<Record<
    string,
    { answer: string; details?: string }
  > | null>(null);

  const handleMedicalSubmit = (
    data: Record<string, { answer: string; details?: string }>,
  ) => {
    setMedicalData(data);
    setIsMedicalModalOpen(false);
  };

  return (
    <div className="border rounded-lg px-6 py-12 mt-4 relative">
      <h3 className="text-lg font-semibold">Gezinslid {index + 1}</h3>
      <p className="text-sm py-4 text-gray-500">
        Vul de gegevens van het gezinslid in.
      </p>

      <Button className="absolute top-2 right-2" onPress={onRemove}>
        Verwijderen
      </Button>

      <RadioGroup
        required
        label="Aanhef"
        name={`${namePrefix}[salutation]`}
        options={[
          { value: "Dhr.", label: "Dhr." },
          { value: "Mevr.", label: "Mevr." },
        ]}
        value={salutation}
        onValueChange={setSalutation}
      />

      <div className="grid gap-4 sm:grid-cols-2 mt-4">
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
        onValueChange={setDateOfBirth}
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
        type="number"
      />
      <FormField
        label="Naam huidige tandarts"
        name={`${namePrefix}[dentistName]`}
        placeholder="Naam huidige tandarts"
      />

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2">
          Medische Vragenlijst <span className="text-red-500">*</span>
        </h3>
        <Button
          disabled={!dateOfBirth}
          onPress={() => setIsMedicalModalOpen(true)}
        >
          Open Vragenlijst
        </Button>
        {medicalData && (
          <span className="ml-4 text-green-600 font-semibold">✓ Ingevuld</span>
        )}
        {!dateOfBirth && (
          <p className="text-sm text-gray-500 mt-2">
            Gelieve eerst de geboortedatum van het gezinslid in te vullen.
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
