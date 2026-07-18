import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/dashboard/user", destination: "/", permanent: false },
      { source: "/dashboard/user/home", destination: "/", permanent: false },
      { source: "/dashboard/user/about", destination: "/about", permanent: false },
      { source: "/dashboard/user/achievement", destination: "/achievement", permanent: false },
      { source: "/dashboard/user/blog", destination: "/blog", permanent: false },
      { source: "/dashboard/user/blog/:slug", destination: "/blog/:slug", permanent: false },
      { source: "/dashboard/user/certificate", destination: "/certificate", permanent: false },
      { source: "/dashboard/user/certificate/:slug", destination: "/certificate/:slug", permanent: false },
      { source: "/dashboard/user/contact", destination: "/contact", permanent: false },
      { source: "/dashboard/user/experience", destination: "/experience", permanent: false },
      { source: "/dashboard/user/projects", destination: "/projects", permanent: false },
      { source: "/dashboard/user/projects/:slug", destination: "/projects/:slug", permanent: false },
      { source: "/achievements", destination: "/achievement", permanent: false },
      { source: "/certifications", destination: "/certificate", permanent: false },
      { source: "/documents", destination: "/certificate", permanent: false },
      { source: "/expertise", destination: "/about", permanent: false },
      { source: "/hr-dashboard", destination: "/", permanent: false },
      { source: "/testimonials", destination: "/about", permanent: false },
      { source: "/admin", destination: "/dashboard/admin/home", permanent: false },
      { source: "/admin/login", destination: "/auth/login", permanent: false },
      { source: "/admin/dashboard", destination: "/dashboard/admin/home", permanent: false },
      { source: "/admin/projects", destination: "/dashboard/admin/projects", permanent: false },
      { source: "/admin/projects/create", destination: "/dashboard/admin/projects/create", permanent: false },
      { source: "/admin/projects/:id/edit", destination: "/dashboard/admin/projects/:id/edit", permanent: false },
      { source: "/admin/:path*", destination: "/dashboard/admin/:path*", permanent: false },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/dashboard/user/home" },
        { source: "/about", destination: "/dashboard/user/about" },
        { source: "/achievement", destination: "/dashboard/user/achievement" },
        { source: "/blog", destination: "/dashboard/user/blog" },
        { source: "/blog/:slug", destination: "/dashboard/user/blog/:slug" },
        { source: "/certificate", destination: "/dashboard/user/certificate" },
        { source: "/certificate/:slug", destination: "/dashboard/user/certificate/:slug" },
        { source: "/contact", destination: "/dashboard/user/contact" },
        { source: "/experience", destination: "/dashboard/user/experience" },
        { source: "/projects", destination: "/dashboard/user/projects" },
        { source: "/projects/:slug", destination: "/dashboard/user/projects/:slug" },
      ],
    };
  },
};

export default nextConfig;
