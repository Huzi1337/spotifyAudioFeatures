import useGetMousePos from "../hooks/useGetMousePos";
import { FeatureDesc } from "../types";
import Tooltip from "./Tooltip";

type Props = {
  headers: string[];
  options?: FeatureDesc;
};

export function TableHeaders({ headers, options = {} }: Props) {
  const mousePos = useGetMousePos();

  return (
    <thead>
      <tr>
        {headers.map((key) => {
          let desc = options[key];
          return (
            <th key={key}>
              <Tooltip position={mousePos} text={desc ? desc.tooltip : ""}>
                {desc
                  ? desc.label
                  : key.charAt(0).toUpperCase() + key.substring(1)}
              </Tooltip>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
