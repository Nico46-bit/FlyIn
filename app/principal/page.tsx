"use client";

import { useMemo, useState } from "react";

type HubId = "pilbara" | "bowen" | "olympic";
type Status = "Verified" | "Expiring Soon" | "Action Required";
type EventType = "Incident" | "Hazard" | "Safety brief" | "Fatigue";
type Supplier = {
  id: string;
  name: string;
  rating: string;
  specialty: string;
  location: string;
  distance: number;
  available: number;
  supplyNation: boolean;
  publicLiability: boolean;
};
type VaultEntity = {
  id: string;
  name: string;
  work: string;
  people: number;
  contract: string;
  abn: string;
  worksafe: Status;
  slavery: Status;
  insurances: Status;
  details: { title: string; value: string; source: string; status: Status }[];
};

const hubs: {
  id: HubId;
  name: string;
  shortName: string;
  description: string;
  region: string;
  crews: number;
  personnel: number;
  contentSpend: number;
  target: number;
  zeroHarmDays: number;
  trifr: string;
  auditEntities: number;
  openPackages: number;
  verified: number;
  supplierCount: number;
  readyWorkers: number;
  radius: number;
}[] = [
  {
    id: "pilbara",
    name: "Pilbara Hub — Port Hedland / Newman, WA",
    shortName: "Pilbara Hub",
    description: "Tier-1 Iron Ore Operations · Port Hedland / Newman, WA",
    region: "PILBARA HUB",
    crews: 42,
    personnel: 318,
    contentSpend: 38.4,
    target: 35,
    zeroHarmDays: 214,
    trifr: "2.1",
    auditEntities: 5,
    openPackages: 12,
    verified: 96,
    supplierCount: 5,
    readyWorkers: 51,
    radius: 150,
  },
  {
    id: "bowen",
    name: "Bowen Basin — Moranbah / Dysart, QLD",
    shortName: "Bowen Basin",
    description: "Metallurgical coal and energy operations · Moranbah / Dysart, QLD",
    region: "BOWEN BASIN",
    crews: 28,
    personnel: 206,
    contentSpend: 32.1,
    target: 30,
    zeroHarmDays: 128,
    trifr: "2.8",
    auditEntities: 4,
    openPackages: 8,
    verified: 93,
    supplierCount: 4,
    readyWorkers: 36,
    radius: 120,
  },
  {
    id: "olympic",
    name: "Olympic Dam — Roxby Downs, SA",
    shortName: "Olympic Dam",
    description: "Copper, uranium and critical minerals · Roxby Downs, SA",
    region: "OLYMPIC DAM",
    crews: 19,
    personnel: 142,
    contentSpend: 29.6,
    target: 25,
    zeroHarmDays: 302,
    trifr: "1.4",
    auditEntities: 3,
    openPackages: 6,
    verified: 98,
    supplierCount: 3,
    readyWorkers: 27,
    radius: 180,
  },
];

const suppliersByHub: Record<HubId, Supplier[]> = {
  pilbara: [
    { id: "SC-8802", name: "Ngarluma Civil & Earthmoving", rating: "4.9", specialty: "Civil / Earthmoving", location: "Roebourne", distance: 38, available: 12, supplyNation: true, publicLiability: true },
    { id: "SC-8803", name: "Hedland Rigging Services", rating: "4.7", specialty: "Rigging / Dogging", location: "South Hedland", distance: 12, available: 6, supplyNation: false, publicLiability: true },
    { id: "SC-8806", name: "Kariyarra Electrical Group", rating: "4.8", specialty: "Electrical / Instrumentation", location: "Port Hedland", distance: 8, available: 9, supplyNation: true, publicLiability: true },
    { id: "SC-8804", name: "Newman Mechanical Fitters", rating: "4.5", specialty: "Mechanical / Shutdown", location: "Newman", distance: 22, available: 14, supplyNation: false, publicLiability: true },
    { id: "SC-8807", name: "Yinhawangka Maintenance Services", rating: "4.9", specialty: "Fixed Plant Maintenance", location: "Tom Price", distance: 71, available: 10, supplyNation: true, publicLiability: true },
  ],
  bowen: [
    { id: "SC-7712", name: "Barada Industrial Services", rating: "4.8", specialty: "Civil / Earthmoving", location: "Moranbah", distance: 18, available: 11, supplyNation: true, publicLiability: true },
    { id: "SC-7714", name: "Dysart Mechanical & Field Crew", rating: "4.6", specialty: "Mechanical / Shutdown", location: "Dysart", distance: 13, available: 8, supplyNation: false, publicLiability: true },
    { id: "SC-7717", name: "Isaac Valley Electrical", rating: "4.7", specialty: "Electrical / Instrumentation", location: "Moranbah", distance: 21, available: 7, supplyNation: false, publicLiability: true },
    { id: "SC-7719", name: "Wiri Workforce Solutions", rating: "4.9", specialty: "Mine operations support", location: "Coppabella", distance: 46, available: 10, supplyNation: true, publicLiability: true },
  ],
  olympic: [
    { id: "SC-6605", name: "Kokatha Civil Projects", rating: "4.9", specialty: "Civil / Earthworks", location: "Roxby Downs", distance: 12, available: 9, supplyNation: true, publicLiability: true },
    { id: "SC-6608", name: "Far North Electrical Services", rating: "4.7", specialty: "Electrical / Instrumentation", location: "Roxby Downs", distance: 9, available: 8, supplyNation: false, publicLiability: true },
    { id: "SC-6611", name: "Adnyamathanha Plant Maintenance", rating: "4.8", specialty: "Fixed Plant Maintenance", location: "Leigh Creek", distance: 79, available: 10, supplyNation: true, publicLiability: true },
  ],
};

const pilbaraRadarTargets = [
  { name: "Ngarluma Civil & Earthmoving", distance: 38, bearing: 225, dot: "bg-emerald-300", glow: "bg-amber-400/60", text: "text-emerald-300" },
  { name: "Hedland Rigging Services", distance: 12, bearing: 315, dot: "bg-cyan-300", glow: "bg-cyan-400/60", text: "text-cyan-300" },
  { name: "Kariyarra Electrical Group", distance: 8, bearing: 90, dot: "bg-emerald-300", glow: "bg-emerald-400/60", text: "text-emerald-300" },
  { name: "Newman Mechanical Fitters", distance: 22, bearing: 45, dot: "bg-orange-300", glow: "bg-orange-400/60", text: "text-orange-300" },
];

const events: {
  id: string;
  time: string;
  type: EventType;
  title: string;
  location: string;
  status: "Compliant" | "Monitor" | "Escalated";
}[] = [
  { id: "EV-5521", time: "07:42", type: "Safety brief", title: "Pre-start safety brief completed — 42/42 crews", location: "All Pilbara sites · HSEC Coordinator", status: "Compliant" },
  { id: "EV-5520", time: "07:18", type: "Fatigue", title: "Fatigue flag: operator at 6th consecutive night shift", location: "Port Hedland Stockyard · Hedland Rigging Services", status: "Monitor" },
  { id: "EV-5519", time: "06:55", type: "Hazard", title: "Hazard report: missing toe-board on scaffold Bay 4", location: "Yandi Conveyor CV-14 · Red Dirt Scaffolding Co.", status: "Monitor" },
  { id: "EV-5518", time: "06:31", type: "Incident", title: "Near miss: suspended load swing during tandem lift", location: "Stacker-reclaimer SR-2 · Hedland Rigging Services", status: "Escalated" },
  { id: "EV-5517", time: "06:05", type: "Safety brief", title: "Confined space permit brief signed — 6 entrants", location: "Newman Primary Crusher · Newman Mechanical Fitters", status: "Compliant" },
  { id: "EV-5516", time: "05:48", type: "Fatigue", title: "Fitness-for-work checks: 318 of 318 cleared", location: "Gate 1 & 2 turnstiles · Site Access Control", status: "Compliant" },
];

