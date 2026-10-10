"use client";

import { useState } from "react";

type Status = "Verified" | "Expiring Soon" | "Action Required";
type Worker = {
  name: string;
  role: string;
  id: string;
  licence: string;
  licenceStatus: Status;
  expiry: string;
  whiteCard: string;
  whiteStatus: Status;
  auditStatus: Status;
  auditNote: string;
  auditAt: string;
  apiStatus: "Live API Verified" | "Re-check pending";
};
type Filter = "All" | Status;
type Stage = "Onboarding" | "Compliant" | "Deployed" | "Completed";

const workers: Worker[] = [
  {
    name: "Jarrah Collins",
    role: "Mobile Crane Operator",
    id: "W-1044",
    licence: "HRW-WA-224519 · C6",
    licenceStatus: "Action Required",
    expiry: "2026-09-30",
    whiteCard: "WC-WA-7912047",
    whiteStatus: "Verified",
    auditStatus: "Action Required",
    auditNote: "Licence renewal evidence missing",
    auditAt: "2026-09-26 18:22",
    apiStatus: "Re-check pending",
  },
  {
    name: "Tahnee Morrison",
    role: "Boilermaker / Welder",
    id: "W-1042",
    licence: "HRW-WA-219302 · WP",
    licenceStatus: "Expiring Soon",
    expiry: "2026-10-19",
    whiteCard: "WC-WA-7801556",
    whiteStatus: "Verified",
    auditStatus: "Verified",
    auditNote: "Hot work permit logged",
    auditAt: "2026-09-28 07:40",
    apiStatus: "Re-check pending",
  },
  {
    name: "Brodie Kemp",
    role: "Scaffolder (Intermediate)",
    id: "W-1046",
    licence: "HRW-WA-230081 · SI",
    licenceStatus: "Expiring Soon",
    expiry: "2026-11-08",
    whiteCard: "WC-WA-8002134",
    whiteStatus: "Expiring Soon",
    auditStatus: "Verified",
    auditNote: "Scaffold tag inspection — Bay 4",
    auditAt: "2026-09-27 16:31",
    apiStatus: "Re-check pending",
  },
  {
    name: "Dean Whitfield",
    role: "Crew Supervisor",
    id: "W-1041",
    licence: "HRW-WA-208841 · RB, CN",
    licenceStatus: "Verified",
    expiry: "2028-04-12",
    whiteCard: "WC-WA-7734102",
    whiteStatus: "Verified",
    auditStatus: "Verified",
    auditNote: "Site induction signed — Area C",
    auditAt: "2026-09-28 06:12",
    apiStatus: "Live API Verified",
  },
  {
    name: "Luca Ferraro",
    role: "Rigger (Advanced)",
    id: "W-1043",
    licence: "HRW-WA-190277 · RA",
    licenceStatus: "Verified",
    expiry: "2027-11-02",
    whiteCard: "WC-WA-6620981",
    whiteStatus: "Verified",
    auditStatus: "Verified",
    auditNote: "Lift plan countersigned",
    auditAt: "2026-09-27 15:05",
    apiStatus: "Live API Verified",
  },
  {
    name: "Priya Nair",
    role: "Electrician (A-Grade)",
    id: "W-1045",
    licence: "EW-WA-118304 · EW",
    licenceStatus: "Verified",
    expiry: "2029-01-15",
    whiteCard: "WC-WA-7455310",
    whiteStatus: "Verified",
    auditStatus: "Verified",
    auditNote: "Isolation LOTO record uploaded",
    auditAt: "2026-09-28 05:58",
    apiStatus: "Live API Verified",
  },
  {
    name: "Mele Tupou",
    role: "Dogman",
    id: "W-1047",
    licence: "HRW-WA-201765 · DG",
    licenceStatus: "Verified",
    expiry: "2027-06-21",
    whiteCard: "WC-WA-7120938",
    whiteStatus: "Action Required",
    auditStatus: "Action Required",
    auditNote: "White Card re-verification requested",
    auditAt: "2026-09-25 09:14",
    apiStatus: "Re-check pending",
  },
  {
    name: "Sam Oyelaran",
    role: "Fitter / Mechanical",
    id: "W-1048",
    licence: "HRW-WA-215640 · FL",
    licenceStatus: "Verified",
    expiry: "2028-02-03",
    whiteCard: "WC-WA-7598821",
    whiteStatus: "Verified",
    auditStatus: "Verified",
    auditNote: "Fatigue declaration submitted",
    auditAt: "2026-09-28 05:30",
    apiStatus: "Live API Verified",
  },
];

