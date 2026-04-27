import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import User from '@/lib/models/User';
import { getAuthUserId } from '@/lib/authHelpers';

export async function POST(req: NextRequest) {
    try {
        const userId = await getAuthUserId();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { documents, consentGiven, platform } = await req.json();

        if (consentGiven !== true) {
            return NextResponse.json({ error: 'Explicit data consent is required.' }, { status: 403 });
        }

        if (!documents) {
            return NextResponse.json({ error: 'No documents provided' }, { status: 400 });
        }

        const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

        await connectToDB();

        const result = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    documents,
                    documentsSubmitted: true,
                    updatedAt: new Date(),
                    dataConsent: {
                        givenAt: new Date(),
                        version: "1.0",
                        ipAddress,
                        platform: platform || "unknown",
                    }
                },
            },
            { new: true }
        );

        if (!result) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Documents submitted successfully' });
    } catch (error) {
        console.error('Submit documents error:', error);
        return NextResponse.json({ error: 'Failed to submit documents' }, { status: 500 });
    }
}
