import sequelize from '#configs/db.js'
import authenticate from '#middlewares/authenticate.js'

export default async function handler(req, res) {
  try {
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

    // 從 Sequelize 實例獲取 Favorite 和 Product1 模型
    const Favorite = sequelize.models.Favorite;
    const Product1 = sequelize.models.Product1;

    // 檢查模型是否存在
    if (!Favorite || !Product1) {
      throw new Error('模型未找到');
    }

    if (req.method === 'GET') {
      console.log('正在查詢收藏，用戶ID:', userId);
      const favorites = await Favorite.findAll({
        where: { uid: userId },
        order: [['created_at', 'DESC']],
        include: [{
          model: Product1,
          as: 'product',
          required: false
        }]
      });

      console.log('查詢完成，收藏數量:', favorites.length);

      // 將收藏數據轉換為純JSON對象，包括產品信息
      const plainFavorites = favorites.map(favorite => {
        const plainFavorite = favorite.get({ plain: true });
        return {
          ...plainFavorite,
          product: plainFavorite.product ? {
            id: plainFavorite.product.id,
            name: plainFavorite.product.name,
            price: plainFavorite.product.price,
            photos: plainFavorite.product.photos
          } : null
        };
      });

      res.status(200).json({ status: 'success', data: { favorites: plainFavorites } });
    } else if (req.method === 'DELETE') {
      // DELETE 方法的邏輯保持不變
      const { favoriteId } = req.query;

      if (!favoriteId) {
        return res.status(400).json({ status: 'error', message: '缺少收藏ID' });
      }

      const favorite = await Favorite.findOne({
        where: { id: favoriteId, uid: userId }
      });

      if (!favorite) {
        return res.status(404).json({ status: 'error', message: '收藏不存在或不屬於該用戶' });
      }

      await favorite.destroy();
      res.status(200).json({ status: 'success', message: '收藏已成功刪除' });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('處理收藏時發生錯誤:', error);
    if (error.name === 'UnauthorizedError') {
      res.status(401).json({ status: 'error', message: '未授權訪問' });
    } else {
      res.status(500).json({ status: 'error', message: '處理收藏失敗', error: error.message });
    }
  }
}