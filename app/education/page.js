import Nav from '../components/Nav';

const sections = [
  { title: 'What is GERD?', body: 'GERD happens when stomach acid flows back into the esophagus, causing heartburn, reflux, sour taste, cough, or throat irritation. Food choices, meal size, timing, and lying down after meals can affect symptoms.' },
  { title: 'What is IBS?', body: 'IBS is a functional gut condition that can cause bloating, gas, stomach pain, constipation, diarrhea, or mixed bowel habits. Triggers vary from person to person, so tracking is important.' },
  { title: 'IBS vs GERD', body: 'GERD mainly affects reflux and acid symptoms. IBS mainly affects bowel habits, cramps, bloating, and stool changes. Some patients have both, so HealGut supports both equally.' },
  { title: 'Common GERD triggers', body: 'Coffee, black tea, chocolate, mint, alcohol, soda, citrus, tomato, chili, fried foods, high-fat dairy, and large late meals are common reflux triggers.' },
  { title: 'Common IBS triggers', body: 'Onion, garlic, beans, some dairy, wheat, high-fat foods, carbonated drinks, and some fruits may trigger IBS. Tolerance is personal.' },
  { title: 'Low-FODMAP beginner guide', body: 'Low-FODMAP eating reduces certain fermentable carbohydrates for a short trial period, then reintroduces foods to find personal tolerance. It is best done carefully and not as a permanent restriction without guidance.' },
  { title: 'GERD lifestyle tips', body: 'Eat smaller meals, avoid lying down for 3 hours after eating, raise the head of the bed if nighttime reflux occurs, choose low-fat meals, and drink water between meals.' },
  { title: 'When to see a doctor', body: 'Seek medical advice if symptoms are frequent, worsening, affecting weight, sleep, swallowing, or daily life. Also ask a professional before major diet changes.' },
  { title: 'Emergency warning signs', body: 'Get urgent care for chest pain, vomiting blood, black stools, severe dehydration, fainting, unexplained weight loss, or difficulty swallowing.' },
  { title: 'Myanmar/local food note', body: 'Local foods such as mohinga, laphet thoke, coconut noodles, spicy curries, rice porridge, and steamed fish can be marked by IBS and GERD safety level. Mild, low-oil, non-spicy versions are often safer.' },
  { title: 'Burmese language plan', body: 'English is the first version. Burmese/Myanmar language support should be added next so patients can understand guidance more easily.' },
];

export default function Education() {
  return (
    <main className="page">
      <Nav />
      <section className="hero"><h1 style={{ fontSize: '2.6rem', margin: 0 }}>📚 IBS & GERD Education</h1><p>Simple patient-friendly guidance for stomach care, food triggers, and safe habits.</p></section>
      <p className="disclaimer" style={{ marginTop: 20 }}>This app provides general educational information only. It is not a medical diagnosis or treatment plan. Please consult a qualified healthcare professional for personal medical advice.</p>
      <section className="grid grid-2" style={{ marginTop: 20 }}>{sections.map((section) => <article className="card" key={section.title} style={{ padding: 22 }}><h2 style={{ color: '#14532d' }}>{section.title}</h2><p style={{ lineHeight: 1.7, color: '#4f6356' }}>{section.body}</p></article>)}</section>
    </main>
  );
}
