'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { articles } from '@/data/portfolio'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Badge } from '@/components/ui/badge'
import { SpaceCard } from '@/components/ui/SpaceCard'

export function TechnicalWriting() {
  return (
    <section id="writing" className="section-even relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle className="mb-4">Technical Writing</SectionTitle>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="font-sans text-muted-foreground mb-4 md:mb-8"
        >
          Published on{' '}
          <motion.a
            href="https://dev.to/chandubobbili"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 6,
              ease: 'circInOut',
              repeat: Infinity,
            }}
            className="font-medium bg-linear-to-r bg-size-[200%_200%] bg-clip-text text-brand"
          >
            DEV Community
          </motion.a>
        </motion.p>

        <div className="flex flex-col gap-2">
          {articles.map((article, i) => (
            <motion.a
              key={article.title}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.2 }}
              className="block"
            >
              <SpaceCard className="group p-5 flex flex-col transition-colors duration-200 ease-in-out hover:bg-brand-strong/10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-sans rounded-lg text-[0.6875rem]">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="font-heading text-base font-semibold text-foreground mb-3 leading-snug group-hover:text-bg-section-alt transition-colors duration-300 ease-in-out">
                  {article.title}
                </h3>

                <p className="font-sans text-sm text-muted-foreground leading-[1.75] mb-5 flex-1 group-hover:text-bg-section-alt transition-colors duration-300 ease-in-out">
                  {article.summary}
                </p>

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand mt-auto group-hover:text-bg-section-alt transition-colors duration-300 ease-in-out">
                  Read on DEV
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </SpaceCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
