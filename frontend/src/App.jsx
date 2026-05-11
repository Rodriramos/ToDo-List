import { useState, useEffect } from "react";

const API_BASE = "http://localhost:8080";

const COLORS = [
  { bg: "#FF6B6B", light: "#FFE8E8", text: "#C0392B" },
  { bg: "#4ECDC4", light: "#E8FAFA", text: "#0D7A73" },
  { bg: "#45B7D1", light: "#E8F7FC", text: "#0E6B8A" },
  { bg: "#96CEB4", light: "#EAF5EE", text: "#2D7A52" },
  { bg: "#FFEAA7", light: "#FFFBE8", text: "#8A6D00" },
  { bg: "#DDA0DD", light: "#F7EEF7", text: "#6B2F6B" },
  { bg: "#F0A500", light: "#FEF3D7", text: "#7A5200" },
  { bg: "#74B9FF", light: "#E8F3FF", text: "#1A5EA8" },
];

const STATUS_COLORS = {
  pending: { bg: "#FFF3CD", text: "#856404", border: "#FFE69C" },
  "in-progress": { bg: "#CCE5FF", text: "#004085", border: "#B8DAFF" },
  completed: { bg: "#D4EDDA", text: "#155724", border: "#C3E6CB" },
};

function getCardColor(index) {
  return COLORS[index % COLORS.length];
}