const ticketAlerts = [
  {
    name: "Marcus Tane",
    ticket: "Rigging Ticket (Class RI)",
    window: "30-day window",
    days: 18,
    notification: "SMS + Push escalated to crew supervisor",
    color: "red",
  },
  {
    name: "John Doe",
    ticket: "Excavator Ticket (Class LE)",
    window: "60-day window",
    days: 42,
    notification: "SMS Reminder Dispatched",
    color: "amber",
  },
  {
    name: "Priya Nair",
    ticket: "Working at Heights (RIIWHS204E)",
    window: "90-day window",
    days: 77,
    notification: "Push notification scheduled",
    color: "blue",
  },
  {
    name: "Liam O'Connor",
    ticket: "Confined Space Entry (RIIWHS202E)",
    window: "90-day window",
    days: 88,
    notification: "Push notification scheduled",
    color: "blue",
  },
];

const payRates = [
  { level: "Mineworker Level 4", minimum: "$29.71/h", paid: "$46.50/h", uplift: "+57%" },
  { level: "Mineworker Level 5", minimum: "$31.02/h", paid: "$51.00/h", uplift: "+64%" },
  { level: "Mineworker Level 6", minimum: "$32.45/h", paid: "$55.25/h", uplift: "+70%" },
  { level: "Supervisor Level 1", minimum: "$34.18/h", paid: "$62.00/h", uplift: "+81%" },
];

const allowances = [
  {
    title: "District Allowance (Remote Hubs)",
    detail: "Pilbara remote locality loading · Port Hedland / Newman",
    amount: "$388.80",
    calculation: "$48.60/wk × 8",
    status: "Applied",
  },
  {
    title: "Tool & Uniform Provisioning",
    detail: "Tradesperson tool allowance + PPE / uniform laundering",
    amount: "$134.40",
    calculation: "$22.40/wk × 6",
    status: "Applied",
  },
  {
    title: "Travel/FIFO Accommodation Adjustments",
    detail: "Travel time to point of hire · camp accommodation offset",
    amount: "$1,488.00",
    calculation: "$186.00/wk × 8",
    status: "Pending sign-off",
  },
];

const operations = [
  {
    id: "MOB-2291",
    title: "Primary crusher liner change-out",
    principal: "Tier-1 Iron Ore Operator · Newman East Hub",
    rate: "$9,450",
    stage: "Onboarding" as Stage,
    start: "2026-10-06",
    duration: "10 days",
    crew: 6,
  },
  {
    id: "MOB-2284",
    title: "Stacker-reclaimer structural repairs",
    principal: "Port Operations JV · Port Hedland Stockyard",
    rate: "$12,800",
    stage: "Compliant" as Stage,
    start: "2026-10-01",
    duration: "21 days",
    crew: 8,
  },
  {
    id: "MOB-2270",
    title: "Conveyor CV-14 belt splice & idlers",
    principal: "Tier-1 Iron Ore Operator · Yandi Hub",
    rate: "$8,200",
    stage: "Deployed" as Stage,
    start: "2026-09-15",
    duration: "18 days",
    crew: 5,
  },
  {
    id: "MOB-2255",
    title: "Mt Whaleback shutdown — mechanical",
    principal: "Tier-1 Iron Ore Operator · Mt Whaleback",
    rate: "$11,600",
    stage: "Completed" as Stage,
    start: "2026-07-04",
    duration: "16 days",
    crew: 8,
  },
];

const inductions = [
  { name: "Marcus Tane", role: "Rigger · HRWL DG", bhp: 100, rio: 70, chevron: 40 },
  { name: "John Doe", role: "Electrician · A-Grade", bhp: 100, rio: 100, chevron: 40 },
  { name: "Aroha Ngata", role: "Plant Operator · HR", bhp: 100, rio: 70, chevron: 15 },
  { name: "Liam Becker", role: "Scaffolder · Advanced", bhp: 85, rio: 100, chevron: 40 },
];

