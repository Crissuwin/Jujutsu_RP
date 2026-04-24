import React, { useState, useEffect } from 'react';
import {
  Zap,
  Sword,
  Shield,
  Building2,
  User,
  Wallet,
  Target,
  Terminal,
  Sparkles,
  Activity,
  X,
  BookOpen,
  Crown,
  ChevronRight,
  ArrowUpCircle,
  Flame,
  Lock
} from 'lucide-react';

const GRADES = {
  'Grade 4': { color: '#9ca3af', bg: 'bg-gray-900/40', border: 'border-gray-800', val: 1, drop: 400 },
  'Grade 3': { color: '#34d399', bg: 'bg-emerald-950/20', border: 'border-emerald-900/50', val: 2, drop: 300 },
  'Grade 2': { color: '#60a5fa', bg: 'bg-blue-950/20', border: 'border-blue-900/50', val: 5, drop: 150 },
  'Grade 1': { color: '#c084fc', bg: 'bg-purple-950/30', border: 'border-purple-600/40', val: 10, drop: 70 },
  'Semi-Special': { color: '#f472b6', bg: 'bg-pink-950/30', border: 'border-pink-500/50', val: 20, drop: 30 },
  'Special Grade': { color: '#fbbf24', bg: 'bg-yellow-950/40', border: 'border-yellow-500/60', val: 50, drop: 10 },
  'Special Grade+': { color: '#f43f5e', bg: 'bg-rose-950/50', border: 'border-rose-500/70', val: 100, drop: 3, hasDomain: true },
  'Cursed King': { color: '#991b1b', bg: 'bg-red-950/60', border: 'border-red-600/80', val: 250, drop: 0.8, hasDomain: true },
  'Domain Tier': { color: '#ffffff', bg: 'bg-white/10', border: 'border-white/100', val: 500, drop: 0.2, hasDomain: true }
};

const RANKS = [
  { rank: 'E', min: 0, c: '#9ca3af', aura: 'shadow-gray-500/20' },
  { rank: 'D', min: 500, c: '#34d399', aura: 'shadow-emerald-500/30' },
  { rank: 'C', min: 2000, c: '#60a5fa', aura: 'shadow-blue-500/40' },
  { rank: 'B', min: 5000, c: '#c084fc', aura: 'shadow-purple-500/50' },
  { rank: 'A', min: 10000, c: '#fbbf24', aura: 'shadow-yellow-500/60' },
  { rank: 'S', min: 25000, c: '#f43f5e', aura: 'shadow-rose-500/80 animate-pulse' },
  { rank: 'SS', min: 50000, c: '#22d3ee', aura: 'shadow-cyan-500/100 animate-[pulse_1s_infinite]' },
  { rank: 'SSS', min: 100000, c: '#ffffff', aura: 'shadow-white/100 animate-pulse' }
];

const POWERS = [
  { id: 'p1', n: 'CE Infusion', r: 'Grade 4', pwr: 50, s: { str: 10 }, a: 'Punch', l: 'Basic cursed energy flow.' },
  { id: 'p2', n: 'Divergent Fist', r: 'Grade 3', pwr: 150, s: { str: 40, spd: 10 }, a: 'Double Impact', l: 'Delayed energy lag causes a second hit.' },
  { id: 'p3', n: 'Hair Bind', r: 'Grade 2', pwr: 350, s: { def: 30, int: 50 }, a: 'Snare', l: 'Manipulate hair to trap targets.' },
  { id: 'p4', n: 'Ratio Technique', r: 'Grade 1', pwr: 800, s: { str: 100, luk: 80 }, a: '7:3 Critical', l: 'Forces a critical weak point.' },
  { id: 'p5', n: 'Blood Manipulation', r: 'Grade 1', pwr: 950, s: { str: 90, spd: 90, def: 90 }, a: 'Piercing Blood', l: 'Total control over one\'s own blood.' },
  { id: 'p6', n: 'Boogie Woogie', r: 'Semi-Special', pwr: 1500, s: { spd: 200, int: 100 }, a: 'Position Swap', l: 'Swap places with a clap.' },
  { id: 'p7', n: 'Cursed Corpse Creation', r: 'Semi-Special', pwr: 1800, s: { int: 250, def: 100 }, a: 'Army of Dolls', l: 'Inject souls into inanimate objects.' },
  { id: 'p8', n: 'Straw Doll Resonance', r: 'Special Grade', pwr: 3000, s: { str: 300, luk: 150 }, a: 'Soul Strike', l: 'Attacks the target\'s soul directly via a medium.' },
  { id: 'p9', n: 'Cursed Spirit Manipulation', r: 'Special Grade', pwr: 4500, s: { int: 500, nrg: 600 }, a: 'Maximum: Uzumaki', l: 'Consume and command conquered curses.' },
  { id: 'p10', n: 'Disaster Tides', r: 'Special Grade+', pwr: 8000, s: { str: 800, nrg: 1000 }, a: 'Death Swarm', l: 'Control over oceanic curses.', d: { n: 'Horizon of Skandha', e: 'Summons endless cursed sea.', b: 'Enemy speed -80%' } },
  { id: 'p11', n: 'Disaster Flames', r: 'Special Grade+', pwr: 8500, s: { str: 1000, spd: 500 }, a: 'Maximum: Meteor', l: 'The burning hatred of the earth.', d: { n: 'Coffin of the Iron Mountain', e: 'Extreme heat burns targets instantly.', b: 'Fire DMG +200%' } },
  { id: 'p12', n: 'Idle Transfiguration', r: 'Cursed King', pwr: 15000, s: { int: 2000, luk: 1000 }, a: 'Soul Reshape', l: 'Touch the soul to mutate the body.', d: { n: 'Self-Embodiment of Perfection', e: 'Guaranteed instant soul mutation.', b: 'Immune to Physical DMG' } },
  { id: 'p13', n: 'Cleave & Dismantle', r: 'Cursed King', pwr: 18000, s: { str: 3000, spd: 2000 }, a: 'World Slash', l: 'Invisible slashes that adapt to the target.', d: { n: 'Malevolent Shrine', e: 'Relentless slashing dismantles everything in 200m.', b: 'ATK +300%' } },
  { id: 'p14', n: 'Ten Shadows', r: 'Domain Tier', pwr: 25000, s: { int: 4000, nrg: 5000 }, a: 'Mahoraga', l: 'Summon ten divine shikigami.', d: { n: 'Chimera Shadow Garden', e: 'Floods the area with fluid shadows and infinite clones.', b: 'Adapt to all DMG' } },
  { id: 'p15', n: 'Limitless', r: 'Domain Tier', pwr: 30000, s: { str: 5000, spd: 5000, nrg: 9999 }, a: 'Hollow Purple', l: 'Brings the concept of infinity into reality.', d: { n: 'Infinite Void', e: 'Forces infinite information into the target\'s brain.', b: 'Enemy Paralyzed' } }
];

