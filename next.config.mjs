import webpack from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        ageLabel: "(months => { if (months < 0) return ''; const years = Math.floor(months / 12); const remainingMonths = months % 12; if (years > 0 && remainingMonths > 0) return `${years} tahun ${remainingMonths} bulan`; if (years > 0) return `${years} tahun`; return `${remainingMonths} bulan`; })",
      })
    );
    return config;
  },
};

export default nextConfig;