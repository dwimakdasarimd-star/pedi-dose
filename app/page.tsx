"use client";

import { useMemo, useState } from "react";

type Drug = {
  id: string;
  name: string;
  class: string;
  indications: string[];
  dose: string;
  frequency: string;
  maxDose: string;
  renal: string;
  note: string;
  sourceStatus: string;
  defaultForm?: string;
  defaultRoute?: string;
};

const DRUGS: Drug[] = [
  {
    "id": "d01",
    "name": "paracetamol",
    "class": "Analgesik/antipiretik",
    "indications": [
      "Demam",
      "nyeri"
    ],
    "dose": "10–15 mg/kg/dosis",
    "frequency": "q4–6h PRN",
    "maxDose": "60 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Hindari total dosis berlebih; pertimbangkan fungsi hati.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d02",
    "name": "ibuprofen",
    "class": "NSAID",
    "indications": [
      "Demam",
      "nyeri",
      "inflamasi"
    ],
    "dose": "5–10 mg/kg/dosis",
    "frequency": "q6–8h PRN",
    "maxDose": "40 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "≥6 bulan; hindari dehidrasi berat/risiko ginjal.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d03",
    "name": "naproxen",
    "class": "NSAID",
    "indications": [
      "Nyeri/inflamasi"
    ],
    "dose": "5–7 mg/kg/dosis",
    "frequency": "q12h",
    "maxDose": "1000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Gunakan sesuai usia/indikasi; perhatian pada GI dan ginjal.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d04",
    "name": "amoxicillin",
    "class": "Antibiotik",
    "indications": [
      "Otitis media",
      "sinusitis",
      "faringitis",
      "infeksi lain sesuai guideline"
    ],
    "dose": "25–45 mg/kg/dosis",
    "frequency": "q12h",
    "maxDose": "90 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Dosis dan durasi harus dipilih berdasarkan indikasi.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d05",
    "name": "amoxicillin-clavulanate",
    "class": "Antibiotik",
    "indications": [
      "Otitis media",
      "sinusitis",
      "infeksi odontogenik"
    ],
    "dose": "25–45 mg/kg/dosis komponen amoksisilin",
    "frequency": "q12h",
    "maxDose": "90 mg/kg/hari komponen amoksisilin",
    "renal": "Individualize/verify renal adjustment",
    "note": "Gunakan formulasi dengan rasio clavulanate sesuai indikasi.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d06",
    "name": "penicillin V",
    "class": "Antibiotik",
    "indications": [
      "Faringitis streptokokus"
    ],
    "dose": "25–50 mg/kg/hari",
    "frequency": "dibagi 2–3 dosis",
    "maxDose": "1000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Durasi sesuai guideline.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d07",
    "name": "benzathine penicillin G",
    "class": "Antibiotik",
    "indications": [
      "Faringitis streptokokus",
      "profilaksis demam rematik"
    ],
    "dose": "600,000–1,200,000 unit/dosis",
    "frequency": "single dose sesuai BB/indikasi",
    "maxDose": "1,200,000 unit/dosis",
    "renal": "Individualize/verify renal adjustment",
    "note": "IM; regimen sangat bergantung pada indikasi.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d08",
    "name": "cephalexin",
    "class": "Sefalosporin",
    "indications": [
      "Kulit/jaringan lunak",
      "UTI",
      "faringitis"
    ],
    "dose": "25–50 mg/kg/hari",
    "frequency": "dibagi 2–4 dosis",
    "maxDose": "100 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Renal adjustment penting pada gangguan ginjal berat.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d09",
    "name": "cefadroxil",
    "class": "Sefalosporin",
    "indications": [
      "Kulit",
      "UTI",
      "faringitis"
    ],
    "dose": "30 mg/kg/hari",
    "frequency": "q12h",
    "maxDose": "2 g/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Perhatikan fungsi ginjal.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d10",
    "name": "cefixime",
    "class": "Sefalosporin",
    "indications": [
      "UTI",
      "otitis",
      "infeksi tertentu"
    ],
    "dose": "8 mg/kg/hari",
    "frequency": "q12–24h",
    "maxDose": "400 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Sesuaikan pada gangguan ginjal berat.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d11",
    "name": "cefpodoxime",
    "class": "Sefalosporin",
    "indications": [
      "Otitis",
      "sinusitis",
      "faringitis"
    ],
    "dose": "10 mg/kg/hari",
    "frequency": "q12h",
    "maxDose": "400 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Interval diperpanjang pada gangguan ginjal berat.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d12",
    "name": "cefuroxime",
    "class": "Sefalosporin",
    "indications": [
      "Otitis",
      "sinusitis",
      "infeksi bakteri tertentu"
    ],
    "dose": "20–30 mg/kg/hari",
    "frequency": "dibagi q12h",
    "maxDose": "1000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Formulasi oral/parenteral tidak interchangeable.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d13",
    "name": "cefdinir",
    "class": "Sefalosporin",
    "indications": [
      "Otitis",
      "faringitis",
      "infeksi tertentu"
    ],
    "dose": "14 mg/kg/hari",
    "frequency": "q12h atau q24h",
    "maxDose": "600 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Sesuaikan pada gangguan ginjal berat.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d14",
    "name": "ceftriaxone",
    "class": "Sefalosporin",
    "indications": [
      "Infeksi berat",
      "meningitis",
      "sepsis"
    ],
    "dose": "50–100 mg/kg/dosis",
    "frequency": "q12–24h",
    "maxDose": "4000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Meningitis memerlukan regimen khusus; neonatus perlu perhatian khusus.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d15",
    "name": "cefotaxime",
    "class": "Sefalosporin",
    "indications": [
      "Sepsis",
      "meningitis",
      "infeksi berat"
    ],
    "dose": "50 mg/kg/dosis",
    "frequency": "q6–8h",
    "maxDose": "400 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Interval/dosis menurut usia dan indikasi.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d16",
    "name": "ceftazidime",
    "class": "Sefalosporin",
    "indications": [
      "Infeksi Gram-negatif berat",
      "Pseudomonas"
    ],
    "dose": "50 mg/kg/dosis",
    "frequency": "q8h",
    "maxDose": "6000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Renal adjustment penting.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d17",
    "name": "cefepime",
    "class": "Sefalosporin",
    "indications": [
      "Infeksi Gram-negatif berat",
      "febrile neutropenia"
    ],
    "dose": "50 mg/kg/dosis",
    "frequency": "q8–12h",
    "maxDose": "6000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Renal adjustment penting; neurotoksisitas pada akumulasi.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d18",
    "name": "meropenem",
    "class": "Karbapenem",
    "indications": [
      "Infeksi berat",
      "meningitis"
    ],
    "dose": "20–40 mg/kg/dosis",
    "frequency": "q8h",
    "maxDose": "120 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Renal adjustment; regimen meningitis berbeda.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d19",
    "name": "ertapenem",
    "class": "Karbapenem",
    "indications": [
      "Infeksi bakteri tertentu"
    ],
    "dose": "15 mg/kg/dosis",
    "frequency": "q12h",
    "maxDose": "1000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Tidak mencakup Pseudomonas.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d20",
    "name": "azithromycin",
    "class": "Makrolid",
    "indications": [
      "Pneumonia atipikal",
      "pertusis",
      "infeksi tertentu"
    ],
    "dose": "10 mg/kg/dosis",
    "frequency": "q24h",
    "maxDose": "500 mg/dosis",
    "renal": "Individualize/verify renal adjustment",
    "note": "Regimen hari terapi bergantung indikasi.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d21",
    "name": "clarithromycin",
    "class": "Makrolid",
    "indications": [
      "Pneumonia atipikal",
      "pertusis",
      "H. pylori"
    ],
    "dose": "7.5 mg/kg/dosis",
    "frequency": "q12h",
    "maxDose": "1000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Renal adjustment pada gangguan ginjal berat; interaksi obat.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d22",
    "name": "erythromycin",
    "class": "Makrolid",
    "indications": [
      "Pertusis",
      "infeksi tertentu"
    ],
    "dose": "10–15 mg/kg/dosis",
    "frequency": "q6h",
    "maxDose": "4000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Banyak interaksi obat.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d23",
    "name": "clindamycin",
    "class": "Lincosamide",
    "indications": [
      "Infeksi kulit",
      "anaerob",
      "tulang/sendi"
    ],
    "dose": "10 mg/kg/dosis",
    "frequency": "q6–8h",
    "maxDose": "1800 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Monitor diare/C. difficile.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d24",
    "name": "metronidazole",
    "class": "Antimikroba",
    "indications": [
      "Anaerob",
      "protozoa"
    ],
    "dose": "7.5 mg/kg/dosis",
    "frequency": "q6–8h",
    "maxDose": "2000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Regimen bergantung indikasi.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d25",
    "name": "trimethoprim-sulfamethoxazole",
    "class": "Antibiotik",
    "indications": [
      "UTI",
      "infeksi tertentu",
      "Pneumocystis"
    ],
    "dose": "4–5 mg/kg/dosis komponen TMP",
    "frequency": "q12h",
    "maxDose": "20 mg/kg/hari TMP",
    "renal": "Individualize/verify renal adjustment",
    "note": "Hindari pada kondisi/usia tertentu; renal adjustment.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d26",
    "name": "nitrofurantoin",
    "class": "Antibiotik",
    "indications": [
      "UTI bawah"
    ],
    "dose": "1.25–1.75 mg/kg/dosis",
    "frequency": "q6h",
    "maxDose": "7 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Bukan untuk pielonefritis; hindari pada fungsi ginjal sangat rendah.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d27",
    "name": "gentamicin",
    "class": "Aminoglikosida",
    "indications": [
      "Sepsis/infeksi Gram-negatif"
    ],
    "dose": "7.5 mg/kg/hari*",
    "frequency": "interval diperpanjang sesuai usia/renal",
    "maxDose": "berbasis TDM",
    "renal": "Individualize/verify renal adjustment",
    "note": "Wajib therapeutic drug monitoring dan renal adjustment.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d28",
    "name": "amikacin",
    "class": "Aminoglikosida",
    "indications": [
      "Infeksi Gram-negatif berat"
    ],
    "dose": "15 mg/kg/dosis*",
    "frequency": "interval sesuai usia/renal",
    "maxDose": "berbasis TDM",
    "renal": "Individualize/verify renal adjustment",
    "note": "Wajib TDM; renal adjustment.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d29",
    "name": "vancomycin",
    "class": "Glikopeptida",
    "indications": [
      "MRSA/infeksi Gram-positif berat"
    ],
    "dose": "15 mg/kg/dosis*",
    "frequency": "q6–8h awal*",
    "maxDose": "berbasis AUC/TDM",
    "renal": "Individualize/verify renal adjustment",
    "note": "Wajib TDM dan penyesuaian fungsi ginjal.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d30",
    "name": "flucloxacillin",
    "class": "Penisilin antistafilokokus",
    "indications": [
      "Infeksi kulit",
      "osteomielitis"
    ],
    "dose": "25–50 mg/kg/dosis",
    "frequency": "q6h",
    "maxDose": "4000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Sesuaikan regimen dengan berat infeksi.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d31",
    "name": "cloxacillin",
    "class": "Penisilin antistafilokokus",
    "indications": [
      "Infeksi kulit/jaringan lunak"
    ],
    "dose": "25–50 mg/kg/dosis",
    "frequency": "q6h",
    "maxDose": "4000 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Gunakan sesuai formularium lokal.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d32",
    "name": "acyclovir",
    "class": "Antivirus",
    "indications": [
      "HSV",
      "varicella"
    ],
    "dose": "20 mg/kg/dosis",
    "frequency": "q8h",
    "maxDose": "60 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "IV regimen berbeda; renal adjustment dan hidrasi penting.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d33",
    "name": "oseltamivir",
    "class": "Antivirus",
    "indications": [
      "Influenza"
    ],
    "dose": "3 mg/kg/dosis*",
    "frequency": "q12h",
    "maxDose": "150 mg/hari*",
    "renal": "Individualize/verify renal adjustment",
    "note": "Dosis terapi/profilaksis berbeda; renal adjustment.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d34",
    "name": "fluconazole",
    "class": "Antijamur",
    "indications": [
      "Kandidiasis"
    ],
    "dose": "6–12 mg/kg/hari",
    "frequency": "q24h",
    "maxDose": "600 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Maintenance perlu renal adjustment.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d35",
    "name": "nystatin",
    "class": "Antijamur",
    "indications": [
      "Kandidiasis oral"
    ],
    "dose": "100,000 unit/dosis",
    "frequency": "q6h",
    "maxDose": "400,000 unit/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Topikal/oral lokal; tidak bermakna diekskresikan ginjal.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d36",
    "name": "ondansetron",
    "class": "Antiemetik",
    "indications": [
      "Mual/muntah"
    ],
    "dose": "0.15 mg/kg/dosis",
    "frequency": "q8h PRN",
    "maxDose": "8 mg/dosis",
    "renal": "Individualize/verify renal adjustment",
    "note": "Perhatikan QT dan konteks klinis.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d37",
    "name": "domperidone",
    "class": "Prokinetik",
    "indications": [
      "Indikasi terbatas sesuai kebijakan lokal"
    ],
    "dose": "0.25 mg/kg/dosis",
    "frequency": "q8h",
    "maxDose": "30 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Penggunaan pediatrik dan keamanan QT harus mengikuti regulasi lokal.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d38",
    "name": "salbutamol",
    "class": "Bronkodilator",
    "indications": [
      "Bronkospasme"
    ],
    "dose": "0.1–0.15 mg/kg/dosis nebulisasi",
    "frequency": "q4–6h PRN",
    "maxDose": "5 mg/dosis",
    "renal": "Individualize/verify renal adjustment",
    "note": "Rute dan dosis bergantung usia/alat.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d39",
    "name": "budesonide",
    "class": "Kortikosteroid inhalasi",
    "indications": [
      "Asma",
      "wheeze tertentu"
    ],
    "dose": "0.25–0.5 mg/dosis",
    "frequency": "q12–24h",
    "maxDose": "1 mg/hari*",
    "renal": "Individualize/verify renal adjustment",
    "note": "Regimen bergantung usia dan perangkat.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d40",
    "name": "dexamethasone",
    "class": "Kortikosteroid",
    "indications": [
      "Croup",
      "edema",
      "kondisi inflamasi"
    ],
    "dose": "0.15–0.6 mg/kg/dosis",
    "frequency": "single/menurut indikasi",
    "maxDose": "16 mg/dosis*",
    "renal": "Individualize/verify renal adjustment",
    "note": "Indikasi menentukan dosis.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d41",
    "name": "prednisolone",
    "class": "Kortikosteroid",
    "indications": [
      "Asma/eksaserbasi inflamasi"
    ],
    "dose": "1–2 mg/kg/hari",
    "frequency": "q24h atau dibagi",
    "maxDose": "60 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Durasi dan tapering sesuai indikasi.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d42",
    "name": "cetirizine",
    "class": "Antihistamin",
    "indications": [
      "Rinitis alergi",
      "urtikaria"
    ],
    "dose": "2.5–10 mg/hari*",
    "frequency": "q24h",
    "maxDose": "10 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Dosis berdasarkan usia; renal adjustment bila berat.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d43",
    "name": "loratadine",
    "class": "Antihistamin",
    "indications": [
      "Rinitis alergi",
      "urtikaria"
    ],
    "dose": "5–10 mg/hari*",
    "frequency": "q24h",
    "maxDose": "10 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Dosis berdasarkan usia.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d44",
    "name": "chlorpheniramine",
    "class": "Antihistamin",
    "indications": [
      "Alergi"
    ],
    "dose": "0.35 mg/kg/hari*",
    "frequency": "dibagi 3–4 dosis",
    "maxDose": "16 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Sedatif; dosis berbasis usia.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d45",
    "name": "diazepam",
    "class": "Benzodiazepin",
    "indications": [
      "Kejang akut",
      "spasme"
    ],
    "dose": "0.2–0.5 mg/kg/dosis",
    "frequency": "PRN/menurut protokol",
    "maxDose": "10 mg/dosis",
    "renal": "Individualize/verify renal adjustment",
    "note": "Kejang akut memerlukan protokol dan monitoring napas.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d46",
    "name": "midazolam",
    "class": "Benzodiazepin",
    "indications": [
      "Kejang akut/sedasi"
    ],
    "dose": "0.1–0.2 mg/kg/dosis",
    "frequency": "PRN/menurut protokol",
    "maxDose": "10 mg/dosis",
    "renal": "Individualize/verify renal adjustment",
    "note": "Airway/respiratory monitoring wajib.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d47",
    "name": "levetiracetam",
    "class": "Antikejang",
    "indications": [
      "Epilepsi/kejang"
    ],
    "dose": "10 mg/kg/dosis awal",
    "frequency": "q12h; titrasi",
    "maxDose": "60 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Renal adjustment diperlukan.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d48",
    "name": "valproic acid",
    "class": "Antikejang",
    "indications": [
      "Epilepsi"
    ],
    "dose": "10–15 mg/kg/hari awal",
    "frequency": "dibagi 2–3 dosis",
    "maxDose": "60 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Perhatikan fungsi hati, trombosit, dan interaksi.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d49",
    "name": "carbamazepine",
    "class": "Antikejang",
    "indications": [
      "Epilepsi tertentu"
    ],
    "dose": "5 mg/kg/dosis awal",
    "frequency": "q12h",
    "maxDose": "35 mg/kg/hari*",
    "renal": "Individualize/verify renal adjustment",
    "note": "Banyak interaksi; titrasi dan monitoring.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d50",
    "name": "oxcarbazepine",
    "class": "Antikejang",
    "indications": [
      "Kejang fokal"
    ],
    "dose": "8–10 mg/kg/hari awal",
    "frequency": "dibagi q12h",
    "maxDose": "60 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Mulai setengah dosis pada CrCl <30 mL/min menurut label.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d51",
    "name": "furosemide",
    "class": "Diuretik",
    "indications": [
      "Edema",
      "gagal jantung"
    ],
    "dose": "1 mg/kg/dosis",
    "frequency": "q6–12h",
    "maxDose": "6 mg/kg/dosis",
    "renal": "Individualize/verify renal adjustment",
    "note": "Renal function, elektrolit, dan volume status perlu dipantau.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d52",
    "name": "spironolactone",
    "class": "Diuretik",
    "indications": [
      "Edema",
      "gagal jantung"
    ],
    "dose": "1–3 mg/kg/hari",
    "frequency": "q12–24h",
    "maxDose": "200 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Hindari/kurangi pada gangguan ginjal dan hiperkalemia.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d53",
    "name": "enalapril",
    "class": "ACE inhibitor",
    "indications": [
      "Hipertensi",
      "gagal jantung"
    ],
    "dose": "0.08 mg/kg/dosis awal",
    "frequency": "q12–24h",
    "maxDose": "0.6 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Renal adjustment dan monitoring K/Cr.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d54",
    "name": "captopril",
    "class": "ACE inhibitor",
    "indications": [
      "Hipertensi",
      "gagal jantung"
    ],
    "dose": "0.05–0.1 mg/kg/dosis awal",
    "frequency": "q8h",
    "maxDose": "6 mg/kg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Renal adjustment; monitor K/Cr.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d55",
    "name": "amlodipine",
    "class": "CCB",
    "indications": [
      "Hipertensi"
    ],
    "dose": "0.05–0.1 mg/kg/hari",
    "frequency": "q24h",
    "maxDose": "5 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Titrasi menurut usia dan respons.",
    "sourceStatus": "Needs clinical validation"
  },
  {
    "id": "d56",
    "name": "hydrochlorothiazide",
    "class": "Diuretik",
    "indications": [
      "Hipertensi",
      "edema"
    ],
    "dose": "1–2 mg/kg/dosis",
    "frequency": "q12–24h",
    "maxDose": "100 mg/hari",
    "renal": "Individualize/verify renal adjustment",
    "note": "Efek berkurang pada GFR rendah; monitor elektrolit.",
    "sourceStatus": "Needs clinical validation"
  }
];

