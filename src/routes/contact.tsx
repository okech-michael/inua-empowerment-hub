import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — INUA VIJANA" },
      { name: "description", content: "Get in touch with INUA VIJANA's headquarters or regional offices." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", organization: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await getErrorMessage(response);
        throw new Error(errorText);
      }

      setStatusMessage("Message sent successfully! We'll be in touch soon.");
      setIsSuccess(true);
      setFormData({ firstName: "", lastName: "", email: "", organization: "", message: "" });
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Failed to send message.");
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
        return (data?.message as string) || "Failed to send message.";
      } else {
        return await response.text();
      }
    } catch {
      return "Failed to send message.";
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        description="Reach our headquarters or one of our regional offices — we typically respond within two business days."
      />

      <section className="py-24">
        <div className="container-page grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            {[
              { icon: MapPin, title: "Headquarters", body: "Riverside Drive, Nairobi 00100, Kenya" },
              { icon: Phone, title: "Phone", body: "+254 (0) 20 000 0000" },
              { icon: Mail, title: "Email", body: "hello@inuavijana.org" },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-5">
                <div className="size-12 shrink-0 grid place-items-center rounded-full bg-brand-green/10 text-brand-green">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-brand-navy/40">{title}</h3>
                  <p className="mt-1 font-bold">{body}</p>
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-brand-navy/5">
              <h3 className="text-xs uppercase tracking-widest font-bold text-brand-navy/40 mb-4">Regional offices</h3>
              <div className="grid grid-cols-2 gap-4">
                {["Kampala", "Kigali", "Dar es Salaam", "Accra", "Lagos", "Addis Ababa"].map((c) => (
                  <div key={c} className="p-4 rounded-xl bg-brand-surface font-bold text-sm">{c}</div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-brand-surface space-y-5">
            <h3 className="text-2xl font-extrabold">Send us a message</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="First name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <Field
                label="Last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <Field
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Field
              label="Organization"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            />
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-brand-navy/60">Message</label>
              <textarea
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-2 w-full px-5 py-3 rounded-xl border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-4 bg-brand-green text-white rounded-full font-bold uppercase tracking-wider text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send message"}
            </button>
            {statusMessage && (
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  isSuccess ? "bg-brand-green/10 text-brand-green" : "bg-destructive/10 text-destructive"
                }`}
              >
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, type = "text", value, onChange }: { label: string; type?: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
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
