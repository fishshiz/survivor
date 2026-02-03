import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { type Average } from "@/simulation";
import { useReducer, Fragment } from "react";
import { List, Table } from "@chakra-ui/react";

const columnHelper = createColumnHelper<Average>();
const columns = [
  columnHelper.accessor("pointsRank", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span>Rank</span>,
  }),
  columnHelper.accessor("points", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span>Average Points</span>,
  }),
  columnHelper.accessor("survivorRank", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span>Average Survivor Rank</span>,
  }),
  columnHelper.accessor("firstPlace", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span>% 1st Place Rank</span>,
  }),
  columnHelper.accessor("secondPlace", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span>% 2nd Place Rank</span>,
  }),
  columnHelper.accessor("thirdPlace", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span>% 3rd Place Rank</span>,
  }),
  columnHelper.accessor("fourthPlace", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span>% 4th Place Rank</span>,
  }),
  columnHelper.accessor("fithPlace", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span>% 5th Place Rank</span>,
  }),
];
const AverageTable = ({ players }: { players: Average[] }) => {
  const rerender = useReducer(() => ({}), {})[1];
  const table = useReactTable({
    columns,
    data: players,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="p-2">
      <Table.Root borderSpacing="2" borderCollapse="separate">
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeader key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            </Fragment>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export { AverageTable };
