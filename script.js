/* ══════════════════════════════════════════
   PARTICLES
══════════════════════════════════════════ */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
function resizeCanvas() { canvas.width = innerWidth; canvas.height = innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const pColors = ['rgba(0,255,136,','rgba(0,212,255,','rgba(168,85,247,'];
const parts   = Array.from({length:60}, () => ({
  x: Math.random()*innerWidth, y: Math.random()*innerHeight,
  r: Math.random()*1.5+0.3,
  vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3,
  color: pColors[Math.floor(Math.random()*pColors.length)],
  alpha: Math.random()*.5+.1,
}));

(function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (const p of parts) {
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0) p.x=canvas.width;  if(p.x>canvas.width) p.x=0;
    if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color+p.alpha+')'; ctx.fill();
  }
  requestAnimationFrame(draw);
})();

/* ══════════════════════════════════════════
   SCROLL REVEAL (GUI mode)
══════════════════════════════════════════ */
const revObs = new IntersectionObserver(
  es => es.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ══════════════════════════════════════════
   FILESYSTEM
   Edit file content here to update what
   shows when you `cat` a file in the terminal
══════════════════════════════════════════ */
const FS = {
  type: 'dir',
  children: {

    'about.txt': {
      type:'file', date:'Jun 17 2026', size:712,
      content:`<span class="o-cyan">NAME      </span>  Nate Lacandazo
<span class="o-cyan">SCHOOL    </span>  University of Florida — Computer Engineering
<span class="o-cyan">GRAD      </span>  May 2029
<span class="o-cyan">GPA       </span>  <span class="o-green">3.5 / 4.0</span>
<span class="o-cyan">FOCUS     </span>  Cybersecurity · Ethical Hacking · Network Security
<span class="o-dim">────────────────────────────────────────────────</span>
I'm interested in how systems work — and how they fail.
Whether it's writing a tool, understanding a vulnerability,
or setting up a lab, I learn best by doing.
<span class="o-dim">────────────────────────────────────────────────</span>
<span class="o-white">EXPERIENCE</span>
  CSOC Intern @ Florida Digital Service    Dec 2024 – Jun 2025
  CTF Competitor @ UF Security Info Team   Aug 2025 – Present
<span class="o-dim">────────────────────────────────────────────────</span>
<span class="o-green">●</span>  Open to internships`
    },

    'skills.txt': {
      type:'file', date:'Jun 17 2026', size:420,
      content:`<span class="o-green">LANGUAGES  </span>  Python  ·  C++  ·  Bash  ·  PowerShell
<span class="o-cyan">SECURITY   </span>  Kali Linux  ·  Metasploit  ·  Burp Suite  ·  Wireshark  ·  Splunk  ·  Cowrie
<span class="o-purple">PLATFORMS  </span>  Linux  ·  Windows  ·  VMware  ·  AWS
<span class="o-pink">DEV        </span>  Swift  ·  TypeScript  ·  Node.js  ·  MongoDB  ·  Prisma
<span class="o-muted">COURSEWORK </span>  Penetration Testing · Image Processing / CV · Linear Algebra
             Discrete Structures · Differential Equations`
    },

    'contact.txt': {
      type:'file', date:'Jun 17 2026', size:280,
      content:`<span class="o-white">email    </span>  <a href="mailto:natelacandazo@gmail.com" class="o-link">natelacandazo@gmail.com</a>
<span class="o-white">github   </span>  <a href="https://github.com/sakodrake" class="o-link" target="_blank">github.com/sakodrake</a>
<span class="o-white">linkedin </span>  <a href="https://linkedin.com/in/nate-lacandazo" class="o-link" target="_blank">linkedin.com/in/nate-lacandazo</a>
<span class="o-white">instagram</span>  <a href="https://instagram.com/your_handle" class="o-link" target="_blank">@your_handle</a>
<span class="o-dim">────────────────────────────────────────────────</span>
<span class="o-green">Open to internships, collabs, and security convos.</span>`
    },

    /* Hidden files — only visible with ls -la */
    '.profile': {
      type:'file', date:'Jun 17 2026', size:128, hidden:true,
      content:`export PS1="\\u@portfolio:\\w$ "
export EDITOR=vim
alias ll='ls -la'
alias ..='cd ..'
alias cls='clear'

# You found this. Nice work.`
    },

    '.bash_history': {
      type:'file', date:'Jun 17 2026', size:256, hidden:true,
      content:`sudo rm -rf /
git push --force main
ssh root@192.168.1.1
python3 exploit.py --target localhost
cat /etc/shadow
chmod 777 /
nmap -A -T4 192.168.1.0/24
hashcat -m 0 hash.txt rockyou.txt`
    },

    /* ── Projects folder ── */
    'projects': {
      type:'dir', date:'Jun 17 2026', size:192,
      children: {

        '01-scalpel.md': {
          type:'file', date:'Apr 15 2026', size:648,
          content:`<span class="o-head"># Project Scalpel</span>
<span class="o-muted">Date:   Apr. 2026</span>
<span class="o-muted">Stack:  Cowrie · AWS Bedrock · Paramiko</span>
<span class="o-dim">────────────────────────────────────────────────</span>
<span class="o-white">Overview</span>
  3-tiered hybrid deception honeypot. Achieved a 97.3%
  escalation score from the Army Research Lab.

<span class="o-white">Architecture</span>
  <span class="o-green">Tier 1</span>  Cowrie SSH/Telnet honeypot for initial deception
  <span class="o-green">Tier 2</span>  AWS Bedrock "second-brain" catches edge commands
  <span class="o-green">Tier 3</span>  Lookup table matched 97.3% of Red Team TTPs

<span class="o-white">Result</span>
  97.3% escalation score — Army Research Lab evaluation
<span class="o-dim">────────────────────────────────────────────────</span>
<a href="https://github.com/sakodrake" class="o-link" target="_blank">→ github.com/sakodrake</a>`
        },

        '02-lingolens.md': {
          type:'file', date:'Feb 28 2026', size:592,
          content:`<span class="o-head"># LingoLens</span>  <span class="o-winner">🏆 Best Use of Gemini API</span>
<span class="o-muted">Date:   Feb. 2026</span>
<span class="o-muted">Stack:  Swift · SwiftUI · AVFoundation · Gemini API · MongoDB · ElevenLabs</span>
<span class="o-dim">────────────────────────────────────────────────</span>
<span class="o-white">Overview</span>
  iOS app for language learning through real-world
  object recognition. Point your camera, get vocabulary.

<span class="o-white">Pipeline</span>
  <span class="o-green">Camera  </span>  AVFoundation captures live video input
  <span class="o-green">AI      </span>  Gemini vision model identifies objects
  <span class="o-green">Voice   </span>  ElevenLabs delivers bilingual pronunciation
  <span class="o-green">Storage </span>  MongoDB for vocabulary and user IDs
<span class="o-dim">────────────────────────────────────────────────</span>
<a href="https://github.com/sakodrake" class="o-link" target="_blank">→ github.com/sakodrake</a>`
        },

        '03-viralytics.md': {
          type:'file', date:'Mar 20 2026', size:528,
          content:`<span class="o-head"># Viralytics</span>
<span class="o-muted">Date:   Mar. 2026</span>
<span class="o-muted">Stack:  TypeScript · Node.js · Prisma · Gemini API</span>
<span class="o-dim">────────────────────────────────────────────────</span>
<span class="o-white">Overview</span>
  Full-stack pipeline transforming TikTok trend data
  into structured video concepts for creators.

<span class="o-white">Features</span>
  <span class="o-green">Trends  </span>  Surfaces top-performing niche videos
  <span class="o-green">AI      </span>  Gemini generates hooks, scripts, captions
  <span class="o-green">Persona </span>  Adapts to style, effort, camera prefs
  <span class="o-green">Impact  </span>  Content ideation accelerated by 10x
<span class="o-dim">────────────────────────────────────────────────</span>
<a href="https://github.com/sakodrake" class="o-link" target="_blank">→ github.com/sakodrake</a>`
        }

      }
    },

    /* ── Journey folder ── */
    'journey': {
      type:'dir', date:'Jun 17 2026', size:128,
      children: {

        'instagram.txt': {
          type:'file', date:'Jun 17 2026', size:396,
          content:`I document my life as a CS and cybersecurity student
on Instagram — the real stuff.
<span class="o-dim">────────────────────────────────────────────────</span>
<span class="o-white">Topics</span>
  Studying and coursework breakdowns
  Building and debugging projects
  CTF writeups and walkthroughs
  Resources I wish I'd had earlier
<span class="o-dim">────────────────────────────────────────────────</span>
<a href="https://instagram.com/your_handle" class="o-link" target="_blank">→ instagram.com/your_handle</a>`
        }

      }
    }

  }
};

/* ══════════════════════════════════════════
   TERMINAL STATE
══════════════════════════════════════════ */
let cwd     = [];
let cmdHist = [];
let histIdx = -1;

const termBody  = document.getElementById('term-body');
const termInput = document.getElementById('term-input');

/* ── Filesystem helpers ── */
function getNode(pathArr) {
  let node = FS;
  for (const seg of pathArr) {
    if (!node.children || !node.children[seg]) return null;
    node = node.children[seg];
  }
  return node;
}
function getCurrent() { return getNode(cwd); }
function cwdDisplay() { return cwd.length === 0 ? '~' : '~/' + cwd.join('/'); }

function promptHTML() {
  const p = cwdDisplay();
  return `<span class="tp-user">nate</span><span class="tp-at">@</span><span class="tp-host">portfolio</span><span class="tp-colon">:</span><span class="tp-path">${p}</span><span class="tp-dollar"> $</span>`;
}

function refreshPromptLabel() {
  document.getElementById('term-prompt-label').innerHTML = promptHTML();
  document.getElementById('term-title-path').textContent = `nate@portfolio: ${cwdDisplay()}`;
}

/* ── Output helpers ── */
function appendEntry(rawCmd, html, pHTML) {
  const el = document.createElement('div');
  el.className = 'term-entry';
  el.innerHTML = `<div class="term-cmd-line">${pHTML || promptHTML()}<span class="tp-cmd">${escHtml(rawCmd)}</span></div>`
               + (html ? `<div class="term-output">${html}</div>` : '');
  termBody.appendChild(el);
  termBody.scrollTop = termBody.scrollHeight;
}

function appendBlank() { termBody.appendChild(document.createElement('br')); }

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ── ls formatting ── */
function colorName(name, node) {
  if (node.type === 'dir')   return `<span class="ls-dir">${name}/</span>`;
  if (name.endsWith('.md'))  return `<span class="ls-md">${name}</span>`;
  if (name.endsWith('.pdf')) return `<span class="ls-pdf">${name}</span>`;
  if (name.startsWith('.'))  return `<span class="ls-hide">${name}</span>`;
  return `<span class="ls-txt">${name}</span>`;
}

function lsSimple(node, showHidden) {
  const entries = Object.entries(node.children)
    .filter(([n,v]) => showHidden || !v.hidden)
    .sort(([a],[b]) => a.localeCompare(b));
  if (!entries.length) return '<span class="o-muted">(empty)</span>';
  return entries.map(([n,v]) => colorName(n,v)).join('    ');
}

function lsLong(node, showHidden) {
  const entries = Object.entries(node.children)
    .filter(([n,v]) => showHidden || !v.hidden)
    .sort(([a],[b]) => a.localeCompare(b));
  let lines = [`<span class="o-muted">total ${entries.length}</span>`];
  lines.push(`<span class="o-cyan">drwxr-xr-x</span>  <span class="o-muted">2 nate nate   128 Jun 17 2026</span> <span class="ls-dir">.</span>`);
  lines.push(`<span class="o-cyan">drwxr-xr-x</span>  <span class="o-muted">3 root root    96 Jun 17 2026</span> <span class="ls-dir">..</span>`);
  for (const [name, child] of entries) {
    const perm = child.type === 'dir' ? '<span class="o-cyan">drwxr-xr-x</span>' : '<span class="o-muted">-rw-r--r--</span>';
    const size = String(child.size || 128).padStart(4);
    lines.push(`${perm}  <span class="o-muted">1 nate nate  ${size} ${child.date}</span> ${colorName(name, child)}`);
  }
  return lines.join('\n');
}

/* ══════════════════════════════════════════
   COMMAND HANDLERS
══════════════════════════════════════════ */
const HELP = `<span class="o-cyan">FILESYSTEM</span>
  <span class="o-green">ls</span>                  list directory contents
  <span class="o-green">ls -la</span>              detailed list (shows hidden files with -a)
  <span class="o-green">ll</span>                  alias for ls -la
  <span class="o-green">cd &lt;dir&gt;</span>            change directory
  <span class="o-green">cd ..</span>               go up one level
  <span class="o-green">cd ~</span>                go home
  <span class="o-green">cat &lt;file&gt;</span>          display file contents
  <span class="o-green">pwd</span>                 print working directory

<span class="o-cyan">INFO</span>
  <span class="o-green">whoami</span>              about me
  <span class="o-green">clear</span>               clear the terminal
  <span class="o-green">history</span>             command history
  <span class="o-green">help</span>                this menu

<span class="o-cyan">NAVIGATION</span>
  <span class="o-green">gui</span>                 switch to GUI mode

<span class="o-muted">tip: Tab autocompletes filenames · ↑↓ navigates history</span>`;

function handleLs(args) {
  const flags    = args.filter(a => a.startsWith('-')).join('');
  const showLong = flags.includes('l');
  const showAll  = flags.includes('a');
  const node     = getCurrent();
  if (!node || node.type !== 'dir') return '<span class="o-red">ls: not a directory</span>';
  return showLong ? lsLong(node, showAll) : lsSimple(node, showAll);
}

function handleCd(args) {
  const target = (args[0] || '').replace(/\/+$/, '');
  if (!target || target === '~') { cwd = []; return null; }
  if (target === '..') { if (cwd.length > 0) cwd = cwd.slice(0, -1); return null; }
  const node = getCurrent();
  if (!node || !node.children || !node.children[target])
    return `<span class="o-red">cd: ${escHtml(target)}: No such file or directory</span>`;
  if (node.children[target].type !== 'dir')
    return `<span class="o-red">cd: ${escHtml(target)}: Not a directory</span>`;
  cwd = [...cwd, target];
  return null;
}

function handleCat(args) {
  if (!args[0]) return '<span class="o-red">cat: missing operand</span>';
  let filename = args[0];
  let lookNode = getCurrent();
  if (filename.startsWith('~/')) { filename = filename.slice(2); lookNode = FS; }
  const file = lookNode && lookNode.children && lookNode.children[filename];
  if (!file)               return `<span class="o-red">cat: ${escHtml(args[0])}: No such file or directory</span>`;
  if (file.type === 'dir') return `<span class="o-red">cat: ${escHtml(args[0])}: Is a directory</span>`;
  return file.content;
}

function handleHistory() {
  if (!cmdHist.length) return '<span class="o-muted">no commands in history</span>';
  return cmdHist.slice().reverse()
    .map((c,i) => `<span class="o-muted">${String(i+1).padStart(3)}</span>  ${escHtml(c)}`)
    .join('\n');
}

function getCompletions(partial) {
  const node = getCurrent();
  if (!node || node.type !== 'dir') return [];
  return Object.keys(node.children)
    .filter(n => n.startsWith(partial) && !node.children[n].hidden)
    .sort();
}

/* ══════════════════════════════════════════
   COMMAND DISPATCH
══════════════════════════════════════════ */
function runCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) { appendEntry('', null); return; }

  cmdHist.push(trimmed); histIdx = -1;

  const parts = trimmed.split(/\s+/);
  const cmd   = parts[0].toLowerCase();
  const args  = parts.slice(1);

  switch (cmd) {
    case 'ls':      appendEntry(trimmed, handleLs(args)); break;
    case 'll':      appendEntry(trimmed, handleLs(['-la'])); break;
    case 'cd': {
      const prePrompt = promptHTML();
      const out = handleCd(args);
      appendEntry(trimmed, out, prePrompt);
      refreshPromptLabel();
      break;
    }
    case 'cat':     appendEntry(trimmed, handleCat(args)); break;
    case 'pwd': {
      const p = cwd.length === 0 ? '/home/nate' : '/home/nate/' + cwd.join('/');
      appendEntry(trimmed, `<span class="o-white">${p}</span>`);
      break;
    }
    case 'whoami':  appendEntry(trimmed, FS.children['about.txt'].content); break;
    case 'clear':   termBody.innerHTML = ''; break;
    case 'help':    appendEntry(trimmed, HELP); break;
    case 'history': appendEntry(trimmed, handleHistory()); break;
    case 'gui':     appendEntry(trimmed, '<span class="o-muted">switching to GUI mode...</span>'); setTimeout(openGUI, 300); break;
    case 'open':    appendEntry(trimmed, handleCat(args)); break;

    /* Easter eggs */
    case 'sudo':    appendEntry(trimmed, '<span class="o-red">Permission denied. Nice try.</span>'); break;
    case 'rm':      appendEntry(trimmed, '<span class="o-red">Permission denied. (Also, really?)</span>'); break;
    case 'vim':     appendEntry(trimmed, '<span class="o-muted">Entering vim...\n\n<span class="o-red">fatal: cannot escape</span>\n\ntype <span class="o-green">:q!</span> ... just kidding, it does nothing.</span>'); break;
    case 'nano':    appendEntry(trimmed, '<span class="o-muted">Better choice than vim. Still not available though.</span>'); break;
    case 'python3': appendEntry(trimmed, '<span class="o-muted">Python 3.12.0 (main)\nType "help" for more info.\n>>><span class="o-red"> (this is a terminal emulator, not a REPL)</span></span>'); break;
    case 'git':     appendEntry(trimmed, '<span class="o-red">fatal: not a git repository (or any parent directories)</span>'); break;
    case 'ssh':     appendEntry(trimmed, `<span class="o-muted">ssh: connect to host ${escHtml(args[0]||'host')} port 22: Connection refused</span>`); break;
    case 'nmap':    appendEntry(trimmed, '<span class="o-muted">Starting Nmap...\n<span class="o-red">You wish.</span></span>'); break;
    case 'exit':    appendEntry(trimmed, '<span class="o-muted">There is no escaping this portfolio.</span>'); break;
    case 'date':    appendEntry(trimmed, `<span class="o-white">${new Date().toString()}</span>`); break;
    case 'uname':   appendEntry(trimmed, '<span class="o-white">PortfolioOS 2026.1 nate-portfolio x86_64</span>'); break;
    case 'echo':    appendEntry(trimmed, `<span class="o-white">${escHtml(args.join(' '))}</span>`); break;

    default:
      appendEntry(trimmed, `<span class="o-muted">bash: ${escHtml(cmd)}: command not found &nbsp;(try <span class="o-green">help</span>)</span>`);
  }
}