function TaskCard({ task, index, onEdit, onDelete, onStatusChange }) {
  const color = getCardColor(index);
  const statusStyle = STATUS_COLORS[task.status] || STATUS_COLORS["pending"];

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      border: `1px solid #f0f0f0`,
      padding: "1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      transition: "transform 0.15s, box-shadow 0.15s",
      position: "relative",
      overflow: "hidden",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: color.bg, borderRadius: "16px 16px 0 0"
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 4 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#1a1a2e", flex: 1, lineHeight: 1.3 }}>
          {task.name}
        </h3>
        <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
          <button onClick={() => onEdit(task)} style={{
            background: "none", border: "none", cursor: "pointer", padding: "4px 6px",
            borderRadius: 8, color: "#888", fontSize: 16,
            transition: "background 0.15s, color 0.15s"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f0f4ff"; e.currentTarget.style.color = "#4361ee"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#888"; }}
          >✏️</button>
          <button onClick={() => onDelete(task.id)} style={{
            background: "none", border: "none", cursor: "pointer", padding: "4px 6px",
            borderRadius: 8, color: "#888", fontSize: 16,
            transition: "background 0.15s, color 0.15s"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fff0f0"; e.currentTarget.style.color = "#e63946"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#888"; }}
          >🗑️</button>
        </div>
      </div>

      {task.description && (
        <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 }}>{task.description}</p>
      )}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {task.startDate && (
          <span style={{ fontSize: 12, color: "#888", display: "flex", alignItems: "center", gap: 4 }}>
            📅 {task.startDate}
          </span>
        )}
        {task.endDate && (
          <span style={{ fontSize: 12, color: "#888", display: "flex", alignItems: "center", gap: 4 }}>
            🏁 {task.endDate}
          </span>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <select
          value={task.status || "pending"}
          onChange={e => onStatusChange(task.id, e.target.value)}
          style={{
            fontSize: 12, fontWeight: 600, padding: "4px 10px",
            borderRadius: 20, border: `1px solid ${statusStyle.border}`,
            background: statusStyle.bg, color: statusStyle.text,
            cursor: "pointer", outline: "none"
          }}
        >
          <option value="pending">⏳ Pending</option>
          <option value="in-progress">🔄 In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>

        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: color.light, border: `2px solid ${color.bg}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, color: color.text, fontWeight: 700
        }}>
          {index + 1}
        </div>
      </div>
    </div>
  );
}

function TaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState(task || { name: "", description: "", startDate: "", endDate: "", status: "pending" });

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
      backdropFilter: "blur(4px)"
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "2rem",
        width: "100%", maxWidth: 480, margin: "1rem",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1a1a2e" }}>
            {task?.id ? "✏️ Edit Task" : "✨ New Task"}
          </h2>
          <button onClick={onClose} style={{
            background: "#f5f5f5", border: "none", borderRadius: 10,
            width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#666"
          }}>×</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 }}>
              Task name *
            </label>
            <input
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="What needs to be done?"
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 15,
                border: "1.5px solid #e0e0e0", outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s"
              }}
              onFocus={e => e.target.style.borderColor = "#4361ee"}
              onBlur={e => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 }}>
              Description
            </label>
            <textarea
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Add some details..."
              rows={3}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 14,
                border: "1.5px solid #e0e0e0", outline: "none", resize: "vertical",
                boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s"
              }}
              onFocus={e => e.target.style.borderColor = "#4361ee"}
              onBlur={e => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 }}>
                Start date
              </label>
              <input type="date" value={form.startDate || ""}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 14,
                  border: "1.5px solid #e0e0e0", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 }}>
                End date
              </label>
              <input type="date" value={form.endDate || ""}
                onChange={e => setForm({ ...form, endDate: e.target.value })}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 14,
                  border: "1.5px solid #e0e0e0", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 }}>
              Status
            </label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 14,
                border: "1.5px solid #e0e0e0", outline: "none", background: "#fff"
              }}
            >
              <option value="pending">⏳ Pending</option>
              <option value="in-progress">🔄 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button onClick={onClose} style={{
              flex: 1, padding: "12px", borderRadius: 10, border: "1.5px solid #e0e0e0",
              background: "#fff", fontSize: 14, fontWeight: 600, color: "#666", cursor: "pointer"
            }}>Cancel</button>
            <button onClick={() => form.name.trim() && onSave(form)} style={{
              flex: 2, padding: "12px", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg, #4361ee, #7b2ff7)",
              fontSize: 14, fontWeight: 600, color: "#fff", cursor: "pointer",
              opacity: form.name.trim() ? 1 : 0.5
            }}>
              {task?.id ? "Save changes" : "Create task"} ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ identifier: "", email: "", username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, "", window.location.pathname);
      onLogin(token);
    }
    const err = params.get("error");
    if (err) setError("OAuth login failed. Please try again.");
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch(`http://localhost:8080/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: form.identifier, password: form.password }),
        
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, email: form.email, password: form.password, confirmPassword: form.confirmPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      localStorage.setItem("token", data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f64f59 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "1rem"
    }}>
      <div style={{
        background: "#fff", borderRadius: 24, padding: "2.5rem",
        width: "100%", maxWidth: 420,
        boxShadow: "0 30px 80px rgba(0,0,0,0.3)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20, margin: "0 auto 1rem",
            background: "linear-gradient(135deg, #4361ee, #7b2ff7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, boxShadow: "0 8px 24px rgba(67,97,238,0.4)"
          }}>✅</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#1a1a2e" }}>TaskFlow</h1>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "#888" }}>Manage your tasks beautifully</p>
        </div>

        <div style={{ display: "flex", background: "#f5f5f5", borderRadius: 12, padding: 4, marginBottom: "1.5rem" }}>
          {["login", "register"].map(t => (
            <button key={t} onClick={() => { setTab(t); setError(""); }} style={{
              flex: 1, padding: "8px", borderRadius: 10, border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 600,
              background: tab === t ? "#fff" : "transparent",
              color: tab === t ? "#4361ee" : "#888",
              boxShadow: tab === t ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s"
            }}>
              {t === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {error && (
          <div style={{
            background: "#fff0f0", border: "1px solid #ffc0c0", borderRadius: 10,
            padding: "10px 14px", marginBottom: "1rem", fontSize: 13, color: "#c0392b"
          }}>⚠️ {error}</div>
        )}

        <form onSubmit={tab === "login" ? handleLogin : handleRegister} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {tab === "register" && (
            <>
              <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
                placeholder="Username" required
                style={{ padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e0e0e0", fontSize: 15, outline: "none" }}
                onFocus={e => e.target.style.borderColor = "#4361ee"}
                onBlur={e => e.target.style.borderColor = "#e0e0e0"}
              />
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="Email" type="email" required
                style={{ padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e0e0e0", fontSize: 15, outline: "none" }}
                onFocus={e => e.target.style.borderColor = "#4361ee"}
                onBlur={e => e.target.style.borderColor = "#e0e0e0"}
              />
            </>
          )}

          {tab === "login" && (
            <input value={form.identifier} onChange={e => setForm({ ...form, identifier: e.target.value })}
              placeholder="Username or Email" required
              style={{ padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e0e0e0", fontSize: 15, outline: "none" }}
              onFocus={e => e.target.style.borderColor = "#4361ee"}
              onBlur={e => e.target.style.borderColor = "#e0e0e0"}
            />
          )}

          <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Password" type="password" required
            style={{ padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e0e0e0", fontSize: 15, outline: "none" }}
            onFocus={e => e.target.style.borderColor = "#4361ee"}
            onBlur={e => e.target.style.borderColor = "#e0e0e0"}
          />

          {tab === "register" && (
            <input value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Confirm Password" type="password" required
              style={{ padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e0e0e0", fontSize: 15, outline: "none" }}
              onFocus={e => e.target.style.borderColor = "#4361ee"}
              onBlur={e => e.target.style.borderColor = "#e0e0e0"}
            />
          )}

          <button type="submit" disabled={loading} style={{
            padding: "13px", borderRadius: 10, border: "none",
            background: "linear-gradient(135deg, #4361ee, #7b2ff7)",
            color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
            opacity: loading ? 0.7 : 1, transition: "opacity 0.2s"
          }}>
            {loading ? "..." : tab === "login" ? "Sign In →" : "Create Account →"}
          </button>
        </form>

        <div style={{ margin: "1.5rem 0", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "#e0e0e0" }} />
          <span style={{ fontSize: 13, color: "#aaa" }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: "#e0e0e0" }} />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <a href={`${API_BASE}/oauth2/authorization/google`} style={{
            flex: 1, padding: "11px", borderRadius: 10, border: "1.5px solid #e0e0e0",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            textDecoration: "none", color: "#333", fontSize: 14, fontWeight: 600,
            transition: "border-color 0.2s, background 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#4361ee"; e.currentTarget.style.background = "#f0f4ff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.background = ""; }}
          >
            <span style={{ fontSize: 18 }}>🔵</span> Google
          </a>
          <a href={`${API_BASE}/oauth2/authorization/github`} style={{
            flex: 1, padding: "11px", borderRadius: 10, border: "1.5px solid #e0e0e0",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            textDecoration: "none", color: "#333", fontSize: 14, fontWeight: 600,
            transition: "border-color 0.2s, background 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.background = "#f5f5f5"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.background = ""; }}
          >
            <span style={{ fontSize: 18 }}>⚫</span> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

function TasksPage({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  async function fetchTasks() {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/all`, { headers });
      if (res.status === 401) { onLogout(); return; }
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch { setError("Failed to load tasks"); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchTasks(); }, []);

  async function handleSave(form) {
    try {
      const url = form.id ? `${API_BASE}/api/tasks/update/${form.id}` : `${API_BASE}/api/tasks/create`;
      const method = form.id ? "PUT" : "POST";
      const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Failed to save task");
      setModal(null);
      fetchTasks();
    } catch { setError("Failed to save task"); }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this task?")) return;
    try {
      await fetch(`${API_BASE}/api/tasks/delete/${id}`, { method: "DELETE", headers });
      fetchTasks();
    } catch { setError("Failed to delete task"); }
  }

  async function handleStatusChange(id, status) {
    try {
      await fetch(`${API_BASE}/api/tasks/update-status/${id}?status=${status}`, { method: "PATCH", headers });
      fetchTasks();
    } catch { setError("Failed to update status"); }
  }

  const filtered = tasks.filter(t => filter === "all" || t.status === filter);
  const counts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === "pending").length,
    "in-progress": tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fe", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{
        background: "linear-gradient(135deg, #4361ee 0%, #7b2ff7 100%)",
        padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(67,97,238,0.3)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
          }}>✅</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#fff" }}>TaskFlow</h1>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{tasks.length} tasks total</p>
          </div>
        </div>
        <button onClick={onLogout} style={{
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 10, padding: "8px 16px", color: "#fff", fontSize: 13,
          fontWeight: 600, cursor: "pointer", transition: "background 0.2s"
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >Sign out</button>
      </div>

      <div style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: "2rem" }}>
          {[
            { key: "all", label: "All Tasks", emoji: "📋", color: "#4361ee" },
            { key: "pending", label: "Pending", emoji: "⏳", color: "#f0a500" },
            { key: "in-progress", label: "In Progress", emoji: "🔄", color: "#45b7d1" },
            { key: "completed", label: "Completed", emoji: "✅", color: "#96ceb4" },
          ].map(({ key, label, emoji, color }) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              padding: "1rem", borderRadius: 14, border: `2px solid ${filter === key ? color : "transparent"}`,
              background: filter === key ? `${color}15` : "#fff",
              cursor: "pointer", textAlign: "left", transition: "all 0.2s",
              boxShadow: filter === key ? `0 4px 16px ${color}30` : "0 2px 8px rgba(0,0,0,0.05)"
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: filter === key ? color : "#1a1a2e" }}>{counts[key]}</div>
              <div style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>{label}</div>
            </button>
          ))}
        </div>

        {error && (
          <div style={{
            background: "#fff0f0", border: "1px solid #ffc0c0", borderRadius: 12,
            padding: "12px 16px", marginBottom: "1rem", color: "#c0392b", fontSize: 14
          }}>⚠️ {error}</div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>
            {filter === "all" ? "All Tasks" : filter === "in-progress" ? "In Progress" : filter.charAt(0).toUpperCase() + filter.slice(1)}
            <span style={{ marginLeft: 8, fontSize: 14, color: "#888", fontWeight: 400 }}>
              ({filtered.length})
            </span>
          </h2>
          <button onClick={() => setModal({})} style={{
            background: "linear-gradient(135deg, #4361ee, #7b2ff7)",
            border: "none", borderRadius: 12, padding: "10px 20px",
            color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(67,97,238,0.4)", display: "flex", alignItems: "center", gap: 6
          }}>
            + New Task
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#888" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
            <p>Loading tasks...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "4rem", background: "#fff",
            borderRadius: 20, border: "2px dashed #e0e0e0"
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
            <h3 style={{ margin: "0 0 8px", color: "#1a1a2e" }}>No tasks yet</h3>
            <p style={{ margin: "0 0 20px", color: "#888" }}>Create your first task to get started!</p>
            <button onClick={() => setModal({})} style={{
              background: "linear-gradient(135deg, #4361ee, #7b2ff7)",
              border: "none", borderRadius: 10, padding: "10px 24px",
              color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}>+ Create Task</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {filtered.map((task, i) => (
              <TaskCard key={task.id} task={task} index={i}
                onEdit={t => setModal(t)}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      {modal !== null && (
        <TaskModal task={modal.id ? modal : null} onSave={handleSave} onClose={() => setModal(null)} />
      )}
    </div>
  );
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLogin(t) { setToken(t); }
  function handleLogout() { localStorage.removeItem("token"); setToken(null); }

  if (!token) return <LoginPage onLogin={handleLogin} />;
  return <TasksPage onLogout={handleLogout} />;
}