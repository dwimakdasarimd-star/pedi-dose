"use client";

import { useMemo, useState } from "react";

type Drug = {
  id: string;
  name: string;
  indication: string;
  doseMgKg: number;
  unit: "dose";
  frequency: string;
  maxMgKgDay?: number;
  maxMgDose?: number;
  concentration?: number;
  concentrationLabel?: string;
  minAgeMonths?: number;
  maxAgeMonths?: number;
  note?: string;
};

const DRUGS: Drug[] = [
  {
    id: "paracetamol",
    name: "Paracetamol",
    indication: "Demam / nyeri",
    doseMgKg: 15,
    unit: "dose",
    frequency: "setiap 4–6 jam bila perlu",
    maxMgKgDay: 60,
    concentration: 160,
    concentrationLabel: "160 mg / 5 mL",
    note: "Contoh regimen umum. Verifikasi formulasi dan batas dosis sesuai referensi lokal.",
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    indication: "Demam / nyeri",
    doseMgKg: 10,
    unit: "dose",
    frequency: "setiap 6–8 jam bila perlu",
    maxMgKgDay: 40,
    concentration: 100,
    concentrationLabel: "100 mg / 5 mL",
    minAgeMonths: 6,
    note: "Hindari pada dehidrasi berat dan kondisi klinis yang menjadi kontraindikasi NSAID.",
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    indication: "Antibiotik — pilih sesuai indikasi",
    doseMgKg: 25,
    unit: "dose",
    frequency: "setiap 8 jam",
    maxMgKgDay: 90,
    concentration: 250,
    concentrationLabel: "250 mg / 5 mL",
    note: "Regimen sangat bergantung pada diagnosis. Jangan gunakan kalkulator sebagai pengganti pemilihan antibiotik.",
  },
  {
    id: "azithromycin",
    name: "Azithromycin",
    indication: "Antibiotik — pilih sesuai indikasi",
    doseMgKg: 10,
    unit: "dose",
    frequency: "1× sehari",
    maxMgKgDay: 10,
    concentration: 200,
    concentrationLabel: "200 mg / 5 mL",
    note: "Regimen berbeda menurut diagnosis dan hari terapi.",
  },
  {
    id: "cefixime",
    name: "Cefixime",
    indication: "Antibiotik — pilih sesuai indikasi",
    doseMgKg: 4,
    unit: "dose",
    frequency: "setiap 12 jam",
    maxMgKgDay: 8,
    concentration: 100,
    concentrationLabel: "100 mg / 5 mL",
    note: "Verifikasi indikasi, fungsi ginjal, dan dosis maksimum pada referensi resmi.",
  },
];

function round(n: number, digits = 1) {
  const p = 10 ** digits;
  return Math.round(n * p) / p;
}

