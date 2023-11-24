const items: {name: string; catagory: "Clothing" | "Food" | "Hygine" | "Home supplies" | "Other"}[] = [
    { name: "Kid's Winter Clothes", catagory: "Clothing"},
    { name: "New Underwear", catagory: "Clothing"},
    { name: "New Socks", catagory: "Clothing"},
    { name: "Men's Jeans", catagory: "Clothing"},
    { name: "Baby Wipes", catagory: "Hygine"},
    { name: "Winter Shoes", catagory: "Clothing"},
    { name: "Warm Jackets", catagory: "Clothing"},
    { name: "Shampoo", catagory: "Clothing"},
    { name: "Blankets", catagory: "Clothing"},
    { name: "Cold/Flu medicine", catagory: "Hygine"},
    { name: "Backpacks", catagory: "Other"},
    { name: "Shaving Razors", catagory: "Hygine"},
    { name: "Diapers", catagory: "Hygine"},
    { name: "Canned Vegetables", catagory: "Food"},
    { name: "Ground Beef", catagory: "Food"},
    { name: "Chicken Turkeys", catagory: "Food"},
    { name: "Sugar", catagory: "Food"},
    { name: "Beans", catagory: "Food"},
    { name: "Oatmeal", catagory: "Food"},
    { name: "Eggs", catagory: "Food"},
    { name: "Coffee", catagory: "Food"},
    { name: "Pancake Mix", catagory: "Food"},
    { name: "Eggs", catagory: "Food"},
    { name: "Granola Bars", catagory: "Food"},
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const NeededItems = ({large} : {large: true | false}) => {
    return (
        <div className="bg-white rounded">
            <h2 className="text-sm font-medium text-gray-700 text-center p-2 border border-gray-200">Needed Donations</h2>
            <ul role="list" className={classNames("grid grid-cols-1 sm:grid-cols-2", large ? "lg:grid-cols-4" : "")}>
                {items.map((item) => (
                    <li key={item.name} className="col-span-1 flex justify-between shadow-sm border border-gray-200 bg-white">
                        <div className="flex flex-1 items-center space-x-3 truncate">
                            <span className="relative flex ml-2 h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <p className="px-2 py-2 text-sm font-medium truncate text-gray-900">{item.name}</p>
                        </div>
                        <p className="py-2 pl-4 pr-3 text-sm text-gray-500">{item.catagory}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NeededItems;
