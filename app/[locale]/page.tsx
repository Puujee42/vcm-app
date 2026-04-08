import HomePageContent from "@/app/components/HomePageContent";
import { getAuthUser } from "@/lib/authHelpers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const user = await getAuthUser();

  if (user?.role === "admin") {
    redirect(`/${locale}/admin`);
  }

  // Removed server-side blocking database fetch to drastically improve initial load time.
  // The HomePageContent component now fetches the items via client-side API.
  return <HomePageContent locale={locale} />;
}
