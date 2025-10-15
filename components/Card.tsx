import React from 'react'

export function CardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      margin: '32px 0'
    }}>
      {children}
    </div>
  )
}

export function Card({ link, children, ...props }: { link: string; children: React.ReactNode; [key: string]: any }) {
  // Filter out non-standard HTML attributes like hideExternalIcon
  const { hideExternalIcon, ...validProps } = props

  return (
    <a href={link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} {...validProps}>
      <div
        className="card-hover"
        style={{
          border: '1px solid var(--vocs-color_border)',
          borderRadius: '8px',
          padding: '24px',
          height: '100%',
          transition: 'border-color 0.2s'
        }}
      >
        {children}
      </div>
    </a>
  )
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: '12px', fontWeight: 600 }}>{children}</div>
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div style={{ color: 'var(--vocs-color_text2)', fontSize: '14px' }}>{children}</div>
}
