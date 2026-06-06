'use client';
import { useEffect, useMemo, useState } from 'react';
import Nav from '../components/Nav';
import AuthRequired from '../components/AuthRequired';

const symptomTypes = ['Acid reflux', 'Heartburn', 'Bloating', 'Stomach pain', 'Nausea', 'Gas', 'Constipation', 'Diarrhea', 'Cramping'];
const storageKey = 'healgut_symptom_logs_v1';
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const fromApi = (row) => ({
  id: row.symptom_id,
  symptom: row.symptom,
  severity: row.severity,
  meal: row.related_meal || '',
  stress: row.stress_level || 3,
  sleep: row.sleep_quality || 'Good',
  notes: row.notes || '',
  createdAt: row.logged_at || row.created_at,
});

export default function SymptomTracker() {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('Checking login...');
  const [user, setUser] = useState(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [form, setForm] = useState({ symptom: 'Acid reflux', severity: 5, meal: '', stress: 3, sleep: 'Good', notes: '' });

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('healgut_current_user') || 'null');
        setUser(currentUser);
        setHasCheckedSession(true);
        if (!currentUser?.user_id) {
          setLogs([]);
          setStatus('Please sign in to view and save your symptom logs.');
          return;
        }
        const res = await fetch(`${API_BASE}/api/symptoms?user_id=${currentUser.user_id}`);
        if (!res.ok) throw new Error('API unavailable');
        const data = await res.json();
        const apiLogs = data.map(fromApi);
        setLogs(apiLogs);
        localStorage.setItem(storageKey, JSON.stringify(apiLogs));
        setStatus('');
      } catch (err) {
        setLogs(JSON.parse(localStorage.getItem(storageKey) || '[]'));
        setStatus('Using browser local storage because profile sync is not available');
      }
    };
    loadLogs();
  }, []);

  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(logs)); }, [logs]);

  const update = (key, value) => setForm({ ...form, [key]: value });

  const addLog = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('healgut_current_user') || 'null');
      if (!currentUser?.user_id) {
        setStatus('Please sign in before saving symptoms.');
        return;
      }
      const res = await fetch(`${API_BASE}/api/symptoms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, user_id: currentUser?.user_id }),
      });
      if (!res.ok) throw new Error('API save failed');
      const saved = fromApi(await res.json());
      setLogs([saved, ...logs]);
      setStatus('Saved to your profile');
    } catch (err) {
      setLogs([{ ...form, id: Date.now(), createdAt: new Date().toISOString() }, ...logs]);
      setStatus('Saved locally only because profile sync is not available');
    }
    setForm({ symptom: 'Acid reflux', severity: 5, meal: '', stress: 3, sleep: 'Good', notes: '' });
  };

  const removeLog = async (id) => {
    try { await fetch(`${API_BASE}/api/symptoms/${id}`, { method: 'DELETE' }); } catch (err) {}
    setLogs(logs.filter((log) => log.id !== id));
  };

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
      <section className="hero"><h1 style={{ fontSize: '2.6rem', margin: 0 }}>🩺 Symptom Tracker</h1><p>Log symptoms and save them to your profile when sync is available.</p></section>
      {status && <p className="disclaimer" style={{ marginTop: 16 }}>{status}</p>}
      {!hasCheckedSession ? (
        <section className="card" style={{ padding: 24, marginTop: 20, textAlign: 'center' }}>
          <h2>Loading your account...</h2>
          <p style={{ color: '#4f6356', lineHeight: 1.6 }}>Checking your saved login before loading this module.</p>
        </section>
      ) : !user ? <AuthRequired feature="the symptom tracker" /> : <>
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
        <button className="primary" style={{ marginTop: 16 }} onClick={addLog}>Save symptom</button>
      </section>
      <section className="card" style={{ padding: 20, marginTop: 20 }}><h2>Daily symptom list</h2>{logs.length === 0 ? <p>No symptoms logged yet.</p> : logs.map((log) => <div key={log.id} style={{ padding: 14, borderBottom: '1px solid #e2eadf' }}><strong>{log.symptom} • {log.severity}/10</strong><br/><small>{new Date(log.createdAt).toLocaleString()} • Stress {log.stress}/10 • Sleep {log.sleep}</small><p>{log.meal && `Related meal: ${log.meal}. `}{log.notes}</p><button className="secondary" onClick={() => removeLog(log.id)}>Delete</button></div>)}</section>
      </>}
    </main>
  );
}
