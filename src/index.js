
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({
        ok: true,
        service: "entricite"
      });
    }

    if (url.pathname === "/") {
      return Response.redirect(
        new URL(`/browse${url.search}`, url.origin),
        302
      );
    }

    if (
      url.pathname === "/browse" ||
      url.pathname === "/browse/"
    ) {
      const assetUrl = new URL(
        "/browse.html",
        url.origin
      );

      return env.ASSETS.fetch(
        new Request(assetUrl, request)
      );
    }

    return env.ASSETS.fetch(request);
  }
};
