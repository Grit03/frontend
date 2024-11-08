import { Invoice, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Invoice[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      canvasId: "asdfa432",
      canvasTitle: "이쁜 티셔츠",
      amount: 12,
    },
    {
      id: "154safdf21",
      canvasId: "oiufs123",
      canvasTitle: "귀여운 티셔츠",
      amount: 32,
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      <h1 className="py-2 text-4xl font-bold">주문 내역</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
