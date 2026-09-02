import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPublishedNews } from '@/lib/news'
import { getAuthorLabel } from '@/lib/authorLabel'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Actualités',
  description: "Les dernières actualités du club Xplosion Cheerleaders Orléans.",
}

export default async function ActualitesPage() {
  const news = await getPublishedNews()

  return (
    <div style={{ paddingTop: '64px' }}>
      <div style={{ background: 'var(--cream)', padding: 'clamp(48px,8vw,80px) var(--px) clamp(32px,5vw,64px)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="label-caps" style={{ marginBottom: '20px' }}>Le club en direct</div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.95, letterSpacing: '-1.5px' }}>
          Nos <em style={{ fontStyle: 'italic', color: 'var(--fire)' }}>actualités</em>
        </h1>
      </div>

      <div style={{ padding: 'clamp(40px,8vw,80px) var(--px)' }}>
        {news.length === 0 && (
          <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Aucune actualité publiée pour l&apos;instant.</p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1px', background: 'var(--border-light)', border: '1px solid var(--border-light)' }}>
          {news.map((article) => (
            <Link key={article.id} href={`/actualites/${article.slug}`} className="card-hover-bar"
              style={{ display: 'block', background: 'var(--white)', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
              {article.coverImage && (
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <Image src={article.coverImage} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ padding: 'clamp(20px,3vw,28px)' }}>
                {article.publishedAt && (
                  <div style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--fire)', marginBottom: '8px' }}>
                    {article.publishedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                )}
                <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 700, fontSize: 'clamp(18px,2.5vw,22px)', color: 'var(--ink)', lineHeight: 1.2, marginBottom: '10px' }}>
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.65, marginBottom: '10px' }}>{article.excerpt}</p>
                )}
                <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--muted)' }}>{getAuthorLabel(article.author)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
