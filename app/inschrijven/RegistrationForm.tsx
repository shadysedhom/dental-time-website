"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { Checkbox } from "@heroui/checkbox";
import NextLink from "next/link";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { Send } from "lucide-react";

import FormField from "../../components/FormField";

import RadioGroup from "./RadioGroup";
import TextAreaField from "./TextAreaField";
import FamilyMemberForm from "./FamilyMemberForm";

type RegistrationFormProps = {
  headerStyling: string;
};

// Full Form to handle new client registrations
// It can handle multiple family members and sends the data via email using emailjs
// It can also handle sending data directly to Formcarry
export default function RegistrationForm({
  headerStyling,
}: RegistrationFormProps) {
  const linkStyling =
    "absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full";

  // State management for form submission and family members
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);
  const [addFamilyMembers, setAddFamilyMembers] = useState(false);
  const [familyMemberIds, setFamilyMemberIds] = useState<number[]>([]);
  const [nextId, setNextId] = useState(0);

  // Effect hook to reset family member IDs when the addFamilyMembers checkbox is unchecked
  useEffect(() => {
    if (!addFamilyMembers) {
      setFamilyMemberIds([]);
      setNextId(0);
    }
  }, [addFamilyMembers]);

  // Helper function to add a new family member to the array
  const addFamilyMember = () => {
    setFamilyMemberIds([...familyMemberIds, nextId]);
    setNextId(nextId + 1);
  };

  // Helper function to remove a family member from the array
  const removeFamilyMember = (id: number) => {
    setFamilyMemberIds(familyMemberIds.filter((fid) => fid !== id));
  };

  // Helper function to format date to dd-mm-yyyy
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");

    return `${day}-${month}-${year}`;
  };

  // Function to handle form submission
  // It collects data from the form, formats it, and sends it using emailjs
  // It also handles the addition of family members and formats their data into a readable string
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Check if the termsAndConditions are accepted
    if (!isTermsAccepted) {
      setAlert({
        type: "danger",
        message:
          "U moet akkoord gaan met de privacyverklaring om het formulier te verzenden.",
      });
      setIsSubmitting(false);

      return;
    }

    // Store primary user data in an object
    const primaryUser = {
      salutation: formData.get("salutation"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      dateOfBirth: formatDate(formData.get("dateOfBirth") as string), // Format date to DD-MM-YYYY
      streetName: formData.get("streetName"),
      houseNumber: formData.get("houseNumber"),
      postalCode: formData.get("postalCode"),
      city: formData.get("city"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      bsn: formData.get("bsn"),
      insuranceNumber: formData.get("insuranceNumber"),
      dentistName: formData.get("dentistName"),
      dentistCity: formData.get("dentistCity"),
      message: formData.get("message"),
      termsAndConditions: formData.get("termsAndConditions"),
    };

    // Family members data
    // Collect family members data from the form
    const familyMembers: any[] = [];
    const familyMemberKeys = Array.from(formData.keys()).filter((key) =>
      key.startsWith("familyMembers["),
    );

    // Loop through each family member key and extract data
    // The keys are expected to be in the format familyMembers[index][field]
    familyMemberKeys.forEach((key) => {
      const match = key.match(/familyMembers\[(\d+)\]\[(\w+)\]/);

      if (match) {
        const index = parseInt(match[1], 10);
        const field = match[2];

        if (!familyMembers[index]) familyMembers[index] = {};
        familyMembers[index][field] = formData.get(key);
      }
    });

    // Filter out empty family members (if any)
    const filteredFamilyMembers = familyMembers.filter((member) => member);

    // Prepare email template parameters
    const templateParams: Record<string, any> = {
      "Aanhef": primaryUser.salutation,
      "Voornaam": primaryUser.firstName,
      "Achternaam": primaryUser.lastName,
      "Geboortedatum": primaryUser.dateOfBirth,
      "Straatnaam": primaryUser.streetName,
      "Huisnummer": primaryUser.houseNumber,
      "Postcode": primaryUser.postalCode,
      "Plaatsnaam": primaryUser.city,
      "Telefoonnummer": primaryUser.phone,
      "E-mail": primaryUser.email,
      "BSN": primaryUser.bsn,
      "Polisnummer": primaryUser.insuranceNumber || "N/A",
      "Huidige Tandarts": primaryUser.dentistName || "N/A",
      "Huidige Tandarts Plaats": primaryUser.dentistCity || "N/A",
      "Opmerkingen": primaryUser.message || "N/A",
      "Aantal Gezinsleden": filteredFamilyMembers.length.toString(),
    };

    // Add family members as individual fields (same approach as primary user)
    filteredFamilyMembers.forEach((member, index) => {
      const memberNumber = index + 1;
      templateParams[`Gezinslid ${memberNumber} - Aanhef`] = member.salutation;
      templateParams[`Gezinslid ${memberNumber} - Voornaam`] = member.firstName;
      templateParams[`Gezinslid ${memberNumber} - Achternaam`] = member.lastName;
      templateParams[`Gezinslid ${memberNumber} - Geboortedatum`] = formatDate(member.dateOfBirth);
      templateParams[`Gezinslid ${memberNumber} - Straatnaam`] = member.streetName;
      templateParams[`Gezinslid ${memberNumber} - Huisnummer`] = member.houseNumber;
      templateParams[`Gezinslid ${memberNumber} - Postcode`] = member.postalCode;
      templateParams[`Gezinslid ${memberNumber} - Plaatsnaam`] = member.city;
      templateParams[`Gezinslid ${memberNumber} - Telefoonnummer`] = member.phone;
      templateParams[`Gezinslid ${memberNumber} - E-mail`] = member.email;
      templateParams[`Gezinslid ${memberNumber} - BSN Nummer`] = member.bsn;
      templateParams[`Gezinslid ${memberNumber} - Polisnummer`] = member.insuranceNumber || "N/A";
      templateParams[`Gezinslid ${memberNumber} - Huidige Tandarts Naam`] = member.dentistName || "N/A";
      templateParams[`Gezinslid ${memberNumber} - Huidige Tandarts Plaats`] = member.dentistCity || "N/A";
    });

    // Formcarry endpoint
    const formcarryEndpoint = "https://formcarry.com/s/ILtNu--pNFt";

    try {
      const response = await fetch(formcarryEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(templateParams),
      });

      if (response.ok) {
        setAlert({
          type: "success",
          message: "Inschrijving succesvol verzonden!",
        });
        form.reset();
        setFamilyMemberIds([]);
        setAddFamilyMembers(false);
      } else {
        setAlert({
          type: "danger",
          message:
            "Er is een fout opgetreden bij het verzenden van uw inschrijving. Gelieve het later opnieuw te proberen.",
        });
      }
    } catch (error) {
      setAlert({
        type: "danger",
        message:
          "Er is een fout opgetreden bij het verzenden van uw inschrijving. Gelieve het later opnieuw te proberen.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center p-8 mb-40 bg-white md:w-5/6 rounded-md text-left">
      {/* Client Registration Form */}
      <form className="space-y-6 w-full" onSubmit={handleSubmit}>
        {/* Form Header and Description */}
        <div className="flex flex-col pb-10 text-left">
          <h2 className={headerStyling}>Inschrijfformulier</h2>
          <h3 className="text-lg font-semibold text-black">
            Vul onderstaand formulier volledig in om u in te schrijven bij onze
            praktijk.
          </h3>
        </div>

        {/* Salutation, First Name, Last Name */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="w-full col-span-2">
            <RadioGroup
              required
              disabled={isSubmitting}
              label="Aanhef"
              name="salutation"
              options={[
                { value: "Dhr.", label: "Dhr." },
                { value: "Mevr.", label: "Mevr." },
              ]}
            />
          </div>

          <FormField
            required
            disabled={isSubmitting}
            label="Voornaam"
            name="firstName"
            placeholder="Voornaam"
          />
          <FormField
            required
            disabled={isSubmitting}
            label="Achternaam"
            name="lastName"
            placeholder="Achternaam"
          />
        </div>

        {/* Date of Birth */}
        <FormField
          required
          disabled={isSubmitting}
          label="Geboortedatum"
          name="dateOfBirth"
          placeholder="Geboortedatum"
          type="date"
        />

        {/* Street Name & House Number */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            required
            autoComplete="street-address"
            disabled={isSubmitting}
            label="Straatnaam"
            name="streetName"
            placeholder="Straatnaam"
          />

          <FormField
            required
            disabled={isSubmitting}
            label="Huisnummer"
            name="houseNumber"
            placeholder="Huisnummer"
            type="number"
          />
        </div>

        {/* Postal Code & City */}
        <FormField
          required
          autoComplete="postal-code"
          disabled={isSubmitting}
          label="Postcode"
          name="postalCode"
          placeholder="Postcode"
        />

        <FormField
          required
          autoComplete="address-level2"
          disabled={isSubmitting}
          label="Plaatsnaam"
          name="city"
          placeholder="Plaatsnaam"
        />

        {/* Phone Number & Email */}
        <FormField
          required
          autoComplete="tel"
          disabled={isSubmitting}
          label="Telefoonnummer"
          name="phone"
          placeholder="Telefoonnummer"
          type="tel"
        />

        <FormField
          required
          autoComplete="email"
          disabled={isSubmitting}
          label="E-mailadres"
          name="email"
          placeholder="E-mail"
          type="email"
        />

        {/* BSN Number & Insurance Number */}
        <FormField
          required
          disabled={isSubmitting}
          label="BSN-nummer"
          name="bsn"
          placeholder="BSN-nummer"
          type="number"
        />

        <FormField
          disabled={isSubmitting}
          label="Polisnummer"
          name="insuranceNumber"
          placeholder="Polisnummer"
        />

        {/* Current Dentist Name & City */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            disabled={isSubmitting}
            label="Naam huidige tandarts"
            name="dentistName"
            placeholder="Naam huidige tandarts"
          />

          <FormField
            disabled={isSubmitting}
            label="Plaats huidige tandarts"
            name="dentistCity"
            placeholder="Plaats huidige tandarts"
          />
        </div>

        {/* Message */}
        <TextAreaField
          disabled={isSubmitting}
          label="Wensen/opmerkingen"
          name="message"
          placeholder="Uw wensen of opmerkingen"
        />

        {/* Add Family Members Checkbox */}
        <div className="flex items-center space-x-8">
          <Checkbox
            className="h-4 w-4 text-primary-700 border-gray-300 hover:text-primary-700 focus:ring-primary-700"
            disabled={isSubmitting}
            id="addFamilyMembers"
            isSelected={addFamilyMembers}
            type="checkbox"
            onValueChange={setAddFamilyMembers}
          />

          <label className="text-sm text-gray-700" htmlFor="addFamilyMembers">
            Ik wil graag ook een gezinslid inschrijven
          </label>
        </div>

        {/* Family Member Forms */}
        {/* If addFamilyMembers is true, show the family member forms */}
        {addFamilyMembers && (
          <div className="mt-4">
            <Button disabled={isSubmitting} onPress={addFamilyMember}>
              Gezinslid Toevoegen
            </Button>

            {familyMemberIds.map((id, arrayIndex) => (
              <FamilyMemberForm
                key={id}
                id={id}
                index={arrayIndex}
                onRemove={() => removeFamilyMember(id)}
              />
            ))}
          </div>
        )}

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-center space-x-8">
          <Checkbox
            className="h-4 w-4 text-primary-700 border-gray-300 hover:text-primary-700 focus:ring-primary-700"
            disabled={isSubmitting}
            id="termsAndConditions"
            isSelected={isTermsAccepted}
            onValueChange={setIsTermsAccepted}
          />

          <label className="text-sm text-gray-700" htmlFor="termsAndConditions">
            Ik bevestig dat ik akkoord ga met de &nbsp;
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "relative text-primary-500 group data-[active=true]:text-primary data-[active=true]:font-medium text-sm",
              )}
              color="foreground"
              href="/privacyverklaring"
            >
              privacyverklaring
              <span className={linkStyling} />
            </NextLink>
            &nbsp; en het verwerken van mijn persoonsgegevens voor inschrijving
            <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Submit Form Button */}
        <Button
          className="w-full text-white rounded-md sm:w-auto"
          color="primary"
          disabled={isSubmitting}
          type="submit"
        >
          <Send className="h-4 w-4 text-white" />
          {isSubmitting ? "Verzenden..." : "Verstuur Bericht"}
        </Button>

        {/* Success/Error Message */}
        {alert && (
          <Alert
            className="mt-4"
            color={alert.type}
            title={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
      </form>
    </div>
  );
}
