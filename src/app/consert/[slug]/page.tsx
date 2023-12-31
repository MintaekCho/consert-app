"use client";

import ConcertInfo from "@/components/templetes/ConcertInfo";
import { DetailDataProps } from "@/types/props";

const ConcertDetailsPage = ({ params }: { params: DetailDataProps }) => {
  const concertId = params.slug;
  return (
    <div>
      <ConcertInfo concertId={concertId} />
    </div>
  );
};

export default ConcertDetailsPage;
