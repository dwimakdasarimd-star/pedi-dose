# PediDose — Pediatric Dose Calculator

Next.js 14 + TypeScript + CSS, ready for GitHub/Vercel.

## Included
- 50 pediatric medicines
- Drug class
- Multiple indications
- Pediatric dose reference field
- Frequency
- Maximum dose field
- Renal-status workflow
- Automatic prescription-format text
- Copy prescription button
- Age and weight inputs
- Clinical safety notice

## Important
This repository is a **starter clinical decision-support application**, not a clinically validated prescribing database.
Every medication regimen must be reviewed against current official product labeling, national/local formularies and guidelines, pediatric references, formulation strength, age/weight restrictions, renal/hepatic function, contraindications, interactions, and indication-specific duration.

For renal dosing, do not infer pediatric dosing simply from adult tables. FDA materials specifically discuss the evidence gaps and the need for pediatric-specific renal dosing approaches.

## Run locally
npm install
npm run dev

## Deploy
Push this folder to GitHub, then import the repository into Vercel.


## Prescription-writing module
The app now includes a prescription formatter aligned to the uploaded FK UNS prescription skills guide:
- patient name, age and weight
- prescriber name/SIP and date
- diagnosis/indication
- drug name, dose, dosage form, route, frequency, duration and quantity
- Latin or Indonesian signa
- ready-made medicine and pulveres/racikan output
- copy-ready prescription text

The guide emphasizes rational prescribing, correct drug/dose/formulation/patient, and inclusion of age/weight for pediatric patients. The app is a training/decision-support tool and does not replace current official labeling or local formularies.
