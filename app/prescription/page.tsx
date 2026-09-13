"use client";

import { useMemo, useState } from "react";

const FREQ: Record<string,string> = { "1":"1 dd", "2":"2 dd", "3":"3 dd", "4":"4 dd", "5":"5 dd", "6":"6 dd" };

export default function PrescriptionPage() {
  const [drug,setDrug] = useState("paracetamol");
  const [strength,setStrength] = useState("");
  const [form,setForm] = useState("tab");
  const [qty,setQty] = useState("");
  const [dose,setDose] = useState("");
  const [freq,setFreq] = useState("3");
  const [timing,setTiming] = useState("pc");
  const [prn,setPrn] = useState(false);
  const [ingredients,setIngredients] = useState("paracetamol 100 mg\nSacc. lactis q.s.");
  const compounded = form === "pulv";

  const preview = useMemo(() => {
    const signa = `${FREQ[freq] || freq} ${dose ? `${form} ${dose}` : form}${timing ? ` ${timing === "pc" ? "p.c." : "a.c."}` : ""}${prn ? " prn" : ""}`;
    if (compounded) return `R/\n${ingredients.split("\n").filter(Boolean).map(x => `   ${x}`).join("\n")}\n   M.f. pulv. dtd. No. ${qty || "..."}\nS. ${signa}\n(paraf)`;
    return `R/\n   ${drug}${strength ? ` ${strength}` : ""} ${form}\n   No. ${qty || "..."}\nS. ${signa}\n(paraf)`;
  }, [drug,strength,form,qty,dose,freq,timing,prn,ingredients,compounded]);

  return <main style={{maxWidth:1000,margin:"40px auto",padding:24,fontFamily:"system-ui"}}>
    <h1>PediDose — Penulisan Resep</h1>
    <p>Formatter mengikuti pola materi resep yang diunggah: R/ · No. · S. · paraf dan racikan M.f. pulv. dtd.</p>
    <section style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
      <div style={{display:"grid",gap:12}}>
        <label>Obat<input style={{width:"100%"}} value={drug} onChange={e=>setDrug(e.target.value)} /></label>
        <label>Kekuatan<input style={{width:"100%"}} value={strength} onChange={e=>setStrength(e.target.value)} placeholder="500 mg" /></label>
        <label>Bentuk sediaan<input style={{width:"100%"}} value={form} onChange={e=>setForm(e.target.value)} placeholder="tab / cap / syr / cr / ED / pulv" /></label>
        {compounded && <label>Komponen pulveres<textarea style={{width:"100%"}} rows={5} value={ingredients} onChange={e=>setIngredients(e.target.value)} /></label>}
        <label>Jumlah No.<input style={{width:"100%"}} value={qty} onChange={e=>setQty(e.target.value)} placeholder="X / XXI" /></label>
        <label>Dosis per kali<input style={{width:"100%"}} value={dose} onChange={e=>setDose(e.target.value)} placeholder="1 / 1/2 / 5 mL" /></label>
        <label>Frekuensi<select style={{width:"100%"}} value={freq} onChange={e=>setFreq(e.target.value)}>{Object.keys(FREQ).map(x=><option key={x} value={x}>{FREQ[x]}</option>)}</select></label>
        <label>Waktu<select style={{width:"100%"}} value={timing} onChange={e=>setTiming(e.target.value)}><option value="pc">p.c.</option><option value="ac">a.c.</option><option value="">tanpa waktu</option></select></label>
        <label><input type="checkbox" checked={prn} onChange={e=>setPrn(e.target.checked)} /> prn / bila perlu</label>
      </div>
      <div><h2>Preview</h2><pre style={{whiteSpace:"pre-wrap",background:"#f6f7f9",padding:20,borderRadius:12}}>{preview}</pre><button onClick={()=>navigator.clipboard?.writeText(preview)}>Salin resep</button></div>
    </section>
  </main>;
}
