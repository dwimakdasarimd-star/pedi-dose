"use client";

import { useMemo, useState } from "react";
import { SKDI_4A_DISEASES, type Skdi4aDisease } from "../skdi4a-data";

const sections: Array<[keyof Pick<Skdi4aDisease, "diagnosis" | "workup" | "differential" | "management" | "followUp" | "referral">, string, string]> = [
  ["diagnosis", "Diagnosis", "01"],
  ["workup", "Pemeriksaan penunjang", "02"],
  ["differential", "Diagnosis banding (DDx)", "03"],
  ["management", "Tatalaksana", "04"],
  ["followUp", "Edukasi & follow-up", "05"],
  ["referral", "Indikasi rujuk / red flags", "06"],
];

export default function Skdi4aPage() {
  const [query, setQuery] = useState("");
  const [system, setSystem] = useState("Semua sistem");
  const [level, setLevel] = useState("Semua level");
  const [selectedNo, setSelectedNo] = useState(1);
  const [compact, setCompact] = useState(false);

  const systems = useMemo(() => ["Semua sistem", ...Array.from(new Set(SKDI_4A_DISEASES.map((d) => d.system)))], []);
  const levels = useMemo(() => ["Semua level", ...Array.from(new Set(SKDI_4A_DISEASES.map((d) => d.level)))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKDI_4A_DISEASES.filter((d) => {
      const systemOk = system === "Semua sistem" || d.system === system;
      const levelOk = level === "Semua level" || d.level === level;
      const text = `${d.name} ${d.system} ${d.keywords.join(" ")} ${d.diagnosis}`.toLowerCase();
      return systemOk && levelOk && (!q || text.includes(q));
    });
  }, [query, system, level]);

  const selected = SKDI_4A_DISEASES.find((d) => d.number === selectedNo) ?? filtered[0] ?? SKDI_4A_DISEASES[0];

  return (
    <main className="skdiPage">
      <style jsx global>{`
        *{box-sizing:border-box}.skdiPage{min-height:100vh;background:#f5f7fb;color:#172033;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.skdiShell{max-width:1440px;margin:0 auto;padding:28px 24px 56px}.skdiHeader{display:flex;align-items:center;gap:14px;margin-bottom:22px}.skdiLogo{width:46px;height:46px;border-radius:13px;background:#12213d;color:white;display:grid;place-items:center;font-weight:800;letter-spacing:-1px}.skdiEyebrow{font-size:11px;font-weight:800;letter-spacing:.12em;color:#60708a;text-transform:uppercase}.skdiHeader h1{font-size:25px;line-height:1.1;margin:3px 0 4px;letter-spacing:-.04em}.skdiHeader p{margin:0;color:#6c7890;font-size:13px}.skdiHero{display:flex;justify-content:space-between;align-items:center;gap:28px;padding:28px 30px;border:1px solid #e0e6ef;background:white;border-radius:20px;box-shadow:0 10px 35px rgba(26,42,70,.06)}.skdiHero h2{font-size:32px;line-height:1.1;margin:10px 0 8px;letter-spacing:-.05em}.skdiHero p{max-width:760px;margin:0;color:#66738a;line-height:1.65}.skdiPill{display:inline-flex;padding:6px 9px;border-radius:999px;background:#edf2fa;color:#263c62;font-size:11px;font-weight:800;letter-spacing:.06em}.skdiCount{font-size:56px;font-weight:900;letter-spacing:-.08em;color:#12213d}.skdiCount small{display:block;font-size:11px;letter-spacing:.08em;color:#758198;text-align:right}.skdiToolbar{position:sticky;top:12px;z-index:5;margin:18px 0;padding:12px;background:rgba(255,255,255,.96);border:1px solid #e0e6ef;border-radius:16px;box-shadow:0 8px 25px rgba(26,42,70,.07);display:grid;grid-template-columns:minmax(260px,1.7fr) minmax(190px,.8fr) auto;gap:10px}.skdiInput,.skdiSelect{height:44px;border:1px solid #d9e0ea;background:#fff;border-radius:11px;padding:0 13px;color:#172033;font:inherit;outline:none}.skdiInput:focus,.skdiSelect:focus{border-color:#7b8fab;box-shadow:0 0 0 3px rgba(86,110,145,.12)}.skdiToolbar button{border:1px solid #d9e0ea;background:#fff;border-radius:11px;padding:0 14px;font-weight:700;color:#46556d;cursor:pointer}.skdiToolbar button.active{background:#12213d;color:#fff;border-color:#12213d}.skdiStats{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:0 0 12px}.skdiChip{padding:7px 10px;background:#edf2f8;border-radius:999px;font-size:11px;font-weight:700;color:#58677d}.skdiLayout{display:grid;grid-template-columns:350px minmax(0,1fr);gap:16px;align-items:start}.skdiList,.skdiDetail{background:#fff;border:1px solid #e0e6ef;border-radius:18px;box-shadow:0 8px 30px rgba(26,42,70,.05)}.skdiList{padding:8px;max-height:calc(100vh - 235px);min-height:500px;overflow:auto}.skdiItem{width:100%;display:flex;align-items:center;gap:11px;text-align:left;border:0;background:transparent;padding:11px 10px;border-radius:12px;cursor:pointer;color:#263249}.skdiItem:hover{background:#f4f6fa}.skdiItem.active{background:#12213d;color:#fff}.skdiNo{flex:0 0 32px;width:32px;height:32px;border-radius:9px;background:#edf1f6;display:grid;place-items:center;font-size:11px;font-weight:800;color:#65738a}.skdiItem.active .skdiNo{background:rgba(255,255,255,.14);color:#fff}.skdiItem b{display:block;font-size:13px;line-height:1.3}.skdiItem small{display:block;font-size:10px;margin-top:3px;opacity:.65}.skdiDetail{padding:24px}.skdiDetailTop{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #e8ecf2;padding-bottom:20px}.skdiDetailTop h3{font-size:26px;line-height:1.15;margin:8px 0 5px;letter-spacing:-.035em}.skdiDetailTop p{margin:0;color:#778399;font-size:12px}.skdiNoBadge{display:inline-flex;align-items:center;gap:7px;color:#314663;background:#edf2fa;border-radius:999px;padding:6px 9px;font-size:11px;font-weight:800}.skdiVerify{max-width:300px;color:#7a5c16;background:#fff8e6;border:1px solid #f0dfad;border-radius:10px;padding:9px 11px;font-size:11px;line-height:1.45;height:max-content}.skdiSections{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}.skdiSection{border:1px solid #e3e8ef;border-radius:14px;padding:17px;background:#fbfcfe}.skdiSection:nth-child(4){grid-column:span 2}.skdiSection h4{margin:0 0 8px;font-size:12px;display:flex;gap:9px;align-items:center;color:#243650}.skdiSection h4 span{display:grid;place-items:center;width:25px;height:25px;border-radius:7px;background:#e9eef5;font-size:10px;color:#5d6d83}.skdiSection p{margin:0;color:#526177;font-size:13px;line-height:1.7}.skdiFooter{margin-top:16px;padding:14px 16px;border-radius:13px;background:#f0f4f8;color:#647188;font-size:11px;line-height:1.6}.skdiEmpty{padding:50px 20px;text-align:center;color:#78859a}.skdiEmpty b{display:block;color:#263249;margin-bottom:5px}@media(max-width:900px){.skdiShell{padding:18px 14px 40px}.skdiHero{padding:22px;align-items:flex-start}.skdiHero h2{font-size:25px}.skdiCount{font-size:40px}.skdiToolbar{position:static;grid-template-columns:1fr}.skdiLayout{grid-template-columns:1fr}.skdiList{max-height:310px;min-height:0}.skdiSections{grid-template-columns:1fr}.skdiSection:nth-child(4){grid-column:auto}.skdiDetailTop{flex-direction:column}.skdiVerify{max-width:none}.skdiHeader h1{font-size:21px}}
      `}</style>
      <div className="skdiShell">
        <header className="skdiHeader"><div className="skdiLogo">PD</div><div><div className="skdiEyebrow">Clinical Knowledge Base</div><h1>KKI 2026 Clinical Disease Database</h1><p>Spektrum penyakit · diagnosis · pemeriksaan · DDx · tatalaksana · follow-up · rujukan</p></div></header>
        <section className="skdiHero"><div><span className="skdiPill">KKI · STANDAR KOMPETENSI DOKTER 2026</span><h2>{SKDI_4A_DISEASES.length} kondisi dalam satu clinical reference.</h2><p>Database diperluas dari seluruh Spektrum Penyakit pada Tabel 4 file KKI 2026, bukan hanya kelompok 4A. Gunakan filter sistem dan level kompetensi untuk menavigasi seluruh spektrum.</p></div><div><div className="skdiCount">{SKDI_4A_DISEASES.length}<small>ENTRIES</small></div></div></section>
        <section className="skdiToolbar"><input className="skdiInput" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari penyakit, sistem organ, atau kata kunci diagnosis…" aria-label="Cari penyakit"/><select className="skdiSelect" value={system} onChange={(e)=>setSystem(e.target.value)} aria-label="Filter sistem organ">{systems.map((s)=><option key={s}>{s}</option>)}</select><select className="skdiSelect" value={level} onChange={(e)=>setLevel(e.target.value)} aria-label="Filter level kompetensi">{levels.map((s)=><option key={s}>{s}</option>)}</select><button className={compact?"active":""} onClick={()=>setCompact((v)=>!v)}>{compact?"Mode detail aktif":"Mode ringkas"}</button></section>
        <div className="skdiStats"><span className="skdiChip">Menampilkan {filtered.length} dari {SKDI_4A_DISEASES.length}</span><span className="skdiChip">Sistem: {system}</span><span className="skdiChip">Level: {level}</span>{query&&<button className="skdiChip" style={{border:0,cursor:"pointer"}} onClick={()=>setQuery("")}>Hapus pencarian ×</button>}</div>
        <div className="skdiLayout">
          <aside className="skdiList" aria-label="Daftar spektrum penyakit KKI 2026">{filtered.length===0?<div className="skdiEmpty"><b>Tidak ada hasil</b>Coba kata kunci atau sistem organ lain.</div>:filtered.map((d)=><button key={d.number} className={`skdiItem ${selected.number===d.number?"active":""}`} onClick={()=>setSelectedNo(d.number)}><span className="skdiNo">{String(d.number).padStart(2,"0")}</span><span><b>{d.name}</b><small>{d.system}</small></span></button>)}</aside>
          <article className="skdiDetail" aria-live="polite"><div className="skdiDetailTop"><div><span className="skdiNoBadge">{selected.level} · No. {selected.number} · {selected.system}</span><h3>{selected.name}</h3><p>Clinical reference berdasarkan Spektrum Penyakit KKI 2026; tingkat pengelolaan/rujukan ditampilkan per entri.</p></div><div className="skdiVerify">⚕ {selected.contentStatus}</div></div>
            <div className="skdiSections">{sections.map(([key,title,num])=><section className="skdiSection" key={key}><h4><span>{num}</span>{title}</h4><p>{selected[key]}</p></section>)}</div>
            <div className="skdiFooter"><b>Sumber:</b> {selected.sources.map((s)=><a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={{marginRight:10}}>{s.name}</a>)}<br/><br/><b>Catatan keselamatan:</b> database ini adalah alat referensi/pendidikan, bukan pengganti clinical judgment. Diagnosis, obat, dosis, tindakan, kriteria rawat inap, dan rujukan harus diverifikasi terhadap pedoman nasional/internasional terbaru, usia/berat badan, kehamilan, komorbiditas, alergi, interaksi obat, serta kondisi klinis pasien.</div>
          </article>
        </div>
      </div>
    </main>
  );
}
