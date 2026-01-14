// api/index.js
let server;
export default async (req, res) => {
  if (!server) {
    const { app } = await import('../dist/portfolio-website/server/server.mjs');
    server = app();
  }
  return server(req, res);
};
