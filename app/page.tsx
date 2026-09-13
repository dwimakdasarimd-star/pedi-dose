"use client";

import { useMemo, useState } from "react";
import { SKDI_4A_DISEASES } from "./skdi4a-data";

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
  { value: "tetes", label: "Tetes mata / telinga / hidung" },
  { value: "inhalasi-nebulisasi", label: "Inhalasi / nebulisasi" },
];

const ROUTES = ["PO", "IV", "IM", "SC", "INH", "NEB", "TOP", "OPHT", "OTIC", "NASAL", "RECTAL"];

function latinFrequency(freq: string) {
  const f = freq.toLowerCase().replace(/–/g, "-");
  if (f.includes("q4-6")) return "4-6 dd";
  if (f.includes("q6-8")) return "3-4 dd";
  if (f.includes("q8-12")) return "2-3 dd";
  if (f.includes("q12-24")) return "1-2 dd";
  if (f.includes("q24")) return "1 dd";
  if (f.includes("q12")) return "2 dd";
  if (f.includes("q8")) return "3 dd";
  if (f.includes("q6")) return "4 dd";
  if (f.includes("q4")) return "6 dd";
  return freq;
}

function ageLabel(months: number) {
  const m = Math.max(0, Math.round(months));
  const years = Math.floor(m / 12);
  const remMonths = m % 12;
  if (years <= 0) return `${remMonths} bulan`;
  if (remMonths === 0) return `${years} tahun`;
  return `${years} tahun ${remMonths} bulan`;
}

function dosageUnit(form: string) {
  if (form === "sirup-suspensi") return "c. orig";
  if (form === "tablet-kapsul") return "tab";
  if (form === "topikal") return "applic";
  if (form === "tetes") return "gtt";
  if (form === "inhalasi-nebulisasi") return "puff";
  if (form === "racikan-pulveres") return "pulv";
  return "tab";
}

function latinSigna(params: {
  frequency: string;
  form: string;
  route: string;
  amount: string;
  prn: boolean;
  timing: string;
  extra: string;
}) {
  const { frequency, form, route, amount, prn, timing, extra } = params;
  const freq = latinFrequency(frequency);
  const qty = amount.trim() || "1";
  let base = "";

  if (form === "topikal") {
    base = `${freq} applic part dol`;
  } else if (form === "tetes") {
    const target = route === "OPHT" ? "ODS" : route === "OTIC" ? "ADS/AS/AD" : "NDS";
    base = `${freq} gtt ${qty} ${target}`;
  } else if (form === "inhalasi-nebulisasi") {
    base = `${freq} puff ${qty}`;
  } else if (form === "racikan-pulveres") {
    base = `${freq} pulv ${qty}`;
  } else if (form === "sirup-suspensi") {
    base = `${freq} c. orig ${qty}`;
  } else {
    const unit = dosageUnit(form);
    base = `${freq} ${unit} ${qty}`;
  }

  if (prn) base += " prn";
  if (timing.trim()) base += ` ${timing.trim()}`;
  if (extra.trim()) base += `, ${extra.trim()}`;
  return base;
}

function indonesianSigna(params: {
  frequency: string;
  form: string;
  route: string;
  amount: string;
  prn: boolean;
  timing: string;
  extra: string;
}) {
  const { frequency, form, route, amount, prn, timing, extra } = params;
  const qty = amount.trim() || "1";
  const routeText: Record<string, string> = {
    PO: "per oral", IV: "intravena", IM: "intramuskular", SC: "subkutan",
    INH: "inhalasi", NEB: "nebulisasi", TOP: "topikal", OPHT: "pada mata",
    OTIC: "pada telinga", NASAL: "pada hidung", RECTAL: "per rektal"
  };
  const formText = form === "racikan-pulveres" ? `1 puyer (${qty})` : `${qty} ${form === "sirup-suspensi" ? "sendok takar" : form === "tetes" ? "tetes" : form === "topikal" ? "olesan" : form === "inhalasi-nebulisasi" ? "semprotan" : "tablet"}`;
  let base = `${frequency} ${formText}`;
  if (routeText[route]) base += ` ${routeText[route]}`;
  if (prn) base += " bila perlu";
  if (timing.trim()) base += ` ${timing.trim()}`;
  if (extra.trim()) base += `, ${extra.trim()}`;
  return base;
}

