'use client';
import { useEffect, useMemo, useState } from 'react';
import Nav from '../components/Nav';

const types = ['Food', 'Drink', 'Stress', 'Late meal', 'Large meal', 'Lack of sleep', 'Medication missed'];
const storageKey = 'healgut_trigger_logs_v1';

export default function TriggerJournal() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ type: 'Food', name: '', caused: 'Yes', symptom: 'Reflux', notes: '' });
  useEffect(() => { setLogs(JSON.parse(localStorage.getItem(storageKey) || '[]')); }, []);
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(logs)); }, [logs]);
  const update = (key, value) => setForm({ ...form, [key]: value });
  const addLog = () => { if (!form.name.trim()) return alert('Please enter a trigger name.'); setLogs([{ ...form, id: Date.now(), createdAt: new Date().toISOString() }, ...logs]); setForm({ type: 'Food', name: '', caused: 'Yes', symptom: 'Reflux', notes: '' }); };
  const patterns = useMemo(() => {
    const counts = logs.filter((log) => log.caused === 'Yes').reduce((acc, log) => { const key = log.name.toLowerCase(); acc[key] = { name: log.name, count: (acc[key]?.count || 0) + 1, symptom: log.symptom }; return acc; }, {});
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [logs]);

  return (
    <main className="page">
      <Nav />
      <section className="hero"><h1 style={{ fontSize: '2.6rem', margin: 0 }}>📓 Trigger Journal</h1><p>Connect symptoms with foods, drinks, stress, sleep, and meal timing to find repeated personal patterns.</p></section>
      <section className="grid grid-2" style={{ marginTop: 20 }}>
        <div className="card" style={{ padding: 20 }}><h2>Log suspected trigger</h2><div className="grid"><div><label className="label">Trigger type</label><select className="input" value={form.type} onChange={(e) => update('type', e.target.value)}>{types.map((type) => <option key={type}>{type}</option>)}</select></div><div><label className="label">Trigger name</label><input className="input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g., coffee, onion, late dinner" /></div><div><label className="label">Did it cause symptoms?</label><select className="input" value={form.caused} onChange={(e) => update('caused', e.target.value)}><option>Yes</option><option>No</option><option>Not sure</option></select></div><div><label className="label">Related symptom</label><input className="input" value={form.symptom} onChange={(e) => update('symptom', e.target.value)} /></div><div><label className="label">Notes</label><textarea className="input" value={form.notes} onChange={(e) => update('notes', e.target.value)} rows="3" /></div></div><button className="primary" style={{ marginTop: 14 }} onClick={addLog}>Save trigger</button></div>
        <div className="card" style={{ padding: 20 }}><h2>Pattern insights</h2>{patterns.length === 0 ? <p>No repeated triggers yet.</p> : patterns.map((item) => <div key={item.name} className="disclaimer" style={{ marginBottom: 10 }}><strong>{item.name}</strong><p>You logged {item.count} symptom event{item.count > 1 ? 's' : ''} after this trigger. It may be related to {item.symptom}.</p></div>)}<p><strong>Tip:</strong> IBS and GERD triggers are personal. Use repeated patterns, not one event, to guide decisions.</p></div>
      </section>
      <section className="card" style={{ padding: 20, marginTop: 20 }}><h2>Trigger history</h2>{logs.length === 0 ? <p>No trigger logs yet.</p> : logs.map((log) => <div key={log.id} style={{ padding: 14, borderBottom: '1px solid #e2eadf' }}><strong>{log.name}</strong> <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>{log.type}</span><p>{log.caused} — symptom: {log.symptom}</p><small>{new Date(log.createdAt).toLocaleString()}</small></div>)}</section>
    </main>
  );
}
