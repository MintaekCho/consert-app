/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "/:path*",
  //     },
  //   ];
  // },
  async headers() {
    return [
      {
        source: "/api/consert/rank",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache",
          },
        ],
      },
      {
        source: "/api/consert/come",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache",
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      "search.pstatic.net",
      "ticketimage.interpark.com",
      "cdnimg.melon.co.kr",
      "lh3.googleusercontent.com",
      "i.ytimg.com",
      "cdnticket.melon.co.kr",
    ],
  },
};

module.exports = nextConfig;
