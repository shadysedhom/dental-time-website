"use client";

import { useState, useEffect, Fragment, useRef } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Alert, Checkbox } from "@heroui/react";
import NextLink from "next/link";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  PhoneCall,
  Send,
} from "lucide-react";

import FormField from "../../components/FormField";

import RadioGroup from "./RadioGroup";
import TextAreaField from "./TextAreaField";
import FamilyMemberForm from "./FamilyMemberForm";
import MedicalQuestionnaireModal, {
  ADULT_QUESTIONS_MAP,
  KID_QUESTIONS_MAP,
  ADULT_DETAIL_QUESTIONS_MAP,
  KID_DETAIL_QUESTIONS_MAP,
} from "./MedicalQuestionnaireModal";
import {
  calculateAge,
  formatDateForSubmission,
} from "./registrationUtils";

type RegistrationFormProps = {
  headerStyling?: string;
  variant?: "standard" | "campaign";
  onSuccessfulSubmission?: () => void;
};

// Full Form to handle new client registrations
// It can handle multiple family members and sends the data via email using emailjs
// It can also handle sending data directly to Formcarry
export default function RegistrationForm({
  headerStyling = "text-2xl py-4 font-semibold text-slate-800",
  variant = "standard",
  onSuccessfulSubmission,
}: RegistrationFormProps) {
  const isCampaign = variant === "campaign";
  const formRef = useRef<HTMLFormElement>(null);
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
  const [numFamilyMembersToAdd, setNumFamilyMembersToAdd] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [submissionSucceeded, setSubmissionSucceeded] = useState(false);

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
    const newIds = [];
    let currentNextId = nextId;

    for (let i = 0; i < numFamilyMembersToAdd; i++) {
      newIds.push(currentNextId);
      currentNextId++;
    }
    setFamilyMemberIds([...familyMemberIds, ...newIds]);
    setNextId(currentNextId);
  };

  // Helper function to remove a family member from the array
  const removeFamilyMember = (id: number) => {
    setFamilyMemberIds(familyMemberIds.filter((fid) => fid !== id));
  };

  const handlePrimaryUserMedicalSubmit = (
    data: Record<string, { answer: string; details?: string }>,
  ) => {
    setPrimaryUserMedicalData(data);
    setIsMedicalModalOpen(false);
  };

  const resetPrimaryMedicalDataIfNeeded = () => {
    if (!primaryUserMedicalData) return;

    setPrimaryUserMedicalData(null);
    setAlert({
      type: "danger",
      message:
        "Uw geboortedatum of aanhef is gewijzigd. Vul de medische vragenlijst opnieuw in.",
    });
  };

  const handlePrimaryDateOfBirthChange = (value: string) => {
    if (value !== primaryUserDoB) resetPrimaryMedicalDataIfNeeded();
    setPrimaryUserDoB(value);
  };

  const handlePrimarySalutationChange = (value: string) => {
    if (value !== primaryUserSalutation) resetPrimaryMedicalDataIfNeeded();
    setPrimaryUserSalutation(value);
  };

  const today = new Date();
  const maxDateOfBirth = new Date(
    today.getTime() - today.getTimezoneOffset() * 60_000,
  )
    .toISOString()
    .split("T")[0];

  const scrollToFormHeading = () => {
    window.requestAnimationFrame(() => {
      document
        .getElementById("registration-form-heading")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const validateVisibleStep = () => {
    const stepContainer = formRef.current?.querySelector(
      `[data-registration-step="${currentStep}"]`,
    );

    if (!stepContainer) return true;

    const controls = Array.from(
      stepContainer.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >("input, textarea, select"),
    );
    const firstInvalidControl = controls.find(
      (control) => !control.checkValidity(),
    );

    if (!firstInvalidControl) return true;

    firstInvalidControl.reportValidity();
    firstInvalidControl.focus();

    return false;
  };

  const handleNextStep = () => {
    setAlert(null);

    if (!validateVisibleStep()) return;

    if (currentStep === 3 && !primaryUserMedicalData) {
      setAlert({
        type: "danger",
        message: "Vul de medische vragenlijst in voordat u verdergaat.",
      });

      return;
    }

    setCurrentStep((step) => Math.min(step + 1, 4));
    scrollToFormHeading();
  };

  const handlePreviousStep = () => {
    setAlert(null);
    setCurrentStep((step) => Math.max(step - 1, 1));
    scrollToFormHeading();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setAlert(null);

    if (isCampaign && currentStep < 4) {
      handleNextStep();

      return;
    }

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

    // --- Primary User Data Object ---
    const primaryUser = {
      salutation: formData.get("salutation"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      dateOfBirth: formatDateForSubmission(
        formData.get("dateOfBirth") as string,
      ),
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

    // --- Prepare Email Template Parameters ---
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

    // ------ Primary User Medical Data ------

    // - Age Calculation -
    const dobString = formData.get("dateOfBirth") as string;
    const primaryUserAge = calculateAge(dobString);

    // - Use Age to Get Right Questions -
    const primaryUserQuestionMap =
      primaryUserAge >= 16 ? ADULT_QUESTIONS_MAP : KID_QUESTIONS_MAP;

    
    Object.keys(primaryUserMedicalData).forEach((key) => {
      const { answer, details } = primaryUserMedicalData[key];
      let questionText = primaryUserQuestionMap[key] || key; // Use mapped question text or fallback to key

      // Handle gender-specific questions for adults
      if (
        primaryUserAge >= 16 &&
        (key === "q23" || key === "q24") &&
        primaryUser.salutation !== "Mevr."
      ) {
        return; // Skip if not a female adult
      }

      let detailQuestionLabel = "";

      if (details) {
        if (key === "q4") {
          // Blood Pressure
          detailQuestionLabel = "Bloeddruk";
        } else if (key === "q15") {
          // Adult Diabetes
          detailQuestionLabel = "Gebruikt insuline";
        } else if (key === "q6" && primaryUserAge < 16) {
          // Kid Diabetes
          detailQuestionLabel = "Gebruikt insuline";
        } else {
          detailQuestionLabel =
            (primaryUserAge >= 16
              ? ADULT_DETAIL_QUESTIONS_MAP[key]
              : KID_DETAIL_QUESTIONS_MAP[key]) || "Details";
        }
      }
      templateParams[questionText] = `${answer}${
        details
          ? `
            ${detailQuestionLabel}: ${details}`
          : ""
        }
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

    templateParams["Aantal Gezinsleden"] =
      filteredFamilyMembers.length.toString();

    // --- Add Family Members to Template ---
    filteredFamilyMembers.forEach((member, index) => {
      const memberNumber = index + 1;

      templateParams[`Gezinslid ${memberNumber} - Aanhef`] = member.salutation;
      templateParams[`Gezinslid ${memberNumber} - Voornaam`] = member.firstName;
      templateParams[`Gezinslid ${memberNumber} - Achternaam`] =
        member.lastName;
      templateParams[`Gezinslid ${memberNumber} - Geboortedatum`] =
        formatDateForSubmission(member.dateOfBirth);
      templateParams[`Gezinslid ${memberNumber} - Straatnaam`] =
        member.streetName;
      templateParams[`Gezinslid ${memberNumber} - Huisnummer`] =
        member.houseNumber;
      templateParams[`Gezinslid ${memberNumber} - Postcode`] =
        member.postalCode;
      templateParams[`Gezinslid ${memberNumber} - Plaatsnaam`] = member.city;
      templateParams[`Gezinslid ${memberNumber} - Telefoonnummer`] =
        member.phone;
      templateParams[`Gezinslid ${memberNumber} - E-mail`] = member.email;
      templateParams[`Gezinslid ${memberNumber} - BSN Nummer`] = member.bsn;
      templateParams[`Gezinslid ${memberNumber} - Huidige Tandarts Naam`] =
        member.dentistName || "N/A";

      // Process medical data for the family member
      const medicalKeys = Array.from(formData.keys()).filter((key) =>
        key.startsWith(`familyMembers[${member.id}][medical]`),
      );

      // - Family Member Age Calculation -
      const memberAge = calculateAge(member.dateOfBirth as string);

      // - Use Age to get right questions -
      const memberQuestionMap =
        memberAge >= 16 ? ADULT_QUESTIONS_MAP : KID_QUESTIONS_MAP;

      const medicalData: Record<string, { answer: string; details?: string }> =
        {};

      medicalKeys.forEach((key) => {
        const medicalMatch = key.match(
          /familyMembers\[(\d+)\]\[medical\]\[(q\d+)(-details)?\]/,
        );

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
        if (
          memberAge >= 16 &&
          (qId === "q23" || qId === "q24") &&
          member.salutation !== "Mevr."
        ) {
          return; // Skip if not a female adult
        }

        const { answer, details } = medicalData[qId];
        let detailQuestionLabel = "";

        if (details) {
          if (qId === "q4") {
            // Blood Pressure
            detailQuestionLabel = "Bloeddruk";
          } else if (qId === "q15") {
            // Adult Diabetes
            detailQuestionLabel = "Gebruikt insuline";
          } else if (qId === "q6" && memberAge < 16) {
            // Kid Diabetes
            detailQuestionLabel = "Gebruikt insuline";
          } else {
            detailQuestionLabel =
              (memberAge >= 16
                ? ADULT_DETAIL_QUESTIONS_MAP[qId]
                : KID_DETAIL_QUESTIONS_MAP[qId]) || "Details";
          }
        }
        templateParams[`Gezinslid ${memberNumber} - ${questionText}`] =
          `${answer}${details ? `\n${detailQuestionLabel}: ${details}` : ""}\n`;
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
        if (isCampaign) {
          setSubmissionSucceeded(true);
        } else {
          setAlert({
            type: "success",
            message: "Inschrijving succesvol verzonden!",
          });
        }
        form.reset();
        setFamilyMemberIds([]);
        setAddFamilyMembers(false);
        setPrimaryUserMedicalData(null);
        setPrimaryUserDoB("");
        setPrimaryUserFirstName("");
        setPrimaryUserSalutation("");
        setIsTermsAccepted(false);
        setCurrentStep(1);
        try {
          onSuccessfulSubmission?.();
        } catch {
          // A future analytics hook must never affect a successful registration.
        }
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

  const steps = [
    "Contactgegevens",
    "Praktijkgegevens",
    "Medische vragenlijst",
    "Gezin & bevestiging",
  ];

  if (isCampaign && submissionSucceeded) {
    return (
      <div
        className="w-full rounded-3xl border border-emerald-100 bg-white p-6 text-left shadow-[0_24px_80px_rgba(30,50,90,0.12)] sm:p-10"
        role="status"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 aria-hidden="true" className="h-9 w-9" />
          </span>
          <h2 className="mt-6 font-serif text-3xl font-semibold text-slate-950 sm:text-4xl">
            Bedankt voor uw inschrijving
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Wij hebben uw gegevens veilig ontvangen. Ons team neemt binnen 2
            werkdagen contact met u op om uw inschrijving te bevestigen.
          </p>
          <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
            <a
              className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              href="tel:0306049005"
            >
              <PhoneCall aria-hidden="true" className="h-5 w-5 text-primary" />
              030 604 9005
            </a>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
              <Clock3 aria-hidden="true" className="h-5 w-5 text-primary" />
              Binnen 2 werkdagen
            </div>
            <a
              className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              href="https://maps.app.goo.gl/x1usR2bYpxEx1ebV8"
              rel="noopener noreferrer"
              target="_blank"
            >
              <MapPin aria-hidden="true" className="h-5 w-5 text-primary" />
              Waardijnburg 3
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex items-center bg-white text-left",
        isCampaign
          ? "w-full rounded-3xl border border-slate-200 p-5 shadow-[0_24px_80px_rgba(30,50,90,0.12)] sm:p-8 lg:p-12"
          : "mb-40 p-8 md:w-5/6 rounded-md",
      )}
    >
      <form
        ref={formRef}
        className="w-full space-y-6"
        onSubmit={handleSubmit}
      >
        <div className={clsx("flex flex-col text-left", !isCampaign && "pb-10")}>
          <p
            className={clsx(
              "mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary",
              !isCampaign && "hidden",
            )}
          >
            Online inschrijven
          </p>
          <h2
            className={
              isCampaign
                ? "scroll-mt-8 font-serif text-3xl font-semibold text-slate-950 sm:text-4xl"
                : headerStyling
            }
            id="registration-form-heading"
          >
            Inschrijfformulier
          </h2>
          <p
            className={clsx(
              "mt-3 leading-relaxed text-slate-600",
              !isCampaign && "text-lg font-semibold text-black",
            )}
          >
            Vul het formulier volledig in. Uw gegevens worden alleen gebruikt
            om uw inschrijving bij onze praktijk te verwerken.
          </p>
        </div>

        {isCampaign && (
          <nav aria-label="Voortgang inschrijving" className="py-2">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700 sm:hidden">
              <span>Stap {currentStep} van 4</span>
              <span>{steps[currentStep - 1]}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100 sm:hidden">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none"
                style={{ width: `${currentStep * 25}%` }}
              />
            </div>
            <ol className="hidden grid-cols-4 gap-3 sm:grid">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isComplete = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;

                return (
                  <li
                    key={step}
                    aria-current={isCurrent ? "step" : undefined}
                    className="relative"
                  >
                    <div
                      className={clsx(
                        "mb-3 h-1.5 rounded-full transition-colors motion-reduce:transition-none",
                        stepNumber <= currentStep ? "bg-primary" : "bg-slate-100",
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          isComplete || isCurrent
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-500",
                        )}
                      >
                        {isComplete ? (
                          <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                        ) : (
                          stepNumber
                        )}
                      </span>
                      <span
                        className={clsx(
                          "text-xs font-medium",
                          isCurrent ? "text-slate-900" : "text-slate-500",
                        )}
                      >
                        {step}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <section
          aria-hidden={isCampaign && currentStep !== 1}
          className={clsx(
            "space-y-6",
            isCampaign && currentStep !== 1 && "hidden",
          )}
          data-registration-step="1"
        >
          {isCampaign && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Uw contactgegevens
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Eerst de gegevens waarmee wij u kunnen bereiken.
              </p>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="w-full sm:col-span-2">
              <RadioGroup
                required
                disabled={isSubmitting}
                label="Aanhef"
                name="salutation"
                options={[
                  { value: "Dhr.", label: "Dhr." },
                  { value: "Mevr.", label: "Mevr." },
                ]}
                value={primaryUserSalutation}
                onValueChange={handlePrimarySalutationChange}
              />
            </div>
            <FormField
              required
              autoComplete="given-name"
              disabled={isSubmitting}
              label="Voornaam"
              name="firstName"
              placeholder="Voornaam"
              onValueChange={setPrimaryUserFirstName}
            />
            <FormField
              required
              autoComplete="family-name"
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
            max={maxDateOfBirth}
            name="dateOfBirth"
            placeholder="Geboortedatum"
            type="date"
            onValueChange={handlePrimaryDateOfBirthChange}
          />
          {isCampaign && (
            <div className="grid gap-4 sm:grid-cols-2">
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
                placeholder="E-mailadres"
                type="email"
              />
            </div>
          )}
        </section>

        <section
          aria-hidden={isCampaign && currentStep !== 2}
          className={clsx(
            "space-y-6",
            isCampaign && currentStep !== 2 && "hidden",
          )}
          data-registration-step="2"
        >
          {isCampaign && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Praktijkgegevens
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                De administratieve gegevens voor uw patiëntendossier.
              </p>
            </div>
          )}
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
          <div className="grid gap-4 sm:grid-cols-2">
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
          </div>
          {!isCampaign && (
            <>
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
            </>
          )}
          <FormField
            required
            disabled={isSubmitting}
            inputMode="numeric"
            label="BSN-nummer"
            name="bsn"
            pattern="[0-9]*"
            placeholder="BSN-nummer"
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
        </section>

        <section
          aria-hidden={isCampaign && currentStep !== 3}
          className={clsx(
            "space-y-6",
            isCampaign && currentStep !== 3 && "hidden",
          )}
          data-registration-step="3"
        >
          {isCampaign && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Medische vragenlijst
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Hiermee kan de tandarts uw behandeling veilig voorbereiden.
              </p>
            </div>
          )}
          <div
            className={clsx(
              "border-gray-200 pt-6",
              !isCampaign && "border-t",
              isCampaign && "rounded-2xl border bg-slate-50 p-5",
            )}
          >
            <h3 className="mb-2 font-semibold text-gray-700">
              Medische vragenlijst <span className="text-red-500">*</span>
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-500">
              De juiste vragenlijst wordt automatisch gekozen op basis van uw
              geboortedatum.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                color={primaryUserMedicalData ? "success" : "default"}
                disabled={!primaryUserDoB || isSubmitting}
                type="button"
                onPress={() => setIsMedicalModalOpen(true)}
              >
                {primaryUserMedicalData
                  ? "Vragenlijst bekijken"
                  : "Open vragenlijst"}
              </Button>
              {primaryUserMedicalData && (
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                  <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
                  Ingevuld
                </span>
              )}
            </div>
            {!primaryUserDoB && (
              <p className="mt-3 text-sm text-gray-500">
                Vul eerst uw geboortedatum in.
              </p>
            )}
          </div>

          {primaryUserMedicalData &&
            Object.entries(primaryUserMedicalData).map(([key, value]) => (
              <Fragment key={key}>
                <input
                  name={`medical[${key}]`}
                  type="hidden"
                  value={value.answer}
                />
                {value.details && (
                  <input
                    name={`medical[${key}-details]`}
                    type="hidden"
                    value={value.details}
                  />
                )}
              </Fragment>
            ))}
        </section>

        <section
          aria-hidden={isCampaign && currentStep !== 4}
          className={clsx(
            "space-y-6",
            isCampaign && currentStep !== 4 && "hidden",
          )}
          data-registration-step="4"
        >
          {isCampaign && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Gezin en bevestiging
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Voeg eventueel gezinsleden toe en controleer uw toestemming.
              </p>
            </div>
          )}
          <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-4">
            <Checkbox
              classNames={{
                base: "items-start",
                label: "text-sm text-gray-700",
                wrapper: "mt-0.5 text-primary-700",
              }}
              disabled={isSubmitting}
              isSelected={addFamilyMembers}
              type="checkbox"
              onValueChange={setAddFamilyMembers}
            >
              Ik wil graag ook gezinsleden inschrijven
            </Checkbox>
          </div>

          {addFamilyMembers && (
            <div className="mt-4">
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <Input
                  aria-label="Aantal gezinsleden om toe te voegen"
                  className="w-24"
                  disabled={isSubmitting}
                  min="1"
                  type="number"
                  value={String(numFamilyMembersToAdd)}
                  onChange={(e) =>
                    setNumFamilyMembersToAdd(
                      Math.max(1, parseInt(e.target.value, 10) || 1),
                    )
                  }
                />
                <Button
                  disabled={isSubmitting}
                  type="button"
                  onPress={addFamilyMember}
                >
                  {numFamilyMembersToAdd > 1
                    ? "Gezinsleden toevoegen"
                    : "Gezinslid toevoegen"}
                </Button>
              </div>
              <div className="space-y-4">
                {familyMemberIds.map((id, arrayIndex) => (
                  <FamilyMemberForm
                    key={id}
                    id={id}
                    index={arrayIndex}
                    onRemove={() => removeFamilyMember(id)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
            <Checkbox
              classNames={{
                base: "items-start",
                label: "text-sm leading-relaxed text-gray-700",
                wrapper: "mt-0.5 text-primary-700",
              }}
              disabled={isSubmitting}
              isSelected={isTermsAccepted}
              onValueChange={setIsTermsAccepted}
            >
              Ik bevestig dat ik akkoord ga met de&nbsp;
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
              &nbsp;en het verwerken van mijn persoonsgegevens voor inschrijving
              <span className="text-red-500"> *</span>
            </Checkbox>
          </div>
        </section>

        {alert && (
          <Alert
            className="mt-4"
            color={alert.type}
            title={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div
          className={clsx(
            "flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center",
            isCampaign ? "sm:justify-between" : "sm:justify-start",
          )}
        >
          {isCampaign && currentStep > 1 && (
            <Button
              className="rounded-xl"
              disabled={isSubmitting}
              startContent={<ArrowLeft aria-hidden="true" className="h-4 w-4" />}
              type="button"
              variant="light"
              onPress={handlePreviousStep}
            >
              Vorige stap
            </Button>
          )}
          {isCampaign && currentStep < 4 ? (
            <Button
              className="w-full rounded-xl text-white sm:ml-auto sm:w-auto"
              color="primary"
              disabled={isSubmitting}
              endContent={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
              type="button"
              onPress={handleNextStep}
            >
              Ga verder
            </Button>
          ) : (
            <Button
              className="w-full rounded-xl text-white sm:w-auto"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              <Send aria-hidden="true" className="h-4 w-4 text-white" />
              {isSubmitting ? "Verzenden..." : "Verstuur inschrijving"}
            </Button>
          )}
        </div>
      </form>

      <MedicalQuestionnaireModal
        dateOfBirth={primaryUserDoB}
        isOpen={isMedicalModalOpen}
        personName={primaryUserFirstName || "uzelf"}
        salutation={primaryUserSalutation}
        onClose={() => setIsMedicalModalOpen(false)}
        onSubmit={handlePrimaryUserMedicalSubmit}
      />
    </div>
  );
}