const PRESCRIPTION_FORMS = [
  { value: "obat-jadi", label: "Obat jadi" },
  { value: "racikan-pulveres", label: "Racikan pulveres" },
  { value: "sirup-suspensi", label: "Sirup / suspensi" },
  { value: "tablet-kapsul", label: "Tablet / kapsul" },
  { value: "topikal", label: "Krim / salep / topikal" },
  { value: "tetes", label: "Tetes" },
  { value: "inhalasi-nebulisasi", label: "Inhalasi / nebulisasi" },
];

const ROUTES = ["PO", "IV", "IM", "SC", "INH", "NEB", "TOP", "OPHT", "OTIC", "NASAL", "RECTAL"];

function latinSigna(freq: string) {
  const f = freq.toLowerCase();
  if (f.includes("q24")) return "1 dd";
  if (f.includes("q12")) return "2 dd";
  if (f.includes("q8")) return "3 dd";
  if (f.includes("q6")) return "4 dd";
  if (f.includes("q4")) return "6 dd";
  if (f.includes("q6–8") || f.includes("q6-8")) return "3–4 dd";
  if (f.includes("q8–12") || f.includes("q8-12")) return "2–3 dd";
  if (f.includes("q12–24") || f.includes("q12-24")) return "1–2 dd";
  return freq;
}

