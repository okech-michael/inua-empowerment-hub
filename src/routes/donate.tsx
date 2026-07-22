import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { CreditCard, Heart } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — INUA VIJANA" },
      { name: "description", content: "Support youth empowerment across Africa. Your donation is fully tracked and reported." },
    ],
  }),
  component: Donate,
});

const tiers = [
  { amount: 25, impact: "Supplies one training kit for a scholar." },
  { amount: 100, impact: "Funds a mentor for a fellow for one month." },
  { amount: 500, impact: "Covers a full month of Digital Skills training." },
  { amount: 1500, impact: "Seeds a youth-led business through the Founders track." },
];

function Donate() {
  const [amount, setAmount] = useState(100);
  const [frequency, setFrequency] = useState<"once" | "monthly">("monthly");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BACKEND_URL || "";
  const apiUrl = apiBaseUrl.endsWith("/") ? apiBaseUrl.slice(0, -1) : apiBaseUrl;

  const handleDonate = async () => {
    const normalizedPhone = phone.replace(/\D/g, "");

    if (!normalizedPhone || normalizedPhone.length < 10) {
      setMessage("Please enter a valid phone number.");
      setIsSuccess(false);
      return;
    }

    if (!name.trim()) {
      setMessage("Please provide your full name.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const donationResponse = await fetch(`${apiUrl}/api/donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donor_name: name.trim(),
          phone: normalizedPhone,
          amount,
          payment_method: "M-Pesa",
          project: "General donation",
          message: donorMessage.trim(),
        }),
      });

      if (!donationResponse.ok) {
        const errorMessage = await getResponseErrorMessage(donationResponse, "Donation submission failed.");
        throw new Error(errorMessage);
      }

      const donationData = await donationResponse.json();
      const donationId = donationData.data?.id;

      if (!donationId) {
        throw new Error("Donation ID missing from response.");
      }

      const paymentResponse = await fetch(`${apiUrl}/api/payments/stkpush`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ donationId }),
      });

      if (!paymentResponse.ok) {
        const errorMessage = await getResponseErrorMessage(paymentResponse, "Payment initiation failed.");
        throw new Error(errorMessage);
      }

      setMessage(`Thank you! An M-Pesa prompt has been sent to ${normalizedPhone}. Complete the payment on your phone.`);
      setIsSuccess(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Payment failed.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const getResponseErrorMessage = async (response: Response, fallback: string) => {
    try {
      const data = await response.json();
      return (data?.message as string) || fallback;
    } catch {
      const text = await response.text();
      return text ? `${fallback} (${text})` : fallback;
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Every dollar builds a future."
        description="Your donation is deployed directly into our programs. Every quarter we publish exactly where it went."
      />

      <section className="py-24">
        <div className="container-page grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl border border-brand-navy/5 bg-white">
              <div className="inline-flex p-1 rounded-full bg-brand-surface mb-8">
                {(["monthly", "once"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                      frequency === f ? "bg-brand-green text-white" : "text-brand-navy/60"
                    }`}
                  >
                    {f === "monthly" ? "Monthly" : "One-time"}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {tiers.map((t) => (
                  <button
                    key={t.amount}
                    onClick={() => setAmount(t.amount)}
                    className={`p-4 rounded-2xl border-2 text-center transition-all ${
                      amount === t.amount
                        ? "border-brand-green bg-brand-green/5"
                        : "border-brand-navy/10 hover:border-brand-navy/30"
                    }`}
                  >
                    <div className="text-2xl font-extrabold">${t.amount}</div>
                  </button>
                ))}
              </div>

              <p className="text-sm text-brand-navy/60 mb-8 p-4 rounded-xl bg-brand-yellow/10">
                <Heart className="inline h-4 w-4 text-brand-green mr-1" />
                {tiers.find((t) => t.amount === amount)?.impact}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-brand-navy/60">Custom amount (USD)</label>
                  <input
                    type="number"
                    value={amount}
                    min={1}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-2 w-full px-5 py-3 rounded-xl border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-brand-navy/60">Phone number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="2547XXXXXXXX"
                    className="mt-2 w-full px-5 py-3 rounded-xl border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-brand-navy/60">Full name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="mt-2 w-full px-5 py-3 rounded-xl border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                  />
                </div>
                <button
                  onClick={handleDonate}
                  disabled={loading}
                  className="w-full px-6 py-4 bg-brand-green text-white rounded-full font-bold uppercase tracking-wider text-sm hover:brightness-110 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CreditCard className="h-4 w-4" />
                  {loading ? "Processing..." : `Donate $${amount} ${frequency === "monthly" ? "monthly" : "once"}`}
                </button>
                {message ? (
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      isSuccess ? "bg-brand-green/10 text-brand-green" : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {message}
                  </div>
                ) : null}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-[11px] uppercase tracking-widest text-brand-navy/40 font-bold">
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>M-Pesa</span>
                  <span>Bank Transfer</span>
                  <span>PayPal</span>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-brand-navy text-white">
              <h3 className="text-xl font-extrabold">Where your money goes</h3>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Programme delivery", pct: 78 },
                  { label: "Community operations", pct: 12 },
                  { label: "Administration", pct: 7 },
                  { label: "Fundraising", pct: 3 },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{r.label}</span>
                      <span className="font-bold text-brand-yellow">{r.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-brand-yellow" style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-brand-surface">
              <h3 className="text-xl font-extrabold">Corporate giving</h3>
              <p className="mt-3 text-sm text-brand-navy/60">
                Match employee gifts, sponsor a cohort, or fund a full program.
                Reach out to our partnerships team.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
