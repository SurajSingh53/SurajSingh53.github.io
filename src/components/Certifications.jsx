import { useState } from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, GraduationCap, Award, ArrowUpRight } from 'lucide-react'
import { certifications, education, achievements } from '../data/content'
import Reveal from './Reveal'

const EASE = [0.22, 1, 0.36, 1]

function CertBadge({ cert }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="relative grid place-items-center w-12 h-12 rounded-xl bg-white border border-white/10 p-2 shrink-0">
      {failed || !cert.logo ? (
        <span className="font-display text-[10px] font-semibold text-slate-800 text-center leading-none">
          {cert.code}
        </span>
      ) : (
        <img
          src={cert.logo}
          alt={`${cert.issuer} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  )
}

export default function Certifications() {
  return (
    <section id="credentials" className="section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Credentials</p>
          <h2 className="section-title">
            Certified, <span className="gradient-text">proven</span>, recognized.
          </h2>
          <p className="mt-5 max-w-xl text-white/55">
            The receipts — vendor-verified proof behind every pipeline I build.
          </p>
        </Reveal>

        {/* Certification badges */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((c, i) => (
            <motion.a
              key={c.name + c.code}
              href={c.verifyUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${c.name} — ${c.issuer} (view credential)`}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group glass p-5 flex items-center gap-4 hover:border-white/25 transition-colors"
            >
              <CertBadge cert={c} />
              <div className="flex-1 min-w-0">
                <div className="font-medium leading-snug">{c.name}</div>
                <div className="text-xs text-white/45 mt-0.5">{c.issuer}</div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <BadgeCheck
                  className="w-5 h-5 text-emerald-300/70 group-hover:text-emerald-300 transition-colors"
                  strokeWidth={1.75}
                />
                <ArrowUpRight
                  className="w-4 h-4 text-white/25 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  strokeWidth={1.75}
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Education + Achievements */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Reveal>
            <div className="glass h-full p-7">
              <p className="eyebrow flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-300" strokeWidth={1.75} /> Education
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold">{education.school}</h3>
              <p className="mt-1 text-white/60">{education.degree}</p>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/60">
                  {education.period}
                </span>
                <span className="gradient-text font-medium">{education.score}</span>
              </div>
            </div>
          </Reveal>

          <Reveal i={1}>
            <div className="glass h-full p-7">
              <p className="eyebrow flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-300" strokeWidth={1.75} /> Recognition
              </p>
              <ul className="mt-4 space-y-4">
                {achievements.map((a) => (
                  <li key={a.title} className="flex gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-indigo-300 to-sky-300 shrink-0" />
                    <div>
                      <div className="font-medium">{a.title}</div>
                      <div className="text-sm text-white/50">{a.detail}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
