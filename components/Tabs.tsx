import React, { useState } from 'react'

export function Tabs({ children, defaultValue }: { children: React.ReactNode; defaultValue?: string }) {
  const tabs = React.Children.toArray(children) as React.ReactElement[]
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.props.value)

  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--vocs-color_border)',
        gap: '8px',
        marginBottom: '20px'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.props.value}
            onClick={() => setActiveTab(tab.props.value)}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === tab.props.value ? '2px solid var(--vocs-color_text)' : '2px solid transparent',
              color: activeTab === tab.props.value ? 'var(--vocs-color_text)' : 'var(--vocs-color_text2)',
              fontWeight: activeTab === tab.props.value ? 600 : 400,
              transition: 'all 0.2s'
            }}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.find(tab => tab.props.value === activeTab)}
      </div>
    </div>
  )
}

export function TabItem({ children, value, label }: { children: React.ReactNode; value: string; label: string }) {
  return <div>{children}</div>
}
