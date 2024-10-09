import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Purchase_Order',
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        comment: 'UUID',
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '折扣後最終金額',
      },
      original_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '折扣前原始金額',
      },
      discount_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '折扣金額',
      },
      transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'LINE Pay, 信用卡, ATM',
      },
      shipping: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '7-11, Family Mart, Hi-Life, OK Mart, 郵局, 宅配',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        comment: 'pending, paid, fail, cancel, error',
      },
      order_info: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '發送給 LINE Pay 的完整訂單詳情',
      },
      products: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '購買商品的 JSON 字符串',
      },
      product_details: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '購買商品的詳細信息，包括 ID、名稱、數量和單價',
      },
      coupon_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '使用的優惠券 ID',
      },
      coupon_code: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '使用的優惠券代碼',
      },
      discount_percentage: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: '折扣百分比',
      },
      reservation: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '從 LINE Pay 獲得的預訂詳情',
      },
      confirm: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '從 LINE Pay 獲得的確認詳情',
      },
      return_code: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '從 LINE Pay 獲得的返回代碼',
      },
    },
    {
      tableName: 'purchase_order',
      timestamps: true,
      paranoid: false,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
}