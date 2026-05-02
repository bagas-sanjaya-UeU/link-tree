import { useEffect, useState } from 'react';
import { icons } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { DbLinkCard, LinkCard } from '../types';

/* ═══════════════════════════════════════════════════
   Custom SVG brand icons (not in lucide-react)
   ═══════════════════════════════════════════════════ */
const BrandSvg = ({ children, size }: { children: React.ReactNode; size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const brandIcons: Record<string, (size: number) => React.ReactNode> = {
  Instagram: (size) => (
    <BrandSvg size={size}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </BrandSvg>
  ),
  Facebook: (size) => (
    <BrandSvg size={size}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </BrandSvg>
  ),
  Twitter: (size) => (
    <BrandSvg size={size}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </BrandSvg>
  ),
  Youtube: (size) => (
    <BrandSvg size={size}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </BrandSvg>
  ),
  Linkedin: (size) => (
    <BrandSvg size={size}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </BrandSvg>
  ),
  Github: (size) => (
    <BrandSvg size={size}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </BrandSvg>
  ),
  Twitch: (size) => (
    <BrandSvg size={size}>
      <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
    </BrandSvg>
  ),
};

const normalizeLink = (row: DbLinkCard): LinkCard => ({
  id: row.id,
  name: row.name,
  url: row.url,
  iconName: row.icon_name ?? 'Globe',
  categoryId: row.category_id,
});

const renderIcon = (iconName: string) => {
  // Check brand icons first
  if (iconName in brandIcons) {
    return brandIcons[iconName](24);
  }
  // Fall back to lucide-react icons
  const key = iconName as keyof typeof icons;
  const Icon = key in icons ? icons[key] : icons.Globe;
  return <Icon size={24} />;
};

export default function Home() {
  const [cards, setCards] = useState<LinkCard[]>([]);

  useEffect(() => {
    const loadLinks = async () => {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('name');

      if (!error) {
        setCards((data ?? []).map(normalizeLink));
      }
    };

    loadLinks();
  }, []);

  return (
    <div className="page-shell">
      <div className="glass-card">
        <header className="profile-head">
          <div className="avatar-ring">
            <img
              src="https://ui-avatars.com/api/?name=My+Links&background=random"
              alt="Profile"
              className="avatar"
            />
          </div>
          <p className="profile-tag">Creator Space</p>
          <h2 className="profile-title">My Links</h2>
          <p className="profile-subtitle">Welcome to my profile!</p>
        </header>

        <div className="links-list">
          {cards.map((card) => (
            <a
              key={card.id}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <span className="link-icon">{renderIcon(card.iconName)}</span>
              <span className="link-text">{card.name}</span>
              <span className="link-arrow">→</span>
            </a>
          ))}
          {cards.length === 0 && (
            <div className="empty-state">
              <p>Belum ada link yang ditambahkan.</p>
              <span>Tambahkan link pertama kamu di halaman admin.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}