function makePrescription(params: {
  patientName: string;
  age: string;
  weight: string;
  doctor: string;
  sip: string;
  doctorAddress: string;
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
  compoundedIngredients: string;
  dosageForm: string;
  amountPerDose: string;
  prn: boolean;
  timing: string;
  extraSigna: string;
}) {
  const {
    patientName, age, weight, doctor, sip, doctorAddress, date, diagnosis, drug,
    dosePerDose, frequency, route, form, duration, quantity, concentration,
    signaLanguage, compounded, compoundedIngredients, dosageForm, amountPerDose, prn, timing, extraSigna
  } = params;

  const dose = dosePerDose.trim() || drug.dose;
  const qty = quantity.trim() || "[jumlah]";
  const conc = concentration.trim() ? ` ${concentration.trim()} mg/5 mL` : "";
  const signaParams = { frequency: frequency || drug.frequency, form, route, amount: amountPerDose, prn, timing, extra: extraSigna };
  const signa = signaLanguage === "Latin" ? latinSigna(signaParams) : indonesianSigna(signaParams);
  const durationText = duration.trim() ? ` selama ${duration.trim()}` : "";

  let body = "";
  if (compounded) {
    const ingredients = compoundedIngredients.trim() || `${drug.name} ${dose}\nSacc. lactis q.s.`;
    body = `R/ ${ingredients}\nM.f. pulv. dtd No. ${qty}.\nS. ${signa}${durationText}.\n(paraf)`;
  } else {
    const defaultDosageForm: Record<string, string> = {
      "obat-jadi": "tab",
      "sirup-suspensi": "syr",
      "tablet-kapsul": "tab",
      "topikal": "cr",
      "tetes": "ED",
      "inhalasi-nebulisasi": "inhaler"
    };
    const formText = dosageForm.trim() || defaultDosageForm[form] || "sediaan";
    const strength = form === "sirup-suspensi" || form === "tetes" || form === "topikal" || form === "inhalasi-nebulisasi"
      ? conc
      : ` ${dose}`;
    const nameLine = `R/ ${drug.name}${strength} ${formText}`;
    body = `${nameLine}\nNo. ${qty}.\nS. ${signa}${durationText}.\n(paraf)`;
  }

  const header = [
    doctor || "[Nama dokter]",
    sip ? `SIP: ${sip}` : "SIP: [Nomor SIP]",
    doctorAddress || "[Alamat praktik]",
    date || "[Tanggal]"
  ].join("\n");

  return `${header}\n\n${body}\n\nPro: ${patientName || "[Nama pasien]"}\nUmur: ${age || "[usia]"}; BB: ${weight || "[BB]"} kg${diagnosis ? `\nDiagnosis: ${diagnosis}` : ""}`;
}


type CalculatorKey = "dosing" | "infusion-rate" | "dose-rate" | "concentration" | "fluid-bolus" | "maintenance" | "skdi-4a";