function makePrescription(params: {
  patientName: string;
  age: string;
  weight: string;
  doctor: string;
  sip: string;
  date: string;
  diagnosis: string;
  drug: Drug;
  dosePerDose: string;
  frequency: string;
  route: string;
  form: string;
  duration: string;
  quantity: string;
  concentration: string;
  signaLanguage: string;
  compounded: boolean;
}) {
  const {
    patientName, age, weight, doctor, sip, date, diagnosis, drug,
    dosePerDose, frequency, route, form, duration, quantity, concentration,
    signaLanguage, compounded
  } = params;

  const dose = dosePerDose.trim() || drug.dose;
  const qty = quantity.trim() || "sesuai kebutuhan";
  const conc = concentration.trim() ? ` ${concentration.trim()} mg/5 mL` : "";
  const signa = signaLanguage === "Latin"
    ? `${latinSigna(frequency)} ${route === "PO" ? "po" : route.toLowerCase()}`
    : `${frequency} melalui ${route}`;

  let body = "";
  if (compounded) {
    body = `R/ ${drug.name} ${dose}
M.f. pulv. dtd No. ${qty}.
S. ${signa}${duration ? ` selama ${duration}` : ""}.`;
  } else {
    body = `R/ ${drug.name}${conc} ${form}
No. ${qty}.
S. ${signa}${duration ? ` selama ${duration}` : ""}.`;
  }

  return `${doctor ? doctor : "[Nama dokter]"}${sip ? `
SIP: ${sip}` : ""}
${date ? `
${date}` : ""}

${body}

-------------------------------- z
Pro: ${patientName || "[Nama pasien]"} (${age || "[usia]"}; BB ${weight || "[BB]"} kg)${diagnosis ? `
Diagnosis: ${diagnosis}` : ""}`;
}