/* ══════════════════════════════════════════
   INPUT HANDLING
══════════════════════════════════════════ */
termInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const val = this.value;
    this.value = '';
    runCommand(val);

  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histIdx < cmdHist.length - 1) { histIdx++; this.value = cmdHist[cmdHist.length-1-histIdx]; }

  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx > 0) { histIdx--; this.value = cmdHist[cmdHist.length-1-histIdx]; }
    else { histIdx = -1; this.value = ''; }

  } else if (e.key === 'Tab') {
    e.preventDefault();
    const val   = this.value;
    const parts = val.trimStart().split(/\s+/);
    const cmd   = parts[0];
    if (parts.length < 2 && !['cd','cat','ls','ll','open'].includes(cmd.toLowerCase())) return;
    const partial = parts.length >= 2 ? parts[parts.length-1] : '';
    const matches = getCompletions(partial);
    if (matches.length === 1) {
      const node   = getCurrent().children[matches[0]];
      const suffix = node.type === 'dir' ? '/' : ' ';
      parts[Math.max(parts.length-1, 1)] = matches[0] + suffix;
      this.value = parts.join(' ');
    } else if (matches.length > 1) {
      appendEntry(val, matches.map(m => colorName(m, getCurrent().children[m])).join('    '));
    }
  }
});