const WEAPONS = [
  { id: 'w1', n: 'Wooden Katana', r: 'Grade 4', pwr: 30, s: { str: 10 }, a: 'Blunt Hit', l: 'Just wood.' },
  { id: 'w2', n: 'Combat Knife', r: 'Grade 3', pwr: 100, s: { str: 30, spd: 20 }, a: 'Slash', l: 'Standard issue.' },
  { id: 'w3', n: 'Slaughter Demon', r: 'Grade 2', pwr: 400, s: { str: 80 }, a: 'Bleed', l: 'Imbued shortsword.' },
  { id: 'w4', n: 'Cursed Nunchaku', r: 'Grade 1', pwr: 900, s: { str: 150, spd: 100 }, a: 'Combo Strikes', l: 'Hard to master, hits heavily.' },
  { id: 'w5', n: 'Dragon-Bone', r: 'Semi-Special', pwr: 1600, s: { str: 300, nrg: 100 }, a: 'Kinetic Release', l: 'Absorbs force to eject later.' },
  { id: 'w6', n: 'Chain of 1000 Miles', r: 'Special Grade', pwr: 3200, s: { spd: 500, luk: 100 }, a: 'Infinite Reach', l: 'Extends infinitely if the end is hidden.' },
  { id: 'w7', n: 'Playful Cloud', r: 'Special Grade+', pwr: 8000, s: { str: 1500 }, a: 'Raw Power', l: 'Scales purely on physical strength.', d: { n: 'Cloud Strike Zone', e: 'All magic is nullified.', b: 'Physical DMG x3' } },
  { id: 'w8', n: 'Split Soul Katana', r: 'Cursed King', pwr: 16000, s: { str: 2500, spd: 1500 }, a: 'Armor Bypass', l: 'Cuts the soul directly.', d: { n: 'Soul Severing Field', e: 'Enemy Defense is reduced to 0.', b: 'Ignores Armor' } },
  { id: 'w9', n: 'Inverted Spear of Heaven', r: 'Domain Tier', pwr: 28000, s: { str: 4000, nrg: 5000 }, a: 'Technique Nullification', l: 'Tears through infinity itself.', d: { n: 'Heavenly Void', e: 'Erases all Cursed Energy in the area.', b: 'Immune to Powers' } },
  { id: 'w10', n: 'Executioners Sword', r: 'Domain Tier', pwr: 35000, s: { str: 9999, luk: 5000 }, a: 'Instant Death', l: 'Touching it guarantees death.', d: { n: 'Deadly Sentencing', e: 'Violence is prohibited.', b: '1-Hit Kill Active' } }
];

const ARMORS = [
  { id: 'a1', n: 'Casual Wear', r: 'Grade 4', pwr: 20, s: { def: 10 }, a: 'None', l: 'Just clothes.' },
  { id: 'a2', n: 'Jujutsu Uniform', r: 'Grade 3', pwr: 120, s: { def: 40, nrg: 10 }, a: 'CE Resist', l: 'Standard issue.' },
  { id: 'a3', n: 'Reinforced Jacket', r: 'Grade 2', pwr: 450, s: { def: 100, luk: 20 }, a: 'Damage Reduction', l: 'Woven with cursed energy.' },
  { id: 'a4', n: 'Sorcerer Coat', r: 'Grade 1', pwr: 1000, s: { def: 250, spd: 50 }, a: 'Stealth', l: 'Hides weapons and aura.' },
  { id: 'a5', n: 'Bone Armor', r: 'Semi-Special', pwr: 1800, s: { def: 400, str: 100 }, a: 'Fear Aura', l: 'Forged from cursed spirits.' },
  { id: 'a6', n: 'Domain Warding Cloak', r: 'Special Grade', pwr: 3500, s: { def: 800, int: 300 }, a: 'Anti-Domain', l: 'Resists sure-hit effects.' },
  { id: 'a7', n: 'Heian Era Kimono', r: 'Special Grade+', pwr: 8500, s: { def: 1500, nrg: 1000 }, a: 'Ancient Presence', l: 'Worn by the ancients.', d: { n: 'Era of Blood', e: 'Passively drains enemy HP.', b: 'Regen +10%' } },
  { id: 'a8', n: 'Tojis Fit', r: 'Cursed King', pwr: 17000, s: { def: 2000, spd: 3000 }, a: 'Godlike Freedom', l: 'Tight shirt, baggy pants.', d: { n: 'Assassin\'s Realm', e: 'Completely erases your presence.', b: 'Evasion +90%' } },
  { id: 'a9', n: 'Infinity Barrier', r: 'Domain Tier', pwr: 32000, s: { def: 9999, int: 5000 }, a: 'Untouchable', l: 'Attacks literally cannot reach you.', d: { n: 'Endless Void Prison', e: 'Enemy attacks slow down to 0.', b: 'Invulnerability' } }
];

