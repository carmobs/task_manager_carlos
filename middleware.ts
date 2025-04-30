import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirige a esta página si no estás autenticado
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/task/new/:path*"], // Rutas protegidas
};
