import crypto from "crypto";

type CalendarEventInput = {
  bookingId: string;
  patientName: string;
  patientEmail?: string;
  startTime: Date;
  endTime: Date;
};

type CalendarTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

type CalendarEventResponse = {
  id?: string;
  htmlLink?: string;
  hangoutLink?: string;
  conferenceData?: {
    entryPoints?: Array<{ uri?: string; entryPointType?: string }>;
  };
};

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";
const DEFAULT_TIME_ZONE = process.env.CLINIC_TIME_ZONE ?? "Asia/Kolkata";

function getCalendarConfig() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return { clientId, clientSecret, refreshToken, calendarId };
}

async function getAccessToken() {
  const config = getCalendarConfig();
  if (!config) return null;

  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    refresh_token: config.refreshToken,
    grant_type: "refresh_token",
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google token fetch failed: ${text}`);
  }

  const data = (await res.json()) as CalendarTokenResponse;
  if (!data.access_token) {
    throw new Error("Google token missing access_token");
  }

  return data.access_token;
}

function extractMeetLink(data: CalendarEventResponse) {
  if (data.hangoutLink) return data.hangoutLink;
  const videoEntry = data.conferenceData?.entryPoints?.find(
    (entry) => entry.entryPointType === "video" && entry.uri
  );
  return videoEntry?.uri ?? null;
}

export async function createConsultationMeeting(input: CalendarEventInput) {
  const config = getCalendarConfig();
  if (!config) {
    return { ok: false as const, skipped: true as const, reason: "calendar_not_configured" as const };
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { ok: false as const, skipped: true as const, reason: "calendar_not_configured" as const };
  }

  const attendees = input.patientEmail ? [{ email: input.patientEmail }] : [];
  const requestId = crypto.randomUUID();

  const eventBody = {
    summary: `Video Consultation - ${input.patientName || "Patient"}`,
    description: `Booking ID: ${input.bookingId}\nClinic: Sai Jagruthi Homeopathy Clinic`,
    start: {
      dateTime: input.startTime.toISOString(),
      timeZone: DEFAULT_TIME_ZONE,
    },
    end: {
      dateTime: input.endTime.toISOString(),
      timeZone: DEFAULT_TIME_ZONE,
    },
    attendees,
    conferenceData: {
      createRequest: {
        requestId,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  const url = `${CALENDAR_API_BASE}/calendars/${encodeURIComponent(
    config.calendarId
  )}/events?conferenceDataVersion=1&sendUpdates=all`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventBody),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Calendar event create failed: ${text}`);
  }

  const data = (await res.json()) as CalendarEventResponse;
  return {
    ok: true as const,
    skipped: false as const,
    eventId: data.id ?? null,
    eventLink: data.htmlLink ?? null,
    meetLink: extractMeetLink(data),
  };
}