const vaultByHub: Record<HubId, VaultEntity[]> = {
  pilbara: [
    { id: "SC-8805", name: "Red Dirt Scaffolding Co.", work: "Access scaffolding", people: 14, contract: "$890k", abn: "ABN 64 103 557 821", worksafe: "Action Required", slavery: "Verified", insurances: "Action Required", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active — GST registered since 2019", source: "ABR & ASIC Connect · Checked 2026-09-28 04:00", status: "Verified" }, { title: "WorkSafe Live Check", value: "Licence renewal evidence missing", source: "State WHS regulator feed · Checked 2026-09-28 04:02", status: "Action Required" }, { title: "Modern Slavery Act Compliance Sign-off", value: "FY26 statement signed by director", source: "Modern Slavery Act 2018 (Cth) · Checked 2026-07-14", status: "Verified" }] },
    { id: "SC-8801", name: "Pilbara Iron Ore Crew", work: "Conveyor maintenance", people: 8, contract: "$1.48M", abn: "ABN 51 824 753 556 · ACN 824 753 556", worksafe: "Verified", slavery: "Expiring Soon", insurances: "Verified", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active — GST registered", source: "ABR & ASIC Connect · Checked 2026-09-28 04:00", status: "Verified" }, { title: "WorkSafe Live Check", value: "All high-risk work licences current", source: "State WHS regulator feed · Checked 2026-09-28 04:02", status: "Verified" }, { title: "Modern Slavery Act Compliance Sign-off", value: "FY26 statement renewal due within 30 days", source: "Modern Slavery Act 2018 (Cth) · Checked 2026-09-28", status: "Expiring Soon" }] },
    { id: "SC-8802", name: "Ngarluma Civil & Earthmoving", work: "Haul road civil works", people: 24, contract: "$4.92M", abn: "ABN 38 611 204 952", worksafe: "Verified", slavery: "Verified", insurances: "Verified", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active — GST registered", source: "ABR & ASIC Connect · Checked 2026-09-28 04:00", status: "Verified" }, { title: "WorkSafe Live Check", value: "All required licences verified", source: "State WHS regulator feed · Checked 2026-09-28 04:02", status: "Verified" }, { title: "Modern Slavery Act Compliance Sign-off", value: "Current supplier declaration on file", source: "Supplier declaration · Checked 2026-08-12", status: "Verified" }] },
    { id: "SC-8803", name: "Hedland Rigging Services", work: "Heavy lift & rigging", people: 11, contract: "$2.15M", abn: "ABN 82 054 712 001", worksafe: "Verified", slavery: "Action Required", insurances: "Verified", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active — GST registered", source: "ABR & ASIC Connect · Checked 2026-09-28 04:00", status: "Verified" }, { title: "WorkSafe Live Check", value: "High-risk work licences current", source: "State WHS regulator feed · Checked 2026-09-28 04:02", status: "Verified" }, { title: "Modern Slavery Act Compliance Sign-off", value: "Updated supplier declaration requested", source: "Supplier declaration · Follow-up required", status: "Action Required" }] },
    { id: "SC-8804", name: "Newman Mechanical Fitters", work: "Shutdown mechanical", people: 36, contract: "$6.31M", abn: "ABN 24 510 318 490", worksafe: "Verified", slavery: "Verified", insurances: "Expiring Soon", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active — GST registered", source: "ABR & ASIC Connect · Checked 2026-09-28 04:00", status: "Verified" }, { title: "WorkSafe Live Check", value: "All required licences verified", source: "State WHS regulator feed · Checked 2026-09-28 04:02", status: "Verified" }, { title: "Public Liability Insurance", value: "$20M AUD policy renewal due soon", source: "Certificate of Currency · Review required", status: "Expiring Soon" }] },
  ],
  bowen: [
    { id: "SC-7710", name: "Isaac Basin Mine Services", work: "Mine operations support", people: 18, contract: "$2.84M", abn: "ABN 41 218 778 052", worksafe: "Verified", slavery: "Verified", insurances: "Verified", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active — GST registered", source: "ABR & ASIC Connect · Checked 2026-09-28", status: "Verified" }, { title: "WorkSafe Live Check", value: "Licences current", source: "Queensland WHS feed · Checked 2026-09-28", status: "Verified" }, { title: "Modern Slavery Act Compliance Sign-off", value: "FY26 declaration verified", source: "Supplier declaration · Checked 2026-08-12", status: "Verified" }] },
    { id: "SC-7712", name: "Barada Industrial Services", work: "Civil / Earthmoving", people: 22, contract: "$3.18M", abn: "ABN 61 402 119 837", worksafe: "Expiring Soon", slavery: "Verified", insurances: "Verified", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active — GST registered", source: "ABR & ASIC Connect · Checked 2026-09-28", status: "Verified" }, { title: "WorkSafe Live Check", value: "One high-risk ticket renewal approaching", source: "Queensland WHS feed · Review due 2026-10-18", status: "Expiring Soon" }, { title: "Modern Slavery Act Compliance Sign-off", value: "FY26 declaration verified", source: "Supplier declaration · Checked 2026-08-12", status: "Verified" }] },
    { id: "SC-7714", name: "Dysart Mechanical & Field Crew", work: "Shutdown mechanical", people: 16, contract: "$2.47M", abn: "ABN 75 119 048 433", worksafe: "Verified", slavery: "Action Required", insurances: "Verified", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active — GST registered", source: "ABR & ASIC Connect · Checked 2026-09-28", status: "Verified" }, { title: "WorkSafe Live Check", value: "Tickets current", source: "Queensland WHS feed · Checked 2026-09-28", status: "Verified" }, { title: "Modern Slavery Act Compliance Sign-off", value: "Supplier declaration overdue", source: "Supplier portal · Follow-up required", status: "Action Required" }] },
    { id: "SC-7717", name: "Isaac Valley Electrical", work: "Electrical / Instrumentation", people: 12, contract: "$1.88M", abn: "ABN 31 905 882 142", worksafe: "Verified", slavery: "Verified", insurances: "Verified", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active", source: "ABR & ASIC Connect · Checked 2026-09-28", status: "Verified" }, { title: "WorkSafe Live Check", value: "Electrical licences current", source: "Queensland WHS feed · Checked 2026-09-28", status: "Verified" }, { title: "Modern Slavery Act Compliance Sign-off", value: "FY26 declaration verified", source: "Supplier declaration · Checked 2026-08-12", status: "Verified" }] },
  ],
  olympic: [
    { id: "SC-6605", name: "Kokatha Civil Projects", work: "Civil / Earthworks", people: 20, contract: "$3.72M", abn: "ABN 96 103 770 212", worksafe: "Verified", slavery: "Verified", insurances: "Verified", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active — GST registered", source: "ABR & ASIC Connect · Checked 2026-09-28", status: "Verified" }, { title: "WorkSafe Live Check", value: "Licences current", source: "South Australia WHS feed · Checked 2026-09-28", status: "Verified" }, { title: "Modern Slavery Act Compliance Sign-off", value: "FY26 statement current", source: "Supplier declaration · Checked 2026-08-12", status: "Verified" }] },
    { id: "SC-6608", name: "Far North Electrical Services", work: "Electrical / Instrumentation", people: 15, contract: "$2.14M", abn: "ABN 51 840 327 915", worksafe: "Verified", slavery: "Expiring Soon", insurances: "Verified", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active — GST registered", source: "ABR & ASIC Connect · Checked 2026-09-28", status: "Verified" }, { title: "WorkSafe Live Check", value: "Electrical licences current", source: "South Australia WHS feed · Checked 2026-09-28", status: "Verified" }, { title: "Modern Slavery Act Compliance Sign-off", value: "Annual statement review due", source: "Supplier declaration · Renewal requested", status: "Expiring Soon" }] },
    { id: "SC-6611", name: "Adnyamathanha Plant Maintenance", work: "Fixed plant maintenance", people: 17, contract: "$2.65M", abn: "ABN 69 317 662 409", worksafe: "Verified", slavery: "Verified", insurances: "Verified", details: [{ title: "Federal ABN/ACN Registry Status", value: "Active", source: "ABR & ASIC Connect · Checked 2026-09-28", status: "Verified" }, { title: "WorkSafe Live Check", value: "Plant maintenance licences current", source: "South Australia WHS feed · Checked 2026-09-28", status: "Verified" }, { title: "Modern Slavery Act Compliance Sign-off", value: "FY26 declaration current", source: "Supplier declaration · Checked 2026-08-12", status: "Verified" }] },
  ],
};

function Icon({ name, size = 18 }: { name: "plane" | "building" | "pin" | "users" | "shield" | "clock" | "search" | "arrow" | "check" | "alert" | "calendar" | "briefcase" | "file" | "trend" | "download" | "filter" | "heart" | "plus" | "close"; size?: number }) {
  const paths: Record<typeof name, React.ReactNode> = {
    plane: <><path d="m3 11 18-8-8 18-2.4-7.6L3 11Z" /><path d="m10.6 13.4 4.1-4.1" /></>,
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
    trend: <><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>,
    filter: <><path d="M4 7h16M7 12h10m-7 5h4" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  };
  return <svg aria-hidden="true" className="shrink-0" fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width={size}>{paths[name]}</svg>;
}

function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "green" | "amber" | "red" | "blue" | "slate" }) {
  const palette = {
    green: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    amber: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    red: "border-rose-400/20 bg-rose-400/10 text-rose-300",
    blue: "border-sky-400/20 bg-sky-400/10 text-sky-300",
    slate: "border-white/10 bg-white/[0.06] text-white/65",
  };
  const dot = { green: "bg-emerald-400", amber: "bg-amber-400", red: "bg-rose-400", blue: "bg-sky-400", slate: "bg-white/35" };
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold ${palette[tone]}`}><span className={`h-1.5 w-1.5 rounded-full ${dot[tone]}`} />{children}</span>;
}

function Card({ children, className = "", ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={`overflow-hidden rounded-2xl border border-white/10 bg-[#101a33] shadow-[0_18px_48px_rgba(0,0,0,0.2)] ${className}`} {...props}>{children}</section>;
}

function PanelTitle({ icon, title, detail, right }: { icon: Parameters<typeof Icon>[0]["name"]; title: string; detail: string; right?: React.ReactNode }) {
  return <header className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-flyin/20 bg-flyin/10 text-flyin"><Icon name={icon} size={18} /></span><div><h2 className="text-sm font-bold text-white sm:text-base">{title}</h2><p className="mt-1 text-xs leading-5 text-white/45">{detail}</p></div></div>{right}</header>;
}

function Progress({ value, label, color = "bg-emerald-400" }: { value: number; label: string; color?: string }) {
  return <div aria-label={label} aria-valuemax={100} aria-valuemin={0} aria-valuenow={value} className="h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar"><span className={`block h-full rounded-full transition-[width] duration-500 ${color}`} style={{ width: `${value}%` }} /></div>;
}

function statusTone(status: Status): "green" | "amber" | "red" {
  return status === "Verified" ? "green" : status === "Expiring Soon" ? "amber" : "red";
}

function PrincipalOverview({ hub, onHubChange }: { hub: (typeof hubs)[number]; onHubChange: (id: HubId) => void }) {
  const metrics = [
    { label: "Outsourced crews", value: hub.crews, note: `${hub.auditEntities} under active audit in vault`, tone: "blue" },
    { label: "On-site personnel", value: hub.personnel, note: "All passed fitness-for-work at gate", tone: "green" },
    { label: "Local content spend", value: `${hub.contentSpend}%`, note: `Target ${hub.target}% · optimised above target`, tone: "orange" },
    { label: "HSEC zero harm", value: `${hub.zeroHarmDays} days`, note: `LTI-free · TRIFR ${hub.trifr} (rolling 12-mo)`, tone: "purple" },
  ];
  const toneClasses: Record<string, string> = {
    blue: "border-sky-400/20 bg-sky-400/10 text-sky-300",
    green: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    orange: "border-flyin/20 bg-flyin/10 text-flyin",
    purple: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  };
  return (
    <>
      <section className="rounded-2xl border border-white/10 bg-[#080f21] p-5 text-white shadow-[0_20px_55px_rgba(0,0,0,0.22)] sm:p-6">
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-flyin">Principal procurement hub</p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{hub.shortName} Megaproject</h1>
            <p className="mt-2 text-sm text-white/55">{hub.description}</p>
          </div>
          <label className="block w-full xl:max-w-sm">
            <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/45">Megaproject hub</span>
            <select className="min-h-11 w-full rounded-lg border border-white/10 bg-[#101a33] px-3 text-sm font-semibold text-white outline-none transition focus:border-flyin" onChange={(event) => onHubChange(event.currentTarget.value as HubId)} value={hub.id}>
              {hubs.map((option) => <option className="bg-[#101a33]" key={option.id} value={option.id}>{option.name}</option>)}
            </select>
          </label>
        </div>
      </section>
      <section aria-label="Principal overview metrics" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article className="rounded-2xl border border-white/10 bg-[#101a33] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:p-5" key={metric.label}>
            <div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold text-white/50">{metric.label}</p><span className={`grid h-8 w-8 place-items-center rounded-lg border ${toneClasses[metric.tone]}`}><Icon name={metric.tone === "blue" ? "briefcase" : metric.tone === "green" ? "users" : metric.tone === "orange" ? "trend" : "shield"} size={16} /></span></div>
            <p className="mt-3 text-2xl font-extrabold tracking-tight text-white">{metric.value}</p>
            <p className="mt-1.5 text-[0.68rem] leading-4 text-white/40">{metric.note}</p>
          </article>
        ))}
      </section>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Open project packages", value: hub.openPackages, caption: "Across active regional opportunities", pct: Math.min(100, 50 + hub.openPackages * 3), color: "bg-flyin" },
          { label: "Regional hubs active", value: "3 / 3", caption: "WA · QLD · SA procurement coverage", pct: 100, color: "bg-emerald-400" },
          { label: "Compliance status", value: `${hub.verified}%`, caption: `${hub.auditEntities} suppliers in the active compliance vault`, pct: hub.verified, color: "bg-sky-400" },
        ].map((item) => <article className="rounded-xl border border-white/10 bg-[#0d162d] p-4" key={item.label}><div className="flex items-end justify-between gap-3"><div><p className="text-xs font-semibold text-white/50">{item.label}</p><p className="mt-2 text-xl font-bold text-white">{item.value}</p></div><span className="text-[0.65rem] text-white/35">{item.caption}</span></div><div className="mt-3"><Progress label={item.label} value={item.pct} color={item.color} /></div></article>)}
      </div>
    </>
  );
}

function SourcingTerminal({ hub, query, onSource }: { hub: (typeof hubs)[number]; query: string; onSource: (name: string) => void }) {
  const [state, setState] = useState("All");
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [radius, setRadius] = useState(hub.radius);
  const [maxDistance, setMaxDistance] = useState(250);
  const [selectedRadarTarget, setSelectedRadarTarget] = useState<(typeof pilbaraRadarTargets)[number] | null>(null);
  const radarGridScale = maxDistance > 0 ? Math.min(250 / maxDistance, 3) : 3;
  const suppliers = useMemo(() => suppliersByHub[hub.id].filter((supplier) => {
    const matchesSearch = `${supplier.name} ${supplier.specialty} ${supplier.location}`.toLowerCase().includes(query.toLowerCase());
    const matchesState = state === "All" || state === (hub.id === "pilbara" ? "WA" : hub.id === "bowen" ? "QLD" : "SA");
    return matchesSearch && matchesState && supplier.distance <= radius && (!certifiedOnly || supplier.supplyNation);
  }), [hub.id, query, radius, state, certifiedOnly]);
  return (
    <Card className="h-full">
      <PanelTitle icon="search" title="Live Regional Availability & Sourcing" detail="Find verified subcontractors by location, capability, and compliance posture." right={<Badge tone="green">LIVE · {hub.region}</Badge>} />
      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0b1429] p-3">
          <div><p className="text-xs font-bold text-white">{hub.region} · {hub.supplierCount} crews · {hub.readyWorkers} workers ready</p><p className="mt-1 text-[0.65rem] text-white/40">Showing active suppliers inside the selected operating radius</p></div>
          <div className="flex flex-wrap gap-1.5">{["WA", "QLD", "SA"].map((region) => <button aria-pressed={state === region} className={`rounded-md border px-2.5 py-1 text-[0.65rem] font-bold transition ${state === region ? "border-flyin/40 bg-flyin/10 text-flyin" : "border-white/10 text-white/45 hover:bg-white/5"}`} key={region} onClick={() => setState(state === region ? "All" : region)} type="button">{region}</button>)}</div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <button aria-pressed={certifiedOnly} className={`rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold transition ${certifiedOnly ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-white/10 text-white/50 hover:border-white/20"}`} onClick={() => setCertifiedOnly((value) => !value)} type="button">Supply Nation Certified</button>
            <Badge tone="blue">ABN/ACN Validated</Badge>
            <Badge tone="green">$20M Public Liability</Badge>
          </div>
          <label className="flex min-w-40 items-center gap-3 text-[0.65rem] text-white/50">Radius <input aria-label="Sourcing radius in kilometres" className="w-24 accent-[#fca311]" max={300} min={25} onChange={(event) => setRadius(Number(event.currentTarget.value))} step={25} type="range" value={radius} /><strong className="whitespace-nowrap text-white">{radius} km</strong></label>
        </div>
        <div className="space-y-2">
          {suppliers.map((supplier) => (
            <article className="rounded-xl border border-white/10 bg-[#0d162d] p-3.5 transition hover:border-white/20 sm:p-4" key={supplier.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2"><h3 className="text-xs font-bold text-white sm:text-sm">{supplier.name}</h3><span className="inline-flex items-center gap-1 rounded-full border border-flyin/20 bg-flyin/10 px-2 py-0.5 text-[0.65rem] font-bold text-flyin"><span aria-hidden="true">★</span>{supplier.rating}</span></div>
                  <p className="mt-1.5 text-[0.68rem] text-white/50">{supplier.specialty} · {supplier.location} · {supplier.distance} km · <strong className="text-white/75">{supplier.available} avail.</strong></p>
                  <div className="mt-2 flex flex-wrap gap-1.5">{supplier.supplyNation && <Badge tone="green">Supply Nation</Badge>}<Badge tone="blue">ABN/ACN</Badge>{supplier.publicLiability && <Badge tone="green">$20M PL</Badge>}</div>
                </div>
                <button className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-flyin px-3 py-2 text-xs font-bold text-[#0b132b] transition hover:bg-orange-300" onClick={() => onSource(supplier.name)} type="button"><Icon name="plus" size={14} /> Source crew</button>
              </div>
            </article>
          ))}
          {suppliers.length === 0 && <p className="rounded-xl border border-white/10 bg-[#0d162d] px-4 py-8 text-center text-xs text-white/45">No suppliers match the selected filters for this hub.</p>}
        </div>
        {hub.id === "pilbara" && (
          <div className="space-y-3">
          <label className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-[#0b1429] px-3.5 py-3">
            <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-white/45">Radius</span>
            <input
              aria-label="Radar subcontractor distance limit in kilometres"
              className="h-1.5 min-w-28 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-[#fca311]"
              max={250}
              min={0}
              onChange={(event) => {
                const distance = Number(event.currentTarget.value);
                setMaxDistance(distance);
                setSelectedRadarTarget((current) => current && current.distance > distance ? null : current);
              }}
              step={1}
              type="range"
              value={maxDistance}
            />
            <span className="min-w-16 rounded-md border border-flyin/25 bg-flyin/10 px-2.5 py-1 text-center text-[0.65rem] font-bold tabular-nums text-flyin">{maxDistance} km</span>
          </label>
          <section aria-labelledby="pilbara-radar-title" className="rounded-xl border border-white/10 bg-[#0b1429] p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-white" id="pilbara-radar-title">Pilbara Hub · Live crew radar</h3>
                <p className="mt-1 text-[0.63rem] text-white/40">Active subcontractor groups by distance</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-wide text-emerald-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                Live
              </span>
            </div>
            <div className="mx-auto mt-4 aspect-square w-full max-w-[17rem]">
              <div aria-label="Pilbara Hub subcontractor radar" className="relative h-full w-full overflow-hidden rounded-full border border-emerald-400/30 bg-[radial-gradient(circle,rgba(16,185,129,0.12)_0%,rgba(11,20,41,0.85)_68%)]">
                {[12, 27, 42].map((baseInset, index) => {
                  const scaledInset = 50 - (50 - baseInset) * radarGridScale;
                  return (
                    <div
                      aria-hidden="true"
                      className={`absolute rounded-full border transition-[inset,opacity] duration-300 ease-out ${index === 0 ? "border-emerald-300/15" : index === 1 ? "border-emerald-300/20" : "border-emerald-300/25"}`}
                      key={baseInset}
                      style={{
                        inset: `${scaledInset}%`,
                        opacity: maxDistance === 0 ? 0.45 : 0.7 + (maxDistance / 250) * 0.3,
                      }}
                    />
                  );
                })}
                <div aria-hidden="true" className="absolute left-1/2 top-0 h-full border-l border-dashed border-emerald-300/15" />
                <div aria-hidden="true" className="absolute left-0 top-1/2 w-full border-t border-dashed border-emerald-300/15" />
                <div aria-hidden="true" className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_292deg,rgba(16,185,129,0.02)_330deg,rgba(16,185,129,0.18)_360deg)]" />
                <div aria-hidden="true" className="absolute left-1/2 top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-flyin shadow-[0_0_14px_rgba(252,163,17,0.8)]" />
                <span className="absolute left-1/2 top-[calc(50%+0.75rem)] z-10 -translate-x-1/2 whitespace-nowrap rounded bg-[#0b1429]/80 px-1.5 py-0.5 text-[0.52rem] font-bold uppercase tracking-wider text-white/55">Pilbara Hub</span>
                {pilbaraRadarTargets.map((target) => (
                  (() => {
                    const inRange = target.distance <= maxDistance;
                    const distancePercent = maxDistance > 0 ? (target.distance / maxDistance) * 100 : 0;
                    const angle = (target.bearing * Math.PI) / 180;
                    const offset = distancePercent / 2;
                    const left = 50 + Math.cos(angle) * offset;
                    const top = 50 + Math.sin(angle) * offset;
                    return (
                      <button
                        aria-label={`${target.name}, ${target.distance} kilometres from Pilbara Hub`}
                        aria-pressed={selectedRadarTarget?.name === target.name}
                        className={`group absolute z-20 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-[left,top,opacity] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white ${inRange ? "opacity-100" : "pointer-events-none opacity-0"}`}
                        disabled={!inRange}
                        key={target.name}
                        onClick={() => setSelectedRadarTarget(target)}
                        style={{ left: `${left}%`, opacity: inRange ? 1 : 0, top: `${top}%` }}
                        title={`${target.name} · ${target.distance} km away`}
                        type="button"
                      >
                        <span aria-hidden="true" className={`absolute h-5 w-5 animate-ping rounded-full ${target.glow}`} />
                        <span aria-hidden="true" className={`relative h-2.5 w-2.5 rounded-full ${target.dot} shadow-[0_0_10px_currentColor] transition-transform group-hover:scale-150`} />
                      </button>
                    );
                  })()
                ))}
              </div>
            </div>
            <p aria-live="polite" className="mt-3 min-h-4 text-center text-[0.65rem] text-white/65">
              {selectedRadarTarget && selectedRadarTarget.distance <= maxDistance ? <><span className={`font-semibold ${selectedRadarTarget.text}`}>{selectedRadarTarget.name}</span> · {selectedRadarTarget.distance} km away</> : "Select a radar blip to view crew distance"}
            </p>
            <ul aria-label="Mapped subcontractor groups" className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {pilbaraRadarTargets.map((target) => (
                <li key={target.name}>
                  <button
                    aria-hidden={target.distance > maxDistance}
                    className={`flex min-h-9 w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-opacity duration-300 ${selectedRadarTarget?.name === target.name ? "border-white/20 bg-white/[0.06]" : "border-white/5 bg-[#101a33]"} ${target.distance <= maxDistance ? "opacity-100 hover:border-white/15" : "pointer-events-none opacity-0"}`}
                    disabled={target.distance > maxDistance}
                    onClick={() => setSelectedRadarTarget(target)}
                    style={{ opacity: target.distance <= maxDistance ? 1 : 0 }}
                    type="button"
                  >
                    <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${target.dot} shadow-[0_0_8px_currentColor]`} />
                    <span className="min-w-0 flex-1 truncate text-[0.6rem] font-medium text-white/75">{target.name}</span>
                    <span className={`shrink-0 text-[0.58rem] font-bold ${target.text}`}>{target.distance} km</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
          </div>
        )}
      </div>
    </Card>
  );
}

function HsecControlRoom() {
  const [eventFilter, setEventFilter] = useState<"All events" | EventType>("All events");
  const [acknowledged, setAcknowledged] = useState<string[]>([]);
  const filteredEvents = events.filter((event) => eventFilter === "All events" || event.type === eventFilter);
  const eventFilters: ("All events" | EventType)[] = ["All events", "Incident", "Hazard", "Safety brief", "Fatigue"];
  function acknowledge(eventId: string) {
    setAcknowledged((current) => current.includes(eventId) ? current : [...current, eventId]);
  }
  const eventTone = (event: (typeof events)[number]) => event.status === "Escalated" ? "red" : event.status === "Monitor" ? "amber" : "green";
  return (
    <Card className="h-full">
      <PanelTitle icon="shield" title="HSEC Operational Control Room" detail="Real-time incidents, safety brief compliance, and fatigue roster checks." />
      <div className="space-y-4 p-4 sm:p-5">
        <dl className="grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/10 bg-[#0b1429] py-3">
          {[["Open issues", "3"], ["Briefs signed", "2/2"], ["Fatigue flags", "1"]].map(([label, value]) => <div className="px-2 text-center" key={label}><dt className="text-[0.62rem] leading-4 text-white/45">{label}</dt><dd className="mt-1 text-lg font-bold text-white">{value}</dd></div>)}
        </dl>
        <section className="rounded-xl border border-white/10 bg-[#0b1429] p-3.5" aria-labelledby="fit-clearances-title">
          <div className="flex items-center justify-between gap-2"><h3 className="flex items-center gap-2 text-xs font-bold text-white" id="fit-clearances-title"><Icon name="heart" size={14} /> Fit for Work Clearances</h3><Badge tone="green">Live</Badge></div>
          <p className="mt-3 text-2xl font-extrabold text-emerald-300">97.8% cleared</p>
          {[["Pre-employment medicals current", 314, 318], ["Drug & alcohol screening current", 312, 318]].map(([label, count, total]) => <div className="mt-3" key={String(label)}><div className="mb-1.5 flex justify-between gap-2 text-[0.63rem]"><span className="text-white/55">{label}</span><span className="font-semibold text-white/80">{count}/{total}</span></div><Progress label={String(label)} value={Math.round(Number(count) / Number(total) * 100)} color="bg-emerald-400" /></div>)}
          <p className="mt-3 text-[0.62rem] text-white/35">Last screen 2026-09-28 05:40 · Next random 2026-10-02</p>
        </section>
        <section className="rounded-xl border border-rose-400/20 bg-rose-400/[0.04] p-3.5" aria-labelledby="cor-title">
          <div className="flex items-center justify-between gap-2"><h3 className="flex items-center gap-2 text-xs font-bold text-white" id="cor-title"><Icon name="alert" size={14} /> Chain of Responsibility</h3><Badge tone="red">1 breach</Badge></div>
          <p className="mt-1.5 text-[0.63rem] text-white/45">Fatigue management · 46 heavy vehicle drivers monitored</p>
          <ul className="mt-3 space-y-2">
            <li className="rounded-lg border border-white/10 bg-[#101a33] p-2.5"><p className="text-[0.68rem] font-bold text-white">R. Castellano <span className="font-normal text-white/40">COR-1182</span></p><p className="mt-1 text-[0.62rem] leading-4 text-rose-200/80">Standard Hours · 12h work in 24h — Exceeded by 34 min — mandatory 7h rest enforced</p><p className="mt-1 text-[0.6rem] text-white/35">Road train · Newman → Port Hedland ore haul</p></li>
            <li className="rounded-lg border border-white/10 bg-[#101a33] p-2.5"><p className="text-[0.68rem] font-bold text-white">T. Whitehurst <span className="font-normal text-white/40">COR-1179</span></p><p className="mt-1 text-[0.62rem] leading-4 text-amber-200/80">Minimum 15 min rest per 5h15m — Rest break logged 9 min late — supervisor notified</p><p className="mt-1 text-[0.6rem] text-white/35">Float transport · shutdown plant mobilisation</p></li>
          </ul>
        </section>
        <div aria-label="Filter events" className="flex flex-wrap gap-1 rounded-lg border border-white/10 bg-[#0b1429] p-1" role="group">
          {eventFilters.map((filter) => <button aria-pressed={eventFilter === filter} className={`rounded-md px-2 py-1.5 text-[0.6rem] font-semibold transition ${eventFilter === filter ? "bg-white/10 text-white" : "text-white/45 hover:text-white"}`} key={filter} onClick={() => setEventFilter(filter)} type="button">{filter}</button>)}
        </div>
        <ul className="divide-y divide-white/10">
          {filteredEvents.map((event) => {
            const done = acknowledged.includes(event.id);
            return <li className="grid grid-cols-[3.1rem_minmax(0,1fr)] gap-2 py-3 first:pt-0" key={event.id}>
              <div className="flex flex-col items-center"><span className="text-[0.62rem] font-bold text-white/65">{event.time}</span><span className={`mt-2 h-2 w-2 rounded-full ${event.type === "Incident" ? "bg-rose-400" : event.type === "Hazard" ? "bg-amber-400" : event.type === "Fatigue" ? "bg-violet-400" : "bg-emerald-400"}`} /></div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2"><span className="text-[0.58rem] font-extrabold uppercase tracking-wide text-flyin">{event.type}</span><span className="font-mono text-[0.58rem] text-white/35">{event.id}</span></div>
                <p className="mt-1 text-[0.68rem] font-semibold leading-4 text-white/85">{event.title}</p>
                <p className="mt-1 text-[0.6rem] leading-4 text-white/40">{event.location}</p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2"><Badge tone={eventTone(event)}>{done ? "Acknowledged" : event.status}</Badge>{event.status !== "Compliant" && <button className="rounded-md border border-white/10 px-2 py-1 text-[0.6rem] font-semibold text-white/60 transition hover:bg-white/10 hover:text-white" disabled={done} onClick={() => acknowledge(event.id)} type="button">{done ? "Acknowledged" : "Acknowledge"}</button>}</div>
              </div>
            </li>;
          })}
        </ul>
      </div>
    </Card>
  );
}

function ComplianceVault({ hub }: { hub: (typeof hubs)[number] }) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "people" | "contract" | "worksafe" | "slavery">("name");
  const [sortAscending, setSortAscending] = useState(true);
  const entities = vaultByHub[hub.id];
  const flaggedCount = entities.filter((item) => [item.worksafe, item.slavery, item.insurances].includes("Action Required")).length;
  const sortedEntities = [...entities].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "name") comparison = a.name.localeCompare(b.name);
    else if (sortBy === "people") comparison = a.people - b.people;
    else if (sortBy === "contract") comparison = a.contract.localeCompare(b.contract, undefined, { numeric: true });
    else comparison = a[sortBy].localeCompare(b[sortBy]);
    return sortAscending ? comparison : -comparison;
  });
  function changeSort(column: typeof sortBy) {
    if (sortBy === column) setSortAscending((value) => !value);
    else {
      setSortBy(column);
      setSortAscending(true);
    }
  }
  function toggleExpand(id: string) {
    setExpanded((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  }
  function sortableHeader(label: string, key: typeof sortBy) {
    return <button className="inline-flex items-center gap-1 whitespace-nowrap text-left transition hover:text-white" onClick={() => changeSort(key)} type="button">{label}<span aria-hidden="true">{sortBy === key ? sortAscending ? "↑" : "↓" : "↕"}</span></button>;
  }
  return (
    <Card>
      <PanelTitle icon="file" title="Audit-Ready Compliance Vault" detail="Master register of deployed subcontractors with live registry, WHS, and Modern Slavery checks." right={<div className="flex gap-2"><Badge tone="red">{flaggedCount} flagged</Badge><Badge tone="blue">{entities.length} entities</Badge></div>} />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] text-left text-xs">
          <caption className="sr-only">Deployed subcontractors. Expand a row to see live compliance checks.</caption>
          <thead className="bg-[#0b1429] text-[0.63rem] font-bold uppercase tracking-wide text-white/45">
            <tr><th className="px-3 py-3 font-semibold">Expand</th><th className="px-3 py-3">{sortableHeader("Subcontractor", "name")}</th><th className="px-3 py-3">{sortableHeader("Personnel", "people")}</th><th className="px-3 py-3">{sortableHeader("Contract", "contract")}</th><th className="px-3 py-3">ABN/ACN</th><th className="px-3 py-3">{sortableHeader("WorkSafe", "worksafe")}</th><th className="px-3 py-3">Public Liability</th><th className="px-3 py-3">{sortableHeader("Modern Slavery", "slavery")}</th></tr>
          </thead>
          {sortedEntities.map((entity) => {
            const isExpanded = expanded.includes(entity.id);
            return (
          <tbody className="divide-y divide-white/10 border-t border-white/10" key={entity.id}>
            <tr className="bg-[#101a33] transition hover:bg-white/[0.035]">
              <td className="px-3 py-3"><button aria-expanded={isExpanded} aria-label={`${isExpanded ? "Collapse" : "Expand"} ${entity.name}`} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/55 transition hover:bg-white/10 hover:text-white" onClick={() => toggleExpand(entity.id)} type="button"><span aria-hidden="true" className="text-base leading-none">{isExpanded ? "−" : "+"}</span></button></td>
              <td className="px-3 py-3"><p className="font-bold text-white">{entity.name}</p><p className="mt-1 text-[0.65rem] text-white/40">{entity.work} · {entity.id}</p></td>
              <td className="px-3 py-3 font-semibold text-white/80">{entity.people}</td>
              <td className="px-3 py-3 font-semibold text-white/80">{entity.contract}</td>
              <td className="px-3 py-3"><Badge tone="green">Validated</Badge><p className="mt-1.5 whitespace-nowrap font-mono text-[0.62rem] text-white/45">{entity.abn}</p></td>
              <td className="px-3 py-3"><Badge tone={statusTone(entity.worksafe)}>{entity.worksafe}</Badge></td>
              <td className="px-3 py-3"><Badge tone={statusTone(entity.insurances)}>{entity.insurances}</Badge></td>
              <td className="px-3 py-3"><Badge tone={statusTone(entity.slavery)}>{entity.slavery}</Badge></td>
            </tr>
            {isExpanded && <tr className="bg-[#0b1429]"><td className="px-4 py-4" colSpan={8}><div className="grid gap-3 md:grid-cols-3">{entity.details.map((detail) => <article className="rounded-xl border border-white/10 bg-[#101a33] p-3.5" key={detail.title}><div className="flex items-start justify-between gap-2"><h3 className="text-[0.68rem] font-bold leading-4 text-white/80">{detail.title}</h3><Badge tone={statusTone(detail.status)}>{detail.status}</Badge></div><p className="mt-3 text-xs leading-5 text-white">{detail.value}</p><p className="mt-2 text-[0.6rem] leading-4 text-white/35">{detail.source}</p></article>)}</div><div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[0.63rem] text-white/40"><span>Supplier insurance and registry evidence linked to {entity.abn}</span><span>Registry snapshot · {hub.shortName}</span></div></td></tr>}
          </tbody>
            );
          })}
        </table>
      </div>
      <div className="flex flex-col justify-between gap-2 border-t border-white/10 px-4 py-3 text-[0.63rem] text-white/35 sm:flex-row sm:items-center sm:px-5"><span>Deployed subcontractors · expand a row to see live compliance checks.</span><span>Registry synchronisation · 2026-09-28 04:00 AWST</span></div>
    </Card>
  );
}

function InductionsPanel() {
  const records = [
    { name: "Marcus Tane", role: "Rigger · HRWL DG", bhp: 100, rio: 70, chevron: 40 },
    { name: "John Doe", role: "Electrician · A-Grade", bhp: 100, rio: 100, chevron: 40 },
    { name: "Aroha Ngata", role: "Plant Operator · HR", bhp: 100, rio: 70, chevron: 15 },
    { name: "Liam Becker", role: "Scaffolder · Advanced", bhp: 85, rio: 100, chevron: 40 },
  ];
  const clientNames = ["BHP", "Rio Tinto", "Chevron"];
  function progressLabel(value: number) {
    return value === 100 ? "100% — Ready" : value === 70 ? "Pending — Needs White Card Match" : value === 15 ? "15% — Medical Required" : value === 85 ? "85% — Final Module" : `${value}%`;
  }
  return (
    <Card>
      <PanelTitle icon="calendar" title="Site-Specific Inductions & Compliance Validation" detail="Cross-checked via live API with WorkSafe and Supply Nation registries." right={<div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-[0.65rem] text-emerald-300">Average Time-to-Green: <strong>36h</strong></div>} />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-xs">
          <caption className="sr-only">Crew induction progress by site principal</caption>
          <thead className="bg-[#0b1429] text-[0.63rem] font-bold uppercase tracking-wide text-white/45"><tr><th className="px-4 py-3">Worker</th>{clientNames.map((name) => <th className="px-4 py-3" key={name}>{name}</th>)}</tr></thead>
          <tbody className="divide-y divide-white/10">
            {records.map((worker) => <tr key={worker.name}><td className="px-4 py-4"><p className="font-bold text-white">{worker.name}</p><p className="mt-1 text-[0.63rem] text-white/40">{worker.role}</p></td>{[worker.bhp, worker.rio, worker.chevron].map((value, index) => <td className="min-w-40 px-4 py-4" key={index}><div className="mb-2 flex items-start justify-between gap-2"><span className={`max-w-36 text-[0.62rem] leading-4 ${value === 100 ? "text-emerald-300" : value === 15 ? "text-rose-300" : "text-amber-300"}`}>{progressLabel(value)}</span><span className="text-[0.6rem] text-white/35">{value}</span></div><Progress label={`${worker.name} ${clientNames[index]} induction progress`} value={value} color={value === 100 ? "bg-emerald-400" : value < 50 ? "bg-rose-400" : "bg-amber-400"} /></td>)}</tr>)}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default function PrincipalDashboard() {
  const [hubId, setHubId] = useState<HubId>("pilbara");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [sourcedSuppliers, setSourcedSuppliers] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [auditReport, setAuditReport] = useState<{ issuedAt: string; reportId: string } | null>(null);
  const hub = hubs.find((item) => item.id === hubId);
  const pilbaraHub = hubs.find((item) => item.id === "pilbara");
  const pilbaraSuppliers = vaultByHub.pilbara;

  function sourceCrew(name: string) {
    setSourcedSuppliers((current) => current.includes(name) ? current : [...current, name]);
    setNotice(`${name} added to your sourcing shortlist.`);
  }

  function exportAudit() {
    const issuedAt = new Intl.DateTimeFormat("en-AU", {
      dateStyle: "long",
      timeStyle: "medium",
      timeZone: "Australia/Perth",
    }).format(new Date());
    const reportYear = new Date().getFullYear();
    const reportSuffix = Array.from(crypto.getRandomValues(new Uint8Array(3)))
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
    setAuditReport({ issuedAt, reportId: `FL-AUD-${reportYear}-${reportSuffix}` });
    window.setTimeout(() => window.print(), 0);
  }

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query.trim());
    setNotice(query.trim() ? `Sourcing results filtered for “${query.trim()}”.` : "Showing all available subcontractors.");
  }

  return (
    <>
    <div className="principal-dashboard-shell min-h-screen bg-[#070b16] text-white" id="top">
      <div className="border-b border-white/5 bg-[#050914]">
        <div aria-label="Platform views" className="mx-auto flex h-11 max-w-[1440px] items-center gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8" role="tablist">
          <a className="flex min-w-28 flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white/55 transition hover:bg-white/10 hover:text-white sm:max-w-52" href="/#top"><Icon name="building" size={14} />Landing</a>
          <a className="flex min-w-28 flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white/55 transition hover:bg-white/10 hover:text-white sm:max-w-52" href="/dashboard"><Icon name="briefcase" size={14} />Crews</a>
          <a aria-current="page" className="flex min-w-28 flex-1 items-center justify-center gap-2 rounded-lg bg-flyin px-4 py-2 text-xs font-bold text-[#0b132b] sm:max-w-52" href="/principal"><Icon name="building" size={14} />Principals</a>
        </div>
      </div>
      <header className="border-b border-white/10 bg-[#0b132b]">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a aria-label="FlyIn home" className="flex items-center gap-2.5" href="/#top"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-flyin"><Icon name="plane" size={20} /></span><span className="text-xl font-extrabold tracking-tight text-white">Fly<span className="text-flyin">In</span></span></a>
          <p className="text-right text-xs text-white/50">Signed in as <strong className="font-semibold text-white/85">Procurement Lead</strong> · Megaproject Principal</p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-flyin">Principal procurement dashboard</p><p className="mt-1 text-sm text-white/50">Regulator-ready records for {hub?.auditEntities ?? 0} subcontractors at {hub?.shortName}</p></div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <button className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-flyin px-4 text-xs font-bold text-[#0b132b] shadow-[0_7px_18px_rgba(252,163,17,0.15)] transition hover:bg-orange-300 print:hidden" onClick={exportAudit} type="button"><Icon name="download" size={15} />1-Click Compliance Audit Export (PDF)</button>
            <p className="max-w-sm text-[0.62rem] leading-4 text-white/35 sm:text-right">Generates a print-ready demonstration report. Use “Save as PDF” in the print dialog.</p>
          </div>
        </div>

        <form className="rounded-2xl border border-white/10 bg-[#101a33] p-4 sm:p-5 print:hidden" onSubmit={submitSearch} role="search">
          <label className="mb-2 block text-xs font-semibold text-white/65" htmlFor="subcontractor-search">Search subcontractors and crews</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-flyin"><Icon name="search" size={17} /></span><input className="min-h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-flyin" id="subcontractor-search" onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Search available subcontractors, specialized crews, or high-risk tickets..." type="search" value={query} /></div>
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-flyin px-5 text-sm font-bold text-[#0b132b] transition hover:bg-orange-300" type="submit"><Icon name="search" size={16} />Source Crews</button>
          </div>
          {notice && <p aria-live="polite" className="mt-2 text-xs text-white/55">{notice}</p>}
          {sourcedSuppliers.length > 0 && <p className="mt-2 text-[0.65rem] text-emerald-300">Shortlist: {sourcedSuppliers.join(", ")}</p>}
        </form>

        {hub && <PrincipalOverview hub={hub} onHubChange={setHubId} />}
        {hub && <div className="grid grid-cols-1 gap-5 xl:grid-cols-5 xl:gap-6"><div className="min-w-0 xl:col-span-3"><SourcingTerminal key={hub.id} hub={hub} query={submittedQuery} onSource={sourceCrew} /></div><div className="min-w-0 xl:col-span-2"><HsecControlRoom /></div></div>}
        {hub && <ComplianceVault hub={hub} />}
        <InductionsPanel />
      </main>
      <footer className="mt-8 border-t border-white/10 bg-[#0b132b]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 px-4 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:px-6 lg:px-8"><span className="font-extrabold tracking-tight text-white">Fly<span className="text-flyin">In</span> <span className="font-normal text-white/35">Principal procurement workspace</span></span><span>Workforce compliance for Australia&apos;s heavy industry.</span><a className="font-semibold hover:text-white" href="#top">Back to top ↑</a></div>
      </footer>
    </div>
    {auditReport && pilbaraHub && (
      <article aria-label="Statutory Compliance Audit Report" className="audit-report">
        <header className="audit-report-header">
          <div className="audit-report-brand">FLYIN <span>COMPLIANCE SYSTEMS</span></div>
          <p className="audit-report-kicker">PILBARA HUB · WA · DEMONSTRATION RECORD</p>
          <h1>STATUTORY COMPLIANCE<br />AUDIT REPORT</h1>
          <p className="audit-report-subtitle">Commercial supply-chain and workforce verification summary</p>
          <dl className="audit-report-metadata">
            <div><dt>Issued to</dt><dd>Pilbara Hub Megaproject (Tier-1 Operations)</dd></div>
            <div><dt>Governing law references</dt><dd>Fair Work Act 2009 (Cth); Work Health and Safety Act 2020 (WA)</dd></div>
            <div><dt>Audit timestamp</dt><dd>{auditReport.issuedAt} (AWST)</dd></div>
            <div><dt>Report ID</dt><dd className="audit-mono">{auditReport.reportId}</dd></div>
            <div><dt>Record classification</dt><dd>Demonstration dataset · not a statutory or regulator-issued instrument</dd></div>
          </dl>
          <p className="audit-report-notice"><strong>IMPORTANT — SIMULATED DATA:</strong> This report is generated from local demonstration records. It is not evidence of a live government database check, insurance certificate, cryptographic verification, legal advice, or completed statutory declaration.</p>
        </header>

        <section className="audit-report-section">
          <h2><span>01</span> Executive Summary &amp; Supply Chain Health</h2>
          <p className="audit-report-lead">Snapshot of the Pilbara Hub procurement dashboard. Metrics below are illustrative dashboard values and should be confirmed against primary records before commercial or regulatory reliance.</p>
          <div className="audit-metric-grid">
            <div><span>Local content spend</span><strong>{pilbaraHub.contentSpend}%</strong><small>Target {pilbaraHub.target}% · dashboard figure</small></div>
            <div><span>Workforce record coverage</span><strong>100%</strong><small>318 of 318 represented in aggregate dashboard coverage; not a compliance pass rate</small></div>
            <div><span>Supplier verification posture</span><strong>{pilbaraHub.verified}%</strong><small>{pilbaraHub.auditEntities} supplier records in the Pilbara vault</small></div>
          </div>
          <p>The workforce coverage figure denotes the portion represented in the dashboard summary only. It does not certify that every worker, ticket, or site condition is compliant. The supplier verification posture includes items requiring follow-up in the demonstration vault.</p>
        </section>

        <section className="audit-report-section">
          <h2><span>02</span> Subcontractor Verification Matrix</h2>
          <p className="audit-report-lead">Five Pilbara supplier records included in the dashboard vault. ABN/ACN and insurance statuses below are transcribed from mock records, not independently validated. EBA evidence was not included in the source dataset.</p>
          <table className="audit-table">
            <thead><tr><th>Supplier / record ID</th><th>ABN / ACN record</th><th>EBA agreement</th><th>$20M Public Liability</th><th>WorkSafe record</th></tr></thead>
            <tbody>
              {pilbaraSuppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td><strong>{supplier.name}</strong><small>{supplier.id} · {supplier.work}</small></td>
                  <td>{supplier.abn}<small>Listed in demo record · live ABR/ASIC validation not performed</small></td>
                  <td>Not supplied<small>Requires documentary verification</small></td>
                  <td>{supplier.insurances}<small>{supplier.details.find((detail) => detail.title === "Public Liability Insurance")?.value ?? "Mock vault status; certificate not attached"}</small></td>
                  <td>{supplier.worksafe}<small>Mock vault status · regulator API check not performed for this report</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="audit-report-section">
          <h2><span>03</span> WorkSafe Token &amp; API Validation Logs</h2>
          <p className="audit-report-lead">The following ledger identifiers are generated placeholders for demonstration. No cryptographic signature, live WorkSafe token, or government database response is contained in this export.</p>
          <table className="audit-table audit-ledger">
            <thead><tr><th>Log reference</th><th>Scope represented</th><th>Demo token / status</th><th>Source / verification result</th></tr></thead>
            <tbody>
              {events.slice(0, 4).map((event, index) => (
                <tr key={event.id}>
                  <td className="audit-mono">{event.id}<small>{event.time} AWST · {event.type}</small></td>
                  <td>{event.location}<small>{event.title}</small></td>
                  <td className="audit-mono">DEMO-{auditReport.reportId.slice(-6)}-{String(index + 1).padStart(2, "0")}<small>Placeholder only · not cryptographic</small></td>
                  <td>Simulated dashboard event<small>No direct government API query or live ticket cross-check performed</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="audit-report-section audit-declaration">
          <h2><span>04</span> Statutory Declaration &amp; Legal Disclaimer</h2>
          <p className="audit-report-lead">Draft certification wording only — this page is not a statutory declaration and has not been made or witnessed under the Statutory Declarations Act 1959 (Cth).</p>
          <blockquote>I, the undersigned authorised representative, declare that after reviewing the underlying source documents and live verification results (which are not included in this demonstration export), the records adopted for the relevant procurement decision are true and correct to the best of my knowledge and belief.</blockquote>
          <p>This statement must not be relied on or presented as a declaration under the Statutory Declarations Act 1959 (Cth) unless it is reviewed, completed, and executed in the legally required manner. This demonstration report is not legal advice, does not determine compliance, and does not replace original certificates, regulator checks, or independent professional review.</p>
          <div className="audit-signature">
            <div><span>Authorised digital signature</span><strong>[ Signature placeholder — not signed ]</strong></div>
            <div><span>Name / role</span><strong>Procurement Lead · Pilbara Hub</strong></div>
            <div><span>Date / time</span><strong>{auditReport.issuedAt} (AWST)</strong></div>
          </div>
        </section>
        <footer className="audit-report-footer">
          <span>{auditReport.reportId} · Generated {auditReport.issuedAt} (AWST)</span>
          <span>CONFIDENTIAL DEMONSTRATION COPY · Verify against primary evidence</span>
        </footer>
      </article>
    )}
    </>
  );
}
