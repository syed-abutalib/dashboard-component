import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "pos-backend.test",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);
