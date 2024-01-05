import "./AudioFeatureTable.scss";
import { TableHeaders } from "./TableHeaders";
import { TableRows } from "./TableRows";

export type Props = {
  data: Object[];
};

function Table(props: Props) {
  return (
    <table className="audioFeatureTable">
      <TableHeaders {...props} />
      <TableRows {...props} />
    </table>
  );
}
export default Table;
