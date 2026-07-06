import {
  Code2,
  Database,
  Zap,
  Sparkles,
  Snowflake,
  Boxes,
  Layers,
  Component,
  Radio,
  Wind,
  GitBranch,
  Cloud,
  Server,
  BarChart3,
} from 'lucide-react'

const items = [
  { label: 'Python', Icon: Code2 },
  { label: 'SQL', Icon: Database },
  { label: 'PySpark', Icon: Zap },
  { label: 'Apache Spark', Icon: Sparkles },
  { label: 'Snowflake', Icon: Snowflake },
  { label: 'Databricks', Icon: Boxes },
  { label: 'Microsoft Fabric', Icon: Layers },
  { label: 'Delta Lake', Icon: Component },
  { label: 'Apache Kafka', Icon: Radio },
  { label: 'Apache Airflow', Icon: Wind },
  { label: 'dbt', Icon: GitBranch },
  { label: 'Azure', Icon: Cloud },
  { label: 'AWS', Icon: Server },
  { label: 'Power BI', Icon: BarChart3 },
]

/**
 * Full-bleed, infinitely-scrolling tech band — a signature portfolio element
 * that adds motion and rhythm between the hero and the content.
 */
export default function TechMarquee() {
  const row = [...items, ...items]
  return (
    <section aria-hidden="true" className="relative border-y border-white/[0.06] py-7">
      <div className="marquee">
        <div className="marquee-track">
          {row.map((it, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-white/70"
            >
              <it.Icon className="w-4 h-4 text-indigo-300" strokeWidth={1.75} />
              <span className="text-sm">{it.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
