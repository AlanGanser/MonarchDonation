import { HiOutlineTrash } from "react-icons/hi2"

const TableRow = () => {
  return (
    {items.map((item, index) => (
        <tr key={index}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                <input
                    defaultValue={item.name}
                    className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                />
                {/* {item.name} */}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {item.quantity}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {item.type}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => {}}
                  >
                    Deactivate
                  </button>
            </td>
        </tr>
    ))}
  )
};

export default TableRow;
