// Distinct animated "thumbnail" per project, tinted by its accent gradient.
// Each motif reflects the project's domain (lakehouse, RAG, streaming, etc.).

const Svg = ({ children }) => (
  <svg
    viewBox="0 0 246 120"
    preserveAspectRatio="xMidYMid slice"
    className="relative h-full w-full"
  >
    {children}
  </svg>
)

// Medallion lakehouse: layered planks with data rising through them
function Lakehouse() {
  const layers = [
    { y: 80, o: 0.16 },
    { y: 54, o: 0.26 },
    { y: 28, o: 0.4 },
  ]
  return (
    <Svg>
      {layers.map((l, i) => (
        <rect
          key={i}
          x="56"
          y={l.y}
          width="134"
          height="18"
          rx="4"
          fill={`rgba(255,255,255,${l.o})`}
          stroke="rgba(255,255,255,0.28)"
        />
      ))}
      {[74, 104, 134, 164].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy="98"
          r="3"
          fill="#fff"
          className="viz-rise"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
    </Svg>
  )
}

// RAG: central query node with pulsing semantic rings + vector points
function Rag() {
  const cx = 123
  const cy = 60
  const dots = [
    [44, 30],
    [64, 82],
    [95, 22],
    [86, 96],
    [172, 32],
    [196, 82],
    [206, 42],
    [40, 62],
    [150, 98],
    [190, 20],
  ]
  return (
    <Svg>
      {[22, 38, 54].map((r, i) => (
        <circle
          key={`r${i}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          className="viz-ring"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}
      {dots.map(([x, y], i) => (
        <g key={i}>
          {i < 5 && <line x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.16)" />}
          <circle
            cx={x}
            cy={y}
            r="3"
            fill="#fff"
            className="viz-node"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        </g>
      ))}
      <circle cx={cx} cy={cy} r="6" fill="#fff" />
    </Svg>
  )
}

// Streaming: flowing dashed waves
function Streaming() {
  const waves = [
    { d: 'M0 42 C 40 22, 82 62, 123 42 S 206 22, 246 42', o: 0.5 },
    { d: 'M0 62 C 40 42, 82 82, 123 62 S 206 42, 246 62', o: 0.85 },
    { d: 'M0 82 C 40 62, 82 102, 123 82 S 206 62, 246 82', o: 0.4 },
  ]
  return (
    <Svg>
      {waves.map((w, i) => (
        <path
          key={i}
          d={w.d}
          fill="none"
          strokeWidth="2"
          strokeDasharray="6 8"
          stroke={`rgba(255,255,255,${w.o})`}
          className="viz-flow"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </Svg>
  )
}

// Fraud: anomaly line with a highlighted spike + alert rings
function Fraud() {
  return (
    <Svg>
      <polyline
        points="6,86 30,72 54,80 78,62 102,74 126,68 150,30 174,76 198,70 222,82 240,76"
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="2"
        strokeDasharray="4 6"
        className="viz-flow"
      />
      {[10, 18, 26].map((r, i) => (
        <circle
          key={i}
          cx="150"
          cy="30"
          r={r}
          fill="none"
          stroke="rgba(255,140,140,0.55)"
          className="viz-ring"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
      <circle cx="150" cy="30" r="6" fill="#fff" className="viz-node" />
    </Svg>
  )
}

// Serverless: cloud over a grid of function blocks blinking
function Serverless() {
  const cells = []
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      cells.push({ x: 72 + c * 30, y: 66 + r * 24, i: r * 4 + c })
    }
  }
  return (
    <Svg>
      <g fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2">
        <circle cx="108" cy="34" r="12" />
        <circle cx="128" cy="28" r="15" />
        <circle cx="148" cy="34" r="11" />
        <rect x="98" y="34" width="58" height="14" rx="7" />
      </g>
      {cells.map((c) => (
        <rect
          key={c.i}
          x={c.x}
          y={c.y}
          width="20"
          height="16"
          rx="3"
          fill="#fff"
          className="viz-blink"
          style={{ animationDelay: `${c.i * 0.22}s` }}
        />
      ))}
    </Svg>
  )
}

// Warehouse: bars with a rising dashed forecast line
function Warehouse() {
  const bars = [
    [54, 70, 26],
    [86, 58, 38],
    [118, 64, 32],
    [150, 44, 52],
    [182, 52, 44],
  ]
  return (
    <Svg>
      {bars.map(([x, y, h], i) => (
        <rect key={i} x={x} y={y} width="18" height={h} rx="3" fill="rgba(255,255,255,0.5)" />
      ))}
      <polyline
        points="60,74 92,58 124,62 156,40 188,48 216,28"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeDasharray="5 6"
        className="viz-flow"
      />
    </Svg>
  )
}

const SCENES = {
  lakehouse: Lakehouse,
  rag: Rag,
  streaming: Streaming,
  fraud: Fraud,
  serverless: Serverless,
  warehouse: Warehouse,
}

export default function ProjectVisual({
  accent = 'from-indigo-500/30 to-sky-500/20',
  kind = 'lakehouse',
}) {
  const Scene = SCENES[kind] || Lakehouse
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-70`} />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:16px_16px]" />
      <Scene />
    </div>
  )
}
