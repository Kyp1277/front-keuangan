// ============================================
// sidebar.js — Sidebar HTML yang dipakai semua halaman
// Panggil: renderSidebar('dashboard') di setiap halaman
// ============================================

function renderSidebar(activePage) {
  const user = getCurrentUser();
  const initial = (user.nama_lengkap || "U").charAt(0).toUpperCase();

  const navItems = [
    { id: "dashboard",  icon: "📊", label: "Dashboard",  href: "dashboard.html"  },
    { id: "transaksi",  icon: "💳", label: "Transaksi",  href: "transaksi.html"  },
    { id: "kategori",   icon: "🏷️",  label: "Kategori",   href: "kategori.html"   },
    { id: "laporan",    icon: "📈", label: "Laporan",    href: "laporan.html"    },
  ];

  const navHTML = navItems.map(item => `
    <a href="${item.href}" class="nav-item ${activePage === item.id ? 'active' : ''}">
      <span class="nav-icon">${item.icon}</span>
      ${item.label}
    </a>
  `).join('');

  document.getElementById("sidebar-placeholder").innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-logo">💰</div>
        <div class="brand-title">KeuanganKu</div>
        <div class="brand-sub">Sistem UMKM</div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section-title">Menu Utama</div>
        ${navHTML}
      </nav>

      <div class="sidebar-footer">
        <div class="user-card">
          <div class="user-avatar">${initial}</div>
          <div>
            <div class="user-name">${user.nama_lengkap || 'Pengguna'}</div>
            <div class="user-role">Admin UMKM</div>
          </div>
        </div>
        <a href="#" class="btn-logout" id="btnLogout">
          🚪 Keluar
        </a>
      </div>
    </aside>
  `;

  document.getElementById("btnLogout").addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Yakin ingin keluar?")) {
      localStorage.clear();
      window.location.href = "index.html";
    }
  });
}
