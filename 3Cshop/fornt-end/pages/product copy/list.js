import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader2 from '@/components/loader2'

// 資料夾中的`[pid].js`檔案代表這個路由中，除了根(索引)路由，靜態路由(有名稱的)之外，都算這個檔案路由，例如`/product/123`
// 資料範例:
//   {
//     "id": 1,
//     "picture": "https://via.placeholder.com/150",
//     "stock": 5,
//     "name": "iPhone 12 Pro",
//     "price": 25000,
//     "tags": "蘋果,大螢幕"
//   }

export default function Detail() {
  const router = useRouter()
  // 宣告商品狀態
  const [product, setProduct] = useState({
    id: 0,
    name: '',
    stock: 0,
    price: 0,
    tags: '',
    picture: '',
  })
  // 宣告一個載入的狀態信號值
  // 設定一開始進入此頁面就要向伺服器獲取資料，不出現初始值
  const [isLoading, setIsLoading] = useState(true)

  // 與伺服器作fetch獲得資料
  const getProduct = async (pid) => {
    const url = 'http://localhost:3005/api/my-products/' + pid

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url)
      const resData = await res.json()

      // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
      // 確定資料是純物件資料類型才設定到狀態中(最基本的保護)
      if (resData.status === 'success') {
        setProduct(resData.data.product)
        // 關閉載入動畫，1.5再關閉
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    console.log('render router.query=', router.query)
  })

  // 樣式3: didMount+didUpdate
  useEffect(() => {
    if (router.isReady) {
      // 這裡可以得到router.query
      console.log(router.query)
      // 向伺服器要求資料
      getProduct(router.query.pid)
    }
    // eslint-disable-next-line
  }, [router.isReady])

  return (
    <>
      <h1>商品詳細頁</h1>
      <hr />
      {/* 用isLoading進行條件式渲染，決定要呈現載入指示動畫還是內容 */}
      {isLoading ? (
        <Loader2 />
      ) : (
        <>
          <p>名稱: {product.name}</p>
          <p>價格: {product.price}</p>
        </>
      )}
    </>
  )
}
