'use client';
import { useEffect, useMemo, useState } from 'react';
import Nav from '../components/Nav';

const symptomTypes = ['Acid reflux', 'Heartburn', 'Bloating', 'Stomach pain', 'Nausea', 'Gas', 'Constipation', 'Diarrhea', 'Cramping'];
const storageKey = 'healgut_symptom_logs_v1';

export default function SymptomTracker() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ symptom: 'Acid reflux', severity: 5, meal: '', stress: 3, sleep: 'Good', notes: '' });
  useEffect(() => { setLogs(JSON.parse(localStorage.getItem(storageKey) || '[]')); }, []);
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(logs)); }, [logs]);
  const update = (key, value) => setForm({ ...form, [key]: value });
  const addLog = () => { setLogs([{ ...form, id: Date.now(), createdAt: new Date().toISOString() }, ...logs]); setForm({ symptom: 'Acid reflux', severity: 5, meal: '', stress: 3, sleep: 'Good', notes: '' }); };
  const removeLog = (id) => setLogs(logs.filter((log) => log.id !== id));
  const summary = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const week = logs.filter((log) => new Date(log.createdAt).getTime() >= weekAgo);
    const bySymptom = week.reduce((acc, log) => ({ ...acc, [log.symptom]: (acc[log.symptom] || 0) + 1 }), {});
    const frequent = Object.entries(bySymptom).sort((a, b) => b[1] - a[1])[0];
    const high = week.filter((log) => Number(log.severity) >= 7).length;
    return { week: week.length, frequent, high };
  }, [logs]);

  return (
    <main className="page">
      <Nav />
      <section className="hero"><h1 style={{ fontSize: '2.6rem', margin: 0 }}>🩺 Symptom Tracker</h1><p>Log symptoms locally first. Data is saved in this browser, not in a cloud account.</p></section>
      <section className="grid grid-3" style={{ marginTop: 20 }}><div className="card" style={{ padding: 18 }}><strong>This week</strong><h2>{summary.week} logs</h2></div><div className="card" style={{ padding: 18 }}><strong>Most frequent</strong><h2>{summary.frequent ? `${summary.frequent[0]} (${summary.frequent[1]})` : 'None'}</h2></div><div className="card" style={{ padding: 18 }}><strong>High severity days</strong><h2>{summary.high}</h2></div></section>
      <section className="card" style={{ padding: 20, marginTop: 20 }}>
        <h2>New symptom log</h2>
        <div className="grid grid-3">
          <div><label className="label">Symptom</label><select className="input" value={form.symptom} onChange={(e) => update('symptom', e.target.value)}>{symptomTypes.map((s) => <option key={s}>{s}</option>)}</select></div>
          <div><label className="label">Severity: {form.severity}/10</label><input className="input" type="range" min="1" max="10" value={form.severity} onChange={(e) => update('severity', e.target.value)} /></div>
          <div><label className="label">Stress level: {form.stress}/10</label><input className="input" type="range" min="1" max="10" value={form.stress} onChange={(e) => update('stress', e.target.value)} /></div>
          <div><label className="label">Sleep quality</label><select className="input" value={form.sleep} onChange={(e) => update('sleep', e.target.value)}><option>Good</option><option>Okay</option><option>Poor</option></select></div>
          <div><label className="label">Possible related meal</label><input className="input" value={form.meal} onChange={(e) => update('meal', e.target.value)} placeholder="e.g., coffee, mohinga" /></div>
          <div><label className="label">Notes</label><input className="input" value={form.notes} onChange={(e) => update('notes', e.target.value)} /></div>
        </div>
        <button className="primary" style={{ marginTop: 16 }} onClick={addLog}>Save locally</button>
      </section>
      <section className="card" style={{ padding: 20, marginTop: 20 }}><h2>Daily symptom list</h2>{logs.length === 0 ? <p>No symptoms logged yet.</p> : logs.map((log) => <div key={log.id} style={{ padding: 14, borderBottom: '1px solid #e2eadf' }}><strong>{log.symptom} • {log.severity}/10</strong><br/><small>{new Date(log.createdAt).toLocaleString()} • Stress {log.stress}/10 • Sleep {log.sleep}</small><p>{log.meal && `Related meal: ${log.meal}. `}{log.notes}</p><button className="secondary" onClick={() => removeLog(log.id)}>Delete</button></div>)}</section>
    </main>
  );
}