const CLANS = [
  { id: 'c1', n: 'Civilian', r: 'Grade 4', pwr: 10, s: { luk: 5 }, a: 'None', l: 'No jujutsu ties.' },
  { id: 'c2', n: 'Window', r: 'Grade 3', pwr: 80, s: { int: 20 }, a: 'Sight', l: 'Can see curses.' },
  { id: 'c3', n: 'Kyoto Branch', r: 'Grade 2', pwr: 300, s: { nrg: 50 }, a: 'Traditionalist', l: 'Conservative sorcerers.' },
  { id: 'c4', n: 'Tokyo Branch', r: 'Grade 1', pwr: 850, s: { str: 100, spd: 100 }, a: 'Progressive', l: 'Backed by the strongest.' },
  { id: 'c5', n: 'Ainu Society', r: 'Semi-Special', pwr: 1600, s: { def: 200, luk: 150 }, a: 'Spirit Walk', l: 'Hokkaido sorcerers.' },
  { id: 'c6', n: 'Inumaki Clan', r: 'Special Grade', pwr: 3200, s: { int: 600, nrg: 500 }, a: 'Snake & Fangs', l: 'Cursed speech users.' },
  { id: 'c7', n: 'Kamo Clan', r: 'Special Grade+', pwr: 7500, s: { str: 1200, def: 1200 }, a: 'Blood Heritage', l: 'Masters of blood manipulation.', d: { n: 'Crimson Throne', e: 'Enemies lose HP over time.', b: 'Lifesteal +50%' } },
  { id: 'c8', n: 'Zenin Clan', r: 'Cursed King', pwr: 18000, s: { str: 3500, spd: 3000 }, a: 'Weapon Mastery', l: 'A ruthless meritocracy of strength.', d: { n: 'Armory of Shadows', e: 'Summons infinite cursed tools.', b: 'Weapon DMG x4' } },
  { id: 'c9', n: 'Gojo Clan', r: 'Domain Tier', pwr: 38000, s: { int: 8000, nrg: 8000, luk: 5000 }, a: 'Fate Manipulator', l: 'The absolute pinnacle of the Jujutsu world.', d: { n: 'Six Eyes Zenith', e: 'Sees the flow of all cursed energy.', b: 'Infinite Stamina' } }
];

const BOSSES = [
  { id: 1, n: 'Finger Bearer', d: 'Grade 1', pwr: 2000, y: 15000, xp: 500, lore: 'A curse spawned from a single finger.' },
  { id: 2, n: 'Hanami', d: 'Special Grade', pwr: 10000, y: 50000, xp: 2000, lore: 'The curse of the forests.' },
  { id: 3, n: 'Mahito', d: 'Cursed King', pwr: 35000, y: 150000, xp: 8000, lore: 'The curse of human hatred.' },
  { id: 4, n: 'Sukuna (15 Fingers)', d: 'Domain Tier', pwr: 80000, y: 500000, xp: 25000, lore: 'The undisputed King of Curses.' }
];

const QUESTIONS = [
  { q: 'Who is the King of Curses?', a: 'Sukuna', d: 'Easy', yen: 1500, xp: 100 },
  { q: 'What is Gojo\'s Domain Expansion named?', a: 'Infinite Void', d: 'Medium', yen: 3000, xp: 250 },
  { q: 'What clan is Maki from?', a: 'Zenin', d: 'Easy', yen: 1500, xp: 100 },
  { q: 'Who possesses the Ten Shadows technique?', a: 'Megumi', d: 'Medium', yen: 3000, xp: 250 },
  { q: 'What is the name of Yuta\'s cursed spirit?', a: 'Rika', d: 'Hard', yen: 6000, xp: 500 },
  { q: 'What Heavenly Restriction does Toji have?', a: 'Zero Cursed Energy', d: 'Hard', yen: 6000, xp: 500 }
];

const TOTAL_ITEMS = POWERS.length + WEAPONS.length + ARMORS.length + CLANS.length;

