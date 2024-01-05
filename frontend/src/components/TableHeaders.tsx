import { Props } from "./Table";

export function TableHeaders({ data }: Props) {
  return (
    <tr>
      {Object.entries(data[0]).map(([key, value]) =>
        value ? <th>{key[0].toUpperCase() + key.slice(1)}</th> : null
      )}
    </tr>
  );
}
