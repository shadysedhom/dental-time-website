'use client';

import { useState, useEffect, Fragment } from 'react';
import { Button } from '@heroui/button';
import { Alert } from '@heroui/alert';
import { Checkbox } from '@heroui/checkbox';
import NextLink from 'next/link';
import { link as linkStyles } from '@heroui/theme';
import clsx from 'clsx';
import { Send } from 'lucide-react';

import FormField from '../../components/FormField';

import RadioGroup from './RadioGroup';
import TextAreaField from './TextAreaField';
import FamilyMemberForm from './FamilyMemberForm';
import MedicalQuestionnaireModal, { ADULT_QUESTIONS_MAP, KID_QUESTIONS_MAP, ADULT_DETAIL_QUESTIONS_MAP, KID_DETAIL_QUESTIONS_MAP } from './MedicalQuestionnaireModal';

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

  // State for primary user's medical questionnaire
  const [isMedicalModalOpen, setIsMedicalModalOpen] = useState(false);
  const [primaryUserSalutation, setPrimaryUserSalutation] = useState("");
  const [primaryUserDoB, setPrimaryUserDoB] = useState("");
  const [primaryUserFirstName, setPrimaryUserFirstName] = useState("");
  const [primaryUserMedicalData, setPrimaryUserMedicalData] = useState<Record<
    string,
    { answer: string; details?: string }
  > | null>(null);

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
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");

    return `${day}-${month}-${year}`;
  };

  const handlePrimaryUserMedicalSubmit = (
    data: Record<string, { answer: string; details?: string }>,
  ) => {
    setPrimaryUserMedicalData(data);
    setIsMedicalModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Validation checks
    if (!primaryUserMedicalData) {
      setAlert({
        type: "danger",
        message: "U moet de medische vragenlijst voor uzelf invullen.",
      });
      return;
    }

    for (const id of familyMemberIds) {
      const hasMedicalData = Array.from(formData.keys()).some((key) =>
        key.startsWith(`familyMembers[${id}][medical]`),
      );
      if (!hasMedicalData) {
        const memberName =
          formData.get(`familyMembers[${id}][firstName]`) || `Gezinslid ${id}`;
        setAlert({
          type: "danger",
          message: `U moet de medische vragenlijst voor ${memberName} invullen.`,
        });
        return;
      }
    }

    if (!isTermsAccepted) {
      setAlert({
        type: "danger",
        message:
          "U moet akkoord gaan met de privacyverklaring om het formulier te verzenden.",
      });
      return;
    }

    setIsSubmitting(true);

    // --- Primary User Data ---
    const primaryUser = {
      salutation: formData.get("salutation"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      dateOfBirth: formatDate(formData.get("dateOfBirth") as string),
      streetName: formData.get("streetName"),
      houseNumber: formData.get("houseNumber"),
      postalCode: formData.get("postalCode"),
      city: formData.get("city"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      bsn: formData.get("bsn"),
      dentistName: formData.get("dentistName"),
      message: formData.get("message"),
    };

    // --- Prepare Email Template ---
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
      "Huidige Tandarts": primaryUser.dentistName || "N/A",
      "Opmerkingen": primaryUser.message || "N/A",
    };

    // --- Primary User Medical Data ---
    const primaryUserAge = new Date().getFullYear() - new Date(primaryUser.dateOfBirth as string).getFullYear();
    const primaryUserQuestionMap = primaryUserAge >= 16 ? ADULT_QUESTIONS_MAP : KID_QUESTIONS_MAP;

    Object.keys(primaryUserMedicalData).forEach((key) => {
      const { answer, details } = primaryUserMedicalData[key];
      let questionText = primaryUserQuestionMap[key] || key; // Use mapped question text or fallback to key

      // Handle gender-specific questions for adults
      if (primaryUserAge >= 16 && (key === "q23" || key === "q24") && primaryUser.salutation !== "Mevr.") {
        return; // Skip if not a female adult
      }

      let detailQuestionLabel = '';
      if (details) {
        if (key === 'q4') { // Blood Pressure
          detailQuestionLabel = 'Bloeddruk';
        } else if (key === 'q15') { // Adult Diabetes
          detailQuestionLabel = 'Gebruikt insuline';
        } else if (key === 'q6' && primaryUserAge < 16) { // Kid Diabetes
          detailQuestionLabel = 'Gebruikt insuline';
        } else {
          detailQuestionLabel = (primaryUserAge >= 16 ? ADULT_DETAIL_QUESTIONS_MAP[key] : KID_DETAIL_QUESTIONS_MAP[key]) || 'Details';
        }
      }
      templateParams[questionText] = `${answer}${details ? `
${detailQuestionLabel}: ${details}` : ''}
`;
    });

    // --- Family Members Data ---
    const familyMembers: Record<string, any> = {};
    const familyMemberKeys = Array.from(formData.keys()).filter((key) =>
      key.startsWith("familyMembers["),
    );

    familyMemberKeys.forEach((key) => {
      const match = key.match(/familyMembers\[(\d+)\]\[([a-zA-Z0-9_]+)\]/);
      if (match) {
        const id = match[1];
        const field = match[2];
        if (!familyMembers[id]) familyMembers[id] = { id };
        familyMembers[id][field] = formData.get(key);
      }
    });

    const filteredFamilyMembers = Object.values(familyMembers).filter(
      (member) => member.firstName,
    );

    templateParams["Aantal Gezinsleden"] = filteredFamilyMembers.length.toString();

    

    // --- Add Family Members to Template ---
    filteredFamilyMembers.forEach((member, index) => {
      const memberNumber = index + 1;
      templateParams[`Gezinslid ${memberNumber} - Aanhef`] = member.salutation;
      templateParams[`Gezinslid ${memberNumber} - Voornaam`] = member.firstName;
      templateParams[`Gezinslid ${memberNumber} - Achternaam`] = member.lastName;
      templateParams[`Gezinslid ${memberNumber} - Geboortedatum`] = formatDate(
        member.dateOfBirth,
      );
      templateParams[`Gezinslid ${memberNumber} - Straatnaam`] = member.streetName;
      templateParams[`Gezinslid ${memberNumber} - Huisnummer`] = member.houseNumber;
      templateParams[`Gezinslid ${memberNumber} - Postcode`] = member.postalCode;
      templateParams[`Gezinslid ${memberNumber} - Plaatsnaam`] = member.city;
      templateParams[`Gezinslid ${memberNumber} - Telefoonnummer`] = member.phone;
      templateParams[`Gezinslid ${memberNumber} - E-mail`] = member.email;
      templateParams[`Gezinslid ${memberNumber} - BSN Nummer`] = member.bsn;
      templateParams[`Gezinslid ${memberNumber} - Huidige Tandarts Naam`]
        = member.dentistName || "N/A";

      // Process medical data for the family member
      const medicalKeys = Array.from(formData.keys()).filter((key) =>
        key.startsWith(`familyMembers[${member.id}][medical]`)
      );

      const memberAge = new Date().getFullYear() - new Date(member.dateOfBirth as string).getFullYear();
      const memberQuestionMap = memberAge >= 16 ? ADULT_QUESTIONS_MAP : KID_QUESTIONS_MAP;

      const medicalData: Record<string, { answer: string; details?: string }> = {};
      medicalKeys.forEach((key) => {
        const medicalMatch = key.match(/familyMembers\[(\d+)\]\[medical\]\[(q\d+)(-details)?\]/);
        if (medicalMatch) {
          const qId = medicalMatch[2];
          const isDetails = medicalMatch[3];
          if (!medicalData[qId]) medicalData[qId] = { answer: "" };

          if (isDetails) {
            medicalData[qId].details = formData.get(key) as string;
          } else {
            medicalData[qId].answer = formData.get(key) as string;
          }
        }
      });

      Object.keys(medicalData).forEach((qId) => {
        let questionText = memberQuestionMap[qId] || qId; // Use mapped question text or fallback to qId

        // Handle gender-specific questions for adults
        if (memberAge >= 16 && (qId === "q23" || qId === "q24") && member.salutation !== "Mevr.") {
          return; // Skip if not a female adult
        }

        const { answer, details } = medicalData[qId];
        let detailQuestionLabel = '';
        if (details) {
          if (qId === 'q4') { // Blood Pressure
            detailQuestionLabel = 'Bloeddruk';
          } else if (qId === 'q15') { // Adult Diabetes
            detailQuestionLabel = 'Gebruikt insuline';
          } else if (qId === 'q6' && memberAge < 16) { // Kid Diabetes
            detailQuestionLabel = 'Gebruikt insuline';
          } else {
            detailQuestionLabel = (memberAge >= 16 ? ADULT_DETAIL_QUESTIONS_MAP[qId] : KID_DETAIL_QUESTIONS_MAP[qId]) || 'Details';
          }
        }
        templateParams[`Gezinslid ${memberNumber} - ${questionText}`] = `${answer}${details ? `\n${detailQuestionLabel}: ${details}` : ''}\n`;
      });
    });

    // --- Send Data ---
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
        setPrimaryUserMedicalData(null);
        setPrimaryUserDoB("");
        setPrimaryUserFirstName("");
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
      <form className="space-y-6 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col pb-10 text-left">
          <h2 className={headerStyling}>Inschrijfformulier</h2>
          <h3 className="text-lg font-semibold text-black">
            Vul onderstaand formulier volledig in om u in te schrijven bij onze
            praktijk.
          </h3>
        </div>

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
              onValueChange={setPrimaryUserSalutation}
              value={primaryUserSalutation}
            />
          </div>
          <FormField
            required
            disabled={isSubmitting}
            label="Voornaam"
            name="firstName"
            placeholder="Voornaam"
            onValueChange={setPrimaryUserFirstName}
          />
          <FormField
            required
            disabled={isSubmitting}
            label="Achternaam"
            name="lastName"
            placeholder="Achternaam"
          />
        </div>

        <FormField
          required
          disabled={isSubmitting}
          label="Geboortedatum"
          name="dateOfBirth"
          placeholder="Geboortedatum"
          type="date"
          onValueChange={setPrimaryUserDoB}
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
          label="Naam huidige tandarts"
          name="dentistName"
          placeholder="Naam huidige tandarts"
        />
        <TextAreaField
          disabled={isSubmitting}
          label="Wensen/opmerkingen"
          name="message"
          placeholder="Uw wensen of opmerkingen"
        />

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Medische Vragenlijst <span className="text-red-500">*</span>
          </h3>
          <Button
            disabled={!primaryUserDoB}
            onPress={() => setIsMedicalModalOpen(true)}
          >
            Open Vragenlijst
          </Button>
          {primaryUserMedicalData && (
            <span className="ml-4 text-green-600 font-semibold">✓ Ingevuld</span>
          )}
          {!primaryUserDoB && (
            <p className="text-sm text-gray-500 mt-2">
              Gelieve eerst uw geboortedatum in te vullen.
            </p>
          )}
        </div>

        {primaryUserMedicalData &&
          Object.entries(primaryUserMedicalData).map(([key, value]) => (
            <Fragment key={key}>
              <input
                type="hidden"
                name={`medical[${key}]`}
                value={value.answer}
              />
              {value.details && (
                <input
                  type="hidden"
                  name={`medical[${key}-details]`}
                  value={value.details}
                />
              )}
            </Fragment>
          ))}

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

        <Button
          className="w-full text-white rounded-md sm:w-auto"
          color="primary"
          disabled={isSubmitting}
          type="submit"
        >
          <Send className="h-4 w-4 text-white" />
          {isSubmitting ? "Verzenden..." : "Verstuur Bericht"}
        </Button>

        {alert && (
          <Alert
            className="mt-4"
            color={alert.type}
            title={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
      </form>

      <MedicalQuestionnaireModal
        isOpen={isMedicalModalOpen}
        onClose={() => setIsMedicalModalOpen(false)}
        onSubmit={handlePrimaryUserMedicalSubmit}
        dateOfBirth={primaryUserDoB}
        personName={primaryUserFirstName || "uzelf"}
        salutation={primaryUserSalutation}
      />
    </div>
  );
}
