import { Button } from "@heroui/button";
import RadioGroup from "./RadioGroup";
import FormField from "@/components/FormField";

// Family Member Form Component
export default function FamilyMemberForm({
        id,
        index,
        onRemove
    }: {
        id: number;
        index: number;
        onRemove: () => void
    }) {
    
    const namePrefix = `familyMembers[${id}]`;

    return (
        <div className="border rounded-lg px-6 py-12 mt-4 relative">

            {/* Family Member No. */}
            <h3 className="text-lg font-semibold">Gezinslid {index + 1}</h3>

            <p className="text-sm py-4 text-gray-500">Vul de gegevens van het gezinslid in.</p>

            {/* Remove Family Member Button */}
            <Button onPress={onRemove} className="absolute top-2 right-2">
                Verwijderen
            </Button>

    
            {/* Salutation */}
            <RadioGroup
                name={`${namePrefix}[salutation]`}
                label="Aanhef"
                options={[
                    { value: "Dhr.", label: "Dhr." },
                    { value: "Mevr.", label: "Mevr." },
                ]}
                required
            />

            {/* First & Last Name */}
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <FormField label="Voornaam" name={`${namePrefix}[firstName]`} placeholder="Voornaam" required />
                <FormField label="Achternaam" name={`${namePrefix}[lastName]`} placeholder="Achternaam" required />
            </div>

            {/* Date of Birth, Street Name, House Number, Postal Code, City */}
            <FormField
                label="Geboortedatum"
                name={`${namePrefix}[dateOfBirth]`}
                type="date"
                placeholder="Geboortedatum"
                required
            />

            <FormField
                label="Straatnaam"
                name={`${namePrefix}[streetName]`}
                placeholder="Straatnaam"
                required
                autoComplete="street-address"
            />

            <FormField
                label="Huisnummer"
                name={`${namePrefix}[houseNumber]`}
                type="number"
                placeholder="Huisnummer"
                required
            />

            <FormField
                label="Postcode"
                name={`${namePrefix}[postalCode]`}
                placeholder="Postcode"
                required
                autoComplete="postal-code"
            />

            <FormField
                label="Plaatsnaam"
                name={`${namePrefix}[city]`}
                placeholder="Plaatsnaam"
                required
                autoComplete="address-level2"
            />

            {/* Phone Number & Email */}
            <FormField
                label="Telefoonnummer"
                name={`${namePrefix}[phone]`}
                type="tel"
                placeholder="Telefoonnummer"
                required
                autoComplete="tel"
            />

            <FormField
                label="E-mailadres"
                name={`${namePrefix}[email]`}
                type="email"
                placeholder="E-mail"
                required
                autoComplete="email"
            />

            {/* BSN Number & Insurance Number */}
            <FormField label="BSN-nummer" name={`${namePrefix}[bsn]`} type="number" placeholder="BSN-nummer" required />
            <FormField label="Polisnummer" name={`${namePrefix}[insuranceNumber]`} placeholder="Polisnummer" />

            {/* Current Dentist Name & City */}
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <FormField label="Naam huidige tandarts" name={`${namePrefix}[dentistName]`} placeholder="Naam huidige tandarts" />
                <FormField label="Plaats huidige tandarts" name={`${namePrefix}[dentistCity]`} placeholder="Plaats huidige tandarts" />
            </div>

        </div>
    );
}