function num(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function ClinicalReferenceDashboard({ onOpen }: { onOpen: () => void }) {
  const systems = new Set(SKDI_4A_DISEASES.map(d => d.system));
  const ready = SKDI_4A_DISEASES.filter(d => d.contentStatus && d.contentStatus !== "Framework").length;
  return <section className="card clinicalReferenceHero">
    <div className="clinicalReferenceCopy">
      <div className="cardTitle"><span>07</span> CLINICAL REFERENCE</div>
      <h3>Database 144 penyakit SKDI 4A</h3>
      <p>Clinical reference terintegrasi untuk membuka diagnosis, pemeriksaan yang diindikasikan, diagnosis banding, algoritme tatalaksana, follow-up, red flags, dan guideline setiap penyakit.</p>
      <button className="primaryCta" onClick={onOpen}>Buka database 144 penyakit <span>→</span></button>
    </div>
    <div className="clinicalReferenceStats">
      <div><strong>{SKDI_4A_DISEASES.length}</strong><span>penyakit</span></div>
      <div><strong>{systems.size}</strong><span>sistem</span></div>
      <div><strong>{ready}</strong><span>clinical entries</span></div>
    </div>
  </section>;
}

function CalculatorNav({ active, onChange }: { active: CalculatorKey; onChange: (key: CalculatorKey) => void }) {
  const items: { key: CalculatorKey; number: string; title: string; desc: string }[] = [
    { key: "dosing", number: "01", title: "Pediatric dosing", desc: "BB, usia, obat & resep" },
    { key: "infusion-rate", number: "02", title: "Infusion rate", desc: "Volume, waktu & mL/hr" },
    { key: "dose-rate", number: "03", title: "Dose ↔ pump rate", desc: "mcg/kg/min, mg/hr & mL/hr" },
    { key: "concentration", number: "04", title: "Infusion concentration", desc: "Amount, volume & strength" },
    { key: "fluid-bolus", number: "05", title: "Fluid volume", desc: "mL/kg & total volume" },
    { key: "maintenance", number: "06", title: "Maintenance fluids", desc: "4–2–1 / 100–50–20" },
    { key: "skdi-4a", number: "07", title: "SKDI 4A diseases", desc: "Diagnosis → workup → management" },
  ];
  return <nav className="calcNav" aria-label="Medical calculators">
    {items.map(item => <button key={item.key} className={`calcNavItem ${active === item.key ? "active" : ""}`} onClick={() => onChange(item.key)}>
      <span className="calcNavNumber">{item.number}</span><span><b>{item.title}</b><small>{item.desc}</small></span>
    </button>)}
  </nav>;
}

function ResultMetric({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return <div className="metric"><span>{label}</span><strong>{value} {unit && <small>{unit}</small>}</strong></div>;
}

function InfusionRateCalculator() {
  const [volume, setVolume] = useState("100");
  const [time, setTime] = useState("1");
  const [timeUnit, setTimeUnit] = useState("hours");
  const [dropFactor, setDropFactor] = useState("20");
  const [mode, setMode] = useState("pump");
  const hours = num(time) * (timeUnit === "minutes" ? 1 / 60 : 1);
  const rate = hours > 0 ? num(volume) / hours : 0;
  const drops = hours > 0 ? num(volume) * num(dropFactor) / (hours * 60) : 0;
  return <CalculatorLayout title="Infusion rate calculator" subtitle="Convert infused volume and time into an hourly pump rate or gravity drip rate.">
    <div className="calcGrid">
      <div className="calcInputs">
        <InputUnit label="Volume to infuse" value={volume} onChange={setVolume} unit="mL" />
        <div className="twoCol"><InputUnit label="Infusion time" value={time} onChange={setTime} unit={timeUnit === "hours" ? "hr" : "min"} /><SelectField label="Time unit" value={timeUnit} onChange={setTimeUnit} options={[["hours","hours"],["minutes","minutes"]]} /></div>
        <SelectField label="Output" value={mode} onChange={setMode} options={[["pump","Pump rate (mL/hr)"],["gravity","Gravity rate (gtt/min)"]]} />
        {mode === "gravity" && <InputUnit label="Drop factor" value={dropFactor} onChange={setDropFactor} unit="gtt/mL" />}
      </div>
      <div className="calcResult">
        <div className="resultKicker">CALCULATED RATE</div>
        <div className="resultHero">{mode === "pump" ? formatNumber(rate) : formatNumber(drops)} <small>{mode === "pump" ? "mL/hr" : "gtt/min"}</small></div>
        <div className="metricList"><ResultMetric label="Volume" value={formatNumber(num(volume))} unit="mL" /><ResultMetric label="Time" value={formatNumber(hours, 3)} unit="hr" />{mode === "pump" && <ResultMetric label="Equivalent" value={formatNumber(rate / 60, 3)} unit="mL/min" />}</div>
        <Formula text={mode === "pump" ? "Rate = volume ÷ time" : "Drops/min = volume (mL) × drop factor (gtt/mL) ÷ time (min)"} />
      </div>
    </div>
  </CalculatorLayout>;
}

function DoseRateCalculator() {
  const [dose, setDose] = useState("5");
  const [doseUnit, setDoseUnit] = useState("mcg/kg/min");
  const [weight, setWeight] = useState("18");
  const [amount, setAmount] = useState("400");
  const [amountUnit, setAmountUnit] = useState("mg");
  const [volume, setVolume] = useState("250");
  const [output, setOutput] = useState("mL/hr");
  const weightKg = num(weight), d = num(dose), amt = num(amount), vol = num(volume);
  const concentrationMgMl = vol > 0 ? (amountUnit === "mcg" ? amt / 1000 : amt) / vol : 0;
  const doseMgHr = doseUnit === "mcg/kg/min" ? d * weightKg * 60 / 1000 : doseUnit === "mg/kg/hr" ? d * weightKg : d;
  const pump = concentrationMgMl > 0 ? doseMgHr / concentrationMgMl : 0;
  const outputDose = output === "mL/hr" ? pump : output === "mg/hr" ? doseMgHr : doseMgHr * 1000;
  const outputUnit = output === "mL/hr" ? "mL/hr" : output === "mg/hr" ? "mg/hr" : "mcg/hr";
  return <CalculatorLayout title="Dose rate ↔ pump rate" subtitle="Translate a weight-based infusion dose into the corresponding pump rate from a prepared concentration.">
    <div className="calcGrid"><div className="calcInputs">
      <div className="twoCol"><InputUnit label="Dose" value={dose} onChange={setDose} unit={doseUnit === "mcg/kg/min" ? "mcg/kg/min" : "mg/kg/hr"} /><SelectField label="Dose unit" value={doseUnit} onChange={setDoseUnit} options={[["mcg/kg/min","mcg/kg/min"],["mg/kg/hr","mg/kg/hr"],["mg/hr","mg/hr"]]} /></div>
      <InputUnit label="Patient weight" value={weight} onChange={setWeight} unit="kg" />
      <div className="twoCol"><InputUnit label="Drug amount in bag/syringe" value={amount} onChange={setAmount} unit={amountUnit} /><SelectField label="Amount unit" value={amountUnit} onChange={setAmountUnit} options={[["mg","mg"],["mcg","mcg"]]} /></div>
      <InputUnit label="Final volume" value={volume} onChange={setVolume} unit="mL" />
      <SelectField label="Show result as" value={output} onChange={setOutput} options={[["mL/hr","Pump rate (mL/hr)"],["mg/hr","Drug delivery (mg/hr)"],["mcg/hr","Drug delivery (mcg/hr)"]]} />
    </div><div className="calcResult"><div className="resultKicker">CALCULATED OUTPUT</div><div className="resultHero">{formatNumber(outputDose, 3)} <small>{outputUnit}</small></div>
      <div className="metricList"><ResultMetric label="Prepared concentration" value={formatNumber(concentrationMgMl, 4)} unit="mg/mL" /><ResultMetric label="Dose delivered" value={formatNumber(doseMgHr, 3)} unit="mg/hr" /><ResultMetric label="Weight" value={formatNumber(weightKg)} unit="kg" /></div>
      <Formula text="Pump rate = required drug delivery ÷ concentration. For mcg/kg/min, first convert to mg/hr." />
    </div></div></CalculatorLayout>;
}

function ConcentrationCalculator() {
  const [amount, setAmount] = useState("500"); const [amountUnit, setAmountUnit] = useState("mg"); const [volume, setVolume] = useState("100"); const [volumeUnit, setVolumeUnit] = useState("mL");
  const mg = num(amount) * (amountUnit === "g" ? 1000 : amountUnit === "mcg" ? 0.001 : 1); const ml = num(volume) * (volumeUnit === "L" ? 1000 : 1); const mgMl = ml > 0 ? mg / ml : 0;
  return <CalculatorLayout title="Infusion concentration" subtitle="Calculate concentration from the amount of drug and the final solution volume."><div className="calcGrid"><div className="calcInputs">
    <div className="twoCol"><InputUnit label="Drug amount" value={amount} onChange={setAmount} unit={amountUnit} /><SelectField label="Amount unit" value={amountUnit} onChange={setAmountUnit} options={[["mg","mg"],["g","g"],["mcg","mcg"]]} /></div>
    <div className="twoCol"><InputUnit label="Final volume" value={volume} onChange={setVolume} unit={volumeUnit} /><SelectField label="Volume unit" value={volumeUnit} onChange={setVolumeUnit} options={[["mL","mL"],["L","L"]]} /></div>
  </div><div className="calcResult"><div className="resultKicker">CONCENTRATION</div><div className="resultHero">{formatNumber(mgMl, 4)} <small>mg/mL</small></div><div className="metricList"><ResultMetric label="Equivalent" value={formatNumber(mgMl * 1000, 2)} unit="mg/L" /><ResultMetric label="Amount" value={formatNumber(mg)} unit="mg" /><ResultMetric label="Final volume" value={formatNumber(ml)} unit="mL" /></div><Formula text="Concentration = total drug amount ÷ final volume." /></div></div></CalculatorLayout>;
}

function FluidBolusCalculator() {
  const [weight, setWeight] = useState("18"); const [volumePerKg, setVolumePerKg] = useState("10"); const [maximum, setMaximum] = useState("");
  const total = num(weight) * num(volumePerKg); const max = num(maximum); const capped = max > 0 ? Math.min(total, max) : total;
  return <CalculatorLayout title="Weight-based fluid volume" subtitle="Calculate a volume from a selected mL/kg factor. This tool performs arithmetic only; choose the clinical factor from your protocol."><div className="calcGrid"><div className="calcInputs">
    <InputUnit label="Patient weight" value={weight} onChange={setWeight} unit="kg" /><InputUnit label="Selected volume factor" value={volumePerKg} onChange={setVolumePerKg} unit="mL/kg" /><InputUnit label="Optional maximum volume" value={maximum} onChange={setMaximum} unit="mL" placeholder="leave blank" />
    <div className="rxHint">Enter the mL/kg factor specified by your local protocol. No bolus dose is hard-coded into this calculator.</div>
  </div><div className="calcResult"><div className="resultKicker">CALCULATED VOLUME</div><div className="resultHero">{formatNumber(capped)} <small>mL</small></div><div className="metricList"><ResultMetric label="Uncapped volume" value={formatNumber(total)} unit="mL" /><ResultMetric label="Weight" value={formatNumber(num(weight))} unit="kg" /><ResultMetric label="Factor" value={formatNumber(num(volumePerKg))} unit="mL/kg" /></div><Formula text="Total volume = body weight × selected volume factor." /></div></div></CalculatorLayout>;
}

function MaintenanceCalculator() {
  const [weight, setWeight] = useState("18"); const kg = num(weight); const hourly = kg <= 10 ? kg * 4 : kg <= 20 ? 40 + (kg - 10) * 2 : 60 + (kg - 20); const daily = kg <= 10 ? kg * 100 : kg <= 20 ? 1000 + (kg - 10) * 50 : 1500 + (kg - 20) * 20;
  return <CalculatorLayout title="Maintenance fluid calculator" subtitle="Pediatric maintenance arithmetic using the 4–2–1 hourly rule and 100–50–20 daily rule."><div className="calcGrid"><div className="calcInputs"><InputUnit label="Patient weight" value={weight} onChange={setWeight} unit="kg" /><div className="rxHint"><b>Hourly rule:</b> 4 mL/kg/hr for first 10 kg, 2 mL/kg/hr for next 10 kg, then 1 mL/kg/hr thereafter.</div><div className="rxHint"><b>Daily rule:</b> 100 mL/kg/day for first 10 kg, 50 mL/kg/day for next 10 kg, then 20 mL/kg/day thereafter.</div></div><div className="calcResult"><div className="resultKicker">MAINTENANCE ESTIMATE</div><div className="resultHero">{formatNumber(hourly, 2)} <small>mL/hr</small></div><div className="metricList"><ResultMetric label="Daily equivalent" value={formatNumber(daily)} unit="mL/day" /><ResultMetric label="Weight" value={formatNumber(kg)} unit="kg" /><ResultMetric label="Hourly × 24" value={formatNumber(hourly * 24)} unit="mL/day" /></div><Formula text="4–2–1 hourly rule and 100–50–20 daily rule are shown as calculation methods, not fluid prescribing recommendations." /></div></div></CalculatorLayout>;
}

function InputUnit({ label, value, onChange, unit, placeholder }: { label: string; value: string; onChange: (v: string) => void; unit: string; placeholder?: string }) { return <label>{label}<div className="inputUnit"><input inputMode="decimal" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} /><b>{unit}</b></div></label>; }
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[][] }) { return <label>{label}<select value={value} onChange={e => onChange(e.target.value)}>{options.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></label>; }
function Formula({ text }: { text: string }) { return <div className="formula"><b>Formula</b><div>{text}</div></div>; }
function CalculatorLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) { return <><div className="calcHeading"><div><div className="cardTitle"><span>CALCULATOR</span></div><h3>{title}</h3><p>{subtitle}</p></div><div className="calcBadge">CHECK UNITS<br/>BEFORE USE</div></div>{children}<div className="calcSafety"><b>Clinical safety:</b> This calculator performs unit conversion and arithmetic. It does not select a drug, indication, dose, concentration, target, or treatment protocol. Verify inputs, preparation details, pump settings, institutional protocols, and current references before clinical use.</div></>; }


