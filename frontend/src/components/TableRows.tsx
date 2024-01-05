import { Props } from "./Table";

export function TableRows({ data }: Props) {
  return (
    <>
      {data.map((song) => (
        <tr>
          {Object.values(song).map((value) => (
            <td>{value}</td>
          ))}
        </tr>
      ))}
    </>
  );
}
