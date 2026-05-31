import Link from 'next/link';
import AuthStatus from './AuthStatus';

export default function Nav() {
  const links = [
    ['/', '🏠 Home'],
    ['/food-safety', '🔍 Food Safety'],
    ['/diet-plan', '📋 Diet Plan'],
    ['/calorie-calculator', '🍽️ Meal Calculator'],
    ['/symptom-tracker', '🩺 Symptoms'],
    ['/trigger-journal', '📓 Triggers'],
    ['/education', '📚 Education'],
  ];
  return <nav className="nav">{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}<AuthStatus /></nav>;
}
