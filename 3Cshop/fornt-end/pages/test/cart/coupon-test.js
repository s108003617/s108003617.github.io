import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axiosInstance from '@/services/axios-instance'
import { useAuth } from '@/hooks/use-auth'
import { useCart } from '@/hooks/use-cart-state'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import List from '@/components/cart/list'
import Image from 'next/image'

// 範例資料
// type: 'amount'相減，'percent'折扣
const coupons = [
  { id: 1, name: '折100元', value: 100, type: 'amount' },
  { id: 2, name: '折300元', value: 300, type: 'amount' },
  { id: 2, name: '折550元', value: 300, type: 'amount' },
  { id: 3, name: '8折券', value: 0.2, type: 'percent' },
]

export default function Coupon() {
  const router = useRouter()
  const { auth } = useAuth()
  const { cart, addItem, removeItem, updateItemQty, clearCart, isInCart } =
    useCart()

  const [couponOptions, setCouponOptions] = useState(coupons)
  const [selectedCouponId, setSelectedCouponId] = useState(0)
  const [netTotal, setNetTotal] = useState(0)
  const [order, setOrder] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!selectedCouponId) {
      setNetTotal(cart.totalPrice)
      return
    }

    const coupon = couponOptions.find((v) => v.id === selectedCouponId)
    const newNetTotal =
      coupon.type === 'amount'
        ? cart.totalPrice - coupon.value
        : Math.round(cart.totalPrice * (1 - coupon.value))

    setNetTotal(newNetTotal)
  }, [cart.totalPrice, selectedCouponId])

  const createOrder = async () => {
    try {
      const products = cart.items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }))

      // 计算商品总价
      const originalTotal = cart.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      )

      // 计算折扣后的总价
      const coupon = couponOptions.find((v) => v.id === selectedCouponId)
      const discountedTotal = coupon
        ? coupon.type === 'amount'
          ? originalTotal - coupon.value
          : Math.round(originalTotal * (1 - coupon.value))
        : originalTotal

      // 确保订单总价与产品总价一致，但同时记录实际支付总价
      const orderData = {
        amount: originalTotal, // 订单总价与产品总价一致
        discountedAmount: discountedTotal, // 实际支付总价
        products,
      }

      const res = await axiosInstance.post('/line-pay/create-order', orderData)

      if (res.data.status === 'success') {
        setOrder(res.data.data.order)
        toast.success('已成功建立订单')
      } else {
        toast.error('建立订单失败')
      }
    } catch (error) {
      toast.error('建立订单时发生错误')
      console.error(error)
    }
  }

  const goLinePay = () => {
    if (window.confirm('確認要導向至LINE Pay進行付款?')) {
      window.location.href = `http://localhost:3005/api/line-pay/reserve?orderId=${order.orderId}`
    }
  }

  const handleConfirm = async (transactionId) => {
    setIsLoading(true)
    try {
      const res = await axiosInstance.get(
        `/line-pay/confirm?transactionId=${transactionId}`
      )

      if (res.data.status === 'success') {
        toast.success('付款成功')
        clearCart()
      } else {
        toast.error('付款失敗')
      }

      if (res.data.data) {
        setResult(res.data.data)
      }

      setIsLoading(false)
    } catch (error) {
      toast.error('確認交易時發生錯誤')
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const { transactionId, orderId } = router.query

      if (!transactionId || !orderId) {
        setIsLoading(false)
        return
      }

      handleConfirm(transactionId)
    }
  }, [router.isReady])

  return (
    <>
      <h1>購物車範例</h1>
      <p>
        <Link href="/test/cart/product-list">商品列表頁範例</Link>
      </p>

      {/* 列出cart中清單 */}
      <h4>購物車列表</h4>
      <List />
      <h4>折價券</h4>
      <div className="mb-3">
        <select
          className="form-select"
          value={selectedCouponId}
          onChange={(e) => {
            setSelectedCouponId(Number(e.target.value))
          }}
        >
          <option value="0">選擇折價券</option>
          {couponOptions.map((v) => {
            return (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            )
          })}
        </select>
        <hr />
        <p>最後折價金額: {netTotal}</p>
      </div>
      {/* 以下為測試按鈕 */}
      <h4>測試按鈕</h4>
      <div className="btn-group-vertical">
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            console.log(cart)
            toast.success('已在主控台記錄cart狀態')
          }}
        >
          主控台記錄cart狀態
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addItem({
              id: '111',
              quantity: 5,
              name: 'iphone',
              price: 15000,
              color: 'red',
              size: '',
            })
            toast.success('新增項目 id=111')
          }}
        >
          新增項目(id=111, x5)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            addItem({
              id: '222',
              quantity: 1,
              name: 'ipad',
              price: 19000,
              color: '',
              size: '',
            })
            toast.success('新增項目 id=222')
          }}
        >
          新增項目(id=222, x1)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            removeItem('222')
            toast.success('移除項目 id=222')
          }}
        >
          移除項目(id=222)
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            updateItemQty(222, 7)
            toast.success('更新項目 id=222 的數量為 7')
          }}
        >
          更新項目 id=222 的數量為 7
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            updateItemQty(111, 99)
            toast.success('更新項目 id=111 的數量為 99')
          }}
        >
          更新項目 id=111 的數量為 99
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            clearCart()
            toast.success('已清空購物車')
          }}
        >
          清空購物車
        </button>
        <button className="btn btn-outline-secondary" onClick={createOrder}>
          產生訂單
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={goLinePay}
          disabled={!order.orderId}
        >
          前往付款
        </button>
      </div>
      <Toaster />
    </>
  )
}
