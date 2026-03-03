"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  name: string;
  age: number | null;
  email: string;
  phone: string;
  status: string;
  startTime: string;
  endTime: string;
  confirmedAt: string | null;
  caseSheet: {
    caseSummary: string;
    medicationPlan: string;
    updatedAt: string;
  } | null;
};

function formatIst(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getErrorMessage(err: unknown, fallback: string) {
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [caseSummary, setCaseSummary] = useState("");
  const [medicationPlan, setMedicationPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const calendarInputRef = useRef<HTMLInputElement | null>(null);

  const selectedBooking = useMemo(
    () => bookings.find((booking) => booking.id === selectedBookingId) ?? null,
    [bookings, selectedBookingId]
  );

  const filteredBookings = useMemo(() => {
    const nameQuery = filterName.trim().toLowerCase();
    const phoneQuery = filterPhone.trim();
    const dateQuery = filterDate.trim();

    return bookings.filter((booking) => {
      const bookingDateIst = new Date(booking.startTime).toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      });
      const matchesDate = !dateQuery || bookingDateIst.includes(dateQuery);
      const matchesName = !nameQuery || booking.name.toLowerCase().includes(nameQuery);
      const matchesPhone = !phoneQuery || booking.phone.includes(phoneQuery);
      return matchesDate && matchesName && matchesPhone;
    });
  }, [bookings, filterDate, filterName, filterPhone]);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load bookings");
      }
      const nextBookings = (data?.bookings ?? []) as Booking[];
      setBookings(nextBookings);
      if (!selectedBookingId && nextBookings[0]?.id) {
        setSelectedBookingId(nextBookings[0].id);
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load bookings"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCaseSummary(selectedBooking?.caseSheet?.caseSummary ?? "");
    setMedicationPlan(selectedBooking?.caseSheet?.medicationPlan ?? "");
  }, [selectedBooking]);

  const saveCaseSheet = async () => {
    if (!selectedBooking) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch(`/api/admin/bookings/${selectedBooking.id}/case`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseSummary, medicationPlan }),
      });
      const data = await res.json();
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        throw new Error(data?.error || "Failed to save case details");
      }
      setNotice("Case details saved.");
      await fetchBookings();
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to save case details"));
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <main className="container-max py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
          Doctor Dashboard
        </h1>
        <button type="button" onClick={handleLogout} className="btn-outline">
          Logout
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-rose-600">{error}</p>}
      {notice && <p className="mb-4 text-sm text-emerald-700">{notice}</p>}

      <section className="mb-6 rounded-2xl border border-sage/60 bg-white p-4 shadow-soft">
        <h2 className="text-lg font-semibold">Quick Filters</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div>
            <label className="text-sm text-charcoal/70">Date</label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                placeholder="YYYY-MM-DD"
                className="w-full rounded-xl border border-sage/60 bg-white px-3 py-2 outline-none focus:border-forest"
              />
              <button
                type="button"
                className="btn-outline whitespace-nowrap"
                onClick={() => {
                  setIsCalendarOpen((value) => !value);
                }}
              >
                Calendar
              </button>
            </div>
            {isCalendarOpen && (
              <div className="mt-2 w-72 rounded-xl border border-sage/60 bg-white p-3 shadow-soft">
                <input
                  ref={calendarInputRef}
                  type="date"
                  value={/^\d{4}-\d{2}-\d{2}$/.test(filterDate) ? filterDate : ""}
                  onChange={(e) => {
                    setFilterDate(e.target.value);
                    setIsCalendarOpen(false);
                  }}
                  className="w-full rounded-lg border border-sage/60 px-3 py-2 outline-none focus:border-forest"
                />
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-charcoal/70">Patient Name</label>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Search by name"
              className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-3 py-2 outline-none focus:border-forest"
            />
          </div>
          <div>
            <label className="text-sm text-charcoal/70">Mobile Number</label>
            <input
              type="text"
              value={filterPhone}
              onChange={(e) => setFilterPhone(e.target.value)}
              placeholder="Search by mobile"
              className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-3 py-2 outline-none focus:border-forest"
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-3 btn-outline"
          onClick={() => {
            setFilterDate("");
            setFilterName("");
            setFilterPhone("");
          }}
        >
          Clear Filters
        </button>
      </section>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <section className="rounded-2xl border border-sage/60 bg-white p-4 shadow-soft">
          <h2 className="text-xl font-semibold">Appointments</h2>
          {loading ? (
            <p className="mt-3 text-sm text-charcoal/70">Loading appointments...</p>
          ) : filteredBookings.length === 0 ? (
            <p className="mt-3 text-sm text-charcoal/70">No appointments found.</p>
          ) : (
            <div className="mt-4 max-h-[70vh] space-y-2 overflow-y-auto pr-1">
              {filteredBookings.map((booking) => (
                <button
                  key={booking.id}
                  type="button"
                  onClick={() => setSelectedBookingId(booking.id)}
                  className={[
                    "w-full rounded-xl border p-3 text-left transition",
                    selectedBookingId === booking.id
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-sage/50 bg-white hover:bg-sage/10",
                  ].join(" ")}
                >
                  <p className="font-medium text-charcoal">{booking.name || "Patient"}</p>
                  <p className="text-xs text-charcoal/70">{formatIst(booking.startTime)}</p>
                  <p className="text-xs text-charcoal/70">Phone: {booking.phone || "-"}</p>
                  <p className="text-xs text-charcoal/70">Age: {booking.age ?? "-"}</p>
                  <p className="mt-1 text-xs font-medium text-emerald-700">Status: {booking.status}</p>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-sage/60 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold">Case Record</h2>
          {!selectedBooking ? (
            <p className="mt-3 text-sm text-charcoal/70">Select an appointment to view details.</p>
          ) : (
            <>
              <div className="mt-4 grid gap-2 text-sm text-charcoal/80 sm:grid-cols-2">
                <p>
                  <span className="font-medium">Name:</span> {selectedBooking.name || "-"}
                </p>
                <p>
                  <span className="font-medium">Age:</span> {selectedBooking.age ?? "-"}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {selectedBooking.phone || "-"}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {selectedBooking.email || "-"}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-medium">Appointment:</span> {formatIst(selectedBooking.startTime)}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-charcoal/80">Case Summary</label>
                  <textarea
                    rows={7}
                    value={caseSummary}
                    onChange={(e) => setCaseSummary(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-3 outline-none focus:border-forest"
                    placeholder="Symptoms, case history, observations..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal/80">Medication Suggested</label>
                  <textarea
                    rows={7}
                    value={medicationPlan}
                    onChange={(e) => setMedicationPlan(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-sage/60 bg-white px-4 py-3 outline-none focus:border-forest"
                    placeholder="Medicine, dosage, instructions..."
                  />
                </div>
              </div>

              <div className="mt-6">
                <button type="button" onClick={saveCaseSheet} className="btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Save Case Details"}
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
