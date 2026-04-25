// ============================================
// api.js — Konfigurasi & Helper API
// Ganti BASE_URL dengan URL Railway kamu setelah deploy
// ============================================

const BASE_URL = "https://backkeuangan.page.gd";
 // ← Ganti saat deploy ke Railway

// Helper utama: kirim request ke backend
async function apiFetch(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const json = await res.json();

  // Jika token expired / tidak valid → paksa logout
  if (res.status === 401) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  return json;
}

// Cek apakah user sudah login, jika belum → redirect ke login
function requireAuth() {
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
}

// Redirect ke dashboard jika sudah login (untuk halaman login/register)
function redirectIfLoggedIn() {
  if (localStorage.getItem("token")) {
    window.location.href = "dashboard.html";
  }
}

// Format angka ke Rupiah: 1500000 → "Rp 1.500.000"
function formatRupiah(angka) {
  return "Rp " + Number(angka).toLocaleString("id-ID");
}

// Format tanggal: "2026-04-25" → "25 Apr 2026"
function formatTanggal(dateStr) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Ambil data user dari localStorage
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
}