function Icon({
  name,
  size = 18,
}: {
  name: "building" | "pin" | "users" | "shield" | "clock" | "search" | "arrow" | "check" | "alert" | "calendar" | "briefcase" | "file" | "plane" | "trend";
  size?: number;
}) {
  const paths: Record<typeof name, React.ReactNode> = {
    building: <><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    alert: <><path d="M10.3 3.9 1.8 18.1A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.9L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4m0 4h.01" /></>,
    calendar: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
    plane: <><path d="m3 11 18-8-8 18-2.4-7.6L3 11Z" /><path d="m10.6 13.4 4.1-4.1" /></>,
    trend: <><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  };
  return (
    <svg
      aria-hidden="true"
      className="shrink-0"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  );
}

function SectionHeading({
  icon,
  title,
  detail,
  action,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  detail: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-flyin/20 bg-flyin/10 text-flyin">
          <Icon name={icon} size={19} />
        </span>
        <div>
          <h2 className="text-base font-bold tracking-tight text-white" id={title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}>{title}</h2>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-white/50">{detail}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "green" | "amber" | "red" | "blue" | "slate";
}) {
  const colors = {
    green: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    amber: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    red: "border-rose-400/20 bg-rose-400/10 text-rose-300",
    blue: "border-sky-400/20 bg-sky-400/10 text-sky-300",
    slate: "border-white/10 bg-white/5 text-white/60",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold ${colors[tone]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone === "green" ? "bg-emerald-500" : tone === "amber" ? "bg-amber-500" : tone === "red" ? "bg-rose-500" : tone === "blue" ? "bg-sky-500" : "bg-slate-400"}`} />
      {children}
    </span>
  );
}

function statusTone(status: Status): "green" | "amber" | "red" {
  if (status === "Verified") return "green";
  if (status === "Expiring Soon") return "amber";
  return "red";
}

function ProgressBar({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      className="h-1.5 overflow-hidden rounded-full bg-white/10"
      role="progressbar"
    >
      <span
        className={`block h-full rounded-full ${value >= 85 ? "bg-emerald-500" : value >= 50 ? "bg-amber-400" : "bg-rose-400"}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function ComplianceHub() {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: { label: string; value: Filter }[] = [
    { label: `All ${workers.length}`, value: "All" },
    { label: "Action Required 2", value: "Action Required" },
    { label: "Expiring Soon 2", value: "Expiring Soon" },
    { label: "Verified 4", value: "Verified" },
  ];
  const filteredWorkers = workers.filter((worker) => {
    if (filter === "All") return true;
    if (filter === "Action Required") {
      return worker.licenceStatus === filter || worker.whiteStatus === filter;
    }
    if (filter === "Expiring Soon") {
      return worker.licenceStatus === filter || worker.whiteStatus === filter;
    }
    return worker.licenceStatus === "Verified" && worker.whiteStatus === "Verified";
  });

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101a33] shadow-[0_12px_34px_rgba(0,0,0,0.22)]" aria-labelledby="compliance-verification-hub">
      <SectionHeading
        icon="shield"
        title="Compliance & Verification Hub"
        detail="WorkSafe High Risk Work licences, White Cards, and digital audit trail per worker."
      />
      <div className="border-b border-white/10 px-5 py-3 sm:px-6">
        <div aria-label="Filter by status" className="inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-white/10 bg-[#0b1429] p-1" role="group">
          {filters.map((item) => (
            <button
              aria-pressed={filter === item.value}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${filter === item.value ? "bg-flyin text-[#0b132b] shadow-sm" : "text-white/55 hover:bg-white/10 hover:text-white"}`}
              key={item.value}
              onClick={() => setFilter(item.value)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left text-xs">
          <caption className="sr-only">Worker certification status, sortable by column</caption>
          <thead className="bg-[#0b1429] text-[0.68rem] uppercase tracking-wide text-white/45">
            <tr>
              {["Worker", "WorkSafe licence", "Expires", "White Card", "Digital audit trail", "WorkSafe API"].map((heading) => (
                <th className="px-4 py-3 font-bold" key={heading} scope="col">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredWorkers.map((worker) => (
              <tr className="align-top transition hover:bg-white/[0.035]" key={worker.id}>
                <td className="px-4 py-4">
                  <p className="font-bold text-white">{worker.name}</p>
                  <p className="mt-1 whitespace-nowrap text-white/45">{worker.role} · {worker.id}</p>
                </td>
                <td className="px-4 py-4">
                  <Badge tone={statusTone(worker.licenceStatus)}>{worker.licenceStatus}</Badge>
                  <p className="mt-2 whitespace-nowrap font-mono text-[0.68rem] text-white/45">{worker.licence}</p>
                </td>
                <td className={`px-4 py-4 font-mono text-[0.7rem] ${worker.licenceStatus === "Action Required" ? "font-bold text-rose-300" : "text-white/70"}`}>{worker.expiry}</td>
                <td className="px-4 py-4">
                  <Badge tone={statusTone(worker.whiteStatus)}>{worker.whiteStatus}</Badge>
                  <p className="mt-2 whitespace-nowrap font-mono text-[0.68rem] text-white/45">{worker.whiteCard}</p>
                </td>
                <td className="max-w-56 px-4 py-4">
                  <Badge tone={statusTone(worker.auditStatus)}>{worker.auditStatus}</Badge>
                  <p className="mt-2 leading-4 text-white/70">{worker.auditNote}</p>
                  <p className="mt-1 font-mono text-[0.65rem] text-white/35">{worker.auditAt}</p>
                </td>
                <td className="px-4 py-4">
                  <Badge tone={worker.apiStatus === "Live API Verified" ? "green" : "amber"}>{worker.apiStatus}</Badge>
                </td>
              </tr>
            ))}
            {filteredWorkers.length === 0 && (
              <tr><td className="px-4 py-8 text-center text-white/50" colSpan={6}>No workers match this status filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[0.68rem] text-white/35 sm:px-6">
        <span>Showing {filteredWorkers.length} of {workers.length} crew records</span>
        <span>Last synced 04:00 AWST</span>
      </div>
    </section>
  );
}

function PredictiveExpiry() {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101a33] shadow-[0_12px_34px_rgba(0,0,0,0.22)]" aria-labelledby="predictive-ticket-expiry">
      <SectionHeading
        icon="clock"
        title="Predictive Ticket Expiry"
        detail="30-60-90 Day Predictive Alerts via SMS/Push, cross-checked against live WorkSafe records."
        action={<Badge tone="blue">Automated alerts active</Badge>}
      />
      <div className="p-5 sm:p-6">
        <div aria-hidden="true" className="mb-5 grid grid-cols-4 text-[0.68rem] font-semibold text-white/40">
          {["Today", "30d", "60d", "90d"].map((mark, index) => (
            <span className={`${index === 0 ? "text-white" : ""} ${index === 3 ? "text-right" : ""}`} key={mark}>{mark}</span>
          ))}
        </div>
        <div className="relative">
          <div aria-hidden="true" className="absolute bottom-4 left-3 top-4 w-px bg-white/15 sm:left-4" />
          <ul className="space-y-3">
            {ticketAlerts.map((alert) => (
              <li className="relative grid gap-3 pl-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:pl-10" key={alert.name}>
                <span className={`absolute left-[0.4rem] top-4 h-2 w-2 rounded-full ring-4 ring-[#101a33] ${alert.color === "red" ? "bg-rose-500" : alert.color === "amber" ? "bg-amber-400" : "bg-sky-500"}`} />
                <div className="rounded-xl border border-white/10 bg-[#0b1429] p-3.5">
                  <p className="text-xs font-bold text-white">{alert.name} — {alert.ticket}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[0.68rem] text-white/50">
                    <Icon name="arrow" size={13} /> {alert.notification}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <Badge tone={alert.color === "red" ? "red" : alert.color === "amber" ? "amber" : "blue"}>{alert.window}</Badge>
                  <span className="whitespace-nowrap text-xs font-bold text-white">Expires in {alert.days} Days</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AwardTracking() {
  const [selectedTab, setSelectedTab] = useState<"Base pay rates" | "Overtime logs" | "Roster verification">("Base pay rates");
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101a33] shadow-[0_12px_34px_rgba(0,0,0,0.22)]" aria-labelledby="fair-work-award-tracking">
      <SectionHeading
        icon="file"
        title="Fair Work & Award Tracking"
        detail="Automated Tier-1 baseline checks against the applicable Modern Award."
      />
      <div className="space-y-5 p-5 sm:p-6">
        <div className="rounded-xl border border-white/10 bg-[#0b1429] p-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-bold text-white">Mining Industry Award 2020 <span className="ml-1 text-xs font-semibold text-white/50">[MA000011]</span></p>
              <p className="mt-1 text-[0.68rem] leading-5 text-white/55">Mineworker Level 4–6 / Supervisor Level 1 · Last sync 2026-09-28 04:00 AWST</p>
              <p className="mt-1 text-[0.68rem] text-white/35">Fair Work Commission determination PR774601</p>
            </div>
            <div className="w-full sm:w-36">
              <div className="mb-1.5 flex justify-between text-[0.68rem]"><span className="text-white/50">Alignment</span><strong className="text-white">75%</strong></div>
              <ProgressBar label="Award alignment" value={75} />
              <p className="mt-1.5 text-right text-[0.65rem] text-white/35">9 of 12 checks passing</p>
            </div>
          </div>
        </div>
        <div>
          <div aria-label="Award compliance metrics" className="flex overflow-x-auto border-b border-white/10" role="tablist">
            {(["Base pay rates", "Overtime logs", "Roster verification"] as const).map((tab) => (
              <button
                aria-selected={selectedTab === tab}
                className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-xs font-semibold transition ${selectedTab === tab ? "border-[#fca311] text-flyin" : "border-transparent text-white/40 hover:text-white"}`}
                key={tab}
                onClick={() => setSelectedTab(tab)}
                role="tab"
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          {selectedTab === "Base pay rates" ? (
            <ul className="divide-y divide-white/10" role="tabpanel">
              {payRates.map((rate) => (
                <li className="flex items-center justify-between gap-3 py-3" key={rate.level}>
                  <div>
                    <p className="text-xs font-bold text-white">{rate.level}</p>
                    <p className="mt-1 text-[0.68rem] text-white/50">Award min {rate.minimum} · Paid {rate.paid}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-300">{rate.uplift}</span>
                    <p className="mt-0.5 text-[0.65rem] text-emerald-400">Above min</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-3 py-4" role="tabpanel">
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0b1429] p-3">
                <span className="text-xs font-semibold text-white">{selectedTab === "Overtime logs" ? "Overtime entries reconciled" : "Roster hours checked against award"} </span>
                <Badge tone="green">{selectedTab === "Overtime logs" ? "36 / 36" : "8 / 8 workers"}</Badge>
              </div>
              <p className="text-[0.68rem] leading-5 text-white/50">
                {selectedTab === "Overtime logs"
                  ? "All submitted overtime has been cross-checked with timesheets and approved rates."
                  : "Current rosters align with minimum rest breaks and ordinary-hour requirements."}
              </p>
              <ProgressBar label={selectedTab} value={100} />
            </div>
          )}
        </div>
        <section className="rounded-xl border border-flyin/20 bg-flyin/[0.06] p-4" aria-labelledby="allowances-title">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="flex items-center gap-2 text-xs font-bold text-white" id="allowances-title"><Icon name="trend" size={15} /> Automated Allowance Calculations</h3>
            <span className="text-[0.65rem] text-white/50">Mining Industry Award 2020 [MA000011]</span>
          </div>
          <ul className="mt-3 divide-y divide-white/10">
            {allowances.map((allowance) => (
              <li className="flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-center" key={allowance.title}>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white">{allowance.title}</p>
                  <p className="mt-1 text-[0.65rem] leading-4 text-white/50">{allowance.detail}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3 sm:justify-end">
                  <div className="text-right"><p className="text-xs font-bold text-white">{allowance.amount}</p><p className="mt-0.5 text-[0.62rem] text-white/45">{allowance.calculation}</p></div>
                  <Badge tone={allowance.status === "Applied" ? "green" : "amber"}>{allowance.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex justify-between border-t border-white/10 pt-3 text-[0.68rem] text-white/50"><span>Pay period ending 2026-09-27</span><strong className="text-white">Weekly total $2,011.20</strong></div>
        </section>
      </div>
    </section>
  );
}

function MobilizationPipeline({ query }: { query: string }) {
  const [stage, setStage] = useState<"All stages" | Stage>("All stages");
  const stages: ("All stages" | Stage)[] = ["All stages", "Onboarding", "Compliant", "Deployed", "Completed"];
  const matches = operations.filter((operation) => {
    const matchesStage = stage === "All stages" || operation.stage === stage;
    const searchText = `${operation.title} ${operation.principal} ${operation.id}`.toLowerCase();
    return matchesStage && searchText.includes(query.toLowerCase());
  });
  const stepNames: Stage[] = ["Onboarding", "Compliant", "Deployed", "Completed"];
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101a33] shadow-[0_12px_34px_rgba(0,0,0,0.22)]" aria-labelledby="job-match-mobilisation-pipeline">
      <SectionHeading
        icon="briefcase"
        title="Job Match & Mobilisation Pipeline"
        detail="Live opportunities in the WA state hub, tracked from onboarding to completion."
        action={<label className="flex items-center gap-2 text-xs font-semibold text-white/50">Stage<select className="rounded-lg border border-white/10 bg-[#0b1429] px-2.5 py-2 text-xs text-white outline-none focus:border-[#fca311]" onChange={(event) => setStage(event.currentTarget.value as "All stages" | Stage)} value={stage}><option>All stages</option>{stepNames.map((step) => <option key={step}>{step}</option>)}</select></label>}
      />
      <div className="space-y-3 p-4 sm:p-5">
        {matches.map((operation) => {
          const activeStage = stepNames.indexOf(operation.stage);
          return (
            <article className="rounded-xl border border-white/10 bg-[#0b1429] p-4 transition hover:border-white/20 hover:bg-white/[0.035]" key={operation.id}>
              <div className="flex flex-col justify-between gap-3 sm:flex-row">
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-bold tracking-wide text-flyin">{operation.id}</p>
                  <h3 className="mt-1 text-sm font-bold text-white">{operation.title}</h3>
                  <p className="mt-1 text-xs text-white/50">{operation.principal}</p>
                </div>
                <p className="shrink-0 text-xs text-white/50"><strong className="text-base text-white">{operation.rate}</strong><br />crew day rate</p>
              </div>
              <ol aria-label={`Status: ${operation.stage}`} className="mt-4 grid grid-cols-4 gap-2">
                {stepNames.map((step, index) => {
                  const complete = index < activeStage;
                  const current = index === activeStage;
                  return (
                    <li className="min-w-0" key={step}>
                      <div className={`h-1.5 rounded-full ${complete ? "bg-emerald-500" : current ? "bg-[#fca311]" : "bg-white/10"}`} />
                      <p className={`mt-1.5 truncate text-[0.62rem] ${current ? "font-bold text-white" : complete ? "text-emerald-300" : "text-white/35"}`}>{step}{current ? " · current" : ""}</p>
                    </li>
                  );
                })}
              </ol>
              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-[0.68rem]">
                <div><dt className="text-white/35">Start</dt><dd className="mt-1 font-semibold text-white/75">{operation.start}</dd></div>
                <div><dt className="text-white/35">Duration</dt><dd className="mt-1 font-semibold text-white/75">{operation.duration}</dd></div>
                <div><dt className="text-white/35">Crew</dt><dd className="mt-1 flex items-center gap-1 font-semibold text-white/75"><Icon name="users" size={13} />{operation.crew}</dd></div>
              </dl>
            </article>
          );
        })}
        {matches.length === 0 && <p className="rounded-xl border border-white/10 bg-[#0b1429] px-4 py-8 text-center text-xs text-white/50">No opportunities match your search or stage filter.</p>}
      </div>
    </section>
  );
}

function InductionsPanel() {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101a33] shadow-[0_12px_34px_rgba(0,0,0,0.22)]" aria-labelledby="site-specific-inductions-compliance-validation">
      <SectionHeading
        icon="calendar"
        title="Site-Specific Inductions & Compliance Validation"
        detail="Cross-checked via live API with WorkSafe and Supply Nation registries."
        action={<span className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-[0.68rem] font-semibold text-emerald-300">Average Time-to-Green: <strong>36h</strong></span>}
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-xs">
          <thead className="bg-[#0b1429] text-[0.68rem] uppercase tracking-wide text-white/45"><tr>{["Worker", "BHP", "Rio Tinto", "Chevron"].map((name) => <th className="px-5 py-3 font-bold" key={name}>{name}</th>)}</tr></thead>
          <tbody className="divide-y divide-white/10">
            {inductions.map((worker) => (
              <tr key={worker.name}>
                <td className="px-5 py-4"><p className="font-bold text-white">{worker.name}</p><p className="mt-1 text-white/50">{worker.role}</p></td>
                {[worker.bhp, worker.rio, worker.chevron].map((value, index) => {
                  const ready = value === 100;
                  const status = value === 100 ? "100% — Ready" : value === 70 ? "Pending — Needs White Card Match" : value === 15 ? "15% — Medical Required" : value === 85 ? "85% — Final Module" : `${value}%`;
                  return <td className="min-w-36 px-5 py-4" key={`${worker.name}-${index}`}><div className="mb-2 flex justify-between gap-2"><span className={`text-[0.65rem] ${ready ? "text-emerald-300" : value === 15 ? "text-rose-300" : "text-amber-300"}`}>{status}</span><span className="text-[0.65rem] text-white/35">{value}</span></div><ProgressBar label={`${worker.name} ${["BHP", "Rio Tinto", "Chevron"][index]} induction progress`} value={value} /></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CrewOverview() {
  const metrics = [
    { label: "Active deployments", value: "2", note: "4 mobilisations in pipeline", icon: "briefcase" as const, tone: "blue" },
    { label: "Verified workers", value: "4 / 8", note: "WorkSafe licence and White Card both current", icon: "users" as const, tone: "green" },
    { label: "Pending ticket renewals", value: "4", note: "Flagged before principal compliance cut-off", icon: "clock" as const, tone: "amber" },
    { label: "Total earnings (Q3 net)", value: "$528,135", note: "Gross billed $564,850 · 6.5% fee −$36,715", icon: "trend" as const, tone: "orange" },
  ];
  return (
    <>
      <section className="overflow-hidden rounded-2xl bg-[#080f21] text-white shadow-[0_18px_48px_rgba(11,19,43,0.12)]">
        <div className="flex flex-col justify-between gap-5 p-5 sm:p-7 lg:flex-row lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-[#fca311]"><Icon name="building" size={15} /> Subcontractor workspace</p>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">Pilbara Iron Ore Crew <span className="text-white/55">— WA</span></h1>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/65">
              <span className="flex items-center gap-1.5"><Icon name="pin" size={14} /> Pilbara Hub — Port Hedland</span>
              <span>ABN 51 824 753 556</span>
              <span>Crew lead: Dean Whitfield</span>
            </div>
          </div>
          <span className="inline-flex w-fit self-start items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-[0.68rem] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Regional hub online · synced 04:00 AWST
          </span>
        </div>
      </section>
      <section aria-label="Crew overview metrics" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article className="rounded-2xl border border-white/10 bg-[#101a33] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)] sm:p-5" key={metric.label}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-white/55">{metric.label}</p>
              <span className={`grid h-8 w-8 place-items-center rounded-lg ${metric.tone === "green" ? "bg-emerald-400/10 text-emerald-300" : metric.tone === "amber" ? "bg-amber-400/10 text-amber-300" : metric.tone === "orange" ? "bg-flyin/10 text-flyin" : "bg-sky-400/10 text-sky-300"}`}><Icon name={metric.icon} size={16} /></span>
            </div>
            <p className="mt-3 text-2xl font-extrabold tracking-tight text-white">{metric.value}</p>
            <p className="mt-1.5 text-[0.68rem] leading-4 text-white/40">{metric.note}</p>
          </article>
        ))}
      </section>
    </>
  );
}

export default function SubcontractorDashboard() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  function searchProjects(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchTerm = query.trim().toLowerCase();
    const matchCount = operations.filter((operation) =>
      `${operation.title} ${operation.principal} ${operation.id}`
        .toLowerCase()
        .includes(searchTerm),
    ).length;
    setSubmittedQuery(query.trim());
    setSearchMessage(
      searchTerm
        ? `${matchCount} matching project ${matchCount === 1 ? "opportunity" : "opportunities"} in your mobilisation pipeline.`
        : "Showing all active project opportunities in your pipeline.",
    );
    document.getElementById("mobilisation-pipeline")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="min-h-screen bg-[#070b16] text-white" id="top">
      <div className="bg-[#070b16] text-white">
        <div aria-label="Platform views" className="mx-auto flex h-11 max-w-7xl items-center gap-1 overflow-x-auto px-4 py-1.5 sm:px-6 lg:px-8" role="tablist">
          <a className="flex h-full min-w-36 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-xs font-semibold text-white/65 transition hover:bg-white/10 hover:text-white sm:max-w-56" href="/#top"><Icon name="building" size={14} />Landing</a>
          <a aria-current="page" className="flex h-full min-w-28 flex-1 items-center justify-center gap-2 rounded-lg bg-[#fca311] px-4 text-xs font-bold text-[#0b132b] sm:max-w-56" href="/dashboard"><Icon name="briefcase" size={14} />Crews</a>
          <a className="flex h-full min-w-28 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-xs font-semibold text-white/65 transition hover:bg-white/10 hover:text-white sm:max-w-56" href="/#preview"><Icon name="building" size={14} />Principals</a>
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b132b]/95 text-white backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a aria-label="FlyIn home" className="flex items-center gap-2.5" href="/#top">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#fca311]"><Icon name="plane" size={20} /></span>
            <span className="text-xl font-extrabold tracking-tight text-white">Fly<span className="text-[#fca311]">In</span></span>
          </a>
          <p className="text-xs text-white/50">Signed in as <strong className="font-semibold text-white">Dean Whitfield</strong> · Crew Lead</p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:gap-6 sm:px-6 lg:px-8">
        <CrewOverview />
        <form className="rounded-2xl border border-white/10 bg-[#101a33] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)] sm:p-5" onSubmit={searchProjects} role="search">
          <label className="mb-2 block text-xs font-semibold text-white/70" htmlFor="project-search">Search projects and tenders</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#c77b00]"><Icon name="search" size={18} /></span>
              <input
                className="min-h-11 w-full rounded-lg border border-white/10 bg-[#0b1429] pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20"
                id="project-search"
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Search active RFP tender packages, scopes of work, or project principals (e.g., BHP Expansion, Rio Tinto)..."
                type="search"
                value={query}
              />
            </div>
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#fca311] px-5 text-sm font-bold text-[#0b132b] transition hover:bg-[#ffb02e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fca311]" type="submit">
              <Icon name="search" size={16} /> Search Projects
            </button>
          </div>
          {searchMessage && <p aria-live="polite" className="mt-2 text-xs text-white/50">{searchMessage}</p>}
        </form>

        <ComplianceHub />
        <PredictiveExpiry />
        <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-5 xl:gap-6">
          <div className="grid min-w-0 xl:col-span-2"><AwardTracking /></div>
          <div className="min-w-0 xl:col-span-3" id="mobilisation-pipeline"><MobilizationPipeline query={submittedQuery} /></div>
        </div>
        <InductionsPanel />
      </main>
      <footer className="mt-8 border-t border-white/10 bg-[#0b132b]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <span className="font-extrabold tracking-tight text-white">Fly<span className="text-[#fca311]">In</span> <span className="font-normal text-white/35">Subcontractor workspace</span></span>
          <span>Workforce compliance for Australia&apos;s heavy industry.</span>
          <a className="font-semibold transition hover:text-white" href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
