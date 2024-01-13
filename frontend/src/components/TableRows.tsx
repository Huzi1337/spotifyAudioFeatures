type Props = {
  data: Object[];
  headers: string[];
};

export function TableRows({ data, headers }: Props) {
  return (
    <tbody>
      {data.map((song, index) => (
        <tr key={index}>
          {headers.map((header) => (
            <td key={header + index}>
              {(song as { [key: string]: any })[header]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