function round(n:number, d=1) {
  const p = 10 ** d;
  return Math.round(n*p)/p;
}

function ageLabel(months:number) {
  if (months < 24) return `${months} bulan`;
  return `${round(months/12,1)} tahun`;
}

const BG_ILLUSTRATION = `
<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="blobBlue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3157d5" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#3157d5" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blobSoft" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c9d8ff" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#c9d8ff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <circle cx="1230" cy="110" r="420" fill="url(#blobBlue)"/>
  <circle cx="90" cy="780" r="360" fill="url(#blobSoft)"/>
  <circle cx="1310" cy="800" r="240" fill="url(#blobBlue)"/>

  <g stroke="#3157d5" stroke-opacity="0.09" stroke-width="2" stroke-linecap="round">
    <path d="M70 90h18M79 81v18"/>
    <path d="M210 240h16M218 232v16"/>
    <path d="M1360 260h18M1369 251v18"/>
    <path d="M1120 60h14M1127 53v14"/>
    <path d="M40 560h16M48 552v16"/>
    <path d="M1250 620h18M1259 611v18"/>
    <path d="M340 820h14M347 813v14"/>
  </g>

  <g stroke="#3157d5" stroke-opacity="0.13" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g transform="translate(70,150) rotate(-22)">
      <rect x="0" y="0" width="92" height="40" rx="20"/>
      <line x1="46" y1="0" x2="46" y2="40"/>
    </g>

    <g transform="translate(50,640)">
      <path d="M20 0 L20 55 M2 0 H38 M9 55 H31 L20 88 Z"/>
    </g>

    <g transform="translate(1240,90) rotate(18)">
      <circle cx="18" cy="18" r="18"/>
      <circle cx="52" cy="18" r="18"/>
      <line x1="18" y1="18" x2="52" y2="18"/>
    </g>

    <path d="M980 800 h60 l18 -42 l28 84 l22 -110 l18 68 h96"/>
  </g>
</svg>
`.trim();

