import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header2';
import Contents from './Contents';

const contentsList = [
  {
    title: "商品A",
    subTitle: "飲み物",
    price: "100",
  },
  {
    title: "商品B",
    subTitle: "飲み物",
    price: "200",
  },
  {
    title: "商品C",
    subTitle: "飲み物",
    price: "300",
  },
]

function Sales() {
    return (
        <div className="flex h-screen" style={{ backgroundColor: '#E3EDF9' }}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <div className="bg-white px-6 py-3 shadow">
                    <Header />
                </div>
                <div className="flex-1 flex overflow-y-auto h-[calc(100vh-88px)] gap-7 p-7">
                    <div className="aspect-[475/955] bg-white rounded shadow-md">

                    </div>
                    
                    <div className="flex-1 flex">
                        {contentsList.map((item, idx) => (
                        <Contents key={idx} title={item.title} subTitle={item.subTitle} price={item.price} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sales;
