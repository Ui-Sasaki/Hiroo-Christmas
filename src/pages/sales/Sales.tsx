import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header2';
import Contents from './Contents';
import List from './List';

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
    {
    title: "DDDD",
    subTitle: "ara",
    price: "999",
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
                    <div className="aspect-[475/955] bg-white rounded shadow-md grid grid-rows-[auto_1fr_auto]">
                        <div className="flex justify-around h-[50px] bg-red-50 p-4">
                            <p>商品名</p>
                            <p>個数</p>
                            <p>価格</p>
                        </div>

                        <div className="p-2"> {/* 商品リスト表示エリア */}
                            {contentsList.map((item, idx) => (
                                <List key={idx} title={item.title} numbers={0} price={item.price} />
                            ))}
                        </div>

                        <div className="flex justify-around h-[80px] bg-green-700 p-4 items-center">
                            <p className="text-white">合計</p>
                            <p className="text-white">0点</p>
                            <p className="text-white">0円</p>
                        </div>
                    </div>

                    <div className="flex-1 flex">{/* コンテンツ表示エリア */}
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
