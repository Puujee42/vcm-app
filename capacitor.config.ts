import type { CapacitorConfig } from "@capacitor/cli";

const isProd = process.env.CAP_ENV === 'production';
const prodUrl = "https://www.soyolvideoshop.mn"; // Or your actual domain
const devUrl = "http://192.168.1.10:3000"; // Replace with your LAN IP for local testing

const config: CapacitorConfig = {
  appId: "com.vcm.app",
  appName: "VCM",

  server: {
    url: isProd ? prodUrl : devUrl,
    cleartext: !isProd, // STRICTLY ENFORCE HTTPS IN PROD
    androidScheme: 'https',
    iosScheme: 'https',
  },
};

export default config;

