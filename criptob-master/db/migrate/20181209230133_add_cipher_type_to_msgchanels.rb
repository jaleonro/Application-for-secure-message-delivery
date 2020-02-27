class AddCipherTypeToMsgchanels < ActiveRecord::Migration[5.2]
  def change
    add_column :msgchanels, :cipher_type, :integer
  end
end
