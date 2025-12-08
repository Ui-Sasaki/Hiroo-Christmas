function Contents({ title, subTitle, price }: { title: string; subTitle: string; price: string }) {
    const handleClick = () => {
        alert('bought an item A');
    };
    return (
        <div>
            <button className="w-[130px] h-[130px] p-4 bg-white m-2 rounded shadow-md" onClick={handleClick}>
                <h2 className="text-left text-sm text-gray-500">{subTitle}</h2>
                <h1 className="text-left text-2xl text-black">{title}</h1>
                <p className="text-left text-green-700">{price}円</p>
            </button>
        </div>
    );
}

export default Contents;