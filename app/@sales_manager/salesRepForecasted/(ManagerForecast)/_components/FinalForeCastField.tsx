import type { SrPredictedDataType } from "@/typings";
import type { Row } from "@tanstack/react-table";
import FinalForeCastInput from "./FinalForecastInput";

export default function FinalForeCastField({
  row,
}: {
  row: Row<SrPredictedDataType>;
}) {
  return <FinalForeCastInput row={row} />;
}
