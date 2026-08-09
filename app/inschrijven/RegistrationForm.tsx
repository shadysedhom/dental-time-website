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
import { trackMetaLead } from "@/lib/metaPixel";

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
  const feedbackRef = useRef<HTMLDivElement>(null);
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
  const [numFamilyMembersToAdd, setNumFamilyMembersToAdd] = useState("1");
  const [currentStep, setCurrentStep] = useState(1);
  const [submissionSucceeded, setSubmissionSucceeded] = useState(false);

  const familyMemberCount = Math.max(
    1,
    Number.parseInt(numFamilyMembersToAdd, 10) || 1,
  );

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

    for (let i = 0; i < familyMemberCount; i++) {
      newIds.push(currentNextId);
      currentNextId++;
    }
    setFamilyMemberIds([...familyMemberIds, ...newIds]);
    setNextId(currentNextId);
    setNumFamilyMembersToAdd(String(familyMemberCount));
  };

  // Helper function to remove a family member from the array
  const removeFamilyMember = (id: number) => {
    setFamilyMemberIds(familyMemberIds.filter((fid) => fid !== id));
  };

  const handlePrimaryUserMedicalSubmit = (
    data: Record<string, { answer: string; details?: string }>,
  ) => {
    setPrimaryUserMedicalData(data);
    setAlert(null);
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

  const showFormError = (message: string) => {
    setAlert({ type: "danger", message });

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        feedbackRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        feedbackRef.current?.focus({ preventScroll: true });
      });
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
      showFormError(
        "Vul eerst uw medische vragenlijst in. Daarna kunt u verder.",
      );

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

  const handleTermsAcceptanceChange = (isSelected: boolean) => {
    setIsTermsAccepted(isSelected);

    if (isSelected && alert?.message.includes("privacyverklaring")) {
      setAlert(null);
    }
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
      showFormError(
        "Vul eerst uw medische vragenlijst in. Daarna kunt u uw inschrijving versturen.",
      );

      return;
    }

    for (const id of familyMemberIds) {
      const hasMedicalData = Array.from(formData.keys()).some((key) =>
        key.startsWith(`familyMembers[${id}][medical]`),
      );

      if (!hasMedicalData) {
        const memberName =
          formData.get(`familyMembers[${id}][firstName]`) || `Gezinslid ${id}`;

        showFormError(
          `Vul eerst de medische vragenlijst voor ${memberName} in. Daarna kunt u uw inschrijving versturen.`,
        );

        return;
      }
    }

    if (!isTermsAccepted) {
      showFormError(
        "Ga akkoord met de privacyverklaring om uw inschrijving te versturen.",
      );

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
          trackMetaLead();
          onSuccessfulSubmission?.();
        } catch {
          // Analytics must never affect a successful registration.
        }
      } else {
        showFormError(
          "Het versturen is niet gelukt. Probeer het later opnieuw.",
        );
      }
    } catch (error) {
      showFormError("Het versturen is niet gelukt. Probeer het later opnieuw.");
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
          ? "relative w-full overflow-clip rounded-3xl border border-white/90 bg-white/95 p-4 shadow-[0_24px_60px_rgba(17,24,43,0.11)] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,#b18a36,#3a4e9d,#b18a36)] before:content-[''] sm:rounded-[2rem] sm:p-8 sm:shadow-[0_30px_90px_rgba(17,24,43,0.12)] lg:p-12"
          : "mb-40 p-8 md:w-5/6 rounded-md",
      )}
    >
      <form
        ref={formRef}
        className="w-full space-y-5 sm:space-y-6"
        onSubmit={handleSubmit}
      >
        <div className={clsx("flex flex-col text-left", !isCampaign && "pb-10")}>
          <p
            className={clsx(
              "mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#b18a36]",
              !isCampaign && "hidden",
            )}
          >
            Online inschrijven
          </p>
          <h2
            className={
              isCampaign
                 ? "scroll-mt-8 font-serif text-3xl font-semibold tracking-[-0.025em] text-[#11182b] sm:text-4xl"
                : headerStyling
            }
            id="registration-form-heading"
          >
            Inschrijfformulier
          </h2>
          <p
            className={clsx(
              "mt-2 text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-relaxed",
              !isCampaign && "text-lg font-semibold text-black",
            )}
          >
            Vul het formulier volledig in. Uw gegevens worden alleen gebruikt
            om uw inschrijving bij onze praktijk te verwerken.
          </p>
        </div>

        {isCampaign && (
          <nav
            aria-label="Voortgang inschrijving"
            className="rounded-2xl border border-[#e7e2d8] bg-[#faf8f3] p-3.5 sm:p-5"
          >
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700 sm:hidden">
              <span>Stap {currentStep} van 4</span>
              <span>{steps[currentStep - 1]}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#e4dfd5] sm:hidden">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#b18a36,#3a4e9d)] transition-[width] duration-300 motion-reduce:transition-none"
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
                        "mb-3 h-px transition-colors motion-reduce:transition-none",
                        isComplete
                          ? "bg-[#b18a36]"
                          : isCurrent
                            ? "bg-[#3a4e9d]"
                            : "bg-[#ddd8ce]",
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          isComplete
                            ? "bg-[#b18a36] text-white"
                            : isCurrent
                              ? "bg-[#3a4e9d] text-white shadow-[0_4px_12px_rgba(58,78,157,0.25)]"
                              : "border border-[#ddd8ce] bg-white text-slate-500",
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
                <h3 className="font-serif text-2xl font-semibold text-[#11182b]">
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
                <h3 className="font-serif text-2xl font-semibold text-[#11182b]">
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
                <h3 className="font-serif text-2xl font-semibold text-[#11182b]">
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
              isCampaign && "rounded-2xl border bg-slate-50 p-4 sm:p-5",
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
                className={clsx(
                  "min-h-11 rounded-xl font-semibold transition-colors",
                  primaryUserMedicalData &&
                    "border border-slate-300 bg-white text-[#293b7c] shadow-sm hover:border-[#3a4e9d] hover:bg-[#f4f6ff]",
                )}
                color="default"
                disabled={!primaryUserDoB || isSubmitting}
                type="button"
                variant={primaryUserMedicalData ? "bordered" : "solid"}
                onPress={() => setIsMedicalModalOpen(true)}
              >
                {primaryUserMedicalData
                  ? "Bekijken of wijzigen"
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
                <h3 className="font-serif text-2xl font-semibold text-[#11182b]">
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
                icon: "text-white",
                label: "text-sm text-gray-700",
                wrapper:
                  "mt-0.5 rounded-md text-white before:rounded-md before:border-slate-300 after:rounded-md after:bg-[#3a4e9d] after:text-white group-data-[selected=true]:before:border-[#3a4e9d]",
              }}
              disableAnimation
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
              <div className="mb-4 grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-3 sm:flex sm:flex-wrap sm:gap-4">
                <Input
                  aria-label="Aantal gezinsleden om toe te voegen"
                  className="w-full sm:w-24"
                  classNames={{
                    input: "text-base",
                    inputWrapper: "min-h-12",
                  }}
                  disabled={isSubmitting}
                  min="1"
                  type="number"
                  value={numFamilyMembersToAdd}
                  onBlur={() =>
                    setNumFamilyMembersToAdd(String(familyMemberCount))
                  }
                  onValueChange={setNumFamilyMembersToAdd}
                />
                <Button
                  className="min-h-12 whitespace-normal px-3 sm:px-4"
                  disabled={isSubmitting}
                  type="button"
                  onPress={addFamilyMember}
                >
                  {familyMemberCount > 1
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
                    onMedicalCompleted={() => setAlert(null)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
            <Checkbox
              classNames={{
                base: "items-start",
                icon: "text-white",
                label: "text-sm leading-relaxed text-gray-700",
                wrapper:
                  "mt-0.5 rounded-md text-white before:rounded-md before:border-slate-300 after:rounded-md after:bg-[#3a4e9d] after:text-white group-data-[selected=true]:before:border-[#3a4e9d]",
              }}
              disableAnimation
              disabled={isSubmitting}
              isSelected={isTermsAccepted}
              onValueChange={handleTermsAcceptanceChange}
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

        {alert?.type === "danger" ? (
          <div
            ref={feedbackRef}
            className="mt-4 scroll-mt-24 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-relaxed text-red-700 outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            role="alert"
            tabIndex={-1}
          >
            {alert.message}
          </div>
        ) : alert ? (
          <Alert
            className="mt-4"
            color={alert.type}
            title={alert.message}
            onClose={() => setAlert(null)}
          />
        ) : null}

        <div
          className={clsx(
            "flex items-center gap-3 pt-2 sm:flex-row",
            isCampaign ? "sm:justify-between" : "sm:justify-start",
          )}
        >
          {isCampaign && currentStep > 1 && (
            <Button
              className="min-h-12 shrink-0 rounded-xl px-3 sm:px-4"
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
              key="campaign-next-step"
              className="min-h-12 flex-1 rounded-xl bg-[#3a4e9d] px-5 text-white shadow-[0_10px_24px_rgba(58,78,157,0.22)] hover:bg-[#2d3d7a] sm:ml-auto sm:flex-none sm:px-6"
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
              key={isCampaign ? "campaign-submit" : "standard-submit"}
              className="min-h-12 flex-1 rounded-xl bg-[#3a4e9d] px-5 text-white shadow-[0_10px_24px_rgba(58,78,157,0.22)] hover:bg-[#2d3d7a] sm:flex-none sm:px-6"
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