export default function Home() {
  const [weight, setWeight] = useState("18");
  const [ageMonths, setAgeMonths] = useState("60");
  const [drugId, setDrugId] = useState("d01");
  const [indication, setIndication] = useState("");
  const [renal, setRenal] = useState("Normal");
  const [concentration, setConcentration] = useState("160");
  const [showFormula, setShowFormula] = useState(false);

  // Prescription fields based on the uploaded prescription-writing guide.
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [sip, setSip] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [rxDate, setRxDate] = useState(new Date().toISOString().slice(0, 10));
  const [rxForm, setRxForm] = useState("obat-jadi");
  const [route, setRoute] = useState("PO");
  const [dosePerDose, setDosePerDose] = useState("");
  const [rxFrequency, setRxFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [quantity, setQuantity] = useState("");
  const [signaLanguage, setSignaLanguage] = useState("Latin");

  const drug = DRUGS.find(d => d.id === drugId)!;
  const indications = drug.indications;
  const selectedIndication = indication || indications[0];

  const result = useMemo(() => {
    const kg = Number(weight);
    if (!kg || kg <= 0) return null;
    return {
      age: ageLabel(Number(ageMonths) || 0),
      kg,
      doseText: drug.dose,
      maxDose: drug.maxDose,
      renalText: renal === "Normal"
        ? "Tidak ada penyesuaian otomatis diterapkan."
        : `${renal}: aplikasi tidak mengubah dosis otomatis; verifikasi regimen renal spesifik obat pada referensi resmi.`,
    };
  }, [weight, ageMonths, drug, renal]);

  function prescription() {
    if (!result) return "";
    const compounded = rxForm === "racikan-pulveres";
    return makePrescription({
      patientName,
      age: result.age,
      weight: String(result.kg),
      doctor: doctorName,
      sip,
      date: rxDate,
      diagnosis: diagnosis || selectedIndication,
      drug,
      dosePerDose,
      frequency: rxFrequency || drug.frequency,
      route,
      form: PRESCRIPTION_FORMS.find(x => x.value === rxForm)?.label || "Obat jadi",
      duration,
      quantity,
      concentration,
      signaLanguage,
      compounded,
    });
  }

  async function copyRx() {
    await navigator.clipboard.writeText(prescription());
    alert("Format resep disalin.");
  }

  return (
    <main className="page">
      <div className="bgArt" aria-hidden="true" dangerouslySetInnerHTML={{ __html: BG_ILLUSTRATION }} />
      <div className="shell">
        <header className="header">
          <div className="brandMark">PD</div>
          <div>
            <div className="eyebrow">CLINICAL DECISION SUPPORT</div>
            <h1>PediDose</h1>
            <p>50-drug pediatric dosing database • Vercel-ready</p>
          </div>
        </header>

        <section className="hero">
          <div>
            <span className="pill">PEDIATRIC DRUG DATABASE</span>
            <h2>Dosis anak,<br/>lebih terstruktur.</h2>
            <p>Pilih obat → indikasi → masukkan BB/usia → cek renal → hasilkan format resep.</p>
          </div>
          <div className="heroIcon">Rx</div>
        </section>

        <section className="grid">
          <div className="card inputCard">
            <div className="cardTitle"><span>01</span> Data pasien</div>
            <label>Berat badan
              <div className="inputUnit"><input inputMode="decimal" value={weight} onChange={e => setWeight(e.target.value)} /><b>kg</b></div>
            </label>
            <label>Usia
              <div className="inputUnit"><input inputMode="numeric" value={ageMonths} onChange={e => setAgeMonths(e.target.value)} /><b>bulan</b></div>
            </label>

            <div className="cardTitle second"><span>02</span> Obat & indikasi</div>
            <label>Obat
              <select value={drugId} onChange={e => {
                setDrugId(e.target.value); setIndication("");
                setConcentration(e.target.value === "d01" ? "160" : "");
              }}>
                {DRUGS.map(d => <option key={d.id} value={d.id}>{d.name} — {d.class}</option>)}
              </select>
            </label>
            <label>Indikasi
              <select value={selectedIndication} onChange={e => setIndication(e.target.value)}>
                {indications.map(x => <option key={x} value={x}>{x}</option>)}
              </select>
            </label>

            <div className="cardTitle second"><span>03</span> Fungsi ginjal</div>
            <label>Status renal
              <select value={renal} onChange={e => setRenal(e.target.value)}>
                <option>Normal</option>
                <option>eGFR 60–89</option>
                <option>eGFR 30–59</option>
                <option>eGFR 15–29</option>
                <option>eGFR &lt;15 / dialysis</option>
              </select>
            </label>

            <label>Konsentrasi sediaan (opsional)
              <div className="inputUnit"><input inputMode="decimal" value={concentration} onChange={e => setConcentration(e.target.value)} placeholder="mis. 160" /><b>mg/5 mL</b></div>
            </label>
          </div>

          <div className="card resultCard">
            <div className="cardTitle"><span>04</span> Clinical dosing card</div>
            {!result ? <div className="empty">Masukkan BB.</div> : <>
              <div className="drugName">{drug.name}</div>
              <div className="indication">{selectedIndication}</div>

              <div className="dosePanel">
                <span>Dosis acuan</span>
                <strong>{result.doseText}</strong>
              </div>

              <div className="details">
                <div><span>Frekuensi</span><b>{drug.frequency}</b></div>
                <div><span>Dosis maksimum</span><b>{drug.maxDose}</b></div>
                <div><span>Renal</span><b>{result.renalText}</b></div>
                <div><span>Catatan</span><b>{drug.note}</b></div>
              </div>

              <div className="rxBox">
                <div className="rxHead"><b>FORMAT RESEP OTOMATIS</b><button onClick={copyRx}>Salin</button></div>

                <div className="rxGrid">
                  <label>Nama pasien
                    <input value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Nama anak" />
                  </label>
                  <label>Diagnosis
                    <input value={diagnosis} onChange={e => setDiagnosis(e.target.value)} placeholder={selectedIndication} />
                  </label>
                  <label>Nama dokter
                    <input value={doctorName} onChange={e => setDoctorName(e.target.value)} placeholder="Nama dokter" />
                  </label>
                  <label>SIP
                    <input value={sip} onChange={e => setSip(e.target.value)} placeholder="Nomor SIP" />
                  </label>
                  <label>Tanggal
                    <input type="date" value={rxDate} onChange={e => setRxDate(e.target.value)} />
                  </label>
                  <label>Bentuk sediaan
                    <select value={rxForm} onChange={e => setRxForm(e.target.value)}>
                      {PRESCRIPTION_FORMS.map(x => <option key={x.value} value={x.value}>{x.label}</option>)}
                    </select>
                  </label>
                  <label>Rute
                    <select value={route} onChange={e => setRoute(e.target.value)}>
                      {ROUTES.map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                  </label>
                  <label>Dosis per kali <span className="muted">(opsional)</span>
                    <input value={dosePerDose} onChange={e => setDosePerDose(e.target.value)} placeholder={drug.dose} />
                  </label>
                  <label>Frekuensi <span className="muted">(opsional)</span>
                    <input value={rxFrequency} onChange={e => setRxFrequency(e.target.value)} placeholder={drug.frequency} />
                  </label>
                  <label>Durasi
                    <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="mis. 5 hari" />
                  </label>
                  <label>Jumlah
                    <input value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="mis. No. I / No. X" />
                  </label>
                  <label>Gaya signa
                    <select value={signaLanguage} onChange={e => setSignaLanguage(e.target.value)}>
                      <option>Latin</option>
                      <option>Bahasa Indonesia</option>
                    </select>
                  </label>
                </div>

                <div className="rxHint">
                  <b>Prinsip resep anak:</b> nama obat + dosis + bentuk sediaan + signa + jumlah, serta identitas pasien dengan usia dan BB. Setiap R/ memiliki signa; jika lebih dari satu R/, masing-masing diberi signa dan paraf.
                </div>

                <pre>{prescription()}</pre>
              </div>

              <button className="formulaBtn" onClick={() => setShowFormula(!showFormula)}>
                {showFormula ? "Sembunyikan informasi database" : "Lihat status database"} <span>↗</span>
              </button>
              {showFormula && <div className="formula">
                <b>Status sumber: {drug.sourceStatus}</b>
                <div>Database ini dirancang sebagai struktur aplikasi dan wajib divalidasi terhadap label resmi, formularium rumah sakit, pedoman nasional, usia, indikasi, formulasi, dan kondisi pasien sebelum penggunaan klinis.</div>
              </div>}
            </>}
          </div>
        </section>

        <footer>
          <strong>⚠ Clinical safety notice</strong>
          <p>PediDose adalah alat bantu, bukan pengganti clinical judgment. Jangan gunakan database ini sebagai satu-satunya dasar prescribing. Penyesuaian renal pediatrik tidak boleh ditebak dari tabel dewasa; bukti dan label spesifik anak dapat terbatas. FDA menekankan adanya kesenjangan data dosing pediatrik pada gangguan ginjal.</p>
          <p className="tiny">Versi ini berisi 56 obat sebagai starter database. Struktur resep mengikuti pedoman penulisan resep yang diunggah: R/, nama obat/dosis, bentuk sediaan, signa, jumlah, serta Pro dengan usia/BB anak. Untuk rilis klinis, setiap regimen tetap harus memiliki sumber, tanggal verifikasi, populasi usia, indikasi, formulasi, renal/hepatic adjustment, max single dose, max daily dose, dan aturan rounding.</p>
        </footer>
      </div>
    </main>
  );
}
