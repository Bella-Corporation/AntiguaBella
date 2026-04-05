import { Navigate, useSearchParams } from "react-router-dom";

import { getCanonicalRequestPath } from "@/lib/request";

const BookPage = () => {
  const [searchParams] = useSearchParams();

  return <Navigate replace to={getCanonicalRequestPath(searchParams)} />;
};

export default BookPage;
