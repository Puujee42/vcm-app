import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import { getCloudinary } from "@/lib/cloudinaryServer";

import User from "@/lib/models/User";
import Application from "@/lib/models/Application";
import Booking from "@/lib/models/Booking";
import Notification from "@/lib/models/Notification";
import ChatMessage from "@/lib/models/ChatMessage";
import LmsEnrollment from "@/lib/models/LmsEnrollment";
import LmsProgress from "@/lib/models/LmsProgress";
import LmsPayment from "@/lib/models/LmsPayment";
import LmsCertificate from "@/lib/models/LmsCertificate";
import Events from "@/lib/models/Events";
import Lesson from "@/lib/models/Lesson";

// Helper to extract Cloudinary public_id from secure_url
function extractPublicId(url: string | null | undefined): string | null {
  if (!url || !url.includes("cloudinary.com")) return null;
  try {
    // Expected format: https://res.cloudinary.com/dc127wztz/image/upload/v12345678/folder/file.jpg
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    
    const versionAndPath = parts[1];
    // Remove the v12345678/ part if present
    const pathWithoutVersion = versionAndPath.replace(/^v\d+\//, "");
    
    // Remove the file extension
    const publicId = pathWithoutVersion.substring(0, pathWithoutVersion.lastIndexOf(".")) || pathWithoutVersion;
    return publicId;
  } catch (err) {
    console.error("Error extracting public ID from URL:", url, err);
    return null;
  }
}

// Robust deletion helper: tries both "image" and "raw" resource types concurrently
async function deleteCloudinaryResource(url: string | null | undefined) {
  const publicId = extractPublicId(url);
  if (!publicId) return;

  try {
    const cloudinaryServer = getCloudinary();
    await Promise.allSettled([
      cloudinaryServer.uploader.destroy(publicId, { resource_type: "image" }),
      cloudinaryServer.uploader.destroy(publicId, { resource_type: "raw" })
    ]);
  } catch (err) {
    console.error(`Failed to delete Cloudinary resource: ${publicId}`, err);
    // Non-blocking error
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    await connectToDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 1. WIPE CLOUDINARY DOCUMENTS
    // Gather all possible document URLs
    const filesToDelete = [
      user.photo,
      user.documents?.passport,
      user.documents?.emongoliaCert,
      user.documents?.marriageCert,
      user.documents?.residenceCert,
      user.documents?.birthCert,
      user.documents?.educationCert,
      user.documents?.bachelorDiploma,
      user.documents?.driverLicense,
      user.documents?.englishCert,
      user.documents?.medicalRecords,
      user.documents?.mentalHealthExam,
      user.documents?.professionalExp,
    ].filter(Boolean);

    // Run all Cloudinary deletions concurrently
    await Promise.allSettled(filesToDelete.map(url => deleteCloudinaryResource(url)));

    // 2. MONGODB CASCADES (Delete Many)
    const deletePromises = [
      Application.deleteMany({ userId }),
      Booking.deleteMany({ userId }),
      Notification.deleteMany({ userId }),
      ChatMessage.deleteMany({ senderId: userId }), // Assuming senderId maps to user
      LmsEnrollment.deleteMany({ user: userId }), // Assuming user maps to userId based on LMS schema
      LmsProgress.deleteMany({ user: userId }),
      LmsPayment.deleteMany({ user: userId }),
      LmsCertificate.deleteMany({ user: userId }),
    ];

    // 3. MONGODB CASCADES (Pull from Arrays)
    const updatePromises = [
      Events.updateMany(
        { attendees: userId },
        { $pull: { attendees: userId } }
      ),
      Lesson.updateMany(
        { "sessions.attendees": userId },
        { $pull: { "sessions.$[].attendees": userId } }
      ),
    ];

    // Run all database operations concurrently
    await Promise.allSettled([...deletePromises, ...updatePromises]);

    // 4. FINALLY DELETE THE USER
    await User.findByIdAndDelete(userId);

    return NextResponse.json({ success: true, message: "Account deleted successfully" });
  } catch (error: any) {
    console.error("Account deletion error:", error);
    return NextResponse.json({ error: "Failed to process account deletion" }, { status: 500 });
  }
}
