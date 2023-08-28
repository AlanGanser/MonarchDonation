import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { headers } from "next/headers";

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
    const payload = await req.json();
    const payloadString = JSON.stringify(payload);
    const headerPayload = headers();
    const svixId = headerPayload.get("svix-id");
    const svixIdTimeStamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");
    if (!svixId || !svixIdTimeStamp || !svixSignature) {
        return new Response("Error occured", {
            status: 400,
        });
    }
    // Create an object of the headers
    const svixHeaders = {
        "svix-id": svixId,
        "svix-timestamp": svixIdTimeStamp,
        "svix-signature": svixSignature,
    };
    // Create a new Webhook instance with your webhook secret
    const wh = new Webhook(webhookSecret);

    let evt: WebhookEvent;
    try {
        // Verify the webhook payload and headers
        evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
    } catch (_) {
        console.log("error");
        return new Response("Error occured", {
            status: 400,
        });
    }
    // Handle the webhook
    const eventType = evt.type;

    if (eventType === "user.created") {
        const { id, first_name: firstName, last_name: lastName } = evt.data;
        const { email_address: email } = evt.data.email_addresses[0];
        await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                firstName: firstName || "",
                lastName: lastName || "",
                email: email,
            }),
        });
    }
    if (eventType === "user.deleted") {
        console.log('user delete webhook recieved');
        const { id } = evt.data;
        await fetch(`http:localhost:3000/api/users/${id}`, {
            method: "DELETE",
        });
    }
    if (eventType === "user.updated") {
        const { id, first_name: firstName, last_name: lastName  } = evt.data
        const { email_address: email } = evt.data.email_addresses[0];
        await fetch(`http:localhost:3000/api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName || "",
                lastName: lastName || "",
                email: email,
            }),
        });
    }
    
    return new Response("", {
        status: 201,
    });
}
