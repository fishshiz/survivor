import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { type Player } from "@/player";
import { Fragment } from "react";
import { List, Table } from "@chakra-ui/react";
import {
  Bs0Circle,
  Bs1Circle,
  Bs2Circle,
  Bs3Circle,
  Bs4Circle,
  Bs5Circle,
  Bs6Circle,
  Bs7Circle,
  Bs8Circle,
  Bs9Circle,
  BsCaretDownFill,
  BsCaretRight,
} from "react-icons/bs";

const columnHelper = createColumnHelper<Player>();
const columns = [
  columnHelper.accessor("points", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("finalRank", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  {
    header: "Expand",
    cell: ({ row }: any) => {
      return row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          style={{ cursor: "pointer" }}
        >
          {row.getIsExpanded() ? (
            <BsCaretDownFill color="#0183cf/30" />
          ) : (
            <BsCaretRight />
          )}
        </button>
      ) : (
        ""
      );
    },
  },
];
const PlayerTable = ({ players }: { players: Player[] }) => {
  const table = useReactTable({
    columns,
    data: players,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: (_row) => true,
    getExpandedRowModel: getExpandedRowModel(),
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
              {/* If the row is expanded, render the expanded UI as a separate row with a single cell that spans the width of the table */}
              {row.getIsExpanded() && (
                <Table.Row>
                  <Table.Cell colSpan={row.getAllCells().length}>
                    {consolidatedRules(row.original.rulesApplied)}
                  </Table.Cell>
                </Table.Row>
              )}
            </Fragment>
          ))}
        </Table.Body>
        <Table.Footer>
          {table.getFooterGroups().map((footerGroup) => (
            <Table.Row key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <Table.ColumnHeader key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          ))}
        </Table.Footer>
      </Table.Root>
    </div>
  );
};

const consolidatedRules = (rules: string[]) => {
  const consolidatedRules = rules.reduce(
    (acc: Record<string, number>, curr: string) => {
      if (!acc[curr]) {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    },
    {},
  );
  console.log(consolidatedRules);
  return (
    <List.Root
      as="ul"
      align="start"
      bg="#0183cf/30"
      borderRadius={4}
      flexWrap="wrap"
      listStyle="none"
      display="flex"
      gap="0.5rem"
      flexDirection="row"
      p={2}
    >
      {Object.entries(consolidatedRules).map(([rule, count]) => {
        return (
          <List.Item
            bg="#111a20/80"
            maxWidth={400}
            flex="0 0 auto"
            borderRadius={10}
            display="flex"
            alignItems="center"
            p={3}
            color="#fffffd"
          >
            <List.Indicator asChild color="#fad003">
              {numberIcon(count)}
            </List.Indicator>
            {rule}
          </List.Item>
        );
      })}
    </List.Root>
  );
};

const numberIcon = (num: number) => {
  switch (num) {
    case 1:
      return <Bs1Circle />;
    case 2:
      return <Bs2Circle />;
    case 3:
      return <Bs3Circle />;
    case 4:
      return <Bs4Circle />;
    case 5:
      return <Bs5Circle />;
    case 6:
      return <Bs6Circle />;
    case 7:
      return <Bs7Circle />;
    case 8:
      return <Bs8Circle />;
    case 9:
      return <Bs9Circle />;
    default:
      return <Bs0Circle />;
  }
};

export { PlayerTable };
