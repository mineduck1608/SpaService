import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

type Props<TData> = {
  columns: ColumnDef<TData>[]; // Danh sách cột
  data: TData[]; // Dữ liệu của bảng
  title?: string; // Tùy chọn: Tiêu đề bảng
};

export function ReusableTable<TData>({ columns, data, title }: Props<TData>) {
  return (
    <div className="container mx-auto rounded-md border w-[96%] h-[96%] p-4">
      {title && <h2 className="text-xl font-bold">{title}</h2>}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
