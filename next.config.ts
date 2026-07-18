import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/dashboard/user/home", permanent: false },
      { source: "/about", destination: "/dashboard/user/about", permanent: false },
      { source: "/achievements", destination: "/dashboard/user/achievement", permanent: false },
      { source: "/blog", destination: "/dashboard/user/blog", permanent: false },
      { source: "/blog/:slug", destination: "/dashboard/user/blog/:slug", permanent: false },
      { source: "/certifications", destination: "/dashboard/user/certificate", permanent: false },
      { source: "/contact", destination: "/dashboard/user/contact", permanent: false },
      { source: "/documents", destination: "/dashboard/user/certificate", permanent: false },
      { source: "/experience", destination: "/dashboard/user/experience", permanent: false },
      { source: "/expertise", destination: "/dashboard/user/about", permanent: false },
      { source: "/hr-dashboard", destination: "/dashboard/user/home", permanent: false },
      { source: "/projects", destination: "/dashboard/user/projects", permanent: false },
      { source: "/projects/:slug", destination: "/dashboard/user/projects/:slug", permanent: false },
      { source: "/testimonials", destination: "/dashboard/user/about", permanent: false },
      { source: "/admin", destination: "/dashboard/admin/home", permanent: false },
      { source: "/admin/login", destination: "/auth/login", permanent: false },
      { source: "/admin/dashboard", destination: "/dashboard/admin/home", permanent: false },
      { source: "/admin/projects", destination: "/dashboard/admin/projects", permanent: false },
      { source: "/admin/projects/create", destination: "/dashboard/admin/projects/create", permanent: false },
      { source: "/admin/projects/:id/edit", destination: "/dashboard/admin/projects/:id/edit", permanent: false },
      { source: "/admin/:path*", destination: "/dashboard/admin/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
