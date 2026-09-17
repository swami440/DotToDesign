import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  const links = ['Work', 'Services', 'About', 'Contact']

  return <header className="site-header"><a className="logo" href="#top" aria-label="DotToDesign home"><span className="logo-dot" />DOT<span>TO</span>DESIGN</a><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open}><span>{open ? 'Close' : 'Menu'}</span><i /><i /></button><nav className={open ? 'nav nav-open' : 'nav'}>{links.map((link, index) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}><sup>0{index + 1}</sup>{link}</a>)}</nav></header>
}
