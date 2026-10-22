'use client'

import { useState } from 'react'
import { ArrowUpRight, BookOpen, Check, ChevronRight, CircleHelp, FileText, MessageCircle, Plus, Radio, Search, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react'

const sources = [
  { name: 'Preguntas frecuentes', type: 'Documento', updated: 'Hoy', chunks: 18, tone: 'violet' },
  { name: 'Catálogo de servicios 2026', type: 'PDF', updated: 'Ayer', chunks: 32, tone: 'amber' },
  { name: 'Políticas de atención', type: 'Documento', updated: '12 oct', chunks: 9, tone: 'blue' },
]

export default function Page() {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'whatsapp'>('knowledge')
  const [query, setQuery] = useState('')
  const [ingestText, setIngestText] = useState('')
  const [notice, setNotice] = useState('')

  const addKnowledge = () => {
    if (!ingestText.trim()) return
    setNotice('Contenido recibido. Se indexará en el RAG al guardar.')
    setIngestText('')
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Sparkles size={16} /></span><span>nexo<span className="brand-muted">.ai</span></span></div>
        <div className="workspace"><div className="workspace-avatar">AC</div><div><strong>Acme Consultores</strong><span>Espacio de trabajo</span></div><ChevronRight size={15} /></div>
        <nav className="nav"><p className="nav-label">GESTIÓN</p><button className="nav-item active"><BookOpen size={17} /> Base de conocimiento</button><button className="nav-item"><MessageCircle size={17} /> Conversaciones <span className="nav-count">12</span></button><button className="nav-item"><Radio size={17} /> Canales</button><p className="nav-label">CONFIGURACIÓN</p><button className="nav-item"><ShieldCheck size={17} /> Seguridad</button><button className="nav-item"><CircleHelp size={17} /> Ayuda</button></nav>
        <div className="sidebar-footer"><div className="online-dot" /> <span>Todos los sistemas operativos</span></div>
      </aside>

      <section className="content">
        <header className="topbar"><div><p className="eyebrow">CENTRO DE CONTROL</p><h1>Tu asistente empresarial</h1></div><div className="top-actions"><div className="status-pill"><span className="status-dot" /> IA Gateway activo</div><div className="avatar">MC</div></div></header>
        <div className="tabs"><button className={activeTab === 'knowledge' ? 'tab active' : 'tab'} onClick={() => setActiveTab('knowledge')}>Base de conocimiento</button><button className={activeTab === 'whatsapp' ? 'tab active' : 'tab'} onClick={() => setActiveTab('whatsapp')}>WhatsApp</button></div>

        {activeTab === 'knowledge' ? <>
          <section className="hero-card"><div className="hero-copy"><span className="icon-box purple"><Sparkles size={20} /></span><div><h2>Entrena a tu agente</h2><p>Agrega la información de tu empresa. Nexo la convierte en conocimiento consultable para responder con precisión.</p></div></div><div className="hero-metric"><span>COBERTURA DEL RAG</span><strong>87%</strong><div className="progress"><i /></div><small>59 fragmentos indexados</small></div></section>
          <div className="section-heading"><div><h2>Fuentes de conocimiento</h2><p>El agente consulta estas fuentes antes de responder.</p></div><button className="button secondary"><UploadCloud size={16} /> Subir archivo</button></div>
          <div className="source-grid">{sources.map((source) => <article className="source-card" key={source.name}><div className="source-top"><span className={`file-icon ${source.tone}`}><FileText size={18} /></span><button className="more">•••</button></div><h3>{source.name}</h3><div className="source-meta"><span>{source.type}</span><span>•</span><span>{source.updated}</span></div><div className="source-bottom"><span>{source.chunks} fragmentos</span><span className="indexed"><Check size={13} /> Indexado</span></div></article>)}</div>
          <section className="ingest-card"><div className="ingest-title"><span className="icon-box mint"><Plus size={19} /></span><div><h2>Agregar conocimiento</h2><p>Escribe una respuesta, política o dato que tus clientes deban conocer.</p></div></div><textarea value={ingestText} onChange={(event) => setIngestText(event.target.value)} placeholder="Ej. Nuestro horario de atención es de lunes a viernes, de 9:00 a 18:00..." /><div className="ingest-footer"><span className="hint">El texto se dividirá en fragmentos y se guardará en Neon.</span><button className="button primary" onClick={addKnowledge}>Guardar e indexar <ArrowUpRight size={16} /></button></div>{notice && <div className="notice"><Check size={15} /> {notice}</div>}</section>
          <section className="test-card"><div><span className="icon-box blue"><Search size={18} /></span><div><h2>Prueba tu agente</h2><p>Comprueba cómo responderá usando el conocimiento indexado.</p></div></div><div className="test-row"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="¿Qué quieres preguntarle?" /><button className="button dark">Preguntar <ArrowUpRight size={16} /></button></div></section>
        </> : <WhatsAppPanel />}
      </section>
    </main>
  )
}

function WhatsAppPanel() {
  return <div className="whatsapp-layout"><section className="connection-card"><div className="wa-badge"><MessageCircle size={23} /></div><div className="connection-copy"><span className="connection-status"><span className="warning-dot" /> Conectado vía 2Chat</span><h2>WhatsApp de tu empresa</h2><p>El conector está vinculado a tu proyecto. Puede enviar respuestas usando el RAG, pero este conector no admite triggers entrantes automáticos.</p><div className="connection-actions"><button className="button primary">Probar conexión <ArrowUpRight size={16} /></button><button className="button secondary">Ver documentación</button></div></div></section><section className="alternative-card"><div className="alternative-heading"><span className="icon-box amber"><Radio size={18} /></span><div><h2>Alternativas para recibir mensajes</h2><p>Elige el canal de entrada que mejor encaje con tu operación.</p></div></div><div className="alternative-list"><div className="alternative-item"><div className="option-number">01</div><div><strong>WhatsApp Cloud API de Meta</strong><p>Webhook oficial para recibir mensajes directamente en <code>/eve/v1/whatsapp</code>.</p></div><span className="recommended">Recomendado</span><ArrowUpRight size={16} /></div><div className="alternative-item"><div className="option-number">02</div><div><strong>2Chat con bandeja intermedia</strong><p>Conserva el conector actual y usa su bandeja para reenviar consultas al agente.</p></div><span className="planned">Disponible</span><ArrowUpRight size={16} /></div><div className="alternative-item"><div className="option-number">03</div><div><strong>Chat web + enlace en WhatsApp</strong><p>Publica el chat del agente como alternativa inmediata para tus clientes.</p></div><span className="planned">Disponible</span><ArrowUpRight size={16} /></div></div></section></div>
}
