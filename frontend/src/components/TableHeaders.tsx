type Props = {
  headers: string[];
};

export function TableHeaders({ headers }: Props) {
  return (
    <thead>
      <tr>
        {headers.map((key) => (
          <th key={key}>{key[0].toUpperCase() + key.slice(1)}</th>
        ))}
      </tr>
    </thead>
  );
}
