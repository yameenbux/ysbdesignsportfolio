'use client'

import * as React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'

/**
 * NOT SUPPLIED IN THE SOURCE PROMPT. hero-10.tsx imports { Cta, CtaProps }
 * from this path, and the files given to copy in were hero-10.tsx, demo.tsx
 * and shadcn/button — so this one is reconstructed from how hero-10 and the
 * demo actually use it:
 *
 *   primaryCTA: { ctaEnabled, text, link, variant, size }
 *   <Cta cta={primaryCTA} />
 *   <Cta cta={{ ...secondaryCTA, variant: secondaryCTA.variant ?? 'outline' }} />
 *
 * `ctaEnabled` is tested by the caller, so this renders whenever it is
 * mounted. A non-empty `link` renders an anchor through Slot (asChild), which
 * is the shadcn idiom for a button that navigates; an empty one — as both
 * demo CTAs have — falls back to a plain <button>.
 */
export interface CtaProps {
  ctaEnabled?: boolean
  text: string
  link?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}

export function Cta({ cta }: Readonly<{ cta: CtaProps }>) {
  const { text, link, variant = 'default', size = 'default' } = cta

  if (link) {
    return (
      <Button asChild variant={variant} size={size}>
        <a href={link}>{text}</a>
      </Button>
    )
  }

  return (
    <Button variant={variant} size={size}>
      {text}
    </Button>
  )
}

export default Cta
