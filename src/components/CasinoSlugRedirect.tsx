import { Navigate, useParams } from "react-router-dom";

const CasinoSlugRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/casino-anmeldelser/${slug}`} replace />;
};

export default CasinoSlugRedirect;
