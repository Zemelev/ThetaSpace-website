import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Theta Space</h3>
            <p>
              Клуб живого спілкування. Простір присутності, усвідомленості та
              реального діалогу в історичному центрі Києва.
            </p>
          </div>
          <div className="footer-col">
            <h4>Розділи</h4>
            <ul>
              <li><Link href="/club">Клуб</Link></li>
              <li><Link href="/lectures">Лекції</Link></li>
              <li><Link href="/courses">Курси</Link></li>
              <li><Link href="/mentors">Ментори</Link></li>
              <li><Link href="/about">Про нас</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Контакт</h4>
            <ul>
              <li>Київ, вул. Гончара 15/3</li>
              <li>
                <a href="https://www.instagram.com/theta_space_club" target="_blank" rel="noopener">
                  Instagram ↗
                </a>
              </li>
              <li>
                <button type="button" data-modal-open="signupModal">
                  Записатись
                </button>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Засновники</h4>
            <ul>
              <li>Роман Кхан</li>
              <li>Лада Чудненко</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Theta Space. Спільнота здібних людей.</span>
          <a href="https://www.instagram.com/theta_space_club" target="_blank" rel="noopener">
            @theta_space_club
          </a>
        </div>
      </div>
    </footer>
  );
}
