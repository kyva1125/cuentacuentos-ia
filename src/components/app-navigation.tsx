import { House, Library, Shield } from 'lucide-react'

export type AppTab = 'home' | 'library' | 'saved' | 'profile' | 'account'

type AppNavigationProps = {
  activeTab: AppTab
  isAuthenticated: boolean
  onChange: (tab: AppTab) => void
}

const tabs = [
  { id: 'home' as const, label: 'Inicio', icon: House },
  { id: 'library' as const, label: 'Biblioteca', icon: Library },
  { id: 'profile' as const, label: 'Mi perfil', icon: Shield },
]

export function AppNavigation({ activeTab, isAuthenticated, onChange }: AppNavigationProps) {
  return <nav className="app-navigation" aria-label="Navegación principal">{tabs.filter(({ id }) => id !== 'profile' || isAuthenticated).map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => onChange(id)} aria-current={activeTab === id ? 'page' : undefined} className={activeTab === id ? 'active' : ''}><Icon size={18} aria-hidden="true" />{label}</button>)}</nav>
}
