class AddCipherTypeToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :cipher_type, :integer
  end
end
