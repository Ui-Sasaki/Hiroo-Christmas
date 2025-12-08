function List({ title, numbers, price }: { title: string; numbers: number; price: string }) {
    const handleClickAdd = () => {
        alert('1 item was added');
    };
    const handleClickSubtract = () => {
        alert('1 item was subtracted');
    };
    return (
        <div className="relative h-[50px]">
            <div className="absolute inset-y-0 left-8 flex items-center">
                <h1>{title}</h1>
            </div>
            <div className="absolute inset-0 flex items-center justify-center gap-1">
                <button className="items-center mx-2 bg-red-600 rounded-full w-6 text-white" onClick={handleClickSubtract}>-</button>
                <h1>{numbers}</h1>
                <button className="items-center mx-2 bg-green-600 rounded-full w-6 text-white" onClick={handleClickAdd}>+</button>
            </div>
            <div className="absolute inset-y-0 right-8 flex items-center">
                <h1>{price}</h1>
            </div>
        </div>
    );
}

export default List;