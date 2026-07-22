import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { useState } from "react";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join the Network — INUA VIJANA" },
      { name: "description", content: "Register as a youth member, partner organization or corporate sponsor to join the INUA VIJANA network." },
    ],
  }),
  component: Join,
});

type Tab = "Youth" | "Organization" | "Corporate";

function Join() {
  const [tab, setTab] = useState<Tab>("Youth");
  const [formData, setFormData] = useState<Record<string, string>>({
    fullName: "",
    email: "",
    country: "",
    dateOfBirth: "",
    goals: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tab, ...formData }),
      });

      if (!response.ok) {
        const errorText = await getErrorMessage(response);
        throw new Error(errorText);
      }

      setMessage("Application submitted successfully! We'll be in touch soon.");
      setIsSuccess(true);
      setFormData({ fullName: "", email: "", country: "", dateOfBirth: "", goals: "" });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Submission failed.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = async (response: Response) => {
    try {
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const data = await response.json();
        return (data?.message as string) || "Submission failed.";
      } else {
        return await response.text();
      }
    } catch {
      return "Submission failed.";
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Join the Network"
        title="One network. Endless opportunities."
        description="Whether you're a young person ready to lead, an organization looking to partner, or a company committed to youth development — there is a place for you."
      />

      <section className="py-24">
        <div className="container-page max-w-3xl">
          <div className="inline-flex p-1 rounded-full bg-brand-surface border border-brand-navy/5 mb-10">
            {(["Youth", "Organization", "Corporate"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                  tab === t ? "bg-brand-navy text-white" : "text-brand-navy/60"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {tab === "Youth" && (
              <>
                <Field
                  label="Full name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleFormChange("fullName", e.target.value)}
                />
                <Field
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                />
                <Field
                  label="Country"
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleFormChange("country", e.target.value)}
                />
                <Field
                  label="Date of birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleFormChange("dateOfBirth", e.target.value)}
                />
                <TextArea
                  label="Tell us about your goals"
                  value={formData.goals}
                  onChange={(e) => handleFormChange("goals", e.target.value)}
                />
              </>
            )}
            {tab === "Organization" && (
              <>
                <Field
                  label="Organization name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleFormChange("fullName", e.target.value)}
                />
                <Field
                  label="Primary contact"
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleFormChange("country", e.target.value)}
                />
                <Field
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                />
                <Field
                  label="Country / region"
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleFormChange("dateOfBirth", e.target.value)}
                />
                <TextArea
                  label="Describe your organization and areas of interest"
                  value={formData.goals}
                  onChange={(e) => handleFormChange("goals", e.target.value)}
                />
              </>
            )}
            {tab === "Corporate" && (
              <>
                <Field
                  label="Company name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleFormChange("fullName", e.target.value)}
                />
                <Field
                  label="Contact person"
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleFormChange("country", e.target.value)}
                />
                <Field
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                />
                <Field
                  label="Country"
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleFormChange("dateOfBirth", e.target.value)}
                />
                <TextArea
                  label="What kind of partnership are you exploring?"
                  value={formData.goals}
                  onChange={(e) => handleFormChange("goals", e.target.value)}
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-4 bg-brand-green text-white rounded-full font-bold uppercase tracking-wider text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit application"}
            </button>
            {message && (
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  isSuccess ? "bg-brand-green/10 text-brand-green" : "bg-destructive/10 text-destructive"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          <div className="mt-16 pt-12 border-t border-brand-navy/5">
            <h3 className="text-xl font-extrabold">Frequently asked</h3>
            <div className="mt-6 space-y-4">
              {[
                { q: "Is membership free?", a: "Youth membership is 100% free. Organizational memberships have a modest annual fee." },
                { q: "Do I need to be based in Africa?", a: "Youth members must be African citizens aged 18–35. Partners can be based anywhere." },
                { q: "What do I get as a member?", a: "Access to opportunities, mentors, events, and the alumni network — plus first look at grants." },
              ].map((f) => (
                <details key={f.q} className="group p-6 rounded-2xl border border-brand-navy/5 bg-white">
                  <summary className="font-bold cursor-pointer list-none flex justify-between">
                    {f.q}
                    <span className="text-brand-green group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-brand-navy/60">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, type, value, onChange }: { label: string; type: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest font-bold text-brand-navy/60">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        className="mt-2 w-full px-5 py-3 rounded-xl border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
      />
    </div>
  );
}
function TextArea({ label, value, onChange }: { label: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest font-bold text-brand-navy/60">{label}</label>
      <textarea
        rows={4}
        value={value || ""}
        onChange={onChange}
        className="mt-2 w-full px-5 py-3 rounded-xl border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
      />
    </div>
  );
}
