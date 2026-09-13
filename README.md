# PediDose — Pediatric Dose Calculator

Next.js 14 + TypeScript + CSS, ready for GitHub/Vercel.

## Included
- 56 pediatric medicines
- Drug class and multiple indications
- Pediatric dose reference field
- Frequency, maximum dose and renal-status workflow
- Prescription formatter based on the two uploaded prescription guides
- Obat jadi, sirup/suspensi, tablet/kapsul, topikal, tetes, inhalasi/nebulisasi
- Racikan pulveres with `M.f. pulv. dtd No.` structure and editable ingredient list
- Doctor identity: name, SIP, practice address and date
- Patient identity: name, age and weight
- Diagnosis/indication field
- Latin or Indonesian signa
- Optional timing (`p.c.`, `a.c.`, `h.s.`), PRN and extra instructions
- Per-prescription-item `(paraf)` marker
- Copy-ready prescription text

## Prescription-writing basis
The formatter was updated after reviewing both uploaded references. The references repeatedly use the structure `R/` → medicine/strength/form → `No.` → `S.` (signa), with patient age/weight and prescriber information shown on prescription examples. They also show separate prescription items with a paraf marker and pulveres examples using `M.f. pulv. dtd No.`. Examples include liquid directions such as `c. orig`, topical `u.e./applic`, drops `gtt`, and frequency notation such as `1 dd`, `2 dd`, `3 dd`, and `4 dd`.

The implementation intentionally treats these as **formatting conventions from the uploaded study materials**, not as proof that any particular clinical regimen is current or appropriate.

## Important clinical safety note
This repository is a **training/decision-support application**, not a clinically validated prescribing database. The medication entries are starter references and must be independently checked against current official product labeling, national/local formularies, institutional protocols and indication-specific guidelines before clinical use.

Do not infer pediatric renal dosing from adult tables. Verify age-specific dosing, formulation strength, route, indication, duration, maximum single/daily dose, renal/hepatic adjustment, contraindications and interactions.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy
Push this folder to GitHub, then import the repository into Vercel.

## Calculator suite
The interface now includes separate calculator sections for:
- Pediatric dosing (existing 56-drug workflow)
- Infusion rate (mL/hr or gtt/min)
- Dose rate ↔ pump rate (weight-based dose to pump rate)
- Infusion concentration (amount/final volume)
- Weight-based fluid volume (mL/kg arithmetic)
- Pediatric maintenance fluids (4–2–1 and 100–50–20 calculations)
- Glasgow Coma Scale (GCS) — eye/verbal/motor scoring with a pediatric verbal scale for infants/children <2 years

The infusion calculators are intentionally generic: they calculate units and arithmetic but do not prescribe a drug, target dose, concentration, or treatment protocol. Verify preparation, units, pump programming, institutional policy, and current clinical references before use.
