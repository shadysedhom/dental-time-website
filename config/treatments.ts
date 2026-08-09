export type Treatment = {
  slug: string;
  name: string;
  shortDescription: string;
  metaDescription: string;
  eyebrow: string;
  introduction: string[];
  indicationsTitle: string;
  indications: string[];
  approach: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedSlugs: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "algemene-tandheelkunde",
    name: "Algemene tandheelkunde",
    shortDescription:
      "Periodieke controles, preventie en persoonlijke zorg voor een gezond gebit.",
    metaDescription:
      "Algemene tandheelkunde in Nieuwegein: controles, preventie en persoonlijke mondzorg bij Dental Time. Nieuwe patiënten zijn welkom.",
    eyebrow: "Uw gebit goed onderhouden",
    introduction: [
      "Een gezond gebit begint met regelmatige aandacht. Tijdens een periodieke controle bekijken we uw tanden, kiezen en tandvlees en bespreken we hoe het thuis met uw mondverzorging gaat. Zo kunnen we veranderingen vroeg signaleren en samen bepalen welke zorg passend is.",
      "Bij Dental Time in Nieuwegein nemen we de tijd om bevindingen helder uit te leggen. Een behandeladvies volgt altijd pas na persoonlijk onderzoek. Waar mogelijk richten we ons op preventie en behoud van uw eigen gebit.",
    ],
    indicationsTitle: "Waarvoor kunt u bij ons terecht?",
    indications: [
      "Periodieke controle van tanden, kiezen en tandvlees",
      "Advies over poetsen, ragers, voeding en mondhygiëne",
      "Beoordeling van gevoeligheid, pijn of andere mondklachten",
      "Vullingen en herstel wanneer dat na onderzoek nodig blijkt",
    ],
    approach: [
      {
        title: "Luisteren en onderzoeken",
        description:
          "We bespreken uw wensen en eventuele klachten en voeren een zorgvuldig mondonderzoek uit.",
      },
      {
        title: "Duidelijk advies",
        description:
          "U krijgt begrijpelijke uitleg over onze bevindingen, mogelijkheden en eventuele vervolgstappen.",
      },
      {
        title: "Samen onderhouden",
        description:
          "We stemmen controles en preventieve zorg af op wat uw gebit nodig heeft.",
      },
    ],
    faqs: [
      {
        question: "Hoe vaak heb ik een tandartscontrole nodig?",
        answer:
          "Dat verschilt per persoon. Na beoordeling van uw mondgezondheid spreken we samen een passend controle-interval af.",
      },
      {
        question: "Kan ik mij als nieuwe patiënt inschrijven?",
        answer:
          "Ja. U kunt uzelf en eventueel uw gezinsleden online inschrijven. Ons team neemt daarna binnen twee werkdagen contact met u op.",
      },
      {
        question: "Wat neem ik mee naar mijn eerste afspraak?",
        answer:
          "Neem een geldig identiteitsbewijs, uw verzekeringsgegevens en waar mogelijk informatie van uw vorige tandarts mee.",
      },
    ],
    relatedSlugs: ["restauratieve-tandheelkunde", "angst-voor-de-tandarts"],
  },
  {
    slug: "cosmetische-tandheelkunde",
    name: "Cosmetische tandheelkunde",
    shortDescription:
      "Persoonlijk advies over de kleur, vorm en uitstraling van uw glimlach.",
    metaDescription:
      "Cosmetische tandheelkunde in Nieuwegein. Bespreek uw wensen voor kleur, vorm en uitstraling met Dental Time op het Muntplein.",
    eyebrow: "Een glimlach die bij u past",
    introduction: [
      "Bent u niet helemaal tevreden over de kleur, vorm of stand van uw tanden? Cosmetische tandheelkunde begint bij Dental Time met een open gesprek over uw wensen. We bekijken vervolgens uw gebit en bespreken welke mogelijkheden verantwoord en realistisch zijn.",
      "Een natuurlijk resultaat en een gezonde basis staan voorop. Soms is een kleine aanpassing voldoende; in andere situaties zijn meerdere stappen nodig. U ontvangt pas een concreet voorstel nadat de tandarts uw mond heeft onderzocht.",
    ],
    indicationsTitle: "Wensen die u kunt bespreken",
    indications: [
      "Verkleuringen of kleurverschillen tussen tanden",
      "Een afgebroken, afgesleten of onregelmatig gevormde tand",
      "Ruimte tussen tanden of een onrustige tandvorm",
      "Een bestaande restauratie die niet meer mooi aansluit",
    ],
    approach: [
      {
        title: "Uw wens centraal",
        description:
          "We bespreken wat u stoort en welk resultaat u voor ogen heeft, zonder overhaaste keuzes.",
      },
      {
        title: "Gezonde basis",
        description:
          "De tandarts beoordeelt eerst uw gebit en tandvlees en legt passende opties en beperkingen uit.",
      },
      {
        title: "Persoonlijk behandelplan",
        description:
          "Als behandeling geschikt is, ontvangt u een helder plan dat past bij uw mond en wensen.",
      },
    ],
    faqs: [
      {
        question: "Welke cosmetische behandeling past bij mij?",
        answer:
          "Dat hangt af van uw wensen en de conditie van uw gebit. Tijdens een consult kan de tandarts de mogelijkheden persoonlijk beoordelen.",
      },
      {
        question: "Ziet een cosmetische behandeling er natuurlijk uit?",
        answer:
          "We streven naar een resultaat dat aansluit bij uw gezicht en eigen gebit. Het verwachte resultaat verschilt per behandeling en uitgangssituatie.",
      },
      {
        question: "Wordt cosmetische tandheelkunde vergoed?",
        answer:
          "Cosmetische behandelingen worden vaak niet vanuit de basisverzekering vergoed. Controleer voor zekerheid uw polis of vraag uw verzekeraar om uitleg.",
      },
    ],
    relatedSlugs: ["restauratieve-tandheelkunde", "kronen-en-bruggen"],
  },
  {
    slug: "angst-voor-de-tandarts",
    name: "Tandartsangst",
    shortDescription:
      "Rustige begeleiding, duidelijke uitleg en zorg in een tempo dat bij u past.",
    metaDescription:
      "Bang voor de tandarts? Dental Time in Nieuwegein biedt rustige begeleiding, duidelijke uitleg en persoonlijke zorg voor angstige patiënten.",
    eyebrow: "Rust en vertrouwen bij de tandarts",
    introduction: [
      "Tandartsangst komt veel voor en kan ervoor zorgen dat een bezoek steeds wordt uitgesteld. Bij Dental Time hoeft u zich daar niet voor te schamen. Vertel ons wat u spannend vindt; dan kunnen we daar vanaf het eerste contact rekening mee houden.",
      "We nemen de tijd, leggen uit wat we doen en spreken vooraf af hoe u een pauze kunt aangeven. Een eerste bezoek kan vooral in het teken staan van kennismaken en rustig beoordelen wat nodig is. U houdt regie over het tempo.",
    ],
    indicationsTitle: "Onze aanpak bij tandartsangst",
    indications: [
      "Eerst luisteren naar eerdere ervaringen en uw zorgen",
      "Vooraf vertellen wat er gaat gebeuren en waarom",
      "Een duidelijk stopsignaal en ruimte voor pauzes afspreken",
      "Behandeling waar mogelijk opdelen in overzichtelijke stappen",
    ],
    approach: [
      {
        title: "Kennismaken",
        description:
          "We bespreken zonder oordeel waar uw spanning vandaan komt en wat u helpt om rust te houden.",
      },
      {
        title: "Afspraken maken",
        description:
          "Samen spreken we tempo, uitleg, pauzes en een stopsignaal af voordat we beginnen.",
      },
      {
        title: "Vertrouwen opbouwen",
        description:
          "We werken stap voor stap aan de zorg die nodig is, met aandacht voor uw grenzen.",
      },
    ],
    faqs: [
      {
        question: "Kan ik eerst alleen kennismaken?",
        answer:
          "Bespreek dit bij het maken van uw afspraak. We kijken graag hoe we een eerste bezoek zo voorspelbaar en rustig mogelijk kunnen maken.",
      },
      {
        question: "Kan ik tijdens een behandeling stoppen?",
        answer:
          "Ja. We kunnen vooraf een duidelijk stopsignaal afspreken, zodat u op ieder moment om een pauze kunt vragen.",
      },
      {
        question: "Moet ik bij inschrijving mijn angst vermelden?",
        answer:
          "Dat is niet verplicht, maar het helpt ons wel om vanaf het eerste contact rekening te houden met wat u nodig heeft.",
      },
    ],
    relatedSlugs: ["algemene-tandheelkunde", "wortelkanaalbehandeling"],
  },
  {
    slug: "restauratieve-tandheelkunde",
    name: "Restauratieve tandheelkunde",
    shortDescription:
      "Herstel van beschadigde of versleten tanden met aandacht voor functie en vorm.",
    metaDescription:
      "Restauratieve tandheelkunde in Nieuwegein voor beschadigde of versleten tanden. Persoonlijk onderzoek en helder advies bij Dental Time.",
    eyebrow: "Herstel met behoud als uitgangspunt",
    introduction: [
      "Een tand of kies kan beschadigen door cariës, slijtage, een ongeval of een oude restauratie. Restauratieve tandheelkunde richt zich op het herstellen van vorm en functie, waarbij we zoveel mogelijk gezond tandweefsel proberen te behouden.",
      "De juiste oplossing hangt af van de omvang en oorzaak van de schade. Bij Dental Time onderzoeken we daarom eerst uw gebit. Daarna leggen we uit welke behandelopties er zijn en welke voor- en nadelen daarbij horen.",
    ],
    indicationsTitle: "Wanneer kan herstel nodig zijn?",
    indications: [
      "Een gaatje, gebroken vulling of afgebroken tand",
      "Slijtage door knarsen, klemmen of andere oorzaken",
      "Pijn of gevoeligheid bij kauwen, koud of warm",
      "Een tand of kies waarvan vorm en functie zijn verminderd",
    ],
    approach: [
      {
        title: "Oorzaak vaststellen",
        description:
          "We beoordelen niet alleen de schade, maar onderzoeken ook waardoor die is ontstaan.",
      },
      {
        title: "Opties vergelijken",
        description:
          "U krijgt uitleg over passende mogelijkheden, van een vulling tot uitgebreider herstel.",
      },
      {
        title: "Duurzaam onderhouden",
        description:
          "Na herstel bespreken we hoe u het resultaat en de rest van uw gebit goed kunt verzorgen.",
      },
    ],
    faqs: [
      {
        question: "Kan iedere beschadigde tand worden hersteld?",
        answer:
          "Niet altijd. Dat hangt onder meer af van de hoeveelheid gezond tandweefsel en de conditie van de wortel. De tandarts kan dit na onderzoek beoordelen.",
      },
      {
        question: "Is een vulling altijd voldoende?",
        answer:
          "Bij beperkte schade kan een vulling passend zijn. Bij grotere schade kan een andere restauratie nodig zijn om de tand voldoende te ondersteunen.",
      },
      {
        question: "Hoe lang gaat een restauratie mee?",
        answer:
          "Dat verschilt per materiaal, plaats, belasting en mondverzorging. Tijdens controles houden we de restauratie en omliggende tand in de gaten.",
      },
    ],
    relatedSlugs: ["kronen-en-bruggen", "wortelkanaalbehandeling"],
  },
  {
    slug: "kronen-en-bruggen",
    name: "Kronen en bruggen",
    shortDescription:
      "Maatwerk voor ernstig beschadigde tanden of het vervangen van een ontbrekende tand.",
    metaDescription:
      "Kronen en bruggen in Nieuwegein. Dental Time onderzoekt uw gebit en bespreekt passende mogelijkheden voor duurzaam herstel.",
    eyebrow: "Maatwerk voor functie en uitstraling",
    introduction: [
      "Wanneer een tand of kies ernstig is verzwakt, kan een kroon soms bescherming en herstel bieden. Een brug kan in bepaalde situaties worden gebruikt om een ontbrekende tand te vervangen. Welke oplossing passend is, hangt af van uw gebit, beet en persoonlijke wensen.",
      "Bij Dental Time bespreken we het hele traject vooraf. U krijgt uitleg over de mogelijkheden, de stappen en het onderhoud. Een definitief advies en kostenbegroting volgen na onderzoek van uw mondsituatie.",
    ],
    indicationsTitle: "Wanneer worden kronen of bruggen overwogen?",
    indications: [
      "Een tand of kies met een grote vulling of veel weefselverlies",
      "Een verzwakte tand na een wortelkanaalbehandeling",
      "Herstel van kauwfunctie of tandvorm",
      "Vervanging van één of meer ontbrekende tanden in een geschikte situatie",
    ],
    approach: [
      {
        title: "Onderzoek en planning",
        description:
          "We beoordelen de tand, omliggende tanden, het tandvlees en uw beet voordat we adviseren.",
      },
      {
        title: "Voorbereiden en vervaardigen",
        description:
          "De restauratie wordt op maat voorbereid; u krijgt uitleg over eventuele tijdelijke voorzieningen.",
      },
      {
        title: "Plaatsen en controleren",
        description:
          "Na plaatsing controleren we pasvorm en beet en bespreken we het dagelijkse onderhoud.",
      },
    ],
    faqs: [
      {
        question: "Wat is het verschil tussen een kroon en een brug?",
        answer:
          "Een kroon bedekt en ondersteunt een bestaande tand of kies. Een brug vervangt een ontbrekende tand met ondersteuning van aangrenzende elementen.",
      },
      {
        question: "Hoe verzorg ik een kroon of brug?",
        answer:
          "Goed poetsen en reinigen tussen de tanden blijft belangrijk. Bij een brug kan een aangepast hulpmiddel nodig zijn; we leggen dit persoonlijk uit.",
      },
      {
        question: "Kan ik vooraf een begroting krijgen?",
        answer:
          "Ja. Nadat de tandarts uw gebit heeft onderzocht en de behandeling is bepaald, ontvangt u uitleg over de verwachte kosten.",
      },
    ],
    relatedSlugs: ["restauratieve-tandheelkunde", "prothetische-behandelingen"],
  },
  {
    slug: "wortelkanaalbehandeling",
    name: "Wortelkanaalbehandeling",
    shortDescription:
      "Behandeling van ontstoken of geïnfecteerd weefsel binnen in een tand of kies.",
    metaDescription:
      "Wortelkanaalbehandeling in Nieuwegein. Dental Time onderzoekt uw klacht en legt de behandeling rustig en duidelijk uit.",
    eyebrow: "Zorg bij een ontstoken tand of kies",
    introduction: [
      "Binnen in een tand of kies zit levend weefsel. Wanneer dit ontstoken of geïnfecteerd raakt, kan een wortelkanaalbehandeling nodig zijn. Het doel is om het ontstoken weefsel te verwijderen, de kanalen te reinigen en de tand zo goed mogelijk te behouden.",
      "Pijn heeft verschillende oorzaken. Daarom begint een bezoek altijd met een gesprek en onderzoek. De tandarts stelt daarna vast of een wortelkanaalbehandeling passend is of dat een andere aanpak nodig is.",
    ],
    indicationsTitle: "Klachten die onderzoek verdienen",
    indications: [
      "Aanhoudende of hevige tand- of kiespijn",
      "Langdurige gevoeligheid voor warm of koud",
      "Pijn bij bijten of een zwelling rond een tand",
      "Een diepe vulling, scheur of beschadiging nabij het zenuwweefsel",
    ],
    approach: [
      {
        title: "Diagnose",
        description:
          "We bespreken de klacht en onderzoeken welke tand betrokken is en wat de mogelijke oorzaak is.",
      },
      {
        title: "Reinigen en afsluiten",
        description:
          "Wanneer behandeling nodig is, worden de wortelkanalen zorgvuldig gereinigd en afgesloten.",
      },
      {
        title: "Herstel en controle",
        description:
          "We bespreken hoe de tand wordt hersteld en wanneer controle van het herstel wenselijk is.",
      },
    ],
    faqs: [
      {
        question: "Doet een wortelkanaalbehandeling pijn?",
        answer:
          "De behandeling vindt doorgaans plaats met plaatselijke verdoving. Er kan nadien tijdelijk gevoeligheid optreden; de tandarts vertelt wat u kunt verwachten.",
      },
      {
        question: "Hoeveel afspraken zijn nodig?",
        answer:
          "Dat hangt af van de tand, de ontsteking en het verloop van de behandeling. Soms kan het in één afspraak, soms zijn meerdere bezoeken nodig.",
      },
      {
        question: "Heb ik na de behandeling een kroon nodig?",
        answer:
          "Niet altijd. De hoeveelheid overgebleven tandweefsel en de belasting van de tand bepalen welk herstel verstandig is.",
      },
    ],
    relatedSlugs: ["kronen-en-bruggen", "angst-voor-de-tandarts"],
  },
  {
    slug: "prothetische-behandelingen",
    name: "Prothetische behandelingen",
    shortDescription:
      "Persoonlijke oplossingen voor het vervangen van ontbrekende tanden en kiezen.",
    metaDescription:
      "Prothetische behandelingen in Nieuwegein. Persoonlijk advies over het vervangen van ontbrekende tanden en kiezen bij Dental Time.",
    eyebrow: "Weer comfortabel spreken en eten",
    introduction: [
      "Ontbrekende tanden en kiezen kunnen invloed hebben op kauwen, spreken en zelfvertrouwen. Een prothetische voorziening kan een deel van het gebit of het volledige gebit vervangen. Comfort, functie en een natuurlijke uitstraling zijn belangrijke uitgangspunten.",
      "Er bestaan verschillende soorten voorzieningen. Welke geschikt is, hangt af van uw mond, wensen en gezondheid. Bij Dental Time nemen we de tijd om de mogelijkheden en het onderhoud zorgvuldig met u door te nemen.",
    ],
    indicationsTitle: "Mogelijkheden die we kunnen bespreken",
    indications: [
      "Een gedeeltelijke voorziening bij meerdere ontbrekende tanden",
      "Een volledige gebitsprothese wanneer tanden en kiezen ontbreken",
      "Aanpassing of vervanging van een bestaande prothese",
      "Onderzoek bij drukplekken, loszitten of verminderde kauwfunctie",
    ],
    approach: [
      {
        title: "Wensen en mondsituatie",
        description:
          "We bespreken waar u tegenaan loopt en onderzoeken de conditie van uw mond en kaak.",
      },
      {
        title: "Passende voorziening",
        description:
          "U krijgt uitleg over mogelijke oplossingen, het traject en wat u realistisch kunt verwachten.",
      },
      {
        title: "Passen en nazorg",
        description:
          "We controleren pasvorm en functie en helpen bij vragen over wennen en dagelijks onderhoud.",
      },
    ],
    faqs: [
      {
        question: "Hoe lang duurt het wennen aan een prothese?",
        answer:
          "Dat verschilt per persoon en voorziening. In het begin kunnen spreken en eten anders aanvoelen; controles en eventuele aanpassingen helpen bij het wennen.",
      },
      {
        question: "Wat kan ik doen bij een drukplek?",
        answer:
          "Neem contact op met de praktijk en probeer de voorziening niet zelf aan te passen. We kunnen de oorzaak beoordelen en zo nodig corrigeren.",
      },
      {
        question: "Hoe maak ik een prothese schoon?",
        answer:
          "Dagelijkse reiniging van de voorziening én de mond is belangrijk. U ontvangt advies dat past bij uw type prothese.",
      },
    ],
    relatedSlugs: ["kronen-en-bruggen", "algemene-tandheelkunde"],
  },
];

export function getTreatment(slug: string) {
  return treatments.find((treatment) => treatment.slug === slug);
}
