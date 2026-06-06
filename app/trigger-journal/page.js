'use client';
import { useEffect, useMemo, useState } from 'react';
import Nav from '../components/Nav';
import AuthRequired from '../components/AuthRequired';

const types = ['Food', 'Drink', 'Stress', 'Late meal', 'Large meal', 'Lack of sleep', 'Medication missed'];
const storageKey = 'healgut_trigger_logs_v1';
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const requiredErrorStyle = { color: '#dc2626', fontSize: '0.85rem', fontWeight: 600, marginTop: 6 };

const fromApi = (row) => ({
  id: row.trigger_id,
  type: row.trigger_type,
  name: row.trigger_name,
  caused: row.caused_symptoms,
  symptom: row.related_symptom || 'Reflux',
  notes: row.notes || '',
  createdAt: row.logged_at || row.created_at,
});

export default function TriggerJournal() {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('Checking login...');
  const [user, setUser] = useState(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [form, setForm] = useState({ type: 'Food', name: '', caused: 'Yes', symptom: 'Reflux', notes: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('healgut_current_user') || 'null');
        setUser(currentUser);
        setHasCheckedSession(true);
        if (!currentUser?.user_id) {
          setLogs([]);
          setStatus('Please sign in to view and save your trigger logs.');
          return;
        }
        const res = await fetch(`${API_BASE}/api/triggers?user_id=${currentUser.user_id}`);
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

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const addLog = async () => {
    if (!form.name.trim()) {
      setErrors({ name: 'This field is required' });
      return;
    }
    setErrors({});
    try {
      const currentUser = JSON.parse(localStorage.getItem('healgut_current_user') || 'null');
      if (!currentUser?.user_id) {
        setStatus('Please sign in before saving triggers.');
        return;
      }
      const res = await fetch(`${API_BASE}/api/triggers`, {
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
    setForm({ type: 'Food', name: '', caused: 'Yes', symptom: 'Reflux', notes: '' });
  };

  const removeLog = async (id) => {
    try { await fetch(`${API_BASE}/api/triggers/${id}`, { method: 'DELETE' }); } catch (err) {}
    setLogs(logs.filter((log) => log.id !== id));
  };

  const patterns = useMemo(() => {
    const counts = logs.filter((log) => log.caused === 'Yes').reduce((acc, log) => { const key = log.name.toLowerCase(); acc[key] = { name: log.name, count: (acc[key]?.count || 0) + 1, symptom: log.symptom }; return acc; }, {});
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [logs]);

  return (
    <main className="page">
      <Nav />
      <section className="hero"><h1 style={{ fontSize: '2.6rem', margin: 0 }}>📓 Trigger Journal</h1><p>Connect symptoms with foods, drinks, stress, sleep, and meal timing to find repeated personal patterns.</p></section>
      {status && <p className="disclaimer" style={{ marginTop: 16 }}>{status}</p>}
      {!hasCheckedSession ? (
        <section className="card" style={{ padding: 24, marginTop: 20, textAlign: 'center' }}>
          <h2>Loading your account...</h2>
          <p style={{ color: '#4f6356', lineHeight: 1.6 }}>Checking your saved login before loading this module.</p>
        </section>
      ) : !user ? <AuthRequired feature="the trigger journal" /> : <>
        <section className="grid grid-2" style={{ marginTop: 20 }}>
          <div className="card" style={{ padding: 20 }}><h2>Log suspected trigger</h2><div className="grid"><div><label className="label">Trigger type</label><select className="input" value={form.type} onChange={(e) => update('type', e.target.value)}>{types.map((type) => <option key={type}>{type}</option>)}</select></div><div><label className="label">Trigger name</label><input className="input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g., coffee, onion, late dinner" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'trigger-name-error' : undefined} />{errors.name && <p id="trigger-name-error" style={requiredErrorStyle}>{errors.name}</p>}</div><div><label className="label">Did it cause symptoms?</label><select className="input" value={form.caused} onChange={(e) => update('caused', e.target.value)}><option>Yes</option><option>No</option><option>Not sure</option></select></div><div><label className="label">Related symptom</label><input className="input" value={form.symptom} onChange={(e) => update('symptom', e.target.value)} /></div><div><label className="label">Notes</label><textarea className="input" value={form.notes} onChange={(e) => update('notes', e.target.value)} rows="3" /></div></div><button className="primary" style={{ marginTop: 14 }} onClick={addLog}>Save trigger</button></div>
          <div className="card" style={{ padding: 20 }}><h2>Pattern insights</h2>{patterns.length === 0 ? <p>No repeated triggers yet.</p> : patterns.map((item) => <div key={item.name} className="disclaimer" style={{ marginBottom: 10 }}><strong>{item.name}</strong><p>You logged {item.count} symptom event{item.count > 1 ? 's' : ''} after this trigger. It may be related to {item.symptom}.</p></div>)}<p><strong>Tip:</strong> IBS and GERD triggers are personal. Use repeated patterns, not one event, to guide decisions.</p></div>
        </section>
        <section className="card" style={{ padding: 20, marginTop: 20 }}><h2>Trigger history</h2>{logs.length === 0 ? <p>No trigger logs yet.</p> : logs.map((log) => <div key={log.id} style={{ padding: 14, borderBottom: '1px solid #e2eadf' }}><strong>{log.name}</strong> <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>{log.type}</span><p>{log.caused} — symptom: {log.symptom}</p><small>{new Date(log.createdAt).toLocaleString()}</small><br/><button className="secondary" style={{ marginTop: 8 }} onClick={() => removeLog(log.id)}>Delete</button></div>)}</section>
      </>}
    </main>
  );
}
