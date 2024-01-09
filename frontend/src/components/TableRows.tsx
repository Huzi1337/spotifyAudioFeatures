import { Props } from "./Table";

export function TableRows({ data }: Props) {
  return (
    <tbody>
      {data.map((song, index) => (
        <tr key={index}>
          {Object.values(song).map((value, innerIndex) => (
            <td key={innerIndex}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
