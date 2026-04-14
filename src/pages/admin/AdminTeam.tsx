"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Edit2, Trash2, X, Github, Linkedin, Twitter } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  avatarUrl?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

const empty = (): Partial<TeamMember> => ({
  name: "", role: "", avatarUrl: "", bio: "", github: "", linkedin: "", twitter: "",
});

function Modal({ member, onClose, onSave, isSaving }: {
  member: Partial<TeamMember>;
  onClose: () => void;
  onSave: (data: Partial<TeamMember>) => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState({ ...member });
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0f0f14] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="font-semibold text-white">{member.id ? "Edit Team Member" : "Add Team Member"}</h2>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {/* Avatar Preview */}
          {(form.avatarUrl || form.name) && (
            <div className="flex items-center gap-4">
              {form.avatarUrl ? (
                <img src={form.avatarUrl} alt={form.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/10" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
                  {form.name?.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-white">{form.name || "Name"}</p>
                <p className="text-xs text-white/40">{form.role || "Role"}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Full Name *</label>
              <input value={form.name ?? ""} onChange={(e) => setForm({...form, name: e.target.value})} className="input-admin w-full" placeholder="Rasel Ahmed" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Role *</label>
              <input value={form.role ?? ""} onChange={(e) => setForm({...form, role: e.target.value})} className="input-admin w-full" placeholder="Lead Developer" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Photo URL (optional)</label>
            <input value={form.avatarUrl ?? ""} onChange={(e) => setForm({...form, avatarUrl: e.target.value})} className="input-admin w-full" placeholder="https://..." />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Bio (optional)</label>
            <textarea rows={2} value={form.bio ?? ""} onChange={(e) => setForm({...form, bio: e.target.value})} className="input-admin w-full resize-none" placeholder="Short bio..." />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "github", icon: Github, placeholder: "github.com/..." },
              { key: "linkedin", icon: Linkedin, placeholder: "linkedin.com/in/..." },
              { key: "twitter", icon: Twitter, placeholder: "twitter.com/..." },
            ].map(({ key, icon: Icon, placeholder }) => (
              <div key={key}>
                <label className="flex items-center gap-1.5 text-xs font-medium text-white/60 mb-1.5 capitalize">
                  <Icon size={11} /> {key}
                </label>
                <input
                  value={(form as Record<string, string | undefined>)[key] ?? ""}
                  onChange={(e) => setForm({...form, [key]: e.target.value})}
                  className="input-admin w-full"
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onSave(form)}
              disabled={isSaving || !form.name || !form.role}
              className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : member.id ? "Save Changes" : "Add Member"}
            </button>
            <button onClick={onClose} className="px-5 py-2.5 border border-white/10 text-white/50 text-sm rounded-xl hover:border-white/20 hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .input-admin { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px; font-size: 13px; color: #fff; transition: border-color 0.15s; outline: none; }
        .input-admin::placeholder { color: rgba(255,255,255,0.25); }
        .input-admin:focus { border-color: rgba(239,68,68,0.5); }
      `}</style>
    </div>
  );
}

const AdminTeam = () => {
  const qc = useQueryClient();
  const [modal, setModal] = useState<{ open: boolean; member: Partial<TeamMember> }>({ open: false, member: empty() });

  const { data: members = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/admin/team"],
    queryFn: async () => {
      const r = await apiFetch("/api/admin/team");
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
  });

  const upsert = useMutation({
    mutationFn: async (data: Partial<TeamMember>) => {
      const r = data.id
        ? await apiFetch(`/api/admin/team/${data.id}`, { method: "PUT", body: JSON.stringify(data) })
        : await apiFetch("/api/admin/team", { method: "POST", body: JSON.stringify(data) });
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/team"] }); setModal({ open: false, member: empty() }); toast.success("Saved!"); },
    onError: () => toast.error("Failed to save"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const r = await apiFetch(`/api/admin/team/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error("Failed");
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/team"] }); toast.success("Removed"); },
    onError: () => toast.error("Delete failed"),
  });

  return (
    <AdminLayout
      title="Team Members"
      subtitle={`${members.length} members`}
      actions={
        <button
          onClick={() => setModal({ open: true, member: empty() })}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <Plus size={15} />
          Add Member
        </button>
      }
    >
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map((member) => (
            <div key={member.id} className="group bg-white/3 border border-white/8 rounded-2xl p-5 text-center hover:border-white/15 transition-colors relative">
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  onClick={() => setModal({ open: true, member })}
                  className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => window.confirm(`Remove ${member.name}?`) && remove.mutate(member.id)}
                  className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {member.avatarUrl ? (
                <img src={member.avatarUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-white/10" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  {member.avatar || member.name.substring(0, 2).toUpperCase()}
                </div>
              )}

              <h3 className="font-bold text-white text-sm mb-0.5">{member.name}</h3>
              <p className="text-xs text-white/40 mb-3">{member.role}</p>
              {member.bio && <p className="text-xs text-white/30 leading-relaxed mb-3 line-clamp-2">{member.bio}</p>}

              <div className="flex justify-center gap-2">
                {member.github && member.github !== "#" && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-colors">
                    <Github size={13} />
                  </a>
                )}
                {member.linkedin && member.linkedin !== "#" && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-colors">
                    <Linkedin size={13} />
                  </a>
                )}
                {member.twitter && member.twitter !== "#" && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-colors">
                    <Twitter size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {modal.open && (
        <Modal
          member={modal.member}
          onClose={() => setModal({ open: false, member: empty() })}
          onSave={(data) => upsert.mutate(data)}
          isSaving={upsert.isPending}
        />
      )}
    </AdminLayout>
  );
};

export default AdminTeam;
