"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type IconName =
  | "plane"
  | "arrow"
  | "shield"
  | "users"
  | "pin"
  | "check"
  | "menu"
  | "close"
  | "briefcase"
  | "file"
  | "clock"
  | "globe"
  | "building"
  | "search"
  | "spark"
  | "lock";

type RegistrationDetails = {
  company: string;
  businessId: string;
  specialisation: string;
  email: string;
  password: string;
  fairWorkStatus: string;
  ebaStatus: string;
  postcode: string;
  indigenousTarget: string;
  publicLiabilityConfirmed: boolean;
  policyNumber: string;
  headOfficeLocation: string;
  operatingHubs: string[];
  annualSpend: string;
  tierOneContractor: boolean;
};

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
  };

  const paths: Record<IconName, React.ReactNode> = {
    plane: (
      <>
        <path d="m3 11 18-8-8 18-2.4-7.6L3 11Z" />
        <path d="m10.6 13.4 4.1-4.1" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    menu: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),
    close: (
      <>
        <path d="m18 6-12 12" />
        <path d="m6 6 12 12" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h8" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
      </>
    ),
    building: (
      <>
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
        <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01M16 13v.01M16 16v.01M16 19v.01" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
        <path d="m19 14 1 2.5 2 1-2 1L19 21l-1-2.5-2-1 2-1 1-2.5Z" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

const hubs = [
  {
    name: "Pilbara",
    state: "WA",
    description:
      "Iron ore, green hydrogen and utility-scale solar megaprojects in Western Australia.",
    crews: 140,
    clans: ["Yindjibarndi", "Wongi"],
  },
  {
    name: "Bowen Basin",
    state: "QLD",
    description:
      "Metallurgical coal, gas and grid-infrastructure corridor in Queensland.",
    crews: 120,
    clans: ["Bidjara"],
  },
  {
    name: "Goldfields",
    state: "WA",
    description:
      "Gold, critical minerals and renewable energy projects across the Goldfields.",
    crews: 75,
    clans: ["Noongar"],
  },
  {
    name: "Hunter Valley",
    state: "NSW",
    description:
      "Major energy, resources and infrastructure works in regional New South Wales.",
    crews: 80,
    clans: ["Wonnarua"],
  },
  {
    name: "Whyalla & Eyre",
    state: "SA",
    description:
      "Green steel, hydrogen and clean-energy developments across South Australia.",
    crews: 40,
    clans: ["Nukunu"],
  },
];

const integrationItems = [
  {
    title: "WorkSafe verified",
    label: "STATE WHS REGULATORS",
    description:
      "High-risk work licences and trade tickets cross-checked against state WorkSafe databases before deployment.",
  },
  {
    title: "White Card validation",
    label: "NATIONAL GENERAL INDUCTION",
    description:
      "Construction induction cards checked and kept current for every crew member on every project.",
  },
  {
    title: "Insurance & ABN checks",
    label: "BUSINESS COMPLIANCE",
    description:
      "Business registrations and $20M public liability cover validated before any engagement is confirmed.",
  },
  {
    title: "Fair Work aligned",
    label: "INDUSTRIAL RELATIONS",
    description:
      "Award classifications and rates cross-referenced to help protect workers and project delivery.",
  },
];

type PastProject = {
  name: string;
  milestones: { deliveredOnTime: number; total: number };
  workPackages: { completed: number; defectiveClaims: number; reworks: number };
  equipment: { condition: number; ageYears: number; preventiveMaintenance: number }[];
  hseAudits: { compliantChecks: number; totalChecks: number };
};

type HealthPillarKey = "schedule" | "quality" | "assets" | "site";

const pastProjects: PastProject[] = [
  {
    name: "Pilbara Iron Ore Expansion",
    milestones: { deliveredOnTime: 48, total: 52 },
    workPackages: { completed: 34, defectiveClaims: 1, reworks: 1 },
    equipment: [
      { condition: 4.5, ageYears: 3, preventiveMaintenance: 98 },
      { condition: 4, ageYears: 5, preventiveMaintenance: 94 },
      { condition: 5, ageYears: 2, preventiveMaintenance: 100 },
    ],
    hseAudits: { compliantChecks: 143, totalChecks: 150 },
  },
  {
    name: "Pilbara Solar and Storage",
    milestones: { deliveredOnTime: 36, total: 38 },
    workPackages: { completed: 28, defectiveClaims: 0, reworks: 1 },
    equipment: [
      { condition: 4.5, ageYears: 4, preventiveMaintenance: 96 },
      { condition: 4, ageYears: 6, preventiveMaintenance: 95 },
    ],
    hseAudits: { compliantChecks: 126, totalChecks: 130 },
  },
  {
    name: "Regional Grid Connection",
    milestones: { deliveredOnTime: 29, total: 32 },
    workPackages: { completed: 22, defectiveClaims: 1, reworks: 0 },
    equipment: [
      { condition: 4, ageYears: 5, preventiveMaintenance: 93 },
      { condition: 4.5, ageYears: 3, preventiveMaintenance: 97 },
    ],
    hseAudits: { compliantChecks: 108, totalChecks: 115 },
  },
];

function scoreFromPercentage(percentage: number) {
  return 1 + (Math.min(100, Math.max(0, percentage)) / 100) * 4;
}

function roundScore(score: number) {
  return Math.round(score * 10) / 10;
}

function calculateHealthPillars(projects: PastProject[]) {
  const milestoneTotals = projects.reduce(
    (totals, project) => ({
      onTime: totals.onTime + project.milestones.deliveredOnTime,
      total: totals.total + project.milestones.total,
    }),
    { onTime: 0, total: 0 },
  );
  const qualityTotals = projects.reduce(
    (totals, project) => ({
      completed: totals.completed + project.workPackages.completed,
      issues:
        totals.issues +
        project.workPackages.defectiveClaims +
        project.workPackages.reworks,
    }),
    { completed: 0, issues: 0 },
  );
  const equipment = projects.flatMap((project) => project.equipment);
  const auditTotals = projects.reduce(
    (totals, project) => ({
      compliant: totals.compliant + project.hseAudits.compliantChecks,
      total: totals.total + project.hseAudits.totalChecks,
    }),
    { compliant: 0, total: 0 },
  );
  const average = (values: number[]) =>
    values.reduce((total, value) => total + value, 0) / values.length;
  const onTimePercentage =
    (milestoneTotals.onTime / milestoneTotals.total) * 100;
  const defectFreePackages = Math.max(
    0,
    qualityTotals.completed - qualityTotals.issues,
  );
  const defectFreePercentage =
    (defectFreePackages / qualityTotals.completed) * 100;
  const equipmentCondition = average(equipment.map((asset) => asset.condition));
  const equipmentAge = average(equipment.map((asset) => asset.ageYears));
  const preventiveMaintenance = average(
    equipment.map((asset) => asset.preventiveMaintenance),
  );
  const ageRating = 5 - Math.min(4, Math.max(0, (equipmentAge - 1) / 2));
  const assetScore =
    equipmentCondition * 0.5 +
    ageRating * 0.2 +
    scoreFromPercentage(preventiveMaintenance) * 0.3;
  const siteCompliancePercentage =
    (auditTotals.compliant / auditTotals.total) * 100;

  return [
    {
      key: "schedule" as const,
      label: "Schedule Compliance",
      sublabel: "Milestones delivered on time",
      score: roundScore(scoreFromPercentage(onTimePercentage)),
      detail: `${milestoneTotals.onTime} of ${milestoneTotals.total} milestones across ${projects.length} past projects were delivered on or before the agreed date (${onTimePercentage.toFixed(1)}%).`,
      tooltip:
        "Calculated from the percentage of past-project milestones delivered on or before their agreed dates.",
    },
    {
      key: "quality" as const,
      label: "Quality Assurance",
      sublabel: "Defect-free work packages",
      score: roundScore(scoreFromPercentage(defectFreePercentage)),
      detail: `${defectFreePackages} of ${qualityTotals.completed} completed work packages had no defective-work claims or reworks (${defectFreePercentage.toFixed(1)}%).`,
      tooltip:
        "Calculated from the share of completed past-project work packages without defective-work claims or reworks.",
    },
    {
      key: "assets" as const,
      label: "Asset Reliability",
      sublabel: "Equipment condition and maintenance",
      score: roundScore(assetScore),
      detail: `${equipment.length} declared assets average ${equipmentCondition.toFixed(1)}/5 in mechanical condition, ${equipmentAge.toFixed(1)} years in age, and ${preventiveMaintenance.toFixed(1)}% preventive-maintenance completion. Condition, age and maintenance are weighted 50%, 20% and 30%.`,
      tooltip:
        "Calculated from declared equipment: mechanical condition (50%), age (20%) and preventive-maintenance completion (30%).",
    },
    {
      key: "site" as const,
      label: "Site Management & HSE",
      sublabel: "Safety, health and environment",
      score: roundScore(scoreFromPercentage(siteCompliancePercentage)),
      detail: `${auditTotals.compliant} of ${auditTotals.total} safety, health and environmental audit checks across past megaprojects met site standards (${siteCompliancePercentage.toFixed(1)}%).`,
      tooltip:
        "Calculated from past megaproject safety, health and environmental checks completed in compliance with site standards.",
    },
  ];
}

function OperationalHealthScore() {
  const [expandedPillar, setExpandedPillar] =
    useState<HealthPillarKey | null>("schedule");
  const pillars = calculateHealthPillars(pastProjects);
  const overallScore = roundScore(
    pillars.reduce((total, pillar) => total + pillar.score, 0) / pillars.length,
  );

  return (
    <section
      aria-labelledby="operational-health-heading"
      className="rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3
            className="text-sm font-bold text-white"
            id="operational-health-heading"
          >
            Operational Health Score
          </h3>
          <p className="mt-1 text-xs text-white/45">
            Based on {pastProjects.length} completed megaprojects
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            aria-label="API Government Verified"
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1.5 text-[0.68rem] font-semibold text-emerald-300"
            title="Business and compliance credentials verified through government data sources."
          >
            <Icon name="shield" size={14} />
            API Government Verified
          </span>
          <span
            aria-label={`Overall operational health score: ${overallScore} out of 5 stars`}
            className="inline-flex items-center gap-1.5 rounded-full border border-flyin/25 bg-flyin/10 px-2.5 py-1.5 text-xs font-bold text-flyin"
          >
            <span aria-hidden="true">★</span>
            {overallScore} / 5
          </span>
        </div>
      </div>

      <div
        aria-label={`Overall operational health score ${overallScore} out of 5 stars`}
        className="sr-only"
        role="img"
      >
        {`${overallScore} out of 5 stars`}
      </div>

      <div className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
        {pillars.map((pillar) => {
          const isExpanded = expandedPillar === pillar.key;
          const detailId = `health-pillar-${pillar.key}-detail`;

          return (
            <div className="min-w-0" key={pillar.key}>
              <button
                aria-controls={detailId}
                aria-expanded={isExpanded}
                aria-label={`${pillar.label}: ${pillar.score} out of 5 stars. ${pillar.tooltip}`}
                className="w-full rounded-lg text-left outline-none transition hover:bg-white/[0.045] focus-visible:ring-2 focus-visible:ring-flyin"
                onClick={() =>
                  setExpandedPillar(isExpanded ? null : pillar.key)
                }
                title={pillar.tooltip}
                type="button"
              >
                <span className="flex items-center justify-between gap-2 px-2 pt-2">
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-white/85">
                      {pillar.label}
                    </span>
                    <span className="mt-0.5 block truncate text-[0.65rem] text-white/40">
                      {pillar.sublabel}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xs font-bold text-flyin"
                  >
                    ★ {pillar.score} / 5
                  </span>
                </span>
                <span className="mx-2 mb-2 mt-2 block h-1.5 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full bg-flyin transition-[width] duration-300"
                    style={{ width: `${(pillar.score / 5) * 100}%` }}
                  />
                </span>
              </button>
              {isExpanded && (
                <p
                  className="px-2 pb-2 text-[0.68rem] leading-5 text-white/55"
                  id={detailId}
                >
                  {pillar.detail}
                </p>
              )}
            </div>
          );
        })}
        {[
          {
            label: "Workforce & Visa Compliance",
            score: 4.9,
            detail:
              "Real-time VEVO and mandatory high-risk license verification across 100% of active personnel.",
          },
          {
            label: "Industrial Relations & Wage Fidelity",
            score: 5,
            detail:
              "Fair Work award compliance and verified EBA/Superannuation payment alignment.",
          },
        ].map((metric) => (
          <div className="min-w-0 rounded-lg px-2 pt-2" key={metric.label}>
            <span className="flex items-center justify-between gap-2">
              <span className="min-w-0 text-xs font-semibold text-white/85">
                {metric.label}
              </span>
              <span className="shrink-0 text-xs font-bold text-flyin">
                ★ {metric.score.toFixed(1)} / 5
              </span>
            </span>
            <span className="my-2 block h-1.5 overflow-hidden rounded-full bg-white/10">
              <span
                className="block h-full rounded-full bg-flyin"
                style={{ width: `${(metric.score / 5) * 100}%` }}
              />
            </span>
            <span className="block text-[0.68rem] leading-5 text-white/55">
              {metric.detail}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t border-white/10 pt-3 text-[0.65rem] leading-5 text-white/40">
        Click a pillar for its past-project results. Asset age is scored against
        an equipment age benchmark; all scores are rated out of five stars.
      </p>
    </section>
  );
}

function AssetVerificationPassport() {
  return (
    <section
      aria-labelledby="asset-passport-heading"
      className="mt-4 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3
            className="text-sm font-bold text-white"
            id="asset-passport-heading"
          >
            Asset Verification Passport
          </h3>
          <p className="mt-1 text-xs text-white/45">
            Verified machinery inventory and operating documentation
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1.5 text-[0.68rem] font-semibold text-emerald-300">
          <Icon name="shield" size={14} />
          Assets Verified
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <article className="rounded-lg border border-white/10 bg-[#0f1933] p-4">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-xs font-bold leading-5 text-white/85">
              Insurance &amp; Registration API Validation
            </h4>
            <span
              aria-label="Verified"
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"
            >
              <Icon name="check" size={14} />
            </span>
          </div>
          <p className="mt-2 text-[0.68rem] leading-5 text-white/50">
            Real-time heavy vehicle registry and active plant machinery
            insurance checks verify asset age and legal operation status.
          </p>
        </article>
        <article className="rounded-lg border border-white/10 bg-[#0f1933] p-4">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-xs font-bold leading-5 text-white/85">
              Digital Maintenance Log &amp; Compliance
            </h4>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 text-[0.62rem] font-bold text-emerald-300">
              <Icon name="check" size={12} />
              Active
            </span>
          </div>
          <p className="mt-2 text-[0.68rem] leading-5 text-white/50">
            Mandatory Plant Risk Assessments and technical certificates
            required for Australian worksites are attached and active.
          </p>
        </article>
      </div>
    </section>
  );
}

function CheckLine({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-6 text-slate-600">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
        <Icon name="check" size={13} />
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [registrationPanelMode, setRegistrationPanelMode] = useState<
    "project" | "subcontractor"
  >("project");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeState, setActiveState] = useState("All States");
  const [activeClan, setActiveClan] = useState("All Traditional Owners");
  const [crewSearch, setCrewSearch] = useState("");
  const [registrationRole, setRegistrationRole] = useState<
    "Subcontractor" | "Principal"
  >("Subcontractor");
  const [previewMode, setPreviewMode] = useState<
    "Subcontractor" | "Megaproject"
  >("Subcontractor");
  const [submitted, setSubmitted] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [registrationError, setRegistrationError] = useState("");
  const [registrationErrors, setRegistrationErrors] = useState<
    Record<string, string>
  >({});
  const [registrationDetails, setRegistrationDetails] =
    useState<RegistrationDetails>({
      company: "",
      businessId: "",
      specialisation: "",
      email: "",
      password: "",
      fairWorkStatus: "",
      ebaStatus: "",
      postcode: "",
      indigenousTarget: "",
      publicLiabilityConfirmed: false,
      policyNumber: "",
      headOfficeLocation: "",
      operatingHubs: [],
      annualSpend: "",
      tierOneContractor: false,
    });
  const registrationFormRef = useRef<HTMLFormElement>(null);
  const registrationPanelFormRef = useRef<HTMLFormElement>(null);

  const filteredHubs = hubs.filter((hub) => {
    const stateMatches =
      activeState === "All States" || hub.state === activeState;
    const clanMatches =
      activeClan === "All Traditional Owners" ||
      hub.clans.includes(activeClan);
    const searchMatches = [
      hub.name,
      hub.state,
      hub.description,
      ...hub.clans,
    ]
      .join(" ")
      .toLowerCase()
      .includes(crewSearch.trim().toLowerCase());
    return stateMatches && clanMatches && searchMatches;
  });
  const hubGridColumns =
    "md:grid-cols-[minmax(0,1.8fr)_minmax(0,0.6fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.3fr)]";

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateRegistrationStep(event.currentTarget)) return;
    setSubmitted(true);
  }

  function validateRegistrationStep(
    form = registrationFormRef.current,
  ) {
    const stepElement =
      form?.querySelector<HTMLElement>(
        `[data-registration-step="${registrationStep}"]`,
      );
    if (!stepElement) {
      setRegistrationError("The registration step could not be validated.");
      return false;
    }

    const fields = Array.from(
      stepElement.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
        "input, select",
      ),
    );
    const errors: Record<string, string> = {};
    for (const field of fields) {
      const { validity, name, value } = field;
      let message = "";

      if (validity.valueMissing) {
        if (name === "publicLiability") {
          message =
            "Please accept the mandatory $20M AUD Public Liability compliance requirement to proceed.";
        } else if (name === "tierOneContractor") {
          message = "Please confirm your Tier-1 contractor status to proceed.";
        } else {
          message = "This field is required.";
        }
      } else if (name === "businessId" && !/^\d{11}$/.test(value)) {
        message = "ABN / Business ID must contain exactly 11 digits.";
      } else if (validity.typeMismatch) {
        message = "Enter a valid email address.";
      } else if (validity.patternMismatch) {
        message = "Enter a valid 4-digit postcode.";
      } else if (validity.tooShort) {
        message = `Enter at least ${field.getAttribute("minlength")} characters.`;
      } else if (validity.rangeUnderflow || validity.rangeOverflow) {
        message = "Enter a percentage between 0 and 100.";
      }
      if (message) errors[name] = message;
    }

    if (registrationStep === 2) {
      if (
        registrationRole === "Principal" &&
        registrationDetails.operatingHubs.length === 0
      ) {
        errors.operatingHubs = "Select at least one main regional operating hub.";
      }
    }

    if (registrationStep === 3) {
      if (
        registrationRole === "Subcontractor" &&
        !registrationDetails.publicLiabilityConfirmed
      ) {
        errors.publicLiability =
          "Please accept the mandatory $20M AUD Public Liability compliance requirement to proceed.";
      }
      if (
        registrationRole === "Principal" &&
        !registrationDetails.tierOneContractor
      ) {
        errors.tierOneContractor =
          "Please confirm your Tier-1 contractor status to proceed.";
      }
    }

    setRegistrationErrors((current) => {
      const next = { ...current };
      for (const field of fields) delete next[field.name];
      delete next.operatingHubs;
      Object.assign(next, errors);
      return next;
    });
    setRegistrationError("");
    return Object.keys(errors).length === 0;
  }

  function updateRegistrationField<K extends keyof RegistrationDetails>(
    field: K,
    value: RegistrationDetails[K],
  ) {
    setRegistrationDetails((current) => ({ ...current, [field]: value }));
    setRegistrationErrors((current) => {
      if (!(field in current)) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function registrationFieldProps(name: string) {
    const hasError = Boolean(registrationErrors[name]);
    return {
      "aria-describedby": hasError ? `registration-error-${name}` : undefined,
      "aria-invalid": hasError,
    };
  }

  function renderRegistrationFieldError(name: string) {
    const message = registrationErrors[name];
    return message ? (
      <p
        className="mt-1.5 text-xs text-red-500"
        id={`registration-error-${name}`}
        role="alert"
      >
        {message}
      </p>
    ) : null;
  }

  function continueRegistration(form?: HTMLFormElement | null) {
    if (!validateRegistrationStep(form ?? undefined)) return;
    setRegistrationStep((step) => Math.min(step + 1, 3));
  }

  function openSubcontractorRegistration() {
    setRegistrationRole("Subcontractor");
    setRegistrationStep(1);
    setRegistrationErrors({});
    setRegistrationError("");
    setRegistrationPanelMode("subcontractor");
    setIsOpen(true);
  }

  function openProjectRegistration() {
    setRegistrationPanelMode("project");
    setIsOpen(true);
  }

  function handleProjectRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function goToPreview(mode: "Subcontractor" | "Megaproject") {
    setPreviewMode(mode);
    document.getElementById("preview")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <div className="bg-[#070b16] text-white">
        <div
          aria-label="Platform views"
          className="page-shell flex h-11 items-center gap-1 overflow-x-auto py-1.5"
          role="tablist"
        >
          <button
            aria-selected="true"
            className="flex h-full min-w-36 flex-1 items-center justify-center gap-2 rounded-lg bg-flyin px-4 text-xs font-bold text-ink sm:max-w-56"
            role="tab"
          >
            <Icon name="building" size={14} />
            Landing
          </button>
          <a
            className="flex h-full min-w-28 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white sm:max-w-56"
            href="/dashboard"
          >
            <Icon name="briefcase" size={14} />
            Crews
          </a>
          <a
            className="flex h-full min-w-28 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white sm:max-w-56"
            href="/principal"
          >
            <Icon name="building" size={14} />
            Principals
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="page-shell flex h-16 items-center justify-between">
          <a
            aria-label="FlyIn home"
            className="flex shrink-0 items-center gap-2.5"
            href="#top"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-flyin shadow-sm">
              <Icon name="plane" size={21} />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-ink">
              Fly<span className="text-flyin">In</span>
            </span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            <a className="text-sm font-medium text-slate-600 hover:text-ink" href="#how-it-works">
              How it works
            </a>
            <a className="text-sm font-medium text-slate-600 hover:text-ink" href="#availability">
              Live availability
            </a>
            <a className="text-sm font-medium text-slate-600 hover:text-ink" href="#pricing">
              Pricing
            </a>
            <a className="text-sm font-medium text-slate-600 hover:text-ink" href="#register">
              Register
            </a>
            <a className="text-sm font-medium text-slate-600 hover:text-ink" href="#partners">
              Chamber partners
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              className="button-dark hidden min-h-10 rounded-xl px-4 text-sm sm:inline-flex"
              href="#register"
            >
              Get started
            </a>
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-ink transition hover:bg-slate-50 lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full border-t border-slate-100 bg-white px-4 pb-5 pt-2 shadow-lg lg:hidden"
          >
            {[
              ["How it works", "#how-it-works"],
              ["Live availability", "#availability"],
              ["Pricing", "#pricing"],
              ["Register", "#register"],
              ["Chamber partners", "#partners"],
            ].map(([label, href]) => (
              <a
                className="block border-b border-slate-100 py-3.5 text-sm font-semibold text-slate-700 last:border-0"
                href={href}
                key={href}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section
        className="relative isolate overflow-hidden bg-ink text-white"
        id="top"
      >
        <img
          alt="Aerial view of an iron ore open-pit mine in the Pilbara, Western Australia"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
          fetchPriority="high"
          src="/images/pilbara-mine.png"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/80 to-ink"
        />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="max-w-[760px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-flyin/40 bg-ink/45 px-3.5 py-1.5 text-[0.69rem] font-bold uppercase tracking-[0.1em] text-flyin backdrop-blur-sm sm:text-xs">
              <Icon name="shield" size={15} />
              Workforce compliance for Australian heavy industry
            </div>
            <h1 className="text-balance max-w-[740px] text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl lg:leading-tight">
              Verified field crews, compliant contracts, deployed{" "}
              <span className="text-flyin">fly-in ready.</span>
            </h1>
            <p className="mt-6 max-w-[680px] text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              FlyIn connects vetted field personnel with principals across
              Australia&apos;s tier-1 resources, clean energy and infrastructure
              megaprojects. Every licence, ticket and WorkSafe certification is
              verified before a single boot hits the ground.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="button-primary w-full sm:w-auto" href="#register">
                Register your crew <Icon name="arrow" size={17} />
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                href="#availability"
              >
                View live availability
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-6 text-xs font-medium text-white/80 sm:text-sm">
              {[
                "WorkSafe licences verified",
                "6.5% flat marketplace fee",
                "Cross-state coverage",
              ].map((benefit) => (
                <span className="inline-flex items-center gap-2" key={benefit}>
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                    <Icon name="check" size={11} />
                  </span>
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-16 bg-white py-20 md:py-28" id="how-it-works">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">How FlyIn works</span>
            <h2 className="section-heading mt-4">
              One compliant marketplace, three connected roles
            </h2>
            <p className="section-copy">
              FlyIn sits between subcontractors and principals as the compliance
              backbone for Australia&apos;s heavy-industry workforce.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: "users" as const,
                title: "For Subcontractors",
                copy: "List your crew once. We verify tickets, licences and WorkSafe certifications, then match you to principals actively mobilising in your operating region.",
                points: ["Verified profile", "Regional matching", "Fast payment"],
              },
              {
                icon: "building" as const,
                title: "For Principals",
                copy: "Source pre-vetted crews on demand. Every subcontractor arrives with current compliance documentation and a digital audit trail attached.",
                points: [
                  "On-demand capacity",
                  "Audit-ready compliance",
                  "Single contract",
                ],
              },
              {
                icon: "globe" as const,
                title: "For Local Communities",
                copy: "Keep project opportunities close to home. FlyIn gives regional businesses visibility, access and proof of local economic impact.",
                points: [
                  "Local-first procurement",
                  "Verified local businesses",
                  "Transparent reporting",
                ],
              },
            ].map((role) => (
              <article className="card flex flex-col p-6 sm:p-7" key={role.title}>
                <span className="icon-box">
                  <Icon name={role.icon} size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">
                  {role.title}
                </h3>
                <p className="mt-3 min-h-[108px] text-sm leading-6 text-slate-600">
                  {role.copy}
                </p>
                <ul className="mt-3 space-y-2 border-t border-slate-100 pt-4">
                  {role.points.map((point) => (
                    <CheckLine key={point}>{point}</CheckLine>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-4xl rounded-xl bg-amber-50 px-5 py-4 text-center text-xs leading-5 text-amber-950/80 sm:text-sm">
            Includes mandatory validation of $20M Public Liability,
            Professional Indemnity, and state-specific Workers&apos; Compensation
            insurances.
          </p>
        </div>
      </section>

      <section className="scroll-mt-16 bg-muted py-20 md:py-28" id="availability">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Live regional availability</span>
            <h2 className="section-heading mt-4">
              Crews mobilising across tier-1 hubs
            </h2>
            <p className="section-copy">
              Real-time field personnel capacity across Australia&apos;s
              resources, clean energy and infrastructure megaprojects. Figures
              update as crews clear compliance and confirm mobilisation.
            </p>
          </div>

          <label className="relative mx-auto mt-10 block max-w-2xl">
            <span className="sr-only">Search crews by skill, equipment, or region</span>
            <Icon
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              name="search"
              size={19}
            />
            <input
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-400 focus:border-flyin focus:ring-2 focus:ring-flyin/20"
              onChange={(event) => setCrewSearch(event.target.value)}
              placeholder="Search crews by skill, equipment, or region..."
              type="search"
              value={crewSearch}
            />
          </label>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "All States", number: "42", active: true },
              { label: "WA", detail: "Western Australia", number: "18" },
              { label: "QLD", detail: "Queensland", number: "12" },
              { label: "NSW", detail: "New South Wales", number: "8" },
              { label: "SA", detail: "South Australia", number: "4" },
            ].map((state) => (
              <button
                aria-pressed={activeState === state.label}
                className={`flex min-h-[78px] items-center justify-between rounded-xl border px-4 text-left transition ${
                  activeState === state.label
                    ? "border-ink bg-ink text-white shadow-md"
                    : "border-slate-200 bg-white text-ink hover:border-flyin"
                }`}
                key={state.label}
                onClick={() => setActiveState(state.label)}
                type="button"
              >
                <span>
                  <span className="block font-bold">{state.label}</span>
                  {state.detail && (
                    <span
                      className={`mt-0.5 block text-xs ${
                        activeState === state.label
                          ? "text-white/60"
                          : "text-slate-500"
                      }`}
                    >
                      {state.detail}
                    </span>
                  )}
                </span>
                <span className="text-2xl font-extrabold">{state.number}</span>
              </button>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[0.68rem] font-extrabold tracking-[0.12em] text-slate-500">
                  NATIVE TITLE / LOCAL CLANS
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "All Traditional Owners",
                    "Yindjibarndi",
                    "Noongar",
                    "Wongi",
                    "Bidjara",
                  ].map((clan) => (
                    <button
                      aria-pressed={activeClan === clan}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        activeClan === clan
                          ? "border-amber-300 bg-amber-50 text-amber-950"
                          : "border-slate-200 text-slate-600 hover:border-amber-300"
                      }`}
                      key={clan}
                      onClick={() => setActiveClan(clan)}
                      type="button"
                    >
                      {clan}
                    </button>
                  ))}
                </div>
              </div>
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 lg:self-center">
                <Icon name="shield" size={15} />
                Supply Nation Certified / Indigenous-Owned
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
            <span>
              Showing {filteredHubs.length} hubs ·{" "}
              {filteredHubs.reduce((total, hub) => total + hub.crews, 0)} crews
              nationally
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Available crews by region hub
            </span>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className={`hidden ${hubGridColumns} gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-[0.68rem] font-extrabold tracking-[0.08em] text-slate-500 md:grid`}>
              <span>REGION HUB</span>
              <span>STATE</span>
              <span>AVAILABLE CREWS</span>
              <span>STATUS</span>
              <span>CONTACT</span>
            </div>
            {filteredHubs.map((hub) => (
              <article
                className={`grid gap-3 border-b border-slate-100 px-5 py-5 last:border-0 sm:px-6 ${hubGridColumns} md:items-center md:gap-4`}
                key={hub.name}
              >
                <div>
                  <h3 className="font-bold text-ink">{hub.name}</h3>
                  <p className="mt-1 max-w-lg text-xs leading-5 text-slate-500">
                    {hub.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded bg-slate-100 px-2 py-1 text-[0.63rem] font-semibold text-slate-600">
                      ABN / ACN Verified
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-1 text-[0.63rem] font-semibold text-slate-600">
                      $20M Public Liability
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-600">
                  <span className="mr-2 text-xs font-bold text-slate-400 md:hidden">
                    STATE
                  </span>
                  {hub.state}
                </span>
                <span className="text-sm font-semibold text-ink">
                  <span className="mr-2 text-xs font-bold text-slate-400 md:hidden">
                    AVAILABLE CREWS
                  </span>
                  <strong className="text-lg">{hub.crews}</strong>{" "}
                  <span className="text-slate-500">crews</span>
                </span>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Available now
                </span>
                <a
                  aria-label={`Contact ${hub.name} directly`}
                  className="button-primary inline-flex w-fit items-center justify-center gap-2 whitespace-nowrap px-4 py-2.5 text-xs"
                  href="#register"
                >
                  Contact Direct <Icon name="arrow" size={14} />
                </a>
              </article>
            ))}
            {filteredHubs.length === 0 && (
              <p className="px-6 py-10 text-center text-sm text-slate-500">
                No hubs match your search and selected filters. Try another
                search, state, or Traditional Owner group.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Australian local impact</span>
            <h2 className="section-heading mt-4">
              Built for local content and regional retention
            </h2>
            <p className="section-copy">
              FlyIn measures and reports the metrics that matter to Chambers of
              Commerce, government partners, and tier-1 principals — keeping
              spend and employment inside the communities that host these
              projects.
            </p>
          </div>
          <div className="mt-11 grid gap-4 sm:grid-cols-3">
            {[
              {
                metric: "94.2%",
                title: "State workforce retention rate",
                copy: "Local crews retained within their home state each quarter.",
              },
              {
                metric: "+38%",
                title: "Local spend optimisation",
                copy: "Uplift in regional procurement routed to local business associates.",
              },
              {
                metric: "1,240+",
                title: "Registered local associates",
                copy: "Verified subcontractors across tier-1 megaproject regions.",
              },
            ].map((stat) => (
              <article className="card p-6 sm:p-7" key={stat.title}>
                <p className="text-4xl font-extrabold tracking-tight text-ink">
                  {stat.metric}
                </p>
                <h3 className="mt-3 font-bold text-slate-800">{stat.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {stat.copy}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <p className="text-center text-xs font-extrabold tracking-[0.14em] text-slate-500">
              DESIGNED TO INTEGRATE WITH INDUSTRY ECOSYSTEMS
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {integrationItems.map((item) => (
                <article
                  className="rounded-xl border border-slate-200 bg-white p-5"
                  key={item.title}
                >
                  <div className="flex items-center justify-between">
                    <span className="icon-box h-10 w-10 rounded-xl">
                      <Icon name="shield" size={19} />
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Live check
                    </span>
                  </div>
                  <h3 className="mt-5 font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-[0.63rem] font-bold tracking-[0.08em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#1c2541] bg-[#0b132b] py-14 text-white">
        <div className="page-shell flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-flyin/25 bg-white/5 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.08em] text-flyin">
              <Icon name="shield" size={15} />
              FAIR WORK FRAMEWORK ENFORCED
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Tier-1 Modern Awards Integration
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Automated compliance cross-referenced directly with the Fair
              Work Ombudsman (FWO) industrial scales. Prevents wage dumping and
              guarantees absolute operational integrity for major project
              lifecycles.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[390px] lg:max-w-[470px]">
            {[
              ["FWO DIRECTIVE // MA000011", "Mining Industry Award 2020"],
              [
                "FWO DIRECTIVE // MA000020",
                "Building and Construction General On-site Award 2020",
              ],
            ].map(([directive, award]) => (
              <div
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                key={directive}
              >
                <p className="text-[0.62rem] font-bold tracking-[0.12em] text-white/45">
                  {directive}
                </p>
                <p className="mt-2 text-sm font-semibold text-white/90">
                  {award}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-16 bg-ink py-20 text-white md:py-28"
        id="government-access"
      >
        <div className="page-shell grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="eyebrow !text-flyin">
              For chambers, councils &amp; government
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Government &amp; Association Access
            </h2>
            <p className="mt-4 text-lg font-semibold leading-7 text-white/85">
              How FlyIn drives regional development, local procurement, and
              industrial integrity.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/60">
              This structural layer provides regional commerce networks,
              industry bodies, and local governments with an independent
              infrastructure to audit baseline workforce metrics and protect
              Indigenous procurement quotas without operational friction.
            </p>
            <a
              className="button-primary mt-8"
              href="#partners"
            >
              Request Regional Observer Access <Icon name="arrow" size={17} />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "file" as const,
                title: "Local Content Reporting",
                copy: "Automated compliance dashboards enabling regional chambers to track, audit, and report capital spend retention within the host community.",
                feature: "Quarterly spend-retention exports",
                second: "Audit trail per engagement",
              },
              {
                icon: "pin" as const,
                title: "Verified Local Onboarding",
                copy: "Algorithmic prioritisation that highlights and promotes subcontractors operating directly within project-adjacent regional postcodes.",
                feature: "Postcode-weighted crew ranking",
                second: "Regional business verification",
              },
              {
                icon: "globe" as const,
                title: "Indigenous Procurement",
                copy: "Clear visibility of certified Indigenous-owned subcontractors across active project hubs and supply chains.",
                feature: "Supply Nation credentials",
                second: "Local participation reporting",
              },
              {
                icon: "search" as const,
                title: "Independent Oversight",
                copy: "Give trusted regional partners a read-only view of project compliance and workforce outcomes.",
                feature: "Role-based observer access",
                second: "Transparent compliance data",
              },
            ].map((item) => (
              <article
                className="rounded-2xl border border-white/10 bg-white/[0.045] px-6 py-6 sm:px-8"
                key={item.title}
              >
                <span className="icon-box border-flyin/20 bg-flyin/10 text-flyin">
                  <Icon name={item.icon} size={20} />
                </span>
                <h3 className="mt-4 font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-white/60">
                  {item.copy}
                </p>
                <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs text-white/75">
                  <li className="flex items-center gap-2">
                    <Icon name="check" size={13} className="text-flyin" />
                    {item.feature}
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" size={13} className="text-flyin" />
                    {item.second}
                  </li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-16 bg-white py-16 md:py-20" id="partners">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Chamber partnerships</span>
            <h2 className="section-heading mt-4">Chamber of Commerce Partners</h2>
            <p className="section-copy">
              Regional chambers and industry associations use FlyIn to
              strengthen local buying power, drive regional employment, and
              fast-track compliance for their registered business members.
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {[
              ["WA", "Western Australian Chambers"],
              ["QLD", "Queensland Regional Chambers"],
              ["AU", "Industry & Community Partners"],
            ].map(([monogram, name]) => (
              <div
                className="flex min-h-[100px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-5"
                key={name}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-50 text-sm font-extrabold text-ink">
                  {monogram}
                </span>
                <span className="text-sm font-bold text-slate-700">{name}</span>
              </div>
            ))}
          </div>
          <div className="mt-7 text-center">
            <a className="button-outline" href="#government-access">
              Explore partner access <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-16 bg-[#080f21] py-20 text-white md:py-28"
        id="pricing"
      >
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow !text-flyin">
              SIMPLE, TRANSPARENT PRICING
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              One flat marketplace fee. No surprises.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              No subscriptions, no listing fees, no lock-in contracts. You only
              pay when work is completed through the platform.
            </p>
          </div>

          <article className="mx-auto mt-11 max-w-3xl rounded-2xl border border-white/10 bg-[#101a33] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-9 md:p-10">
            <div className="text-center">
              <p className="text-xs font-extrabold tracking-[0.14em] text-flyin">
                MARKETPLACE FEE
              </p>
              <p className="mt-4 text-7xl font-extrabold tracking-[-0.07em] text-white sm:text-8xl">
                6.5%
              </p>
              <p className="mt-3 text-sm text-white/60">
                charged to the subcontractor on completed work
              </p>
            </div>

            <div className="mt-8 flex gap-3 rounded-xl border border-flyin/20 bg-[#0b1429] p-4 sm:p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-flyin/10 text-flyin">
                <Icon name="lock" size={19} />
              </span>
              <p className="text-xs leading-6 text-white/70 sm:text-sm">
                <strong className="font-bold text-flyin">
                  SoPA &amp; Margin Lock:
                </strong>{" "}
                Marketplace fees are auto-calculated into gross commercial
                quotes. Subcontractors never experience margin erosion,
                ensuring 100% adherence to regional Security of Payment Acts
                (SoPA).
              </p>
            </div>

            <ul className="mt-8 space-y-4 border-t border-white/10 pt-7">
              {[
                "Full licence & WorkSafe certification verification",
                "Fair Work modern award cross-referencing",
                "State-based project matching",
                "Digital compliance audit trail",
                "Continuous certification expiry monitoring",
                "Secure, milestone-based payments",
                "Dedicated compliance support",
              ].map((feature) => (
                <li
                  className="flex items-start gap-3 text-sm leading-6 text-white/80"
                  key={feature}
                >
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <Icon name="check" size={13} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <a className="button-primary mt-8 w-full" href="#register">
              Register your crew <Icon name="arrow" size={16} />
            </a>
            <p className="mt-3 text-center text-xs text-white/40">
              No subscriptions, listing fees, or lock-in contracts.
            </p>
          </article>
        </div>
      </section>

      <section
        className="scroll-mt-16 border-t border-slate-900 bg-slate-950 px-4 py-20 text-white md:px-8"
        id="register"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="pt-2">
            <span className="eyebrow !text-flyin">B2B corporate ecosystem</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Get matched to mobilising projects in your region
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/65">
              Register your subcontracting business or principal entity in
              under two minutes. Our platform connects vetted structures to
              tier-1 resources, clean energy and infrastructure megaprojects.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                "Verification typically completed within 48 hours.",
                "State-based matching to tier-1 project hubs.",
                "No upfront fees — a flat 6.5% only on completed work.",
              ].map((point) => (
                <li
                  className="flex items-start gap-3 text-sm leading-6 text-white/80"
                  key={point}
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-300">
                    <Icon name="check" size={13} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-5 text-ink shadow-2xl sm:p-7">
            <div
              aria-label="Registration type"
              className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1"
              role="tablist"
            >
              {(["Subcontractor", "Principal"] as const).map((role) => (
                <button
                  aria-selected={registrationRole === role}
                  className={`min-h-11 rounded-lg px-2 text-xs font-bold transition sm:text-sm ${
                    registrationRole === role
                      ? "bg-white text-ink shadow-sm"
                      : "text-slate-500 hover:text-ink"
                  }`}
                  key={role}
                  onClick={() => {
                    setRegistrationRole(role);
                    setSubmitted(false);
                    setRegistrationStep(1);
                    setRegistrationError("");
                    setRegistrationErrors({});
                  }}
                  role="tab"
                  type="button"
                >
                  Register as {role}
                </button>
              ))}
            </div>

            {submitted ? (
              <div className="py-12 text-center" role="status">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                  <Icon name="check" size={27} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink">
                  You&apos;re on your way
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Your {registrationRole.toLowerCase()} registration details
                  have been captured. Our team will be in touch.
                </p>
                <button
                  className="button-outline mt-6"
                  onClick={() => {
                    setSubmitted(false);
                    setRegistrationStep(1);
                  }}
                  type="button"
                >
                  Submit another registration
                </button>
              </div>
            ) : (
              <form
                className="mt-6"
                noValidate
                onSubmit={handleRegistration}
                ref={registrationFormRef}
              >
                <div className="mb-5">
                  <div
                    aria-label={`Registration step ${registrationStep} of 3`}
                    className="flex items-center gap-2"
                  >
                      {[
                        "Account",
                        registrationRole === "Subcontractor" ? "Framework" : "Settings",
                        registrationRole === "Subcontractor" ? "Insurance" : "Scope",
                      ].map((label, index) => {
                      const step = index + 1;
                      return (
                        <div className="flex flex-1 items-center gap-2" key={label}>
                          <span
                            aria-current={registrationStep === step ? "step" : undefined}
                            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                              registrationStep >= step
                                ? "bg-flyin text-ink"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {step}
                          </span>
                          <span
                            className={`hidden text-xs font-semibold sm:inline ${
                              registrationStep === step
                                ? "text-ink"
                                : "text-slate-400"
                            }`}
                          >
                            {label}
                          </span>
                          {step < 3 && (
                            <span
                              aria-hidden="true"
                              className={`h-px flex-1 ${
                                registrationStep > step
                                  ? "bg-flyin"
                                  : "bg-slate-200"
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="space-y-4 transition-opacity duration-200"
                  data-registration-step="1"
                  hidden={registrationStep !== 1}
                >
                  <div>
                    <h3 className="text-sm font-bold text-ink">Basic information</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Set up your business account and select your primary specialisation.
                    </p>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-slate-700">
                      COMPANY NAME <span className="text-rose-600">*</span>
                    </span>
                    <input
                      autoComplete="organization"
                      className="registration-input"
                      name="company"
                      {...registrationFieldProps("company")}
                      onChange={(event) =>
                        updateRegistrationField("company", event.currentTarget.value)
                      }
                      placeholder="Your registered business name"
                      required
                      value={registrationDetails.company}
                    />
                  </label>
                  {renderRegistrationFieldError("company")}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-slate-700">
                      PRIMARY SPECIALISATION{" "}
                      <span className="text-rose-600">*</span>
                    </span>
                    <select
                      className="registration-input"
                      name="specialisation"
                      {...registrationFieldProps("specialisation")}
                      onChange={(event) =>
                        updateRegistrationField(
                          "specialisation",
                          event.currentTarget.value,
                        )
                      }
                      required
                      value={registrationDetails.specialisation}
                    >
                      <option disabled value="">
                        Select specialisation
                      </option>
                      <option>Civil</option>
                      <option>Mechanical</option>
                      <option>Electrical</option>
                      <option>Renewables</option>
                      <option>Mining</option>
                    </select>
                  </label>
                  {renderRegistrationFieldError("specialisation")}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-slate-700">
                      CORPORATE EMAIL <span className="text-rose-600">*</span>
                    </span>
                    <input
                      autoComplete="email"
                      className="registration-input"
                      name="email"
                      {...registrationFieldProps("email")}
                      onChange={(event) =>
                        updateRegistrationField("email", event.currentTarget.value)
                      }
                      placeholder="you@company.com.au"
                      required
                      type="email"
                      value={registrationDetails.email}
                    />
                  </label>
                  {renderRegistrationFieldError("email")}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-slate-700">
                      PASSWORD <span className="text-rose-600">*</span>
                    </span>
                    <input
                      autoComplete="new-password"
                      className="registration-input"
                      minLength={8}
                      name="password"
                      {...registrationFieldProps("password")}
                      onChange={(event) =>
                        updateRegistrationField("password", event.currentTarget.value)
                      }
                      placeholder="At least 8 characters"
                      required
                      type="password"
                      value={registrationDetails.password}
                    />
                  </label>
                  {renderRegistrationFieldError("password")}
                </div>

                <div
                  className="space-y-4 transition-opacity duration-200"
                  data-registration-step="2"
                  hidden={registrationStep !== 2}
                >
                  <div>
                    <h3 className="text-sm font-bold text-ink">
                      {registrationRole === "Subcontractor"
                        ? "Legal & industrial framework"
                        : "Principal settings"}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {registrationRole === "Subcontractor"
                        ? "Provide your ABN and workplace framework."
                        : "Set your head office, regional hubs, and procurement target."}
                    </p>
                  </div>
                  {registrationRole === "Subcontractor" ? (
                    <>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-slate-700">
                          ABN / BUSINESS ID <span className="text-rose-600">*</span>
                        </span>
                        <input
                          className="registration-input"
                          inputMode="numeric"
                          maxLength={11}
                          name="businessId"
                          {...registrationFieldProps("businessId")}
                          onChange={(event) => {
                            updateRegistrationField(
                              "businessId",
                              event.currentTarget.value.replace(/\D/g, "").slice(0, 11),
                            );
                          }}
                          pattern="[0-9]{11}"
                          placeholder="11 digit ABN"
                          required
                          value={registrationDetails.businessId}
                        />
                      </label>
                      {renderRegistrationFieldError("businessId")}
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-slate-700">
                          FAIR WORK COMPLIANCE STATUS{" "}
                          <span className="text-rose-600">*</span>
                        </span>
                        <select
                          className="registration-input"
                          name="fairWorkStatus"
                          {...registrationFieldProps("fairWorkStatus")}
                          onChange={(event) =>
                            updateRegistrationField(
                              "fairWorkStatus",
                              event.currentTarget.value,
                            )
                          }
                          required
                          value={registrationDetails.fairWorkStatus}
                        >
                          <option disabled value="">
                            Select status
                          </option>
                          <option value="compliant">Compliant</option>
                          <option value="under-review">Under Review</option>
                        </select>
                      </label>
                      {renderRegistrationFieldError("fairWorkStatus")}
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-slate-700">
                          ENTERPRISE BARGAINING AGREEMENT (EBA) STATUS{" "}
                          <span className="text-rose-600">*</span>
                        </span>
                        <select
                          className="registration-input"
                          name="ebaStatus"
                          {...registrationFieldProps("ebaStatus")}
                          onChange={(event) =>
                            updateRegistrationField(
                              "ebaStatus",
                              event.currentTarget.value,
                            )
                          }
                          required
                          value={registrationDetails.ebaStatus}
                        >
                          <option disabled value="">
                            Select status
                          </option>
                          <option value="active">Active EBA</option>
                          <option value="award-reliant">
                            No EBA / Award Reliant
                          </option>
                        </select>
                      </label>
                      {renderRegistrationFieldError("ebaStatus")}
                    </>
                  ) : (
                    <>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-slate-700">
                          CORPORATE HEAD OFFICE LOCATION{" "}
                          <span className="text-rose-600">*</span>
                        </span>
                        <input
                          autoComplete="address-level2"
                          className="registration-input"
                          name="headOfficeLocation"
                          {...registrationFieldProps("headOfficeLocation")}
                          onChange={(event) =>
                            updateRegistrationField(
                              "headOfficeLocation",
                              event.currentTarget.value,
                            )
                          }
                          placeholder="City, State or Territory"
                          required
                          value={registrationDetails.headOfficeLocation}
                        />
                      </label>
                      {renderRegistrationFieldError("headOfficeLocation")}
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-slate-700">
                          DEFAULT INDIGENOUS PROCUREMENT TARGET{" "}
                          <span className="text-rose-600">*</span>
                        </span>
                        <div className="relative">
                          <input
                            className="registration-input pr-12"
                            max={100}
                            min={0}
                            name="indigenousTarget"
                            {...registrationFieldProps("indigenousTarget")}
                            onChange={(event) =>
                              updateRegistrationField(
                                "indigenousTarget",
                                event.currentTarget.value,
                              )
                            }
                            placeholder="5"
                            required
                            type="number"
                            value={registrationDetails.indigenousTarget}
                          />
                          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-500">
                            %
                          </span>
                        </div>
                      </label>
                      {renderRegistrationFieldError("indigenousTarget")}
                      <fieldset>
                        <legend className="mb-2 text-xs font-bold text-slate-700">
                          MAIN REGIONAL OPERATING HUBS{" "}
                          <span className="text-rose-600">*</span>
                        </legend>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {[
                            "Pilbara",
                            "Bowen Basin",
                            "Goldfields",
                            "Hunter Valley",
                            "Whyalla & Eyre",
                          ].map((hub) => (
                            <label
                              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${
                                registrationDetails.operatingHubs.includes(hub)
                                  ? "border-flyin bg-orange-50 text-ink"
                                  : "border-slate-200 text-slate-600 hover:border-slate-300"
                              }`}
                              key={hub}
                            >
                              <input
                                checked={registrationDetails.operatingHubs.includes(
                                  hub,
                                )}
                                className="h-3.5 w-3.5 accent-[#fca311]"
                                aria-describedby={
                                  registrationErrors.operatingHubs
                                    ? "registration-error-operatingHubs"
                                    : undefined
                                }
                                aria-invalid={Boolean(
                                  registrationErrors.operatingHubs,
                                )}
                                onChange={(event) =>
                                  updateRegistrationField(
                                    "operatingHubs",
                                    event.currentTarget.checked
                                      ? [...registrationDetails.operatingHubs, hub]
                                      : registrationDetails.operatingHubs.filter(
                                          (selectedHub) => selectedHub !== hub,
                                        ),
                                  )
                                }
                                type="checkbox"
                              />
                              {hub}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      {renderRegistrationFieldError("operatingHubs")}
                    </>
                  )}
                </div>

                <div
                  className="space-y-4 transition-opacity duration-200"
                  data-registration-step="3"
                  hidden={registrationStep !== 3}
                >
                  {registrationRole === "Subcontractor" ? (
                    <>
                      <div>
                        <h3 className="text-sm font-bold text-ink">
                          Insurance &amp; liability verification
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Confirm mandatory public liability coverage.
                        </p>
                      </div>
                      <>
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <input
                            checked={registrationDetails.publicLiabilityConfirmed}
                            className="mt-0.5 h-4 w-4 accent-[#fca311]"
                            name="publicLiability"
                            {...registrationFieldProps("publicLiability")}
                            onChange={(event) =>
                              updateRegistrationField(
                                "publicLiabilityConfirmed",
                                event.currentTarget.checked,
                              )
                            }
                            required
                            type="checkbox"
                          />
                          <span className="text-xs leading-5 text-slate-700">
                            I confirm our business holds a minimum of $20M AUD
                            Public Liability Coverage as required by Tier-1 projects.
                          </span>
                        </label>
                        {renderRegistrationFieldError("publicLiability")}
                      </>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-slate-700">
                          CERTIFICATE OF CURRENCY / POLICY NUMBER{" "}
                          <span className="text-rose-600">*</span>
                        </span>
                        <input
                          className="registration-input"
                          name="policyNumber"
                          {...registrationFieldProps("policyNumber")}
                          onChange={(event) =>
                            updateRegistrationField(
                              "policyNumber",
                              event.currentTarget.value,
                            )
                          }
                          placeholder="Enter policy number"
                          required
                          value={registrationDetails.policyNumber}
                        />
                      </label>
                      {renderRegistrationFieldError("policyNumber")}
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-sm font-bold text-ink">
                          Project scope
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Provide an indicative scale for your procurement activity.
                        </p>
                      </div>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-slate-700">
                          ESTIMATED ANNUAL PROCUREMENT / PROJECT SPEND{" "}
                          <span className="text-rose-600">*</span>
                        </span>
                        <select
                          className="registration-input"
                          name="annualSpend"
                          {...registrationFieldProps("annualSpend")}
                          onChange={(event) =>
                            updateRegistrationField(
                              "annualSpend",
                              event.currentTarget.value,
                            )
                          }
                          required
                          value={registrationDetails.annualSpend}
                        >
                          <option disabled value="">
                            Select annual spend range
                          </option>
                          <option value="under-10m">Under $10M</option>
                          <option value="10m-50m">$10M–$50M</option>
                          <option value="50m-plus">$50M+</option>
                        </select>
                      </label>
                      {renderRegistrationFieldError("annualSpend")}
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <input
                          checked={registrationDetails.tierOneContractor}
                          className="mt-0.5 h-4 w-4 accent-[#fca311]"
                          name="tierOneContractor"
                          {...registrationFieldProps("tierOneContractor")}
                          onChange={(event) =>
                            updateRegistrationField(
                              "tierOneContractor",
                              event.currentTarget.checked,
                            )
                          }
                          required
                          type="checkbox"
                        />
                        <span className="text-xs leading-5 text-slate-700">
                          I confirm that this business is a Tier-1 contractor.
                        </span>
                      </label>
                      {renderRegistrationFieldError("tierOneContractor")}
                    </>
                  )}
                </div>

                {registrationError && (
                  <p className="mt-4 text-xs font-medium text-rose-600" role="alert">
                    {registrationError}
                  </p>
                )}

                <div className="mt-5 flex gap-3">
                  {registrationStep > 1 && (
                    <button
                      className="button-outline flex-1"
                      onClick={() => {
                        setRegistrationStep((step) => Math.max(step - 1, 1));
                        setRegistrationError("");
                      }}
                      type="button"
                    >
                      Back
                    </button>
                  )}
                  {registrationStep < 3 ? (
                    <button
                      className="button-primary flex-1"
                      onClick={() => continueRegistration()}
                      type="button"
                    >
                      Continue to {registrationStep === 1
                        ? registrationRole === "Subcontractor"
                          ? "framework"
                          : "settings"
                        : registrationRole === "Subcontractor"
                          ? "insurance"
                          : "project scope"}
                      <Icon name="arrow" size={16} />
                    </button>
                  ) : (
                    <button className="button-primary flex-1" type="submit">
                      Complete {registrationRole} Registration
                      <Icon name="arrow" size={16} />
                    </button>
                  )}
                </div>
                <p className="mt-3 text-center text-[0.68rem] leading-5 text-slate-400">
                  By registering you agree to FlyIn&apos;s Terms &amp; Conditions.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section
        className="border-t border-[#1c2541] bg-[#0b132b] py-16 text-white"
        id="preview"
      >
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow !text-flyin">Platform preview</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Interactive Dashboard Preview
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                Sample operational telemetry. See what crews and tier-1
                partners monitor once authenticated.
              </p>
            </div>
            <div
              aria-label="Dashboard preview type"
              className="flex w-fit rounded-xl border border-white/10 bg-white/5 p-1"
              role="tablist"
            >
              {(["Subcontractor", "Megaproject"] as const).map((mode) => (
                <button
                  aria-selected={previewMode === mode}
                  className={`rounded-lg px-3 py-2 text-xs font-bold transition sm:px-4 ${
                    previewMode === mode
                      ? "bg-flyin text-ink"
                      : "text-white/65 hover:text-white"
                  }`}
                  key={mode}
                  onClick={() => setPreviewMode(mode)}
                  role="tab"
                  type="button"
                >
                  {mode === "Megaproject" ? "Megaproject View" : "Subcontractor View"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0f1933]">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-flyin/15 text-flyin">
                  <Icon
                    name={previewMode === "Subcontractor" ? "users" : "building"}
                    size={20}
                  />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">
                    {previewMode === "Subcontractor"
                      ? "Project Tenders & Compliance Tracking"
                      : "Project Compliance & Crew Sourcing"}
                  </p>
                  <p className="mt-0.5 text-xs text-white/45">
                    {previewMode === "Subcontractor"
                      ? "Find verified Tier-1 project packages and maintain your mobilization readiness."
                      : "Set project compliance baselines and find verified subcontractors for your sites."}
                  </p>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[0.68rem] font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Sample live data
              </span>
            </div>
            {previewMode === "Subcontractor" && (
              <div className="border-b border-white/10 p-5 sm:p-6">
                <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center">
                  <Icon
                    name="search"
                    size={19}
                    className="shrink-0 text-flyin"
                  />
                  <input
                    aria-label="Search active project packages, RFPs, and local tender opportunities"
                    className="registration-input min-w-0 flex-1 border-white/10 bg-white/5 text-white placeholder:text-white/35"
                    placeholder="Search active project packages, RFPs, and local tender opportunities..."
                    type="search"
                  />
                  <button
                    className="rounded-lg bg-flyin px-4 py-3 text-xs font-bold text-ink transition hover:bg-orange-300"
                    onClick={openSubcontractorRegistration}
                    type="button"
                  >
                    Search Projects
                  </button>
                </div>
              </div>
            )}
            {previewMode === "Subcontractor" && (
              <div className="border-b border-white/10 p-5 sm:p-6">
                <section
                  aria-labelledby="public-profile-heading"
                  className="rounded-2xl border border-white/10 bg-[#101a33] p-4 sm:p-5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-flyin/15 text-flyin">
                      <Icon name="briefcase" size={21} />
                    </span>
                    <div>
                      <h3
                        className="text-sm font-bold text-white"
                        id="public-profile-heading"
                      >
                        Public Subcontractor Profile
                      </h3>
                      <p className="mt-1 text-xs text-white/45">
                        Pilbara Field Services - Civil &amp; Mechanical
                      </p>
                    </div>
                  </div>
                  <OperationalHealthScore />
                  <AssetVerificationPassport />
                </section>
              </div>
            )}
            {previewMode === "Megaproject" && (
              <div className="space-y-5 p-5 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ["Open project packages", "12", "Across 5 regional hubs"],
                    ["Verified crews available", "40", "Ready for mobilisation"],
                    ["Compliance status", "100%", "Audit-ready workforce"],
                  ].map(([label, value, note]) => (
                    <article
                      className="rounded-xl border border-white/10 bg-white/[0.035] p-5"
                      key={label}
                    >
                      <p className="text-xs text-white/55">{label}</p>
                      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
                      <p className="mt-2 text-xs text-white/40">{note}</p>
                    </article>
                  ))}
                </div>

                <section
                  aria-labelledby="project-onboarding-heading"
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3
                        className="text-sm font-bold text-white"
                        id="project-onboarding-heading"
                      >
                        Project Registration &amp; Compliance Onboarding
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-white/50">
                        Establish the project baseline before sourcing crews.
                      </p>
                    </div>
                    <button
                      className="button-primary min-h-11 w-fit px-4 text-xs"
                      onClick={openProjectRegistration}
                      type="button"
                    >
                      Register Project &amp; Set Compliance Baseline{" "}
                      <Icon name="arrow" size={15} />
                    </button>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      [
                        "Project Details & Postcode Location",
                        "Project name, site address and regional postcode",
                      ],
                      [
                        "Legal & Regulatory Framework Selection",
                        "Fair Work compliance and Enterprise Bargaining Agreement (EBA) status",
                      ],
                      [
                        "Mandatory Insurance & Public Liability Verification",
                        "$20M minimum public liability cover",
                      ],
                      [
                        "Indigenous Procurement Target Settings",
                        "Set local participation and procurement targets",
                      ],
                    ].map(([title, detail]) => (
                      <div
                        className="rounded-xl border border-white/10 bg-[#0f1933] p-4"
                        key={title}
                      >
                        <p className="text-xs font-semibold text-white/80">
                          {title}
                        </p>
                        <p className="mt-1.5 text-xs leading-5 text-white/45">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center">
                  <Icon
                    name="search"
                    size={19}
                    className="shrink-0 text-flyin"
                  />
                  <input
                    aria-label="Search verified subcontractors and specialised crews"
                    className="registration-input min-w-0 flex-1 border-white/10 bg-white/5 text-white placeholder:text-white/35"
                    placeholder="Search Verified Subcontractors & Specialised Crews..."
                    type="search"
                  />
                  <button
                    className="rounded-lg bg-flyin px-4 py-3 text-xs font-bold text-ink transition hover:bg-orange-300"
                    onClick={openProjectRegistration}
                    type="button"
                  >
                    Search Subcontractors
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#080f21] py-8 text-white">
        <div className="page-shell flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <a aria-label="FlyIn home" className="flex items-center gap-2" href="#top">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-flyin">
              <Icon name="plane" size={17} />
            </span>
            <span className="font-extrabold tracking-tight">
              Fly<span className="text-flyin">In</span>
            </span>
          </a>
          <p className="text-xs text-white/45">
            Workforce compliance for Australia&apos;s heavy industry.
          </p>
          <a
            className="text-xs font-semibold text-white/65 transition hover:text-white"
            href="#top"
          >
            Back to top ↑
          </a>
        </div>
      </footer>

      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 transition-[visibility] duration-300 ${
          isOpen ? "visible" : "invisible pointer-events-none"
        }`}
        inert={!isOpen}
      >
        <button
          aria-label="Close project registration panel"
          className={`absolute inset-0 h-full w-full bg-[#030712]/75 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
          tabIndex={isOpen ? 0 : -1}
          type="button"
        />
        <aside
          aria-labelledby="project-registration-title"
          aria-modal="true"
          className={`absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-white/10 bg-[#0b132b] text-white shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-7">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-flyin">
                {registrationPanelMode === "subcontractor"
                  ? "Subcontractor onboarding"
                  : "Project onboarding"}
              </p>
              <h2
                className="mt-1 text-xl font-bold tracking-tight sm:text-2xl"
                id="project-registration-title"
              >
                {registrationPanelMode === "subcontractor"
                  ? "Register as a subcontractor"
                  : "Register a project"}
              </h2>
              <p className="mt-1 text-sm leading-5 text-white/55">
                {registrationPanelMode === "subcontractor"
                  ? "Create your account and verify your workforce compliance."
                  : "Set the compliance baseline before sourcing regional crews."}
              </p>
            </div>
            <button
              aria-label="Close registration panel"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 text-white/70 transition hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-flyin"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <Icon name="close" size={19} />
            </button>
          </div>

          {registrationPanelMode === "subcontractor" ? (
            <form
              className="flex min-h-0 flex-1 flex-col"
              noValidate
              onSubmit={handleRegistration}
              ref={registrationPanelFormRef}
            >
              <div className="border-b border-white/10 px-5 py-4 sm:px-7">
                <div
                  aria-label={`Subcontractor registration step ${registrationStep} of 3`}
                  className="flex items-center gap-2"
                >
                  {["Account", "Framework", "Insurance"].map((label, index) => {
                    const step = index + 1;
                    return (
                      <div className="flex flex-1 items-center gap-2" key={label}>
                        <span
                          aria-current={registrationStep === step ? "step" : undefined}
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                            registrationStep >= step
                              ? "bg-flyin text-ink"
                              : "bg-white/10 text-white/45"
                          }`}
                        >
                          {step}
                        </span>
                        <span
                          className={`hidden text-xs font-semibold sm:inline ${
                            registrationStep === step
                              ? "text-white"
                              : "text-white/45"
                          }`}
                        >
                          {label}
                        </span>
                        {step < 3 && (
                          <span
                            aria-hidden="true"
                            className={`h-px flex-1 ${
                              registrationStep > step
                                ? "bg-flyin"
                                : "bg-white/15"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-7">
                <div
                  className="space-y-4"
                  data-registration-step="1"
                  hidden={registrationStep !== 1}
                >
                  <div>
                    <h3 className="text-sm font-bold text-white">Account</h3>
                    <p className="mt-1 text-xs text-white/50">
                      Add your business details to get started.
                    </p>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-white/70">
                      Company name
                    </span>
                    <input
                      autoComplete="organization"
                      className="registration-input border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      name="company"
                      {...registrationFieldProps("company")}
                      onChange={(event) =>
                        updateRegistrationField("company", event.currentTarget.value)
                      }
                      placeholder="Registered business name"
                      required
                      value={registrationDetails.company}
                    />
                    {renderRegistrationFieldError("company")}
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-white/70">
                      Primary specialisation
                    </span>
                    <select
                      className="registration-input border-white/10 bg-[#101a33] text-white"
                      name="specialisation"
                      {...registrationFieldProps("specialisation")}
                      onChange={(event) =>
                        updateRegistrationField(
                          "specialisation",
                          event.currentTarget.value,
                        )
                      }
                      required
                      value={registrationDetails.specialisation}
                    >
                      <option disabled value="">Select specialisation</option>
                      <option>Civil</option>
                      <option>Mechanical</option>
                      <option>Electrical</option>
                      <option>Renewables</option>
                      <option>Mining</option>
                    </select>
                    {renderRegistrationFieldError("specialisation")}
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-white/70">
                      Corporate email
                    </span>
                    <input
                      autoComplete="email"
                      className="registration-input border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      name="email"
                      {...registrationFieldProps("email")}
                      onChange={(event) =>
                        updateRegistrationField("email", event.currentTarget.value)
                      }
                      placeholder="you@company.com.au"
                      required
                      type="email"
                      value={registrationDetails.email}
                    />
                    {renderRegistrationFieldError("email")}
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-white/70">
                      Password
                    </span>
                    <input
                      autoComplete="new-password"
                      className="registration-input border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      minLength={8}
                      name="password"
                      {...registrationFieldProps("password")}
                      onChange={(event) =>
                        updateRegistrationField("password", event.currentTarget.value)
                      }
                      placeholder="At least 8 characters"
                      required
                      type="password"
                      value={registrationDetails.password}
                    />
                    {renderRegistrationFieldError("password")}
                  </label>
                </div>

                <div
                  className="space-y-4"
                  data-registration-step="2"
                  hidden={registrationStep !== 2}
                >
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Framework &amp; industrial compliance
                    </h3>
                    <p className="mt-1 text-xs text-white/50">
                      Verify your business identity and workplace framework.
                    </p>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-white/70">
                      ABN / Business ID
                    </span>
                    <input
                      className="registration-input border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      inputMode="numeric"
                      maxLength={11}
                      name="businessId"
                      {...registrationFieldProps("businessId")}
                      onChange={(event) =>
                        updateRegistrationField(
                          "businessId",
                          event.currentTarget.value.replace(/\D/g, "").slice(0, 11),
                        )
                      }
                      pattern="[0-9]{11}"
                      placeholder="11 digit ABN"
                      required
                      value={registrationDetails.businessId}
                    />
                    {renderRegistrationFieldError("businessId")}
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-white/70">
                      Fair Work compliance status
                    </span>
                    <select
                      className="registration-input border-white/10 bg-[#101a33] text-white"
                      name="fairWorkStatus"
                      {...registrationFieldProps("fairWorkStatus")}
                      onChange={(event) =>
                        updateRegistrationField(
                          "fairWorkStatus",
                          event.currentTarget.value,
                        )
                      }
                      required
                      value={registrationDetails.fairWorkStatus}
                    >
                      <option disabled value="">Select status</option>
                      <option value="compliant">Compliant</option>
                      <option value="under-review">Under Review</option>
                    </select>
                    {renderRegistrationFieldError("fairWorkStatus")}
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-white/70">
                      Enterprise Bargaining Agreement (EBA) status
                    </span>
                    <select
                      className="registration-input border-white/10 bg-[#101a33] text-white"
                      name="ebaStatus"
                      {...registrationFieldProps("ebaStatus")}
                      onChange={(event) =>
                        updateRegistrationField("ebaStatus", event.currentTarget.value)
                      }
                      required
                      value={registrationDetails.ebaStatus}
                    >
                      <option disabled value="">Select status</option>
                      <option value="active">Active EBA</option>
                      <option value="award-reliant">No EBA / Award Reliant</option>
                    </select>
                    {renderRegistrationFieldError("ebaStatus")}
                  </label>
                </div>

                <div
                  className="space-y-4"
                  data-registration-step="3"
                  hidden={registrationStep !== 3}
                >
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Insurance verification
                    </h3>
                    <p className="mt-1 text-xs text-white/50">
                      Confirm the required public liability cover.
                    </p>
                  </div>
                  <div>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4">
                      <input
                        checked={registrationDetails.publicLiabilityConfirmed}
                        className="mt-0.5 h-4 w-4 accent-[#fca311]"
                        name="publicLiability"
                        {...registrationFieldProps("publicLiability")}
                        onChange={(event) =>
                          updateRegistrationField(
                            "publicLiabilityConfirmed",
                            event.currentTarget.checked,
                          )
                        }
                        required
                        type="checkbox"
                      />
                      <span className="text-xs leading-5 text-white/75">
                        I confirm our business holds a minimum of $20M AUD Public
                        Liability Coverage as required by Tier-1 projects.
                      </span>
                    </label>
                    {renderRegistrationFieldError("publicLiability")}
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-white/70">
                      Certificate of Currency / Policy Number
                    </span>
                    <input
                      className="registration-input border-white/10 bg-white/5 text-white placeholder:text-white/30"
                      name="policyNumber"
                      {...registrationFieldProps("policyNumber")}
                      onChange={(event) =>
                        updateRegistrationField("policyNumber", event.currentTarget.value)
                      }
                      placeholder="Enter policy number"
                      required
                      value={registrationDetails.policyNumber}
                    />
                    {renderRegistrationFieldError("policyNumber")}
                  </label>
                </div>
              </div>

              <div className="border-t border-white/10 bg-[#0b132b] px-5 py-4 sm:px-7">
                {registrationError && (
                  <p className="mb-3 text-xs text-red-500" role="alert">
                    {registrationError}
                  </p>
                )}
                <div className="flex gap-3">
                  {registrationStep > 1 && (
                    <button
                      className="button-outline flex-1"
                      onClick={() => {
                        setRegistrationStep((step) => Math.max(step - 1, 1));
                        setRegistrationErrors({});
                      }}
                      type="button"
                    >
                      Back
                    </button>
                  )}
                  {registrationStep < 3 ? (
                    <button
                      className="button-primary flex-1"
                      onClick={() =>
                        continueRegistration(registrationPanelFormRef.current)
                      }
                      type="button"
                    >
                      Continue
                      <Icon name="arrow" size={16} />
                    </button>
                  ) : (
                    <button className="button-primary flex-1" type="submit">
                      Complete Subcontractor Registration
                      <Icon name="arrow" size={16} />
                    </button>
                  )}
                </div>
              </div>
            </form>
          ) : (
          <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={handleProjectRegistration}
          >
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-7">
              <fieldset className="space-y-4 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                <legend className="px-1 text-sm font-bold text-white">
                  01 <span className="ml-2 text-flyin">Project details</span>
                </legend>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-white/70">
                    Project name
                  </span>
                  <input
                    autoComplete="organization-title"
                    className="registration-input border-white/10 bg-white/5 text-white placeholder:text-white/30"
                    name="projectName"
                    placeholder="e.g. Pilbara Solar Expansion"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-white/70">
                    Site physical address
                  </span>
                  <input
                    autoComplete="street-address"
                    className="registration-input border-white/10 bg-white/5 text-white placeholder:text-white/30"
                    name="siteAddress"
                    placeholder="Street address, locality, state"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-white/70">
                    Regional postcode
                  </span>
                  <input
                    autoComplete="postal-code"
                    className="registration-input border-white/10 bg-white/5 text-white placeholder:text-white/30"
                    inputMode="numeric"
                    maxLength={4}
                    minLength={4}
                    name="postcode"
                    pattern="[0-9]{4}"
                    placeholder="4-digit postcode"
                    required
                  />
                </label>
              </fieldset>

              <fieldset className="space-y-4 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                <legend className="px-1 text-sm font-bold text-white">
                  02 <span className="ml-2 text-flyin">Framework &amp; legal</span>
                </legend>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-white/70">
                    Fair Work compliance status
                  </span>
                  <select
                    className="registration-input border-white/10 bg-[#101a33] text-white"
                    defaultValue=""
                    name="fairWorkStatus"
                    required
                  >
                    <option disabled value="">
                      Select status
                    </option>
                    <option value="compliant">Compliant</option>
                    <option value="under-review">Under Review</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-white/70">
                    Enterprise Bargaining Agreement (EBA) status
                  </span>
                  <select
                    className="registration-input border-white/10 bg-[#101a33] text-white"
                    defaultValue=""
                    name="ebaStatus"
                    required
                  >
                    <option disabled value="">
                      Select status
                    </option>
                    <option value="in-place">EBA in place</option>
                    <option value="under-negotiation">Under negotiation</option>
                    <option value="not-applicable">Not applicable</option>
                  </select>
                </label>
              </fieldset>

              <fieldset className="space-y-4 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                <legend className="px-1 text-sm font-bold text-white">
                  03 <span className="ml-2 text-flyin">Insurance verification</span>
                </legend>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-3.5">
                  <input
                    className="mt-0.5 h-4 w-4 accent-[#fca311]"
                    name="publicLiability"
                    required
                    type="checkbox"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      Public Liability Coverage
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-white/50">
                      I verify a minimum of $20M AUD public liability cover.
                    </span>
                  </span>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-white/70">
                    Professional Indemnity Insurance
                  </span>
                  <input
                    className="registration-input border-white/10 bg-white/5 text-white placeholder:text-white/30"
                    name="professionalIndemnity"
                    placeholder="Coverage amount or policy details"
                    required
                  />
                </label>
              </fieldset>

              <fieldset className="space-y-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                <legend className="px-1 text-sm font-bold text-white">
                  04 <span className="ml-2 text-flyin">Local impact</span>
                </legend>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-white/70">
                    Indigenous procurement target
                  </span>
                  <div className="relative">
                    <input
                      className="registration-input border-white/10 bg-white/5 pr-12 text-white"
                      max={100}
                      min={0}
                      name="indigenousProcurementTarget"
                      placeholder="5"
                      required
                      type="number"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-white/50">
                      %
                    </span>
                  </div>
                  <span className="mt-1.5 block text-xs text-white/40">
                    Set the percentage of project spend targeted for Indigenous businesses.
                  </span>
                </label>
              </fieldset>
            </div>

            <div className="border-t border-white/10 bg-[#0b132b] px-5 py-4 sm:px-7">
              <button
                className="button-primary min-h-12 w-full text-sm"
                type="submit"
              >
                Continue to compliance review
                <Icon name="arrow" size={16} />
              </button>
              <p className="mt-2 text-center text-[0.68rem] text-white/40">
                You can review these details before final submission.
              </p>
            </div>
          </form>
          )}
        </aside>
      </div>
    </main>
  );
}
