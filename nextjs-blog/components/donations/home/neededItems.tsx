const items: {name: string; catagory: "Clothing" | "Food" | "Hygiene" | "Home supplies" | "Other"; important: boolean}[] = [
    { name: "Kid's Winter Clothes", catagory: "Clothing", important: true},
    { name: "New Socks", catagory: "Clothing", important: true},
    { name: "Warm Jackets", catagory: "Clothing", important: true},
    { name: "New Underwear", catagory: "Clothing", important: false},
    { name: "Men's Jeans", catagory: "Clothing", important: false},
    { name: "Baby Wipes", catagory: "Hygiene", important: false},
    { name: "Winter Shoes", catagory: "Clothing", important: false},
    { name: "Shampoo", catagory: "Clothing", important: false},
    { name: "Blankets", catagory: "Clothing", important: false},
    { name: "Cold/Flu medicine", catagory: "Hygiene", important: false},
    { name: "Backpacks", catagory: "Other", important: false},
    { name: "Shaving Razors", catagory: "Hygiene", important: false},
    { name: "Diapers", catagory: "Hygiene", important: false},
    { name: "Canned Vegetables", catagory: "Food", important: false},
    { name: "Ground Beef", catagory: "Food", important: false},
    { name: "Chicken Turkeys", catagory: "Food", important: false},
    { name: "Sugar", catagory: "Food", important: false},
    { name: "Beans", catagory: "Food", important: false},
    { name: "Oatmeal", catagory: "Food", important: false},
    { name: "Eggs", catagory: "Food", important: false},
    { name: "Coffee", catagory: "Food", important: false},
    { name: "Pancake Mix", catagory: "Food", important: false},
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
                                <span className={classNames("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", item.important ? "bg-green-500" : "bg-lime-400")}></span>
                                <span className={classNames("relative inline-flex rounded-full h-2 w-2", item.important ? "bg-green-500" : "bg-lime-400")}></span>
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