export default function App() {
  const [view, setView] = useState('home');
  const [activeAcc, setActiveAcc] = useState('acc1');
  const defaultAcc = {
    yen: 15000,
    ce: 1000,
    level: 1,
    xp: 0,
    pwr: 0,
    rank: 'E',
    luck: 0,
    spins: 0,
    combo: 0,
    eq: { power: null, weapon: null, armor: null, clan: null },
    inv: [],
    col: [],
    autoEq: true
  };

  const [accounts, setAccounts] = useState({
    acc1: { id: 'acc1', name: 'Sorcerer', ...defaultAcc },
    acc2: { id: 'acc2', name: 'Rival', ...defaultAcc }
  });

  const [spinState, setSpinState] = useState({ active: false, res: null, anim: null });
  const [toast, setToast] = useState(null);
  const [compareItem, setCompareItem] = useState(null);
  const [combatLog, setCombatLog] = useState(null);
  const [showAdminConsole, setShowAdminConsole] = useState(false);
  const [activeQ, setActiveQ] = useState(null);
  const [qAns, setQAns] = useState('');

  const u = accounts[activeAcc];
  const xpNeed = u.level * 500;

  const updateU = (data) => setAccounts((p) => ({ ...p, [activeAcc]: { ...p[activeAcc], ...data } }));
  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    let totalPwr = u.level * 150;
    Object.values(u.eq).forEach((i) => {
      if (i) totalPwr += i.pwr + (i.lvl ? i.pwr * i.lvl * 0.15 : 0);
    });

    let newRank = RANKS[0];
    for (let r of RANKS) {
      if (totalPwr >= r.min) newRank = r;
    }

    if (totalPwr !== u.pwr) {
      updateU({ pwr: totalPwr, rank: newRank.rank });
    }
  }, [u.eq, u.level, activeAcc]);

  const doSpin = (catArr, catName) => {
    if (u.yen < 1000) {
      showToast('Not enough Yen!', 'error');
      return;
    }

    updateU({ yen: u.yen - 1000, luck: Math.min(100, u.luck + 2), spins: u.spins + 1 });
    setSpinState({ active: true, res: null, anim: null });

    setTimeout(() => {
      let r = 'Grade 4';
      const isPity = u.spins % 90 === 0 && u.spins > 0;
      const isSoftPity = u.spins % 50 === 0 && u.spins > 0;

      if (isPity) r = 'Domain Tier';
      else if (isSoftPity) r = 'Special Grade';
      else {
        const luckMod = 1 + u.luck / 100;
        let accum = 0;
        for (const v of Object.values(GRADES)) {
          accum += v.drop * (v.val >= 50 ? luckMod : 1);
        }
        let rand = Math.random() * accum;
        for (const [k, v] of Object.entries(GRADES)) {
          let w = v.drop * (v.val >= 50 ? luckMod : 1);
          if (rand < w) {
            r = k;
            break;
          }
          rand -= w;
        }
      }

      const pool = catArr.filter((i) => i.r === r);
      const item = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : catArr[0];
      const finalItem = { ...item, uid: Date.now(), cat: catName, lvl: 0 };
      let animType = GRADES[r].anim || 'fast';
      setSpinState({ active: false, res: finalItem, anim: animType });
      if (animType === 'domainExpand') showToast('[DOMAIN EXPANSION]', 'success');

      let newLuck = u.luck;
      if (GRADES[r].val >= 50) newLuck = 0;

      let newEq = { ...u.eq };
      if (u.autoEq) {
        if (!newEq[catName] || finalItem.pwr > newEq[catName].pwr) {
          newEq[catName] = finalItem;
          showToast(`Auto-Equipped: ${finalItem.n}`, 'success');
        }
      }

      updateU({
        inv: [finalItem, ...u.inv],
        col: u.col.includes(finalItem.id) ? u.col : [...u.col, finalItem.id],
        luck: newLuck,
        eq: newEq
      });

      setTimeout(() => setSpinState((p) => ({ ...p, anim: null })), 2500);
    }, 1500);
  };

  const upgradeItem = (uid) => {
    if (u.ce < 500) {
      showToast('Need 500 CE', 'error');
      return;
    }
    const newInv = u.inv.map((i) => (i.uid === uid ? { ...i, lvl: (i.lvl || 0) + 1 } : i));
    let newEq = { ...u.eq };
    Object.keys(newEq).forEach((k) => {
      if (newEq[k]?.uid === uid) newEq[k] = newInv.find((i) => i.uid === uid);
    });
    updateU({ ce: u.ce - 500, inv: newInv, eq: newEq });
    showToast('Upgraded!', 'success');
    setCompareItem(null);
  };

  const fightBoss = (m) => {
    if (u.pwr < 100) {
      showToast('Equip gear first!', 'error');
      return;
    }

    setSpinState({ active: false, res: null, anim: 'domainExpand' });
    setTimeout(() => {
      setSpinState((p) => ({ ...p, anim: null }));
      const winChance = Math.min(95, Math.max(5, (u.pwr / m.pwr) * 60));
      const pDomain = Object.values(u.eq).find((i) => i?.d);
      const powerMult = pDomain ? 1.5 : 1;
      const actualWinChance = winChance * powerMult;

      if (Math.random() * 100 < actualWinChance) {
        let nx = u.xp + m.xp;
        let nl = u.level;
        let ny = u.yen + m.y;
        if (nx >= xpNeed) {
          nl++;
          nx -= xpNeed;
          ny += 10000;
          showToast(`LEVEL UP: ${nl}!`, 'success');
        }
        updateU({ yen: ny, xp: nx, level: nl });
        setCombatLog({ ok: true, m: `Exorcised ${m.n}!\n+¥${m.y.toLocaleString()} | +${m.xp} XP${pDomain ? '\nDomain Clash Won!' : ''}` });
      } else {
        setCombatLog({ ok: false, m: `Defeated by ${m.n}.\nPower too low.` });
      }
    }, 1000);
  };

  const submitQ = () => {
    if (!activeQ) return;
    if (qAns.toLowerCase().trim() === activeQ.a.toLowerCase().trim()) {
      const c = u.combo + 1;
      const mlt = 1 + c * 0.1;
      const y = Math.floor(activeQ.yen * mlt);
      const x = Math.floor(activeQ.xp * mlt);
      let nx = u.xp + x;
      let nl = u.level;
      let ny = u.yen + y;
      if (nx >= xpNeed) {
        nl++;
        nx -= xpNeed;
        ny += 10000;
        showToast(`LEVEL UP: ${nl}!`, 'success');
      }
      updateU({ yen: ny, xp: nx, level: nl, combo: c });
      showToast(`Correct! +¥${y} | +${x} XP (Combo x${c})`, 'success');
    } else {
      updateU({ combo: 0 });
      showToast('Wrong. Combo broken.', 'error');
    }
    setActiveQ(null);
    setQAns('');
  };

  const activeAura = RANKS.find((r) => r.rank === u.rank)?.aura || '';
  const activeColor = RANKS.find((r) => r.rank === u.rank)?.c || '#ffffff';

  const StatCompare = ({ lbl, oldV, newV }) => {
    const diff = newV - oldV;
    return (
      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest border-b border-white/5 py-1">
        <span className="text-gray-500">{lbl}</span>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">{Math.floor(oldV)}</span>
          <ChevronRight size={10} className="text-gray-600" />
          <span className={diff > 0 ? 'text-emerald-400' : diff < 0 ? 'text-rose-400' : 'text-gray-300'}>
            {Math.floor(newV)} {diff !== 0 && `(${diff > 0 ? '+' : ''}${Math.floor(diff)})`}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans flex flex-col relative overflow-hidden bg-[#0A0A0F] text-gray-200 pb-24 selection:bg-rose-500/30">
      <div className={`absolute inset-0 transition-all duration-1000 opacity-20 blur-[120px] pointer-events-none ${activeAura}`}></div>

      {spinState.anim === 'flash' && <div className="fixed inset-0 z-50 bg-white/20 animate-[flash_0.5s_ease-out] pointer-events-none mix-blend-overlay"></div>}
      {spinState.anim === 'pulse' && <div className="fixed inset-0 z-50 bg-purple-500/20 animate-[flash_1s_ease-out] pointer-events-none mix-blend-overlay"></div>}
      {spinState.anim === 'goldBurst' && <div className="fixed inset-0 z-50 bg-yellow-500/30 animate-[flash_1s_ease-out] pointer-events-none mix-blend-overlay shadow-[inset_0_0_100px_rgba(251,191,36,0.5)]"></div>}
      {spinState.anim === 'darkAura' && <div className="fixed inset-0 z-50 bg-rose-900/40 animate-[shake_0.5s_infinite] pointer-events-none mix-blend-overlay"></div>}
      {spinState.anim === 'explosion' && <div className="fixed inset-0 z-50 bg-red-600/50 animate-[shake_0.2s_infinite] pointer-events-none mix-blend-color-burn"></div>}
      {spinState.anim === 'domainExpand' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-[domain_2.5s_ease-out_forwards] pointer-events-none">
          <h1 className="text-4xl font-black text-white tracking-[0.4em] uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-pulse">DOMAIN EXPANSION</h1>
        </div>
      )}

      {toast && (
        <div className="fixed top-12 left-0 right-0 z-50 flex justify-center animate-[slideDown_0.2s_ease-out] pointer-events-none">
          <div className={`px-5 py-2.5 rounded-full backdrop-blur-xl border shadow-2xl ${toast.type === 'error' ? 'bg-red-950/90 border-red-500' : 'bg-emerald-950/90 border-emerald-500'}`}>
            <span className="text-[10px] font-black uppercase tracking-widest text-white">{toast.msg}</span>
          </div>
        </div>
      )}

      <header className="relative z-10 pt-8 px-5 pb-5 bg-gradient-to-b from-black to-transparent border-b border-white/5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
            {Object.values(accounts).map((acc) => (
              <button
                key={acc.id}
                onClick={() => setActiveAcc(acc.id)}
                className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeAcc === acc.id ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}>
                {acc.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowAdminConsole(true)} className="p-2 bg-white/5 rounded-xl border border-white/10 active:scale-95 text-gray-400 hover:text-white">
              <Terminal size={14} />
            </button>
            <button
              onClick={() => updateU({ autoEq: !u.autoEq })}
              className={`px-3 py-1.5 rounded-xl border text-[8px] font-black uppercase tracking-widest transition-colors ${u.autoEq ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-500'}`}>
              Auto-Eq: {u.autoEq ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-1">Total Power</span>
            <div className="flex items-center space-x-3">
              <span className="text-4xl font-black tracking-tighter text-white" style={{ textShadow: `0 0 20px ${activeColor}80` }}>{u.pwr.toLocaleString()}</span>
              <span className="px-2 py-0.5 rounded border text-xs font-black uppercase" style={{ borderColor: activeColor, color: activeColor, backgroundColor: `${activeColor}20` }}>Rank {u.rank}</span>
            </div>
            <div className="mt-2 w-32">
              <div className="flex justify-between text-[8px] font-black uppercase text-gray-400 mb-1">
                <span>Lvl {u.level}</span>
                <span>{u.xp}/{xpNeed} XP</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full">
                <div className="h-full bg-white transition-all" style={{ width: `${(u.xp / xpNeed) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <div className="bg-black/50 border border-white/10 px-3 py-1.5 rounded-xl flex items-center min-w-[100px] justify-between">
              <span className="text-[8px] font-black uppercase text-emerald-500">Yen</span>
              <span className="text-xs font-bold text-white">¥{(u.yen / 1000).toFixed(1)}k</span>
            </div>
            <div className="bg-black/50 border border-white/10 px-3 py-1.5 rounded-xl flex items-center min-w-[100px] justify-between">
              <span className="text-[8px] font-black uppercase text-cyan-500">CE</span>
              <span className="text-xs font-bold text-white">{u.ce}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto relative z-10 px-5 pt-5 no-scrollbar">
        {view === 'home' && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 pl-1">Active Loadout</h3>
            <div className="space-y-3 mb-6">
              {['power', 'weapon', 'armor', 'clan'].map((cat) => {
                const item = u.eq[cat];
                const rInfo = item ? GRADES[item.r] : null;
                return (
                  <div key={cat} className="bg-black/60 border border-white/5 p-4 rounded-2xl flex items-center justify-between relative overflow-hidden">
                    {rInfo?.hasDomain && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-transparent to-transparent pointer-events-none animate-pulse"></div>}
                    <div className="flex items-center relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-4 border border-white/10">
                        {cat === 'power' ? <Zap size={18} className="text-purple-400" /> : cat === 'weapon' ? <Sword size={18} className="text-rose-400" /> : cat === 'armor' ? <Shield size={18} className="text-blue-400" /> : <Building2 size={18} className="text-yellow-400" />}
                      </div>
                      <div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-0.5">{cat}</div>
                        {item ? (
                          <div>
                            <div className="text-sm font-black uppercase tracking-tight text-white leading-none mb-1">{item.n} {item.lvl > 0 && `(+${item.lvl})`}</div>
                            <span className="text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border" style={{ borderColor: rInfo.color, color: rInfo.color }}>{item.r}</span>
                            {item.d && <span className="ml-1 text-[7px] font-black uppercase bg-rose-900 text-rose-300 px-1.5 py-0.5 rounded">Domain</span>}
                          </div>
                        ) : (
                          <div className="text-xs font-bold uppercase tracking-widest text-gray-600">Unequipped</div>
                        )}
                      </div>
                    </div>
                    {item && <div className="text-xs font-black text-white bg-white/10 px-2 py-1 rounded-lg border border-white/10 relative z-10">+{Math.floor(item.pwr + (item.lvl ? item.pwr * (item.lvl * 0.15) : 0))}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'spin' && (
          <div className="animate-[fadeIn_0.3s_ease-out] flex flex-col h-full">
            <div className="bg-black/50 border border-white/10 p-3 rounded-2xl flex justify-between items-center mb-5">
              <div className="flex flex-col"><span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Pity Rate</span><span className="text-xs font-bold text-white">{u.spins % 90} / 90</span></div>
              <div className="flex flex-col text-right"><span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Luck Boost</span><span className="text-xs font-bold text-amber-400">+{u.luck}%</span></div>
            </div>

            <div className={`w-full aspect-[4/5] rounded-3xl border bg-black/80 backdrop-blur-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center mb-5 transition-all duration-500 ${spinState.active ? 'animate-[shake_0.2s_ease-in-out_infinite] border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'border-white/10'} ${spinState.res ? GRADES[spinState.res.r].bg.split('/')[0].replace('bg-', 'shadow-') + '/30 scale-105 border-opacity-50' : ''}`} style={{ borderColor: spinState.res && !spinState.active ? GRADES[spinState.res.r].color : '' }}>
              {spinState.active ? (
                <div className="text-center animate-pulse"><Activity size={48} className="text-white mx-auto mb-4 animate-spin" /><span className="text-sm font-black uppercase tracking-[0.3em] text-white">Manifesting...</span></div>
              ) : spinState.res ? (
                <div className="text-center animate-[scaleIn_0.4s_ease-out] w-full">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-20 pointer-events-none" style={{ backgroundColor: GRADES[spinState.res.r].color }}></div>
                  <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block border" style={{ borderColor: GRADES[spinState.res.r].color, color: GRADES[spinState.res.r].color, backgroundColor: `${GRADES[spinState.res.r].color}15` }}>{spinState.res.r}</span>
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-2 leading-none">{spinState.res.n}</h2>
                  <div className="flex justify-center gap-2 mb-4">
                    <div className="text-[10px] font-black bg-white/10 text-white px-2 py-1 rounded border border-white/20">PWR +{spinState.res.pwr}</div>
                    {spinState.res.d && <div className="text-[10px] font-black bg-rose-900/50 text-rose-400 border border-rose-500/50 px-2 py-1 rounded animate-pulse">DOMAIN</div>}
                  </div>
                  <p className="text-[10px] text-gray-400 italic mb-4">"{spinState.res.l}"</p>
                  <div className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-left">
                    <span className="block text-[8px] font-black uppercase tracking-widest text-gray-500 mb-1">Effect / Ability</span>
                    <span className="text-xs font-bold text-white">{spinState.res.a}</span>
                    {spinState.res.d && (
                      <div className="mt-2 pt-2 border-t border-white/10">
                        <span className="block text-[8px] font-black uppercase tracking-widest text-rose-500 mb-1">{spinState.res.d.n}</span>
                        <span className="text-[10px] text-gray-300">{spinState.res.d.e}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="opacity-30 text-center"><Lock size={40} className="mx-auto mb-3" /><span className="text-[10px] font-black uppercase tracking-widest">Vault Closed</span></div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button disabled={spinState.active} onClick={() => doSpin(POWERS, 'power')} className="bg-white/5 border border-white/10 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest active:scale-95 hover:bg-white/10 transition-colors">Roll Power</button>
              <button disabled={spinState.active} onClick={() => doSpin(WEAPONS, 'weapon')} className="bg-white/5 border border-white/10 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest active:scale-95 hover:bg-white/10 transition-colors">Roll Weapon</button>
              <button disabled={spinState.active} onClick={() => doSpin(ARMORS, 'armor')} className="bg-white/5 border border-white/10 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest active:scale-95 hover:bg-white/10 transition-colors">Roll Armor</button>
              <button disabled={spinState.active} onClick={() => doSpin(CLANS, 'clan')} className="bg-white/5 border border-white/10 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest active:scale-95 hover:bg-white/10 transition-colors">Roll Clan</button>
            </div>
            <div className="text-center mt-3 text-[9px] font-black uppercase tracking-widest text-gray-600">¥1,000 per roll</div>
          </div>
        )}

        {view === 'inventory' && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 pl-1">Arsenal ({u.inv.length})</h3>
            <div className="grid grid-cols-2 gap-3">
              {u.inv.map((item) => {
                const isEq = u.eq[item.cat]?.uid === item.uid;
                const rCol = GRADES[item.r].color;
                return (
                  <div key={item.uid} onClick={() => setCompareItem(item)} className={`relative overflow-hidden rounded-2xl border p-3 flex flex-col justify-between aspect-square active:scale-95 transition-all cursor-pointer bg-[#0A0A0F] ${isEq ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]' : 'border-white/10 hover:border-white/30'}`}>
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10 pointer-events-none" style={{ backgroundColor: rCol }}></div>
                    <div>
                      <span className="text-[7px] font-black uppercase px-1.5 py-0.5 rounded mb-1.5 inline-block border" style={{ borderColor: rCol, color: rCol }}>{item.r} {item.lvl > 0 && `+${item.lvl}`}</span>
                      <h4 className="text-xs font-black uppercase leading-tight text-white line-clamp-2">{item.n}</h4>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <div className="flex flex-col"><span className="text-[7px] font-bold text-gray-500 uppercase">{item.cat}</span><span className="text-[9px] font-black text-white">PWR {Math.floor(item.pwr + (item.lvl ? item.pwr * (item.lvl * 0.15) : 0))}</span></div>
                      {isEq && <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'collection' && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#0A0A0F] border border-white/10 p-5 rounded-3xl mb-6 text-center shadow-2xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Cursed Index Completion</span>
              <div className="text-4xl font-black text-white mb-3">{((u.col.length / TOTAL_ITEMS) * 100).toFixed(0)}%</div>
              <div className="h-1.5 bg-black rounded-full overflow-hidden border border-white/10"><div className="h-full bg-white transition-all" style={{ width: `${(u.col.length / TOTAL_ITEMS) * 100}%` }}></div></div>
            </div>

            {[{ n: 'Powers', d: POWERS }, { n: 'Weapons', d: WEAPONS }, { n: 'Armor', d: ARMORS }, { n: 'Clans', d: CLANS }].map((sec) => (
              <div key={sec.n} className="mb-6">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2 border-b border-white/5 pb-1">{sec.n} ({u.col.filter((id) => sec.d.some((i) => i.id === id)).length}/{sec.d.length})</h4>
                <div className="grid grid-cols-5 gap-1">
                  {sec.d.map((item) => {
                    const unl = u.col.includes(item.id);
                    const rCol = GRADES[item.r].color;
                    return (
                      <div key={item.id} className={`aspect-square rounded-lg border flex flex-col items-center justify-center p-1 text-center ${unl ? 'bg-black border-white/20' : 'bg-black/50 border-white/5 opacity-40'}`} style={{ borderColor: unl ? rCol : '' }}>
                        <span className="text-[7px] font-black uppercase tracking-tighter" style={{ color: unl ? rCol : '#555' }}>{unl ? item.n.substring(0, 4) : '???'}</span>
                        {unl && item.d && <span className="text-[5px] text-rose-500 mt-1">DOM</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'combat' && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            {combatLog && (
              <div className={`mb-5 p-4 rounded-2xl border backdrop-blur-md ${combatLog.ok ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/20 border-rose-500/30'}`}>
                <div className={`text-[10px] font-black uppercase tracking-widest whitespace-pre-wrap ${combatLog.ok ? 'text-emerald-400' : 'text-rose-400'}`}>{combatLog.m}</div>
              </div>
            )}

            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 pl-1">Subjugation Targets (Bosses)</h3>
            <div className="space-y-3 mb-6">
              {BOSSES.map((m) => {
                const winChance = Math.min(95, Math.max(5, Math.floor((u.pwr / m.pwr) * 50)));
                const color = winChance > 80 ? 'text-emerald-400' : winChance > 40 ? 'text-amber-400' : 'text-rose-500';
                return (
                  <div key={m.id} className="bg-[#0A0A0F] border border-white/5 rounded-2xl p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 bg-black/40 rounded-bl-2xl border-l border-b border-white/5 text-center">
                      <div className={`text-lg font-black leading-none ${color}`}>{winChance}%</div>
                      <div className="text-[6px] uppercase tracking-widest font-black text-gray-500 mt-1">Win Rate</div>
                    </div>
                    <div className="pr-14 mb-3">
                      <span className="text-[8px] font-black uppercase tracking-widest text-rose-500 mb-0.5 block">{m.d}</span>
                      <h4 className="text-sm font-black uppercase text-white tracking-wide">{m.n}</h4>
                      <p className="text-[9px] text-gray-400 mt-1 italic">"{m.lore}"</p>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-3">
                      <div className="flex space-x-3">
                        <span className="text-[10px] font-black text-emerald-400">¥{m.y / 1000}k</span>
                        <span className="text-[10px] font-black text-white">+{m.xp} XP</span>
                      </div>
                      <button onClick={() => fightBoss(m)} className="bg-white text-black px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest active:scale-95 shadow-[0_0_10px_rgba(255,255,255,0.2)]">Deploy</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 pl-1">Missions (Quiz)</h3>
            {!activeQ ? (
              <button onClick={() => { setActiveQ(QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]); setQAns(''); }} className="w-full py-6 bg-[#0A0A0F] border border-white/10 rounded-3xl flex flex-col items-center active:scale-95 transition-transform shadow-lg hover:border-cyan-500/50 group">
                <Target size={24} className="text-cyan-400 mb-2 group-hover:animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white">Find Target</span>
                {u.combo > 0 && <span className="absolute top-3 right-3 text-[8px] font-black text-[#FF3B3B] bg-red-900/40 px-2 py-0.5 rounded-full border border-red-500/30">🔥 {u.combo}x</span>}
              </button>
            ) : (
              <div className="bg-[#0A0A0F] border border-white/10 rounded-3xl p-5 shadow-2xl">
                <div className="flex justify-between mb-4">
                  <span className="text-[8px] font-black uppercase text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded">{activeQ.d} Class</span>
                  <span className="text-[8px] font-black uppercase text-emerald-400">¥{activeQ.yen} {u.combo > 0 && `(+${u.combo * 10}%)`} | {activeQ.xp} XP</span>
                </div>
                <p className="text-sm font-bold text-white mb-4">{activeQ.q}</p>
                <input type="text" value={qAns} onChange={(e) => setQAns(e.target.value)} placeholder="Enter Answer..." className="w-full bg-black border border-white/10 rounded-xl p-3 text-white text-xs mb-3 focus:border-cyan-500 outline-none" />
                <button onClick={submitQ} className="w-full py-3 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]">Execute</button>
              </div>
            )}
          </div>
        )}
      </main>

      {compareItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-5 bg-black/90 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-sm bg-[#0A0A0F] border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col">
            <button onClick={() => setCompareItem(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white/50 hover:text-white"><X size={16} /></button>
            <div className="pt-8 pb-5 px-6 relative" style={{ backgroundColor: `${GRADES[compareItem.r].color}15` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent"></div>
              <div className="relative z-10 text-center">
                <span className="text-[8px] font-black uppercase tracking-widest border px-2 py-0.5 rounded-full mb-2 inline-block" style={{ borderColor: GRADES[compareItem.r].color, color: GRADES[compareItem.r].color }}>
                  {compareItem.r} {compareItem.lvl > 0 && `(+${compareItem.lvl})`}
                </span>
                <h2 className="text-xl font-black uppercase tracking-tight text-white leading-none mb-1">{compareItem.n}</h2>
                {compareItem.d && <div className="text-[9px] font-black uppercase tracking-widest text-rose-400 bg-rose-950/50 border border-rose-500/50 px-2 py-0.5 rounded inline-block mt-1 animate-pulse">Domain Expansion</div>}
              </div>
            </div>
            <div className="p-6 pt-2">
              <div className="bg-black border border-white/5 rounded-2xl p-4 mb-4">
                <span className="block text-[8px] font-black uppercase tracking-widest text-gray-500 mb-2">Power Comparison</span>
                <StatCompare lbl="Total Power" oldV={u.eq[compareItem.cat]?.pwr || 0} newV={Math.floor(compareItem.pwr + (compareItem.lvl ? compareItem.pwr * (compareItem.lvl * 0.15) : 0))} />
                {compareItem.s?.str && <StatCompare lbl="Strength" oldV={u.eq[compareItem.cat]?.s?.str || 0} newV={compareItem.s.str} />}
                {compareItem.s?.def && <StatCompare lbl="Defense" oldV={u.eq[compareItem.cat]?.s?.def || 0} newV={compareItem.s.def} />}
                {compareItem.s?.int && <StatCompare lbl="Intelligence" oldV={u.eq[compareItem.cat]?.s?.int || 0} newV={compareItem.s.int} />}
              </div>
              <div className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="block text-[8px] font-black uppercase tracking-widest text-gray-500 mb-1">Ability / Trait</span>
                <span className="text-xs font-bold text-white leading-snug">{compareItem.a}</span>
                {compareItem.d && (
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <span className="block text-[8px] font-black uppercase tracking-widest text-rose-500 mb-0.5">{compareItem.d.n}</span>
                    <span className="text-[10px] text-gray-300">{compareItem.d.e}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    updateU({ eq: { ...u.eq, [compareItem.cat]: compareItem } });
                    showToast('Equipped', 'success');
                    setCompareItem(null);
                  }}
                  className="flex-1 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform"
                  style={{ backgroundColor: GRADES[compareItem.r].color, color: '#000', boxShadow: `0 0 15px ${GRADES[compareItem.r].color}40` }}>
                  {u.eq[compareItem.cat]?.uid === compareItem.uid ? 'Equipped' : 'Equip'}
                </button>
                <button onClick={() => upgradeItem(compareItem.uid)} className="flex-1 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform bg-black border border-white/10 text-white flex items-center justify-center">
                  <ArrowUpCircle size={14} className="mr-1" /> Up (500 CE)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdminConsole && (
        <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-5 bg-black/90 backdrop-blur-md">
          <div className="relative bg-black border border-white/10 rounded-3xl p-6 w-full max-w-sm animate-[fadeIn_0.2s_ease-out] shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            <h3 className="text-[10px] font-black text-gray-400 mb-5 flex items-center uppercase tracking-widest"><Terminal size={14} className="mr-2" /> Admin Override</h3>
            <div className="space-y-2.5">
              <button onClick={() => { updateU({ yen: u.yen + 1000000 }); showToast('+1M ¥ Injected', 'success'); }} className="w-full p-3 bg-[#0A0A0F] border border-white/5 rounded-xl text-[10px] font-mono font-bold text-emerald-400 active:scale-95">inject_yen(1000000)</button>
              <button onClick={() => { updateU({ ce: u.ce + 10000 }); showToast('+10k CE Injected', 'success'); }} className="w-full p-3 bg-[#0A0A0F] border border-white/5 rounded-xl text-[10px] font-mono font-bold text-cyan-400 active:scale-95">inject_ce(10000)</button>
              <button onClick={() => { updateU({ eq: { power: null, weapon: null, armor: null, clan: null }, pwr: 0 }); showToast('Unequipped All', 'info'); }} className="w-full p-3 bg-[#0A0A0F] border border-white/5 rounded-xl text-[10px] font-mono font-bold text-rose-400 active:scale-95">unequip_all()</button>
            </div>
            <button onClick={() => setShowAdminConsole(false)} className="mt-5 w-full p-4 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest text-black active:scale-95">Close Terminal</button>
          </div>
        </div>
      )}

      <div className="absolute bottom-5 left-5 right-5 z-40 flex justify-center pointer-events-none">
        <nav className="bg-[#0A0A0F]/90 backdrop-blur-2xl border border-white/10 rounded-full p-1.5 flex w-full max-w-md justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8)] pointer-events-auto">
          {[
            { id: 'home', icon: User, label: 'Profile' },
            { id: 'spin', icon: Sparkles, label: 'Summon' },
            { id: 'inventory', icon: Shield, label: 'Arsenal' },
            { id: 'collection', icon: BookOpen, label: 'Index' },
            { id: 'combat', icon: Target, label: 'Combat' }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setView(tab.id)} className={`flex flex-col items-center justify-center w-[60px] h-12 rounded-full transition-all duration-300 ${view === tab.id ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}>
              <tab.icon size={18} className={view === tab.id ? 'mb-0.5' : ''} />
              {view === tab.id && <span className="text-[7px] font-black uppercase tracking-widest">{tab.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px) rotate(-2deg); } 75% { transform: translateX(4px) rotate(2deg); } }
        @keyframes flash { 0% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes domain { 0% { opacity: 0; background-color: rgba(0,0,0,0); } 10% { opacity: 1; background-color: rgba(255,255,255,1); } 15% { background-color: rgba(0,0,0,1); } 100% { opacity: 0; background-color: rgba(0,0,0,0); } }
        .no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />
    </div>
  );
}