function Skdi4aDatabase() {
  const [query, setQuery] = useState("");
  const [system, setSystem] = useState("Semua");
  const [selectedId, setSelectedId] = useState(SKDI_4A_DISEASES[0]?.id ?? "");
  const systems = ["Semua", ...Array.from(new Set(SKDI_4A_DISEASES.map(d => d.system)))];
  const filtered = SKDI_4A_DISEASES.filter(d => {
    const q = query.trim().toLowerCase();
    const matchesSystem = system === "Semua" || d.system === system;
    const haystack = `${d.name} ${d.system} ${d.keywords.join(" ")}`.toLowerCase();
    return matchesSystem && (!q || haystack.includes(q));
  });
  const selected = SKDI_4A_DISEASES.find(d => d.id === selectedId) ?? filtered[0] ?? SKDI_4A_DISEASES[0];

  return <section className="card skdiCard">
    <div className="calcHeading">
      <div><div className="cardTitle"><span>07</span> SKDI 4A DATABASE</div><h3>Penyakit SKDI tingkat kompetensi 4A</h3><p>Database terstruktur untuk belajar dan clinical decision support: diagnosis, pemeriksaan penunjang, diagnosis banding, tatalaksana awal/mandiri, edukasi, follow-up, dan kriteria rujuk.</p></div>
      <div className="calcBadge">SKDI 2012<br/>4A • 144 ITEMS</div>
    </div>
    <div className="skdiToolbar">
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari diagnosis, sistem, atau keyword…" aria-label="Cari penyakit SKDI 4A" />
      <select value={system} onChange={e => setSystem(e.target.value)} aria-label="Filter sistem">
        {systems.map(s => <option key={s}>{s}</option>)}
      </select>
    </div>
    <div className="skdiLayout">
      <div className="skdiList" role="listbox" aria-label="Daftar penyakit SKDI 4A">
        <div className="skdiCount">Menampilkan {filtered.length} dari {SKDI_4A_DISEASES.length} diagnosis</div>
        {filtered.map(d => <button key={d.id} className={`skdiItem ${selected?.id === d.id ? "active" : ""}`} onClick={() => setSelectedId(d.id)}>
          <span className="skdiNo">{d.number}</span><span><b>{d.name}</b><small>{d.system}</small></span>
        </button>)}
      </div>
      {selected && <article className="skdiDetail">
        <div className="skdiDetailTop"><div><span className="skdiTag">4A</span><h4>{selected.name}</h4><p>{selected.system}</p></div><span className="skdiStatus">{selected.contentStatus}</span></div>
        <div className="skdiSections">
          <section><h5>1. Diagnosis</h5><p>{selected.diagnosis}</p></section>
          <section><h5>2. Pemeriksaan penunjang</h5><p>{selected.workup}</p></section>
          <section><h5>3. Diagnosis banding</h5><p>{selected.differential}</p></section>
          <section><h5>4. Tatalaksana</h5><p>{selected.management}</p></section>
          <section><h5>5. Edukasi & follow-up</h5><p>{selected.followUp}</p></section>
          <section className="skdiReferral"><h5>6. Rujuk / red flags</h5><p>{selected.referral}</p></section>
        </div>
        <div className="skdiSource"><b>Guideline:</b> {selected.sources.map(s=><a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={{marginRight:10}}>{s.name}</a>)}<br/><br/><b>Sumber kompetensi:</b> Konsil Kedokteran Indonesia, Standar Kompetensi Dokter Indonesia — Daftar Penyakit. <b>Catatan:</b> ringkasan klinis aplikasi harus diverifikasi terhadap pedoman nasional/terbaru, formularium, kondisi pasien, dan kewenangan fasilitas sebelum digunakan untuk keputusan klinis.</div>
      </article>}
    </div>
  </section>;
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
  const [activeCalculator, setActiveCalculator] = useState<CalculatorKey>("dosing");

  // Prescription fields based on the uploaded prescription-writing guide.
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [sip, setSip] = useState("");
  const [doctorAddress, setDoctorAddress] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [rxDate, setRxDate] = useState(new Date().toISOString().slice(0, 10));
  const [rxForm, setRxForm] = useState("obat-jadi");
  const [dosageForm, setDosageForm] = useState("tab");
  const [route, setRoute] = useState("PO");
  const [dosePerDose, setDosePerDose] = useState("");
  const [rxFrequency, setRxFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [quantity, setQuantity] = useState("");
  const [signaLanguage, setSignaLanguage] = useState("Latin");
  const [amountPerDose, setAmountPerDose] = useState("1");
  const [prn, setPrn] = useState(false);
  const [timing, setTiming] = useState("");
  const [extraSigna, setExtraSigna] = useState("");
  const [compoundedIngredients, setCompoundedIngredients] = useState("");

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
      doctorAddress,
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
      compoundedIngredients,
      dosageForm,
      amountPerDose,
      prn,
      timing,
      extraSigna,
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
            <p>56-drug pediatric dosing • 144-disease clinical reference • Vercel-ready</p>
          </div>
        </header>

        <section className="hero">
          <div>
            <span className="pill">CLINICAL CALCULATOR SUITE</span>
            <h2>Medical calculators,<br/>lebih terstruktur.</h2>
            <p>Pilih kalkulator dari panel di bawah. Setiap calculator memiliki input, output, formula, dan safety notice yang terpisah.</p>
          </div>
          <div className="heroIcon">∑</div>
        </section>

        <ClinicalReferenceDashboard onOpen={() => setActiveCalculator("skdi-4a")} />

        <CalculatorNav active={activeCalculator} onChange={setActiveCalculator} />

        {activeCalculator === "dosing" && <section className="grid">
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
                  <label>Alamat praktik
                    <input value={doctorAddress} onChange={e => setDoctorAddress(e.target.value)} placeholder="Alamat praktik dokter" />
                  </label>
                  <label>Tanggal
                    <input type="date" value={rxDate} onChange={e => setRxDate(e.target.value)} />
                  </label>
                  <label>Bentuk sediaan
                    <select value={rxForm} onChange={e => setRxForm(e.target.value)}>
                      {PRESCRIPTION_FORMS.map(x => <option key={x.value} value={x.value}>{x.label}</option>)}
                    </select>
                  </label>
                  <label>Bentuk singkat sediaan
                    <input value={dosageForm} onChange={e => setDosageForm(e.target.value)} placeholder="tab / cap / syr / cr / ED" />
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
                  <label>Jumlah unit per kali
                    <input value={amountPerDose} onChange={e => setAmountPerDose(e.target.value)} placeholder="mis. 1 / 2" />
                  </label>
                  <label>Durasi
                    <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="mis. 5 hari" />
                  </label>
                  <label>Jumlah resep
                    <input value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="mis. X / XX / No. I" />
                  </label>
                  <label>Waktu pemberian
                    <input value={timing} onChange={e => setTiming(e.target.value)} placeholder="mis. p.c. / a.c. / h.s." />
                  </label>
                  <label>Instruksi tambahan
                    <input value={extraSigna} onChange={e => setExtraSigna(e.target.value)} placeholder="mis. habiskan / tiap pagi" />
                  </label>
                  <label className="checkLabel">
                    <input type="checkbox" checked={prn} onChange={e => setPrn(e.target.checked)} />
                    Bila perlu (prn)
                  </label>
                  <label>Gaya signa
                    <select value={signaLanguage} onChange={e => setSignaLanguage(e.target.value)}>
                      <option>Latin</option>
                      <option>Bahasa Indonesia</option>
                    </select>
                  </label>
                  {rxForm === "racikan-pulveres" && <label className="fullRow">Komponen racikan
                    <textarea value={compoundedIngredients} onChange={e => setCompoundedIngredients(e.target.value)} placeholder={`Contoh:
Paracetamol 100 mg
Gliseril guaiakolat 50 mg
CTM 1 mg
Sacc. lactis q.s.`} rows={5} />
                  </label>}
                </div>

                <div className="rxHint">
                  <b>Prinsip resep anak dari kedua panduan:</b> cantumkan identitas dokter (termasuk SIP), tanggal, identitas pasien dengan umur/BB, diagnosis bila digunakan, lalu setiap R/ harus jelas obat + kekuatan/dosis + bentuk sediaan + jumlah + S. (signa). Pada beberapa contoh sumber, setiap R/ juga diakhiri paraf; racikan pulveres menggunakan <i>M.f. pulv. dtd No.</i> dan S. pulv.
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
        </section>}
        {activeCalculator === "infusion-rate" && <section className="card calculatorCard"><InfusionRateCalculator /></section>}
        {activeCalculator === "dose-rate" && <section className="card calculatorCard"><DoseRateCalculator /></section>}
        {activeCalculator === "concentration" && <section className="card calculatorCard"><ConcentrationCalculator /></section>}
        {activeCalculator === "fluid-bolus" && <section className="card calculatorCard"><FluidBolusCalculator /></section>}
        {activeCalculator === "maintenance" && <section className="card calculatorCard"><MaintenanceCalculator /></section>}
        {activeCalculator === "skdi-4a" && <Skdi4aDatabase />}

        <footer>
          <strong>⚠ Clinical safety notice</strong>
          <p>PediDose adalah alat bantu, bukan pengganti clinical judgment. Jangan gunakan database ini sebagai satu-satunya dasar prescribing. Penyesuaian renal pediatrik tidak boleh ditebak dari tabel dewasa; bukti dan label spesifik anak dapat terbatas. FDA menekankan adanya kesenjangan data dosing pediatrik pada gangguan ginjal.</p>
          <p className="tiny">Versi ini berisi 56 obat sebagai starter database. Struktur resep mengikuti pedoman penulisan resep yang diunggah: R/, nama obat/dosis, bentuk sediaan, signa, jumlah, serta Pro dengan usia/BB anak. Untuk rilis klinis, setiap regimen tetap harus memiliki sumber, tanggal verifikasi, populasi usia, indikasi, formulasi, renal/hepatic adjustment, max single dose, max daily dose, dan aturan rounding.</p>
        </footer>
      </div>
    </main>
  );
}
