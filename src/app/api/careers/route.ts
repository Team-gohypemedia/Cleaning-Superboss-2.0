import { NextResponse } from "next/server";

const GHL_WEBHOOK_URL =
  process.env.GHL_CAREERS_WEBHOOK_URL ||
  "https://services.leadconnectorhq.com/hooks/oOILUumPBLG7ihohI6gJ/webhook-trigger/a96263fc-af7c-47b5-a567-7c3ae37cc301";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const fullName = data.fullName || data.name || data["Full Name"] || data["Name"] || "";
    const nameParts = fullName.trim().split(" ");
    const firstName = data.firstName || data.first_name || data["First Name"] || nameParts[0] || "";
    const lastName = data.lastName || data.last_name || data["Last Name"] || nameParts.slice(1).join(" ") || "";
    const email = data.email || data.emailAddress || data["Email"] || "";
    const phone = data.phone || data.phoneNumber || data["Phone"] || "";

    const enrichedPayload = {
      ...data,
      // Provide both title-case with spaces and camelCase/snake_case so GHL matches ANY webhook trigger key
      "First Name": firstName,
      "Last Name": lastName,
      "Full Name": fullName,
      "Name": fullName,
      "Email": email,
      "Phone": phone,
      "Notes": data.notes || data.message || "",
      firstName,
      lastName,
      first_name: firstName,
      last_name: lastName,
      fullName,
      name: fullName,
      email,
      phone,
    };

    console.log("[Careers API] Forwarding application to GoHighLevel:", fullName, `(${email})`);

    const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrichedPayload),
    });

    const responseText = await ghlResponse.text();
    console.log("[Careers API] GoHighLevel response status:", ghlResponse.status, responseText);

    if (!ghlResponse.ok) {
      return NextResponse.json(
        { success: false, error: responseText },
        { status: ghlResponse.status }
      );
    }

    return NextResponse.json({ success: true, data: responseText });
  } catch (error: any) {
    console.error("[Careers API] Error forwarding to GoHighLevel:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
