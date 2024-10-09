export default function applyAssociations(sequelize) {
  const { Favorite, Product1 } = sequelize.models;

  // 設置 Favorite 和 Product1 之間的關聯，但不創建外鍵約束
  Favorite.belongsTo(Product1, { 
    foreignKey: 'pid', 
    as: 'product',
    constraints: false
  });
  Product1.hasMany(Favorite, { 
    foreignKey: 'pid', 
    as: 'favorites',
    constraints: false
  });
}