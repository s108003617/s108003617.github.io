import sequelize from '#configs/db.js'
import authenticate from '#middlewares/authenticate.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('開始處理 GET 請求');

      // 創建一個 Promise 來處理身份驗證
      const authPromise = new Promise((resolve, reject) => {
        authenticate(req, res, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });

      // 等待身份驗證完成
      await authPromise;

      // 如果身份驗證成功，繼續處理請求
      const userId = req.user.id;

      // 檢查數據庫連接
      await sequelize.authenticate();
      console.log('數據庫連接成功');

      // 從 Sequelize 實例獲取 PurchaseOrder 模型
      const PurchaseOrder = sequelize.models.Purchase_Order;

      // 檢查 PurchaseOrder 模型是否存在
      if (!PurchaseOrder) {
        throw new Error('PurchaseOrder 模型未找到');
      }

      console.log('正在查詢訂單，用戶ID:', userId);
      const orders = await PurchaseOrder.findAll({
        where: { user_id: userId },
        order: [['created_at', 'DESC']]
      });

      console.log('查詢完成，訂單數量:', orders.length);

      // 將訂單數據轉換為純JSON對象
      const plainOrders = orders.map(order => order.get({ plain: true }));

      res.status(200).json({ status: 'success', data: { orders: plainOrders } });
    } catch (error) {
      console.error('獲取訂單時發生錯誤:', error);
      if (error.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'error', message: '未授權訪問' });
      } else {
        res.status(500).json({ status: 'error', message: '獲取訂單失敗', error: error.message });
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}