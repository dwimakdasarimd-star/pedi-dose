import { SKDI_4A_DISEASES as LEGACY_DISEASES, type Skdi4aDisease as LegacyDisease } from './skdi4a-data-legacy';
import { KKI_2026_SPECTRUM } from './kki2026-spectrum';

export type SkdiDisease = LegacyDisease & {
  level: string;
  sourceFramework: string;
};

const normalize = (s: string) => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9]+/g, ' ').trim();
const legacyByName = new Map(LEGACY_DISEASES.map(d => [normalize(d.name), d]));

function makeScopeReference(name: string, system: string, level: string): LegacyDisease {
  const urgent = level.includes('rujuk');
  const diagnosis = `Fokus diagnosis: ${name}. Nilai anamnesis terarah, tanda vital, pemeriksaan fisik sistem terkait, derajat keparahan, komorbid, usia/kehamilan bila relevan, serta red flags. ${urgent ? 'Karena tercantum sebagai kondisi yang memerlukan tata laksana awal dan rujukan dalam Spektrum Penyakit KKI 2026, stabilisasi dan penilaian kegawatan harus diprioritaskan.' : 'Diagnosis dan derajat penyakit tetap harus dikonfirmasi berdasarkan kriteria klinis/guideline yang sesuai.'}`;
  const workup = `Pemeriksaan dipilih berdasarkan pertanyaan klinis: pemeriksaan dasar yang mengubah keputusan terapi/rujukan, kemudian pemeriksaan konfirmasi atau penilaian derajat bila diindikasikan. Hindari pemeriksaan rutin tanpa indikasi. Untuk kondisi ini, sesuaikan dengan guideline nasional/internasional terbaru, fasilitas yang tersedia, dan kelompok usia.`;
  const differential = `DDx utama perlu mencakup kondisi yang paling mungkin, kondisi yang berbahaya namun dapat menyerupai ${name}, serta penyebab alternatif yang mengubah tata laksana. Prioritaskan DDx berdasarkan anamnesis, pemeriksaan fisik, red flags, dan pemeriksaan penunjang.`;
  const management = urgent
    ? `Tata laksana awal: ABCDE bila sakit berat, stabilisasi, terapi suportif dan intervensi awal sesuai sindrom/etiologi, lalu rujuk sesuai kegawatan dan kompetensi. Regimen obat, dosis, cairan, oksigen, antibiotik/antidot atau tindakan definitif harus mengikuti guideline spesifik kondisi, usia/berat badan, fungsi organ, dan protokol fasilitas.`
    : `Tata laksana: terapi nonfarmakologis dan farmakologis sesuai diagnosis, derajat penyakit, usia/berat badan, komorbid, alergi dan fungsi ginjal/hati. Gunakan prinsip penggunaan obat rasional dan guideline spesifik penyakit; hindari pemberian antibiotik atau obat lain tanpa indikasi.`;
  const followUp = `Follow-up ditentukan oleh derajat penyakit dan respons terapi. Nilai gejala, tanda vital, fungsi, kepatuhan, efek samping, serta parameter laboratorium/imaging bila memang diperlukan. Tetapkan target terapi dan waktu kontrol yang jelas; eskalasi bila memburuk atau tidak mencapai target.`;
  const referral = urgent
    ? `Rujuk segera/terencana sesuai kondisi karena kategori KKI 2026 adalah “tatalaksana awal dan rujuk”. Red flags meliputi instabilitas hemodinamik/respirasi, gangguan kesadaran, progresivitas cepat, komplikasi organ, kebutuhan prosedur/monitoring yang tidak tersedia, atau kegagalan tata laksana awal.`
    : `Rujuk bila diagnosis tidak pasti, terdapat red flags, komplikasi, perburukan, kegagalan terapi, kebutuhan pemeriksaan/prosedur di luar fasilitas, atau kondisi melampaui kewenangan layanan primer.`;
  return {
    id:'', number:0, name, system, keywords:[name,system,'KKI 2026'], diagnosis, workup, differential, management, followUp, referral,
    sources:[{name:'Kemenkes RI',url:'https://www.kemkes.go.id/'},{name:'WHO',url:'https://www.who.int/'},{name:'KKI — Standar Kompetensi Dokter 2026',url:'https://kki.go.id/'}],
    contentStatus:'Clinical reference — guideline-based draft'
  };
}

export const SKDI_4A_DISEASES: SkdiDisease[] = KKI_2026_SPECTRUM.map((entry, i) => {
  const legacy = legacyByName.get(normalize(entry.name));
  const base = legacy ?? makeScopeReference(entry.name, entry.system, entry.level);
  const isScopeOnly = !legacy;
  return {
    ...base,
    id:`kki2026-${i+1}`,
    number:i+1,
    name:entry.name,
    system:entry.system,
    keywords:Array.from(new Set([...(base.keywords || []), entry.name, entry.system, entry.level, 'KKI 2026'])),
    level:entry.level,
    sourceFramework:'Keputusan Ketua Konsil Kesehatan Indonesia No. HK.01.02/KKI/1291/2026 — Standar Kompetensi Dokter, Tabel 4 Spektrum Penyakit',
    contentStatus: isScopeOnly ? 'Scope entry — KKI 2026; clinical details require disease-specific guideline verification' : base.contentStatus,
  };
});
