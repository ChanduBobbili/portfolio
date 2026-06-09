'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { articles } from '@/data/portfolio'

export function TechnicalWriting() {
  return (
    <section id="writing" className="section-even relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* <SectionLabel>TRANSMISSION LOG</SectionLabel> */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-section-title text-text-primary mb-4"
        >
          Technical Writing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="text-text-secondary mb-12"
        >
          Published on{' '}
          <a
            href="https://dev.to/chandubobbili"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline font-medium"
          >
            DEV Community
          </a>
        </motion.p>

        <div className="grid md:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <motion.a
              key={article.title}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group glass-card p-5 flex flex-col"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => (
                  <span key={tag} className="tag-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-display text-base font-semibold text-text-primary mb-3 leading-snug group-hover:text-accent transition-colors">
                {article.title}
              </h3>

              <p className="text-sm text-text-secondary leading-[1.75] mb-5 flex-1">
                {article.summary}
              </p>

              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent mt-auto">
                Read on DEV
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
