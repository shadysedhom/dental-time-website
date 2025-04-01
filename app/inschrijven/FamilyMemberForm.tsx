import { Button } from "@heroui/button";

import RadioGroup from "./RadioGroup";

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

  return (
    <div className="border rounded-lg px-6 py-12 mt-4 relative">
      {/* Family Member No. */}
      <h3 className="text-lg font-semibold">Gezinslid {index + 1}</h3>

      <p className="text-sm py-4 text-gray-500">
        Vul de gegevens van het gezinslid in.
      </p>

      {/* Remove Family Member Button */}
      <Button className="absolute top-2 right-2" onPress={onRemove}>
        Verwijderen
      </Button>

      {/* Salutation */}
      <RadioGroup
        required
        label="Aanhef"
        name={`${namePrefix}[salutation]`}
        options={[
          { value: "Dhr.", label: "Dhr." },
          { value: "Mevr.", label: "Mevr." },
        ]}
      />

      {/* First & Last Name */}
      <div className="grid gap-4 sm:grid-cols-2 mt-4">
        <FormField
          required
          label="Voornaam"
          name={`${namePrefix}[firstName]`}
          placeholder="Voornaam"
        />
        <FormField
          required
          label="Achternaam"
          name={`${namePrefix}[lastName]`}
          placeholder="Achternaam"
        />
      </div>

      {/* Date of Birth, Street Name, House Number, Postal Code, City */}
      <FormField
        required
        label="Geboortedatum"
        name={`${namePrefix}[dateOfBirth]`}
        placeholder="Geboortedatum"
        type="date"
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

      {/* Phone Number & Email */}
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

      {/* BSN Number & Insurance Number */}
      <FormField
        required
        label="BSN-nummer"
        name={`${namePrefix}[bsn]`}
        placeholder="BSN-nummer"
        type="number"
      />
      <FormField
        label="Polisnummer"
        name={`${namePrefix}[insuranceNumber]`}
        placeholder="Polisnummer"
      />

      {/* Current Dentist Name & City */}
      <div className="grid gap-4 sm:grid-cols-2 mt-4">
        <FormField
          label="Naam huidige tandarts"
          name={`${namePrefix}[dentistName]`}
          placeholder="Naam huidige tandarts"
        />
        <FormField
          label="Plaats huidige tandarts"
          name={`${namePrefix}[dentistCity]`}
          placeholder="Plaats huidige tandarts"
        />
      </div>
    </div>
  );
}