document.getElementById('term-overlay').addEventListener('click', () => termInput.focus());
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('term-overlay').classList.contains('active')) openGUI();
});

/* ══════════════════════════════════════════
   MODE SWITCHING
══════════════════════════════════════════ */
function openGUI() {
  document.getElementById('term-overlay').classList.remove('active');
}

function openTerminal() {
  document.getElementById('term-overlay').classList.add('active');
  setTimeout(() => termInput.focus(), 80);
}

/* ══════════════════════════════════════════
   BOOT SEQUENCE
══════════════════════════════════════════ */
const ASCII = `
 ███╗   ██╗ █████╗ ████████╗███████╗
 ████╗  ██║██╔══██╗╚══██╔══╝██╔════╝
 ██╔██╗ ██║███████║   ██║   █████╗
 ██║╚██╗██║██╔══██║   ██║   ██╔══╝
 ██║ ╚████║██║  ██║   ██║   ███████╗
 ╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚══════╝`;

function boot() {
  const now = new Date();
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const mons = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dateStr = `${days[now.getDay()]} ${mons[now.getMonth()]} ${now.getDate()} ${now.getFullYear()} ${now.toLocaleTimeString()}`;

  const header = document.createElement('div');
  header.innerHTML = `
    <span class="term-ascii">${ASCII}</span>
    <div class="term-sys-line" style="color:#1e1e1e">──────────────────────────────────────────────────────</div>
    <div class="term-sys-line" style="color:#2a2a2a">PortfolioOS 2026.1  (nate-portfolio/x86_64)</div>
    <div class="term-sys-line" style="color:#2a2a2a">Last login: ${dateStr}</div>
    <br>
  `;
  termBody.appendChild(header);

  setTimeout(() => {
    appendEntry('ls', lsSimple(FS, false));
    appendBlank();
    refreshPromptLabel();
    termInput.focus();
  }, 200);
}

refreshPromptLabel();
boot();