export default function Home() {
  const [weight, setWeight] = useState("18");
  const [age, setAge] = useState("5");
  const [drugId, setDrugId] = useState("paracetamol");
  const [concentration, setConcentration] = useState("160");
  const [showFormula, setShowFormula] = useState(false);

  const drug = DRUGS.find(d => d.id === drugId)!;
  const result = useMemo(() => {
    const kg = Number(weight);
    const ageYears = Number(age);
    if (!kg || kg <= 0) return null;

    const mgDose = kg * drug.doseMgKg;
    const dailyCap = drug.maxMgKgDay ? kg * drug.maxMgKgDay : Infinity;
    const mgDoseLimited = Math.min(mgDose, dailyCap);
    const conc = Number(concentration);
    const ml = conc > 0 ? (mgDoseLimited / conc) * 5 : null;

    return {
      mgDose: round(mgDoseLimited),
      ml: ml == null ? null : round(ml, 2),
      dailyMax: Number.isFinite(dailyCap) ? round(dailyCap) : null,
      ageWarning:
        drug.minAgeMonths != null && ageYears * 12 < drug.minAgeMonths
          ? `Perhatian: obat ini memiliki batas usia minimal sekitar ${drug.minAgeMonths} bulan pada database aplikasi.`
          : null,
    };
  }, [weight, age, drug, concentration]);

  function reset() {
    setWeight("");
    setAge("");
    setDrugId("paracetamol");
    setConcentration("160");
    setShowFormula(false);
  }

  return (
    <main className="page">
      <div className="shell">
        <header className="header">
          <div className="brandMark">PD</div>
          <div>
            <div className="eyebrow">CLINICAL DECISION SUPPORT</div>
            <h1>PediDose</h1>
            <p>Simple pediatric dose calculator</p>
          </div>
        </header>

        <section className="hero">
          <div>
            <span className="pill">PEDIATRIC DOSING</span>
            <h2>Hitung dosis anak<br />dengan cepat.</h2>
            <p>Masukkan berat badan, pilih obat, lalu periksa dosis berbasis mg/kg dan konversi volume sediaan.</p>
          </div>
          <div className="heroIcon">＋</div>
        </section>

        <section className="grid">
          <div className="card inputCard">
            <div className="cardTitle"><span>01</span> Data pasien</div>

            <label>Berat badan
              <div className="inputUnit"><input inputMode="decimal" value={weight} onChange={e => setWeight(e.target.value)} placeholder="18" /><b>kg</b></div>
            </label>

            <label>Usia
              <div className="inputUnit"><input inputMode="decimal" value={age} onChange={e => setAge(e.target.value)} placeholder="5" /><b>tahun</b></div>
            </label>

            <div className="cardTitle second"><span>02</span> Obat</div>
            <label>Pilih obat
              <select value={drugId} onChange={e => {
                const id = e.target.value;
                setDrugId(id);
                const d = DRUGS.find(x => x.id === id)!;
                if (d.concentration) setConcentration(String(d.concentration));
              }}>
                {DRUGS.map(d => <option key={d.id} value={d.id}>{d.name} — {d.indication}</option>)}
              </select>
            </label>

            <label>Konsentrasi sediaan
              <div className="inputUnit"><input inputMode="decimal" value={concentration} onChange={e => setConcentration(e.target.value)} /><b>mg / 5 mL</b></div>
            </label>

            <button className="secondary" onClick={reset}>Reset</button>
          </div>

          <div className="card resultCard">
            <div className="cardTitle"><span>03</span> Hasil perhitungan</div>
            {!result ? (
              <div className="empty">Masukkan berat badan untuk melihat hasil.</div>
            ) : (
              <>
                <div className="drugName">{drug.name}</div>
                <div className="doseBig">{result.mgDose}<small> mg / dosis</small></div>
                {result.ml != null && (
                  <div className="volume">
                    <div><strong>{result.ml}</strong> mL</div>
                    <span>per dosis</span>
                  </div>
                )}
                <div className="details">
                  <div><span>Dosis acuan</span><b>{drug.doseMgKg} mg/kg/dosis</b></div>
                  <div><span>Frekuensi</span><b>{drug.frequency}</b></div>
                  {result.dailyMax && <div><span>Maksimum harian</span><b>{result.dailyMax} mg/hari</b></div>}
                  <div><span>Sediaan</span><b>{concentration} mg / 5 mL</b></div>
                </div>

                {result.ageWarning && <div className="warning">{result.ageWarning}</div>}
                {drug.note && <div className="note">{drug.note}</div>}

                <button className="formulaBtn" onClick={() => setShowFormula(!showFormula)}>
                  {showFormula ? "Sembunyikan rumus" : "Lihat rumus perhitungan"} <span>↗</span>
                </button>
                {showFormula && (
                  <div className="formula">
                    <b>Rumus</b>
                    <div>Dosis = berat badan × dosis rekomendasi</div>
                    <div>{weight} kg × {drug.doseMgKg} mg/kg = <b>{result.mgDose} mg/dosis</b></div>
                    <div>Volume = dosis ÷ konsentrasi × 5 mL</div>
                    {result.ml != null && <div>{result.mgDose} ÷ {concentration} × 5 = <b>{result.ml} mL/dosis</b></div>}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <footer>
          <strong>⚠ Clinical safety notice</strong>
          <p>PediDose adalah alat bantu perhitungan, bukan pengganti clinical judgment. Selalu verifikasi diagnosis, indikasi, usia, berat badan, formulasi, fungsi ginjal/hati, dosis maksimum, kontraindikasi, interaksi, dan guideline terbaru sebelum memberikan obat.</p>
          <p className="tiny">Database contoh pada MVP ini harus divalidasi oleh dokter/farmasis dan disesuaikan dengan formularium serta pedoman lokal sebelum digunakan untuk pelayanan klinis.</p>
        </footer>
      </div>
    </main>
  );
}