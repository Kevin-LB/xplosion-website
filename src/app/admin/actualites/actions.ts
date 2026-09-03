'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin, requireCoachOrAdmin } from '@/lib/authz'
import { slugify } from '@/lib/slugify'
import { saveUploadedImage, isRealFile } from '@/lib/uploadImage'

async function resolveCoverImage(formData: FormData): Promise<string | null> {
  const file = formData.get('coverImage')
  if (isRealFile(file)) return saveUploadedImage(file, 'actualites')
  return String(formData.get('coverImageCurrent') ?? '') || null
}

async function resolveGallery(formData: FormData): Promise<string[]> {
  const kept = formData.getAll('galleryKept').map(String).filter(Boolean)
  const newFiles = formData.getAll('gallery').filter(isRealFile)
  const uploaded = await Promise.all(newFiles.map((file) => saveUploadedImage(file, 'actualites')))
  return [...kept, ...uploaded]
}

// Le formulaire a 3 boutons ("Brouillon" / "Publier maintenant" /
// "Programmer"), chacun soumettant un `intent` différent — plus fiable
// qu'une case à cocher + une date à interpréter.
function resolvePublishState(
  formData: FormData,
  existingPublishedAt: Date | null = null
): { published: boolean; publishedAt: Date | null } {
  const intent = String(formData.get('intent') ?? 'draft')

  if (intent === 'draft') return { published: false, publishedAt: null }
  if (intent === 'now') return { published: true, publishedAt: existingPublishedAt ?? new Date() }

  // intent === 'scheduled'
  const raw = String(formData.get('publishedAt') ?? '')
  return { published: true, publishedAt: raw ? new Date(raw) : existingPublishedAt ?? new Date() }
}

export async function createNews(formData: FormData) {
  const session = await requireAdmin()

  const title = String(formData.get('title') ?? '').trim()
  const { published, publishedAt } = resolvePublishState(formData)
  const coverImage = await resolveCoverImage(formData)
  const gallery = await resolveGallery(formData)

  await prisma.news.create({
    data: {
      title,
      slug: slugify(title),
      excerpt: String(formData.get('excerpt') ?? '') || null,
      content: String(formData.get('content') ?? ''),
      coverImage,
      gallery,
      published,
      publishedAt,
      authorId: session.user.id,
    },
  })

  revalidatePath('/admin/actualites')
  revalidatePath('/actualites')
  redirect('/admin/actualites')
}

export async function updateNews(newsId: string, formData: FormData) {
  await requireAdmin()

  const existing = await prisma.news.findUnique({ where: { id: newsId }, select: { publishedAt: true } })
  const { published, publishedAt } = resolvePublishState(formData, existing?.publishedAt ?? null)
  const coverImage = await resolveCoverImage(formData)
  const gallery = await resolveGallery(formData)

  await prisma.news.update({
    where: { id: newsId },
    data: {
      title: String(formData.get('title') ?? ''),
      excerpt: String(formData.get('excerpt') ?? '') || null,
      content: String(formData.get('content') ?? ''),
      coverImage,
      gallery,
      published,
      publishedAt,
    },
  })

  revalidatePath('/admin/actualites')
  revalidatePath('/actualites')
  redirect('/admin/actualites')
}

export async function deleteNews(newsId: string) {
  await requireAdmin()
  await prisma.news.delete({ where: { id: newsId } })
  revalidatePath('/admin/actualites')
  revalidatePath('/actualites')
}

// Un coach peut aussi publier une actualité (demande explicite) — même
// logique, mais accessible sans être admin.
export async function createNewsAsCoach(formData: FormData) {
  const session = await requireCoachOrAdmin()

  const title = String(formData.get('title') ?? '').trim()
  const { published, publishedAt } = resolvePublishState(formData)
  const coverImage = await resolveCoverImage(formData)
  const gallery = await resolveGallery(formData)

  await prisma.news.create({
    data: {
      title,
      slug: slugify(title),
      excerpt: String(formData.get('excerpt') ?? '') || null,
      content: String(formData.get('content') ?? ''),
      coverImage,
      gallery,
      published,
      publishedAt,
      authorId: session.user.id,
    },
  })

  revalidatePath('/coach/actualites')
  revalidatePath('/actualites')
  redirect('/coach/actualites')
}
