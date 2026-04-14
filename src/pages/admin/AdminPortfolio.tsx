"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Edit2, Trash2, X, ExternalLink, Image as ImageIcon } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  metric: string;
  features: string[];
  year: string;
  liveUrl?: string;
}

const CATEGORIES = ["Web", "E-Commerce", "Mobile", "AI", "SEO", "Design", "Other"];

const empty = (): Partial<PortfolioItem> => ({
  category: "Web", title: "", tagline: "", description: "",
  image: "", tags: [], metric: "", features: [], year: String(new Date().getFullYear()), liveUrl: "",
});

function Modal({ item, onClose, onSave, isSaving }: {
  item: Partial<PortfolioItem>;
  onClose: () => void;
  onSave: (data: Partial<PortfolioItem>) => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState({ ...item, tags: (item.tags ?? []).join(", "), features: (item.features ?? []).join("\n") });
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0f0f14] border border-white/10 rounded-2xl w-full max-w-2xl my-4 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="font-semibold text-white">{item.id ? "Edit Project" : "Add New Project"}</h2>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Title *</label>
              <input value={form.title ?? ""} onChange={(e) => setForm({...form, title: e.target.value})} className="input-admin w-full" placeholder="BazaarBD — E-Commerce Platform" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Category *</label>
              <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="input-admin w-full">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Tagline *</label>
            <input value={form.tagline ?? ""} onChange={(e) => setForm({...form, tagline: e.target.value})} className="input-admin w-full" placeholder="Short compelling description" required />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Full Description *</label>
            <textarea rows={3} value={form.description ?? ""} onChange={(e) => setForm({...form, description: e.target.value})} className="input-admin w-full resize-none" placeholder="Detailed project description..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Image URL *</label>
              <input value={form.image ?? ""} onChange={(e) => setForm({...form, image: e.target.value})} className="input-admin w-full" placeholder="https://images.unsplash.com/..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Live URL (optional)</label>
              <input value={form.liveUrl ?? ""} onChange={(e) => setForm({...form, liveUrl: e.target.value})} className="input-admin w-full" placeholder="https://yourproject.com" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Key Metric *</label>
              <input value={form.metric ?? ""} onChange={(e) => setForm({...form, metric: e.target.value})} className="input-admin w-full" placeholder="+40% sales in 30 days" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Year *</label>
              <input value={form.year ?? ""} onChange={(e) => setForm({...form, year: e.target.value})} className="input-admin w-full" placeholder="2024" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Tech Tags (comma separated) *</label>
            <input value={form.tags ?? ""} onChange={(e) => setForm({...form, tags: e.target.value})} className="input-admin w-full" placeholder="React, Node.js, MySQL, Stripe" />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Key Features (one per line) *</label>
            <textarea rows={4} value={form.features ?? ""} onChange={(e) => setForm({...form, features: e.target.value})} className="input-admin w-full resize-none" placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
          </div>

          {form.image && (
            <div className="rounded-xl overflow-hidden border border-white/10 h-36 relative">
              <img src={form.image as string} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <span className="text-xs text-white/70 flex items-center gap-1"><ImageIcon size={11} /> Image Preview</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onSave({
                ...form,
                tags: typeof form.tags === "string" ? (form.tags as string).split(",").map(t => t.trim()).filter(Boolean) : form.tags,
                features: typeof form.features === "string" ? (form.features as string).split("\n").map(f => f.trim()).filter(Boolean) : form.features,
              })}
              disabled={isSaving}
              className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : item.id ? "Save Changes" : "Add Project"}
            </button>
            <button onClick={onClose} className="px-5 py-2.5 border border-white/10 text-white/50 text-sm rounded-xl hover:border-white/20 hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const AdminPortfolio = () => {
  const qc = useQueryClient();
  const [modal, setModal] = useState<{ open: boolean; item: Partial<PortfolioItem> }>({ open: false, item: empty() });

  const { data: items = [], isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/admin/portfolio"],
    queryFn: async () => {
      const r = await apiFetch("/api/admin/portfolio");
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
  });

  const upsert = useMutation({
    mutationFn: async (data: Partial<PortfolioItem>) => {
      const r = data.id
        ? await apiFetch(`/api/admin/portfolio/${data.id}`, { method: "PUT", body: JSON.stringify(data) })
        : await apiFetch("/api/admin/portfolio", { method: "POST", body: JSON.stringify(data) });
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      setModal({ open: false, item: empty() });
      toast.success("Project saved!");
    },
    onError: () => toast.error("Failed to save project"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const r = await apiFetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error("Failed");
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/portfolio"] }); toast.success("Deleted"); },
    onError: () => toast.error("Delete failed"),
  });

  return (
    <AdminLayout
      title="Portfolio"
      subtitle={`${items.length} projects`}
      actions={
        <button
          onClick={() => setModal({ open: true, item: empty() })}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <Plus size={15} />
          Add Project
        </button>
      }
    >
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-colors">
              <div className="relative h-40">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-transparent to-transparent" />
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-black/60 text-white/80 backdrop-blur-sm border border-white/10">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={() => setModal({ open: true, item })}
                    className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => window.confirm(`Delete "${item.title}"?`) && remove.mutate(item.id)}
                    className="p-1.5 rounded-lg bg-red-500/20 backdrop-blur-sm text-red-400 hover:bg-red-500/40 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white text-sm leading-tight mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-white/40 mb-2 line-clamp-1">{item.tagline}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-red-400">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/30">{item.year}</span>
                    {item.liveUrl && (
                      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(item.tags ?? []).slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/40">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal.open && (
        <Modal
          item={modal.item}
          onClose={() => setModal({ open: false, item: empty() })}
          onSave={(data) => upsert.mutate(data)}
          isSaving={upsert.isPending}
        />
      )}
      <style jsx global>{`
        .input-admin {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 13px;
          color: #fff;
          transition: border-color 0.15s;
          outline: none;
        }
        .input-admin::placeholder { color: rgba(255,255,255,0.25); }
        .input-admin:focus { border-color: rgba(239,68,68,0.5); }
      `}</style>
    </AdminLayout>
  );
};

export default AdminPortfolio;
