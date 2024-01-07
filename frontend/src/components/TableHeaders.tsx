import { Props } from "./Table";

export function TableHeaders({ data }: Props) {
  return (
    <thead>
      <tr>
        {Object.entries(data[0]).map(([key, value]) =>
          value ? (
            <th key={key}>{key[0].toUpperCase() + key.slice(1)}</th>
          ) : null
        )}
      </tr>
    </thead>
  );
}
