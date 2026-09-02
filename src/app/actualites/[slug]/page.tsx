import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPublishedNewsBySlug } from '@/lib/news'
import { getAuthorLabel } from '@/lib/authorLabel'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getPublishedNewsBySlug(slug)
  return { title: article ? article.title : 'Actualité' }
}

export default async function ActualiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getPublishedNewsBySlug(slug)
  if (!article) notFound()

  return (
    <div style={{ paddingTop: '64px' }}>
      <div style={{ background: 'var(--cream)', padding: 'clamp(32px,6vw,80px) var(--px) clamp(32px,5vw,56px)', borderBottom: '1px solid var(--border-light)' }}>
        <Link href="/actualites" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', marginBottom: '24px' }}>
          ← Toutes les actualités
        </Link>
        {article.publishedAt && (
          <div className="label-caps" style={{ marginBottom: '16px' }}>
            {article.publishedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        )}
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1.05, letterSpacing: '-1px', maxWidth: '840px', marginBottom: '16px' }}>
          {article.title}
        </h1>
        <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)' }}>{getAuthorLabel(article.author)}</div>
      </div>

      <div style={{ padding: 'clamp(32px,6vw,64px) var(--px)', maxWidth: '760px' }}>
        {article.coverImage && (
          <div style={{ position: 'relative', height: 'clamp(220px, 40vw, 420px)', overflow: 'hidden', marginBottom: 'clamp(24px,4vw,40px)' }}>
            <Image src={article.coverImage} alt={article.title} fill sizes="(max-width: 768px) 100vw, 760px" style={{ objectFit: 'cover' }} priority />
          </div>
        )}
        <p style={{ fontSize: 'clamp(14px,1.8vw,16px)', fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
          {article.content}
        </p>
        {article.gallery.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '8px', marginTop: 'clamp(24px,4vw,40px)' }}>
            {article.gallery.map((img, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src={img} alt={`${article.title} ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
